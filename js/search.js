/*
 * Search for the Good — local natural-language search.
 *
 * No external API. A query is normalized, multi-word concepts are joined
 * ("giving back" → "giveback"), stopwords are dropped, and the remaining terms
 * are matched against a weighted per-entity index. Intent words (places,
 * "I can buy", "founders", categories, "hidden gems") are pulled out and used
 * as boosts or filters. The result is ranked by:
 *   1. how strongly and how completely the query terms match
 *   2. category / place / type intent
 *   3. editorial quality signals (featured, hidden gem)
 */
(function () {
  var SFG = window.SFG;
  var DATA = SFG.DATA;

  var CATEGORIES = {
    health: { label: "Health", blurb: "Things helping people live healthier lives." },
    community: { label: "Community", blurb: "Things strengthening communities and human connection." },
    planet: { label: "Planet", blurb: "Things helping create a healthier planet." },
    opportunity: { label: "Opportunity", blurb: "Things expanding human opportunity." }
  };
  var TYPES = { brand: "Brand", project: "Project", person: "Person" };
  var COUNTRIES = {
    US: "United States", CA: "Canada", GB: "United Kingdom", DK: "Denmark", IN: "India",
    FR: "France", DE: "Germany", NL: "Netherlands", SE: "Sweden", CH: "Switzerland",
    AU: "Australia", CO: "Colombia", ES: "Spain", KE: "Kenya", NG: "Nigeria"
  };
  var FLAGS = {
    US: "🇺🇸", CA: "🇨🇦", GB: "🇬🇧", DK: "🇩🇰", IN: "🇮🇳", FR: "🇫🇷", DE: "🇩🇪", NL: "🇳🇱",
    SE: "🇸🇪", CH: "🇨🇭", AU: "🇦🇺", CO: "🇨🇴", ES: "🇪🇸", KE: "🇰🇪", NG: "🇳🇬"
  };
  var REGIONS = ["North America", "Europe", "Latin America", "Africa", "Asia", "Oceania"];

  /* ---------- text helpers ---------- */
  function fold(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function stem(w) {
    if (w.length <= 3) return w;
    if (/ies$/.test(w) && w.length > 4) return w.slice(0, -3) + "y";
    if (/ier$/.test(w) && w.length > 5) return w.slice(0, -3) + "y";
    if (/iest$/.test(w)) return w.slice(0, -4) + "y";
    if (/ing$/.test(w) && w.length > 5) { w = w.slice(0, -3); return w.replace(/(.)\1$/, "$1"); }
    if (/ed$/.test(w) && w.length > 4 && !/eed$/.test(w)) return w.slice(0, -2);
    if (/(ches|shes|sses|xes)$/.test(w)) return w.slice(0, -2);
    if (/s$/.test(w) && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
    return w;
  }
  // Multi-word ideas that should be treated as a single concept.
  var PHRASES = [
    [/\b(giv(e|es|ing)|gave) back\b/g, "giveback"],
    [/\bone[- ]for[- ]one\b/g, "giveback"],
    [/\bfood waste\b/g, "foodwaste"],
    [/\bmental health\b/g, "mentalhealth"],
    [/\b(eat(ing)? (healthier|healthy|better|well)|healthy (eating|food)|healthier food)\b/g, "healthyeating"],
    [/\b(public|shared) spaces?\b/g, "publicspace"],
    [/\bcommunity spaces?\b/g, "communityspace"],
    [/\bcarbon (removal|capture)\b/g, "carbonremoval"],
    [/\bcircular economy\b/g, "circular"],
    [/\bget(ting)? outside\b/g, "outdoors"],
    [/\bsecond[- ]?hand\b/g, "secondhand"],
    [/\bplastic[- ]free\b/g, "plasticfree"],
    [/\bb[- ]?corps?\b/g, "bcorp"],
    [/\bsecond chances?\b/g, "secondchance"],
    [/\bclean water\b/g, "cleanwater"],
    [/\bcomputer science\b|\bcoding\b|\bprogramming\b/g, "computerscience"],
    [/\bhealth ?care\b/g, "healthcare"],
    [/\bsmall business(es)?\b/g, "smallbusiness"],
    [/\bpeople (building|who|making|behind|doing)\b/g, "founder"],
    [/\b(hidden gems?|lesser[- ]known|under the radar|underrated|never heard of)\b/g, "hiddengem"],
    [/\b(new|emerging|young) (companies|startups|brands|projects)\b/g, "startup hiddengem"],
    [/\b(can|could) (actually )?buy\b/g, "buy"],
    [/\bnorth america\b/g, "northamerica"],
    [/\b(south|latin) america\b/g, "latinamerica"],
    [/\bunited (states|kingdom)\b/g, function (m) { return /states/.test(m) ? "usa" : "uk"; }]
  ];
  var STOP = new Set(("a an the and or of for to in on at with that this these those are is be been was i me my we our you your it its can " +
    "could would should actually really things thing stuff doing do does done good great cool interesting best awesome help helping helps " +
    "make making makes create creating creates around world better more way ways which what who whose where how some any show find " +
    "get gets want looking look need like just also exist exists existing their them they there here from by about into than so " +
    "very lot lots kind kinds type types company companies business businesses brand brands organization organizations org orgs " +
    "project projects initiative initiatives people person easier easy everyday today working work works solution solutions " +
    "doing give reduce reducing reduces improve improving improves instead replace start started starting nothing actual really new latest top").split(" ").map(stem));
  // Words that should match content but also set a category intent.
  var CATEGORY_WORDS = {
    health: "health healthy healthier wellbeing wellness fitness fit mental medical sleep nutrition healthcare mentalhealth healthyeating",
    planet: "planet climate environment environmental sustainable sustainability eco green earth nature waste carbon ocean foodwaste circular",
    community: "community communities neighbour neighbor neighbourhood neighborhood connection belonging communityspace publicspace together local",
    opportunity: "opportunity opportunities job jobs employment education economic poverty skills career careers entrepreneur entrepreneurs smallbusiness"
  };
  var CAT_LOOKUP = {};
  Object.keys(CATEGORY_WORDS).forEach(function (c) {
    CATEGORY_WORDS[c].split(" ").forEach(function (w) { CAT_LOOKUP[stem(w)] = c; });
  });
  var PLACE_WORDS = {
    canada: { country: "CA" }, canadian: { country: "CA" },
    usa: { country: "US" }, us: { country: "US" }, america: { country: "US" }, american: { country: "US" },
    uk: { country: "GB" }, britain: { country: "GB" }, british: { country: "GB" }, england: { country: "GB" },
    india: { country: "IN" }, indian: { country: "IN" }, kenya: { country: "KE" }, nigeria: { country: "NG" },
    france: { country: "FR" }, french: { country: "FR" }, germany: { country: "DE" }, german: { country: "DE" },
    netherlands: { country: "NL" }, dutch: { country: "NL" }, australia: { country: "AU" }, australian: { country: "AU" },
    colombia: { country: "CO" }, spain: { country: "ES" }, denmark: { country: "DK" }, danish: { country: "DK" },
    europe: { region: "Europe" }, european: { region: "Europe" }, africa: { region: "Africa" }, african: { region: "Africa" },
    asia: { region: "Asia" }, asian: { region: "Asia" }, latinamerica: { region: "Latin America" },
    northamerica: { region: "North America" }, oceania: { region: "Oceania" }
  };
  var BUY_WORDS = new Set(["buy", "shop", "shopping", "purchase", "product", "products", "wear", "gift", "gifts", "own", "order", "afford", "affordable"].map(stem));
  var PERSON_WORDS = new Set(["founder", "founders", "changemaker", "changemakers", "inventor", "inventors", "leader", "leaders", "builder", "builders", "human", "humans", "individual", "individuals"].map(stem));
  var PROJECT_WORDS = new Set(["program", "programs", "nonprofit", "nonprofits", "non-profit", "charity", "charities", "movement", "movements", "volunteer"].map(stem));
  var GEM_WORDS = new Set(["hiddengem", "startup", "startups", "emerging", "new", "niche", "small", "unknown", "obscure"].map(stem));

  // Concept expansion: a query term pulls in related vocabulary at lower weight.
  var CONCEPTS = [
    "sleep rest recovery bedtime insomnia",
    "healthyeating food nutrition produce groceries organic plantbased healthy local-food fruit vegetable",
    "eat food nutrition groceries produce meal",
    "fashion apparel clothing clothes footwear shoes sneakers denim wear outfit",
    "waste foodwaste recycling circular landfill trash garbage reuse refill packaging",
    "foodwaste food-waste surplus rescue groceries",
    "climate carbon carbonremoval emissions renewable-energy renewable solar energy",
    "energy renewable-energy solar electricity",
    "job jobs employment hiring workforce careers career skills secondchance open-hiring",
    "city cities urban urban-design publicspace mobility neighbourhood walkability cycling transport housing street streets",
    "outdoors outdoor outside nature hiking running parks cycling active camping",
    "healthcare medical medicine hospital doctor eye-care healthcare-access clinic",
    "mentalhealth mental-health mindfulness meditation stress anxiety loneliness wellbeing",
    "lonely loneliness isolation social-connection connection friendship",
    "education learning school schools students teaching learn tutoring literacy online-learning",
    "money finance banking bank loans lending microfinance financial-inclusion credit",
    "giveback give-back one-for-one donate donation",
    "sustainable sustainability circular low-impact organic durable reuse repair",
    "repair fix fixing durable repairable",
    "tree trees forest forests reforestation",
    "ocean oceans sea seas marine plastic beach shoreline",
    "plastic plasticfree plastic-free packaging",
    "communityspace community-space publicspace public-space gathering makers parks library",
    "publicspace public-space parks streets plaza",
    "accessibility accessible disability disabled blind low-vision",
    "fitness exercise running run workout active sport",
    "phone phones electronics laptop laptops technology e-waste",
    "tech technology app software platform",
    "kid kids child children youth young teen teens students",
    "older-adults elderly seniors aging older",
    "volunteer volunteering volunteers helping",
    "farm farming farmer farmers agriculture urban-farming garden gardening",
    "water cleanwater clean-water",
    "computerscience computer-science code software engineer engineers",
    "housing home homes shelter",
    "startup startups founder entrepreneurship",
    "smallbusiness small-business local-business entrepreneurship",
    "bcorp b-corp",
    "secondhand resale refurbished thrift used"
  ].map(function (line) { return line.split(" ").map(function (w) { return stem(fold(w).replace(/-/g, "")); }); });
  var CONCEPT_MAP = {};
  CONCEPTS.forEach(function (group) {
    group.forEach(function (w) {
      CONCEPT_MAP[w] = CONCEPT_MAP[w] || new Set();
      group.forEach(function (o) { if (o !== w) CONCEPT_MAP[w].add(o); });
    });
  });

  function tokens(text) {
    return fold(text).replace(/[^a-z0-9\s-]/g, " ").split(/[\s]+/).filter(Boolean);
  }

  /* ---------- index ---------- */
  var FIELD_WEIGHTS = { name: 10, founders: 5, kind: 5, tags: 6, cat: 5, areas: 3, tagline: 3, why: 2, about: 1, place: 3 };
  var INDEX = {};
  var BY_ID = {};
  DATA.forEach(function (e) {
    BY_ID[e.id] = e;
    var map = {};
    function add(word, w) {
      var parts = [word.replace(/-/g, "")].concat(word.indexOf("-") >= 0 ? word.split("-") : []);
      parts.forEach(function (p) {
        if (!p) return;
        var s = stem(p);
        if (!map[s] || map[s] < w) map[s] = w;
      });
    }
    function addText(text, w) { tokens(text).forEach(function (t) { add(t, w); }); }
    addText(e.name, FIELD_WEIGHTS.name);
    addText((e.founders || []).join(" ") + " " + (e.role || ""), FIELD_WEIGHTS.founders);
    addText(e.kind, FIELD_WEIGHTS.kind);
    (e.tags || []).forEach(function (t) { add(fold(t), FIELD_WEIGHTS.tags); });
    add(e.cat, FIELD_WEIGHTS.cat);
    e.areas.forEach(function (a) { add(a, FIELD_WEIGHTS.areas); });
    addText(e.tagline, FIELD_WEIGHTS.tagline);
    addText(e.why, FIELD_WEIGHTS.why);
    addText(e.about, FIELD_WEIGHTS.about);
    addText(e.city + " " + (COUNTRIES[e.country] || "") + " " + e.region, FIELD_WEIGHTS.place);
    INDEX[e.id] = map;
  });

  /* ---------- query parsing ---------- */
  function parse(q) {
    var text = " " + fold(q) + " ";
    PHRASES.forEach(function (p) { text = text.replace(p[0], typeof p[1] === "function" ? p[1] : " " + p[1] + " "); });
    var raw = tokens(text);
    var intent = { cats: [], country: null, region: null, buyable: false, type: null, gem: false, brandish: false };
    var terms = [];
    raw.forEach(function (t) {
      var s = stem(t);
      if (PLACE_WORDS[t]) {
        if (PLACE_WORDS[t].country) intent.country = PLACE_WORDS[t].country;
        if (PLACE_WORDS[t].region) intent.region = PLACE_WORDS[t].region;
        return;
      }
      if (BUY_WORDS.has(s)) { intent.buyable = true; return; }
      if (PERSON_WORDS.has(s)) { intent.type = "person"; return; }
      if (PROJECT_WORDS.has(s)) { intent.type = intent.type || "project"; }
      if (GEM_WORDS.has(s)) { intent.gem = true; return; }
      if (/^(compan|brand|business|startup)/.test(s)) intent.brandish = true;
      if (CAT_LOOKUP[s] && intent.cats.indexOf(CAT_LOOKUP[s]) < 0) intent.cats.push(CAT_LOOKUP[s]);
      if (STOP.has(s) || s.length < 2) return;
      if (terms.indexOf(s) < 0) terms.push(s);
    });
    if (/^\s*people\b/.test(fold(q))) intent.type = "person";
    return { query: q, terms: terms, intent: intent };
  }

  function termScore(map, t) {
    var best = map[t] || 0;
    if (!best && t.length >= 4) {
      for (var k in map) {
        if (k.length >= 4 && (k.indexOf(t) === 0 || (t.indexOf(k) === 0 && k.length >= t.length - 2))) best = Math.max(best, map[k] * 0.7);
      }
    }
    var exp = CONCEPT_MAP[t];
    if (exp) exp.forEach(function (x) { if (map[x]) best = Math.max(best, map[x] * 0.6); });
    return best;
  }

  /* ---------- search ---------- */
  function search(q, filters) {
    filters = filters || {};
    var p = parse(q || "");
    var it = p.intent;
    var hasTerms = p.terms.length > 0;
    var scored = [];

    DATA.forEach(function (e) {
      var map = INDEX[e.id];
      var sum = 0, matched = 0;
      p.terms.forEach(function (t) {
        var s = termScore(map, t);
        if (s > 0) { matched++; sum += s; }
      });
      if (hasTerms && matched === 0) return;
      var score = sum + (hasTerms ? (matched / p.terms.length) * 10 : 0);
      if (hasTerms && p.terms.length >= 3 && matched / p.terms.length < 0.34) score *= 0.5;

      it.cats.forEach(function (c) {
        if (e.cat === c) score += 6; else if (e.areas.indexOf(c) >= 0) score += 3;
      });
      if (it.buyable) score += e.buyable ? 7 : -5;
      if (it.type === "project" && e.type === "project") score += 5;
      if (it.brandish && e.type === "brand") score += 1.5;
      if (it.gem) score += e.discovery === "gem" ? 5 : e.discovery === "rising" ? 2 : -1;
      if (it.country && e.country === it.country) score += 12;
      if (it.region && e.region === it.region) score += 10;
      score += e.featured ? 1.5 : 0;
      score += e.discovery === "gem" ? 0.6 : 0;
      scored.push({ e: e, score: score });
    });

    // Drop the long tail of weak, incidental matches.
    if (hasTerms && scored.length > 6) {
      var top = Math.max.apply(null, scored.map(function (r) { return r.score; }));
      var kept = scored.filter(function (r) { return r.score >= top * 0.32; });
      scored = kept.length >= 5 ? kept : scored.sort(function (a, b) { return b.score - a.score; }).slice(0, 5);
    }

    // Hard filters from intent, but only when they leave enough to explore.
    function narrow(list, fn, min) {
      var n = list.filter(fn);
      return n.length >= min ? n : list;
    }
    if (it.country) scored = narrow(scored, function (r) { return r.e.country === it.country; }, 3);
    if (it.region) scored = narrow(scored, function (r) { return r.e.region === it.region; }, 3);
    if (it.type === "person") scored = narrow(scored, function (r) { return r.e.type === "person"; }, 2);
    if (it.buyable && !hasTerms) scored = scored.filter(function (r) { return r.e.buyable; });
    if (!hasTerms && it.cats.length) scored = narrow(scored, function (r) { return it.cats.indexOf(r.e.cat) >= 0 || r.e.areas.some(function (a) { return it.cats.indexOf(a) >= 0; }); }, 3);

    // Explicit user filters (refinement chips).
    if (filters.cat) scored = scored.filter(function (r) { return r.e.areas.indexOf(filters.cat) >= 0; });
    if (filters.type) scored = scored.filter(function (r) { return r.e.type === filters.type; });
    if (filters.place) scored = scored.filter(function (r) { return r.e.country === filters.place || r.e.region === filters.place; });
    if (filters.tag) scored = scored.filter(function (r) { return r.e.tags.indexOf(filters.tag) >= 0; });
    if (filters.buy) scored = scored.filter(function (r) { return r.e.buyable; });

    scored.sort(function (a, b) { return b.score - a.score || a.e.name.localeCompare(b.e.name); });
    var results = scored.map(function (r) { return r.e; });
    return { parsed: p, results: results, interpretation: interpret(p), refinements: refinements(results, p, filters) };
  }

  function interpret(p) {
    var it = p.intent, bits = [];
    it.cats.forEach(function (c) { bits.push({ kind: "cat", value: c, label: CATEGORIES[c].label }); });
    if (it.type === "person") bits.push({ kind: "type", label: "People behind the work" });
    if (it.type === "project") bits.push({ kind: "type", label: "Projects & programs" });
    if (it.buyable) bits.push({ kind: "buy", label: "Things you can buy or use" });
    if (it.country) bits.push({ kind: "place", label: "In " + COUNTRIES[it.country] });
    if (it.region) bits.push({ kind: "place", label: "In " + it.region });
    if (it.gem) bits.push({ kind: "gem", label: "Hidden gems first" });
    return bits;
  }

  function refinements(results, p, filters) {
    var top = results.slice(0, 30);
    var out = [];
    var cats = {}, types = {}, places = {}, tags = {};
    top.forEach(function (e) {
      cats[e.cat] = (cats[e.cat] || 0) + 1;
      types[e.type] = (types[e.type] || 0) + 1;
      places[e.country] = (places[e.country] || 0) + 1;
      e.tags.forEach(function (t) { tags[t] = (tags[t] || 0) + 1; });
    });
    if (!filters.cat) Object.keys(cats).sort(function (a, b) { return cats[b] - cats[a]; }).forEach(function (c) {
      out.push({ key: "cat", value: c, label: CATEGORIES[c].label, count: cats[c] });
    });
    if (!filters.buy && top.some(function (e) { return e.buyable; }) && top.some(function (e) { return !e.buyable; }))
      out.push({ key: "buy", value: "1", label: "Can buy or join" });
    var qset = new Set(p.terms);
    if (!filters.tag) Object.keys(tags)
      .filter(function (t) { return tags[t] >= 2 && !qset.has(stem(t.replace(/-/g, ""))) && t !== "founder"; })
      .sort(function (a, b) { return tags[b] - tags[a]; }).slice(0, 7)
      .forEach(function (t) { out.push({ key: "tag", value: t, label: prettyTag(t), count: tags[t] }); });
    if (!filters.place) Object.keys(places).filter(function (c) { return places[c] >= 2 || c === "CA"; })
      .sort(function (a, b) { return places[b] - places[a]; }).slice(0, 4)
      .forEach(function (c) { out.push({ key: "place", value: c, label: (FLAGS[c] || "") + " " + COUNTRIES[c], count: places[c] }); });
    return out;
  }

  function prettyTag(t) {
    var special = { "b-corp": "B Corp", "ev": "EVs", "e-waste": "E-waste", "eye-care": "Eye care", "healthcare-access": "Healthcare access" };
    if (special[t]) return special[t];
    var s = t.replace(/-/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* ---------- related discoveries ---------- */
  function related(e, n) {
    n = n || 4;
    var linked = new Set((e.people || []).concat(e.links || []));
    DATA.forEach(function (o) { if ((o.people || []).indexOf(e.id) >= 0 || (o.links || []).indexOf(e.id) >= 0) linked.add(o.id); });
    var scored = DATA.filter(function (o) { return o.id !== e.id; }).map(function (o) {
      var s = 0;
      o.tags.forEach(function (t) { if (e.tags.indexOf(t) >= 0) s += 3; });
      o.areas.forEach(function (a) { if (e.areas.indexOf(a) >= 0) s += 1.5; });
      if (o.cat === e.cat) s += 2;
      if (o.country === e.country) s += 1;
      if (o.type === "person" && e.type === "person") s -= 2; // keep the loop varied
      if (linked.has(o.id)) s -= 50; // linked entities are shown separately
      s += (hash(e.id + o.id) % 100) / 100; // stable variety
      return { o: o, s: s };
    });
    scored.sort(function (a, b) { return b.s - a.s; });
    return scored.slice(0, n).map(function (r) { return r.o; });
  }

  function linkedTo(e) {
    var ids = new Set((e.people || []).concat(e.links || []));
    DATA.forEach(function (o) { if ((o.people || []).indexOf(e.id) >= 0 || (o.links || []).indexOf(e.id) >= 0) ids.add(o.id); });
    ids.delete(e.id);
    return Array.from(ids).map(function (id) { return BY_ID[id]; }).filter(Boolean);
  }

  /* ---------- suggestions (autocomplete) ---------- */
  var EXAMPLES = [
    "companies helping people sleep better",
    "sustainable clothing brands",
    "products reducing food waste",
    "companies improving access to healthcare",
    "community spaces",
    "businesses helping people get outside",
    "climate solutions that actually exist",
    "products that make healthy eating easier",
    "companies creating jobs",
    "Canadian companies doing good",
    "interesting sustainable startups",
    "brands giving back to their communities",
    "businesses making cities better",
    "things helping the planet that I can actually buy",
    "people building in Africa",
    "hidden gems in Europe",
    "founders who started with nothing",
    "things fixing loneliness",
    "repair instead of replace",
    "ocean plastic"
  ];
  function suggest(q) {
    var f = fold(q).trim();
    if (!f) return [];
    var out = [];
    DATA.forEach(function (e) {
      var n = fold(e.name);
      if (n.indexOf(f) === 0 || n.split(/\s+/).some(function (w) { return w.indexOf(f) === 0; })) out.push({ kind: "entity", e: e });
    });
    out = out.slice(0, 4);
    EXAMPLES.forEach(function (x) { if (fold(x).indexOf(f) >= 0 && out.length < 8) out.push({ kind: "query", q: x }); });
    if (out.length < 3) {
      var r = search(q).results.slice(0, 3 - out.length);
      r.forEach(function (e) { if (!out.some(function (o) { return o.e === e; })) out.push({ kind: "entity", e: e }); });
    }
    return out;
  }

  /* ---------- feeds ---------- */
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function seeded(seed) {
    var s = hash(String(seed)) || 1;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; };
  }
  function shuffle(list, seed) {
    var rnd = seeded(seed), a = list.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  // Interleave so the feed never shows the same category or type three times in a row.
  function varied(list) {
    var pool = list.slice(), out = [];
    while (pool.length) {
      var idx = 0;
      for (var i = 0; i < pool.length; i++) {
        var a = out[out.length - 1], b = out[out.length - 2];
        var sameCat = a && b && a.cat === b.cat && pool[i].cat === a.cat;
        var sameType = a && a.type === "person" && pool[i].type === "person";
        if (!sameCat && !sameType) { idx = i; break; }
      }
      out.push(pool.splice(idx, 1)[0]);
    }
    return out;
  }

  var FEEDS = {
    foryou: { label: "For You", title: "For you", sub: "A mix of the well-known and the never-heard-of.", pick: function () { return DATA; },
      order: function (list, lap) {
        var feat = list.filter(function (e) { return e.featured; }), rest = list.filter(function (e) { return !e.featured; });
        return lap === 0 ? varied(shuffle(feat, "f" + lap).concat(shuffle(rest, "r" + lap))) : varied(shuffle(list, "lap" + lap));
      } },
    new: { label: "New Discoveries", title: "New discoveries", sub: "Hidden gems and rising builders most people haven't found yet.",
      pick: function () { return DATA.filter(function (e) { return e.discovery !== "known"; }); },
      order: function (list, lap) { var g = list.filter(function (e) { return e.discovery === "gem"; }), r = list.filter(function (e) { return e.discovery !== "gem"; }); return varied(shuffle(g, "g" + lap).concat(shuffle(r, "n" + lap))); } },
    world: { label: "Around the World", title: "Around the world", sub: "Good is happening on every continent. Here's a tour.", pick: function () { return DATA; },
      order: function (list, lap) {
        var by = {}; REGIONS.forEach(function (r) { by[r] = shuffle(list.filter(function (e) { return e.region === r; }), r + lap); });
        var out = [], more = true;
        while (more) { more = false; REGIONS.forEach(function (r) { if (by[r].length) { out.push(by[r].shift()); more = true; } }); }
        return out;
      } },
    health: { label: "Health", title: "Making health better", sub: CATEGORIES.health.blurb, cat: "health" },
    planet: { label: "Planet", title: "Better for the planet", sub: CATEGORIES.planet.blurb, cat: "planet" },
    community: { label: "Community", title: "Building stronger communities", sub: CATEGORIES.community.blurb, cat: "community" },
    opportunity: { label: "Opportunity", title: "Expanding opportunity", sub: CATEGORIES.opportunity.blurb, cat: "opportunity" },
    people: { label: "People", title: "The people behind it", sub: "Founders, builders, and community leaders worth knowing.", type: "person" }
  };
  Object.keys(FEEDS).forEach(function (k) {
    var f = FEEDS[k];
    if (f.cat) {
      f.pick = function () { return DATA.filter(function (e) { return e.areas.indexOf(f.cat) >= 0; }); };
      f.order = function (list, lap) {
        var primary = list.filter(function (e) { return e.cat === f.cat; }), other = list.filter(function (e) { return e.cat !== f.cat; });
        return varied(shuffle(primary, k + lap)).concat(shuffle(other, k + "o" + lap));
      };
    }
    if (f.type) {
      f.pick = function () { return DATA.filter(function (e) { return e.type === f.type; }); };
      f.order = function (list, lap) { return shuffle(list, k + lap); };
    }
  });

  /**
   * An endless iterator over a list. Each lap is re-ordered; the boundary is
   * reported so the UI can mark it honestly ("you've seen them all — round two").
   */
  function stream(feedKey, region) {
    var f = FEEDS[feedKey] || FEEDS.foryou;
    var base = f.pick();
    if (region) base = base.filter(function (e) { return e.region === region; });
    var lap = 0, i = 0, current = f.order(base, 0), lastId = null, ended = false;
    var loop = base.length >= 12; // tiny lists end honestly instead of repeating
    return {
      size: base.length,
      next: function (n) {
        var out = [];
        if (!base.length || ended) return out;
        while (out.length < n) {
          if (i >= current.length && !loop) {
            ended = true;
            out.push({ marker: true, end: true, size: base.length, region: region });
            break;
          }
          if (i >= current.length) {
            lap++; i = 0; current = f.order(base, lap);
            if (current.length > 1 && current[0].id === lastId) current.push(current.shift());
            out.push({ marker: true, lap: lap, size: base.length });
            continue;
          }
          var e = current[i++]; lastId = e.id; out.push(e);
        }
        return out;
      }
    };
  }

  function streamList(list, seed) {
    var lap = 0, i = 0, current = list.slice();
    return {
      size: list.length,
      next: function (n) {
        var out = [];
        while (out.length < n && i < current.length) out.push(current[i++]);
        return out;
      },
      done: function () { return i >= current.length; }
    };
  }

  SFG.search = search;
  SFG.parse = parse;
  SFG.related = related;
  SFG.linkedTo = linkedTo;
  SFG.suggest = suggest;
  SFG.stream = stream;
  SFG.streamList = streamList;
  SFG.byId = function (id) { return BY_ID[id]; };
  SFG.shuffle = shuffle;
  SFG.prettyTag = prettyTag;
  SFG.CATEGORIES = CATEGORIES;
  SFG.TYPES = TYPES;
  SFG.COUNTRIES = COUNTRIES;
  SFG.FLAGS = FLAGS;
  SFG.REGIONS = REGIONS;
  SFG.FEEDS = FEEDS;
  SFG.EXAMPLES = EXAMPLES;
})();
