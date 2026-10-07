/*
 * Search for the Good — app shell: routing, views, feed, search results,
 * detail drawer, saves. Plain JavaScript, no build step.
 *
 * Routes (hash based so it works from any static host, or straight from disk):
 *   #/                 home: hero search + endless discovery feed
 *   #/explore?f=…      home scrolled to the feed (f = feed tab, r = region)
 *   #/search?q=…       results (+ cat, type, place, tag, buy filters)
 *   #/saved            saved items (?ids=a,b,c for a shared list)
 *   #/about            what this is and how things get in
 *   …&open=<id>        any route can open the detail drawer
 */
(function () {
  "use strict";
  var SFG = window.SFG;
  var main = document.getElementById("main");
  var drawer = document.getElementById("drawer");
  var drawerBody = document.getElementById("drawerBody");
  var addModal = document.getElementById("addModal");
  var toastEl = document.getElementById("toast");
  var topbar = document.getElementById("topbar");

  /* ======================================================================
     Utilities
     ====================================================================== */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function initials(name) {
    var words = name.replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(function (w) { return w && !/^(the|of|for|and)$/i.test(w); });
    if (!words.length) return name.charAt(0).toUpperCase();
    if (words.length === 1) return words[0].slice(0, 2).replace(/^./, function (c) { return c.toUpperCase(); });
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  var ICON = {
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.4-9.3-9.2C1.4 7.7 3.6 4 7.3 4c2 0 3.6 1.1 4.7 2.7C13.1 5.1 14.7 4 16.7 4c3.7 0 5.9 3.7 4.6 7.3-1.8 4.8-9.3 9.2-9.3 9.2Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4 10 14M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    spark: '<svg class="sparkle" viewBox="0 0 24 24"><path d="M12 2.5c.5 4.6 2.9 7 9.5 9.5-6.6 2.5-9 4.9-9.5 9.5-.5-4.6-2.9-7-9.5-9.5 6.6-2.5 9-4.9 9.5-9.5Z"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg>',
    minus: '<svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>'
  };
  var CAT = SFG.CATEGORIES, TYPES = SFG.TYPES;
  var DISCOVERY = { gem: "Hidden gem", rising: "Rising", known: "Well known" };

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2400);
  }

  /* ======================================================================
     Saves (localStorage; the prototype has no accounts)
     ====================================================================== */
  var SAVE_KEY = "sftg.saved.v1";
  var saved = [];
  try { saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]"); } catch (e) { saved = []; }
  saved = saved.filter(function (id) { return SFG.byId(id); });
  function isSaved(id) { return saved.indexOf(id) >= 0; }
  function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(saved)); } catch (e) { /* private mode */ } }
  function toggleSave(id, btn) {
    var e = SFG.byId(id);
    if (isSaved(id)) { saved.splice(saved.indexOf(id), 1); toast("Removed " + e.name + " from saved"); }
    else { saved.unshift(id); toast("Saved " + e.name + " ♡"); }
    persist();
    syncSaves();
    if (btn) { btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop"); }
  }
  function syncSaves() {
    document.querySelectorAll("[data-save]").forEach(function (b) {
      var on = isSaved(b.getAttribute("data-save"));
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      if (b.classList.contains("btn")) b.querySelector("span").textContent = on ? "Saved" : "Save";
    });
    var c = document.getElementById("savedCount");
    c.textContent = saved.length;
    c.hidden = saved.length === 0;
  }

  /* ======================================================================
     Building blocks
     ====================================================================== */
  function logoTile(e) {
    var mono = '<span class="mono">' + esc(initials(e.name)) + "</span>";
    if (e.type === "person" || !e.site) return '<span class="logo-tile">' + mono + "</span>";
    var src = "https://www.google.com/s2/favicons?sz=128&domain=" + encodeURIComponent(e.site);
    return '<span class="logo-tile" data-mono="' + esc(initials(e.name)) + '"><img src="' + src + '" alt="" loading="lazy" decoding="async" ' +
      'onerror="SFG.logoFail(this)" onload="SFG.logoCheck(this)"></span>';
  }
  // Fall back to a monogram when a site has no usable icon.
  SFG.logoFail = function (img) {
    var tile = img.parentNode;
    if (!tile) return;
    tile.innerHTML = '<span class="mono">' + esc(tile.getAttribute("data-mono")) + "</span>";
  };
  SFG.logoCheck = function (img) { if (img.naturalWidth && img.naturalWidth < 32) SFG.logoFail(img); };

  function orbs(e) {
    var h = hash(e.id), out = "";
    for (var i = 0; i < 3; i++) {
      var size = 60 + ((h >> (i * 5)) % 120);
      var x = (h >> (i * 7)) % 100, y = (h >> (i * 3 + 2)) % 100;
      out += '<span class="orb" style="width:' + size + "px;height:" + size + "px;left:" + (x - 10) + "%;top:" + (y - 30) +
        '%;background:rgba(255,255,255,' + (0.18 + i * 0.08) + ')"></span>';
    }
    return out;
  }
  function metaLine(e) {
    return '<div class="meta"><i class="dot-' + e.cat + '"></i>' + esc(TYPES[e.type]) + " · " + esc(CAT[e.cat].label) + "</div>";
  }
  function where(e) {
    if (!e.city) return "";
    var flag = SFG.FLAGS[e.country] || "";
    var label = e.city === "Many cities" ? "Many cities" : e.city + (e.country !== "US" || e.city.length > 14 ? "" : ", US");
    if (e.country !== "US" && e.city !== SFG.COUNTRIES[e.country] && e.city !== "Many cities") label = e.city + ", " + SFG.COUNTRIES[e.country];
    return '<span class="loc">' + flag + " " + esc(label) + "</span>";
  }
  function signal(e) {
    if (e.discovery === "gem") return '<span class="signal gem">Hidden gem</span>';
    if (e.discovery === "rising") return '<span class="signal rising">Rising</span>';
    return "";
  }
  function saveBtn(e) {
    return '<button class="save' + (isSaved(e.id) ? " on" : "") + '" type="button" data-save="' + e.id + '" aria-pressed="' + isSaved(e.id) +
      '" aria-label="Save ' + esc(e.name) + '">' + ICON.heart + "</button>";
  }

  function cardHTML(e) {
    var h = hash(e.id);
    if (e.type === "person") {
      return '<article class="card person" tabindex="0" data-open="' + e.id + '" data-cat="' + e.cat + '">' +
        '<div class="cover">' + orbs(e) + '<span class="badge">Person</span>' + saveBtn(e) +
        '<span class="avatar"><span class="mono">' + esc(initials(e.name)) + "</span></span></div>" +
        '<div class="card-body">' + metaLine(e) + "<h3>" + esc(e.name) + "</h3>" +
        '<p class="role">' + esc(e.role || e.kind) + "</p>" +
        '<p class="tagline">' + esc(e.tagline) + "</p>" +
        '<div class="foot" style="justify-content:center">' + where(e) + "</div></div></article>";
    }
    var hc = e.featured ? (h % 2 ? "h3" : "h2") : ["", "h2", ""][h % 3];
    return '<article class="card" tabindex="0" data-open="' + e.id + '" data-cat="' + e.cat + '">' +
      '<div class="cover ' + hc + '">' + orbs(e) + '<span class="badge">' + esc(TYPES[e.type]) + "</span>" + saveBtn(e) + logoTile(e) + "</div>" +
      '<div class="card-body">' + metaLine(e) + "<h3>" + esc(e.name) + "</h3>" +
      '<p class="tagline">' + esc(e.tagline) + "</p>" +
      '<div class="why"><b>Why it\'s here</b>' + esc(e.why) + "</div>" +
      '<div class="foot">' + where(e) + signal(e) + "</div></div></article>";
  }

  var PROMPTS = [
    { style: "", eyebrow: "Try searching", q: "things helping the planet that I can actually buy" },
    { style: "dark", eyebrow: "Somewhere right now", text: "Someone is building the thing that fixes it. Want to meet them?", go: "Meet the people", href: "#/explore?f=people" },
    { style: "soft", eyebrow: "Try searching", q: "businesses making cities better" },
    { style: "", eyebrow: "Know something good?", text: "A founder down the street. A product that actually works. Add it to the index.", go: "Add something good", action: "add" },
    { style: "dark", eyebrow: "Try searching", q: "Canadian companies doing good" },
    { style: "soft", eyebrow: "Go deeper", text: "Hidden gems most people have never heard of.", go: "Open new discoveries", href: "#/explore?f=new" },
    { style: "", eyebrow: "Try searching", q: "things fixing loneliness" },
    { style: "dark", eyebrow: "Try searching", q: "companies creating jobs" },
    { style: "soft", eyebrow: "Around the world", text: "Good is happening on every continent. Take the tour.", go: "Go around the world", href: "#/explore?f=world" },
    { style: "", eyebrow: "Try searching", q: "repair instead of replace" }
  ];
  function promptHTML(p) {
    var inner, attr;
    if (p.q) {
      inner = '<p>“' + esc(p.q) + '”</p><span class="go">' + ICON.search + " Search this</span>";
      attr = 'data-query="' + esc(p.q) + '"';
    } else {
      inner = "<p>" + esc(p.text) + '</p><span class="go">' + esc(p.go) + " " + ICON.arrow + "</span>";
      attr = p.action ? 'data-action="' + p.action + '"' : 'data-href="' + p.href + '"';
    }
    return '<article class="card prompt ' + p.style + '" tabindex="0" ' + attr + '><p class="eyebrow">' + esc(p.eyebrow) + "</p>" + inner + "</article>";
  }
  function markerHTML(m) {
    if (m.end) {
      return '<article class="card marker"><div class="big">That\'s all ' + m.size + (m.region ? " in " + esc(m.region) : "") + '.</div>' +
        "<p>For now. We're mapping more of the world every week. Try another region, or tell us what we're missing.</p></article>";
    }
    var round = ["", "", "two", "three", "four", "five"][m.lap + 1] || String(m.lap + 1);
    return '<article class="card marker"><div class="big">That\'s all ' + m.size + '.</div>' +
      "<p>For now. We're adding more good every week. Here's round " + round + ", reshuffled.</p></article>";
  }

  function resultHTML(e, top) {
    var tags = e.tags.filter(function (t) { return t !== "founder"; }).slice(0, 3).map(function (t) { return "<span>" + esc(SFG.prettyTag(t)) + "</span>"; }).join("");
    var visit = e.site ? '<a href="https://' + esc(e.site) + '" target="_blank" rel="noopener" data-stop>' + (e.type === "person" ? "Their work" : "Visit") + " " + ICON.ext + "</a>" : "";
    return '<article class="result' + (top ? " top" : "") + (e.type === "person" ? " is-person" : "") + '" tabindex="0" data-open="' + e.id + '" data-cat="' + e.cat + '">' +
      (top ? '<span class="top-label">Top result</span>' : "") +
      '<div class="thumb">' + logoTile(e) + "</div><div>" + metaLine(e) +
      "<h3>" + esc(e.name) + "</h3>" + '<p class="tagline">' + esc(e.tagline) + "</p>" +
      '<div class="why"><b>Why it\'s here</b>' + esc(e.why) + "</div>" +
      '<div class="actions">' + where(e) + signal(e) + '<span class="tagrow">' + tags + "</span>" + visit +
      '<a href="#" data-open-link="' + e.id + '">Explore ' + ICON.arrow + "</a></div></div>" + saveBtn(e) + "</article>";
  }
  function miniHTML(e) {
    return '<button class="mini' + (e.type === "person" ? " is-person" : "") + '" type="button" data-open="' + e.id + '" data-cat="' + e.cat + '">' + logoTile(e) +
      "<span><b>" + esc(e.name) + "</b><small>" + esc(e.role || e.kind) + "</small></span></button>";
  }
  function relHTML(e) {
    return '<button class="rel' + (e.type === "person" ? " is-person" : "") + '" type="button" data-open="' + e.id + '" data-cat="' + e.cat + '">' +
      '<div class="cover">' + orbs(e) + logoTile(e) + '</div><div class="rb">' + metaLine(e) + "<b>" + esc(e.name) + "</b><small>" + esc(e.tagline) + "</small></div></button>";
  }

  /* ======================================================================
     Masonry with endless loading
     ====================================================================== */
  function Masonry(host) {
    this.host = host;
    this.items = [];
    this.cols = [];
    this.n = 0;
    this.layout();
  }
  Masonry.prototype.count = function () {
    var w = this.host.clientWidth || window.innerWidth;
    return w >= 1180 ? 4 : w >= 860 ? 3 : w >= 540 ? 2 : 1;
  };
  Masonry.prototype.layout = function () {
    var n = this.count();
    if (n === this.n) return;
    this.n = n;
    this.host.innerHTML = "";
    this.host.classList.add("masonry");
    this.cols = [];
    for (var i = 0; i < n; i++) { var c = document.createElement("div"); c.className = "col"; this.host.appendChild(c); this.cols.push(c); }
    var items = this.items; this.items = [];
    items.forEach(function (node) { node.style.animation = "none"; this.add(node); }, this);
  };
  Masonry.prototype.add = function (node) {
    var best = this.cols[0];
    this.cols.forEach(function (c) { if (c.offsetHeight < best.offsetHeight - 4) best = c; });
    best.appendChild(node);
    this.items.push(node);
  };
  var masonries = [];
  window.addEventListener("resize", function () {
    clearTimeout(window.__mz);
    window.__mz = setTimeout(function () { masonries.forEach(function (m) { if (m.host.isConnected) m.layout(); }); }, 120);
  });

  var observers = [];
  function onReach(sentinel, cb) {
    // Keep loading while the sentinel is still near the viewport, so fast
    // scrolling never strands the reader at a spinner.
    function pump(n) {
      if (!sentinel.isConnected) return;
      if (sentinel.getBoundingClientRect().top < window.innerHeight + 900 && n < 6) { cb(); requestAnimationFrame(function () { pump(n + 1); }); }
    }
    var io = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) pump(0); }); }, { rootMargin: "900px 0px" });
    io.observe(sentinel);
    observers.push(io);
    return io;
  }
  function teardown() { observers.forEach(function (o) { o.disconnect(); }); observers = []; masonries = []; }

  /**
   * Fill a masonry host from an endless stream, interleaving prompt cards.
   * `skip` lets the results page avoid repeating what was just shown.
   */
  function endlessFeed(host, sentinel, stream, opts) {
    opts = opts || {};
    var m = new Masonry(host);
    masonries.push(m);
    var shown = 0, pIdx = opts.promptOffset || 0, skip = opts.skip || null, guard = 0;
    function more() {
      if (!host.isConnected) return;
      var batch = stream.next(12);
      batch.forEach(function (item) {
        if (item.marker) { if (!skip) m.add(el(markerHTML(item))); return; }
        if (skip && skip.has(item.id) && guard < 400) { guard++; return; }
        m.add(el(cardHTML(item)));
        shown++;
        if (opts.prompts !== false && shown % 9 === 5) m.add(el(promptHTML(PROMPTS[pIdx++ % PROMPTS.length])));
      });
      if (skip && guard >= 400) skip = null;
    }
    more(); more();
    onReach(sentinel, more);
  }

  /* ======================================================================
     Search box behaviour (autocomplete, keyboard)
     ====================================================================== */
  function bindSearch(form, input, box) {
    var sel = -1, items = [];
    function render() {
      var q = input.value;
      items = q.trim() ? SFG.suggest(q) : SFG.EXAMPLES.slice(0, 6).map(function (x) { return { kind: "query", q: x }; });
      sel = -1;
      if (!items.length) { box.hidden = true; return; }
      var html = q.trim() ? "" : '<div class="s-head">Popular searches</div>';
      html += items.map(function (it, i) {
        if (it.kind === "entity") {
          var e = it.e;
          return '<button type="button" role="option" data-i="' + i + '" data-cat="' + e.cat + '"><span class="s-ic">' + logoTile(e).replace('class="logo-tile"', 'class="logo-tile" style="position:static;width:32px;height:32px;box-shadow:none;border-radius:9px"') +
            '</span><span><span class="s-label">' + esc(e.name) + '</span><span class="s-sub">' + esc(TYPES[e.type] + " · " + CAT[e.cat].label + " · " + (e.role || e.kind)) + "</span></span></button>";
        }
        return '<button type="button" role="option" data-i="' + i + '"><span class="s-ic">' + ICON.search + '</span><span class="s-label">' + esc(it.q) + "</span></button>";
      }).join("");
      box.innerHTML = html;
      box.hidden = false;
    }
    function choose(i) {
      var it = items[i];
      box.hidden = true;
      if (!it) return;
      if (it.kind === "entity") { input.blur(); openDetail(it.e.id); }
      else { input.value = it.q; go("#/search?q=" + encodeURIComponent(it.q)); }
    }
    function highlight() {
      box.querySelectorAll("button").forEach(function (b, i) { b.setAttribute("aria-selected", i === sel ? "true" : "false"); });
    }
    input.addEventListener("input", render);
    input.addEventListener("focus", render);
    input.addEventListener("blur", function () { setTimeout(function () { box.hidden = true; }, 160); });
    input.addEventListener("keydown", function (ev) {
      if (box.hidden) return;
      if (ev.key === "ArrowDown") { sel = Math.min(sel + 1, items.length - 1); highlight(); ev.preventDefault(); }
      else if (ev.key === "ArrowUp") { sel = Math.max(sel - 1, -1); highlight(); ev.preventDefault(); }
      else if (ev.key === "Escape") { box.hidden = true; }
      else if (ev.key === "Enter" && sel >= 0) { ev.preventDefault(); choose(sel); }
    });
    box.addEventListener("mousedown", function (ev) {
      var b = ev.target.closest("button[data-i]");
      if (b) { ev.preventDefault(); choose(+b.getAttribute("data-i")); }
    });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var q = input.value.trim();
      box.hidden = true;
      input.blur();
      if (q) go("#/search?q=" + encodeURIComponent(q));
    });
  }
  bindSearch(document.getElementById("topSearch"), document.querySelector("#topSearch input"), document.querySelector("#topSearch .suggest"));

  /* ======================================================================
     Views
     ====================================================================== */
  var heroObserver = null;

  function viewHome(params, scrollToFeed) {
    var count = SFG.DATA.length;
    var countries = new Set(SFG.DATA.map(function (e) { return e.country; })).size;
    var sparkles = "";
    for (var i = 0; i < 14; i++) {
      var h = hash("s" + i), s = 10 + (h % 22);
      sparkles += '<span style="left:' + (h % 96) + "%;top:" + ((h >> 8) % 90) + "%;width:" + s + "px;height:" + s + "px;animation-delay:" + ((h >> 4) % 60) / 10 + 's">' + ICON.spark + "</span>";
    }
    main.innerHTML =
      '<section class="hero" id="hero"><div class="hero-sparkles" aria-hidden="true">' + sparkles + "</div><div class=\"hero-inner\">" +
      '<div class="pill">' + ICON.spark.replace('class="sparkle"', 'class="sparkle" style="width:13px;height:13px"') + " Find good. Do good.</div>" +
      "<h1>Search for <em>the good.</em></h1>" +
      '<p class="lede">There are people, products, and projects all over the world quietly making things better. Most of them you\'ve never heard of. Go find them.</p>' +
      '<form class="big-search" id="heroSearch" role="search" autocomplete="off"><div class="field">' + ICON.spark +
      '<input type="search" name="q" aria-label="What are you looking for?" placeholder="What are you looking for?" />' +
      '<button class="btn btn-grad" type="submit">' + ICON.search + "<span>Search</span></button></div>" +
      '<div class="suggest" role="listbox" hidden></div></form>' +
      '<div class="try"><span>Try</span>' +
      ["companies helping people sleep better", "sustainable clothing brands", "climate solutions that actually exist", "Canadian companies doing good", "companies creating jobs"]
        .map(function (q) { return '<button type="button" data-query="' + esc(q) + '">' + esc(q) + "</button>"; }).join("") + "</div>" +
      '<div class="hero-cats">' + Object.keys(CAT).map(function (c) { return '<a href="#/explore?f=' + c + '"><i></i>' + CAT[c].label + "</a>"; }).join("") + "</div>" +
      '<div class="hero-meta">' + count + " good things across " + countries + " countries, and counting.</div>" +
      "</div></section>" +
      '<section class="wrap" id="feed"><div class="feed-head"><div><h2>Explore the good</h2><p>Scroll as long as you like. There\'s always another one.</p></div></div>' +
      '<div class="tabs" role="tablist" id="tabs"></div><div id="feedIntro"></div><div id="subtabs"></div><div id="feedGrid"></div><div class="loader" id="sentinel"><span class="spin"></span>Finding more good…</div></section>';

    var form = document.getElementById("heroSearch");
    var input = form.querySelector("input");
    bindSearch(form, input, form.querySelector(".suggest"));
    typewriter(input);

    // Transparent top bar while the hero is under it.
    document.body.classList.add("on-hero");
    heroObserver = new IntersectionObserver(function (en) {
      document.body.classList.toggle("on-hero", en[0].isIntersecting);
    }, { rootMargin: "-" + (topbar.offsetHeight + 10) + "px 0px 0px 0px", threshold: 0 });
    heroObserver.observe(document.getElementById("hero"));

    renderFeed(params.f || "foryou", params.r || "");
    if (scrollToFeed) requestAnimationFrame(function () {
      var y = document.getElementById("feed").getBoundingClientRect().top + window.scrollY - topbar.offsetHeight + 10;
      window.scrollTo({ top: y, behavior: "auto" });
    });
  }

  function renderFeed(key, region) {
    observers.forEach(function (o) { o.disconnect(); }); observers = []; masonries = [];
    var feeds = SFG.FEEDS;
    var order = ["foryou", "new", "world", "people", "health", "planet", "community", "opportunity"];
    document.getElementById("tabs").innerHTML = order.map(function (k) {
      var dot = CAT[k] ? '<i class="dot-' + k + '"></i>' : "";
      return '<button class="tab' + (k === key ? " active" : "") + '" role="tab" aria-selected="' + (k === key) + '" data-tab="' + k + '">' + dot + esc(feeds[k].label) + "</button>";
    }).join("");
    var f = feeds[key] || feeds.foryou;
    document.getElementById("feedIntro").innerHTML = '<div class="feed-intro"><h3>' + esc(f.title) + "</h3><p>" + esc(f.sub) + "</p></div>";
    document.getElementById("subtabs").innerHTML = key === "world"
      ? '<div class="subtabs">' + ['<button class="tab' + (!region ? " active" : "") + '" data-region="">Everywhere</button>'].concat(SFG.REGIONS.map(function (r) {
          return '<button class="tab' + (region === r ? " active" : "") + '" data-region="' + r + '">' + r + "</button>";
        })).join("") + "</div>"
      : "";
    var grid = document.getElementById("feedGrid");
    grid.innerHTML = "";
    endlessFeed(grid, document.getElementById("sentinel"), SFG.stream(key, region), { promptOffset: hash(key) % PROMPTS.length });
    var url = "#/explore?f=" + key + (region ? "&r=" + encodeURIComponent(region) : "");
    if (location.hash.indexOf("#/explore") === 0 || key !== "foryou") history.replaceState(null, "", url);
    lastViewKey = viewKey(parseHash());
  }

  function typewriter(input) {
    var list = SFG.EXAMPLES.slice(0, 14), i = 0, j = 0, dir = 1, wait = 0;
    var t = setInterval(function () {
      if (!input.isConnected) return clearInterval(t);
      if (document.activeElement === input || input.value) { input.placeholder = "What are you looking for?"; return; }
      if (wait > 0) { wait--; return; }
      var s = list[i];
      j += dir;
      input.placeholder = s.slice(0, j) + (j < s.length ? "" : "");
      if (j >= s.length) { dir = -1; wait = 28; }
      if (j <= 0) { dir = 1; i = (i + 1) % list.length; wait = 4; }
    }, 55);
  }

  function viewSearch(params) {
    var q = params.q || "";
    var filters = { cat: params.cat, type: params.type, place: params.place, tag: params.tag, buy: params.buy };
    var base = SFG.search(q, { cat: params.cat, place: params.place, tag: params.tag, buy: params.buy });
    var res = filters.type ? SFG.search(q, filters) : base;
    var results = res.results;
    document.querySelector("#topSearch input").value = q;
    document.title = (q ? q + " — " : "") + "Search for the Good";

    var typeCounts = { brand: 0, project: 0, person: 0 };
    base.results.forEach(function (e) { typeCounts[e.type]++; });

    function link(changes) {
      var p = Object.assign({}, params, changes);
      delete p.open;
      return "#/search?" + Object.keys(p).filter(function (k) { return p[k]; }).map(function (k) { return k + "=" + encodeURIComponent(p[k]); }).join("&");
    }

    var active = [];
    if (params.cat) active.push({ k: "cat", label: CAT[params.cat] ? CAT[params.cat].label : params.cat });
    if (params.tag) active.push({ k: "tag", label: SFG.prettyTag(params.tag) });
    if (params.place) active.push({ k: "place", label: (SFG.FLAGS[params.place] || "") + " " + (SFG.COUNTRIES[params.place] || params.place) });
    if (params.buy) active.push({ k: "buy", label: "Can buy or join" });

    var readAs = res.interpretation.length
      ? '<div class="read-as"><span class="chip-label">We read this as</span>' + res.interpretation.map(function (b) {
          return '<span class="chip soft">' + (b.kind === "cat" ? '<i class="dot-' + b.value + '"></i>' : "") + esc(b.label) + "</span>";
        }).join("") + "</div>"
      : "";
    var chips = '<div class="chips">' +
      active.map(function (a) { var c = {}; c[a.k] = ""; return '<a class="chip active" href="' + link(c) + '">' + esc(a.label) + " " + ICON.x + "</a>"; }).join("") +
      res.refinements.slice(0, 12).map(function (r) {
        var c = {}; c[r.key] = r.value;
        var dot = r.key === "cat" ? '<i class="dot-' + r.value + '"></i>' : "";
        return '<a class="chip" href="' + link(c) + '">' + dot + esc(r.label) + (r.count ? ' <span class="n">' + r.count + "</span>" : "") + "</a>";
      }).join("") + "</div>";
    var total = base.results.length;
    var seg = total ? '<div class="seg" role="tablist">' +
      [["", "All", total], ["brand", "Brands", typeCounts.brand], ["project", "Projects", typeCounts.project], ["person", "People", typeCounts.person]]
        .filter(function (s) { return s[0] === "" || s[2] > 0 || params.type === s[0]; })
        .map(function (s) { return '<button type="button" class="' + ((params.type || "") === s[0] ? "active" : "") + '" data-href="' + link({ type: s[0] }) + '">' + s[1] + '<span class="n">' + s[2] + "</span></button>"; }).join("") +
      "</div>" : "";

    var headline = q
      ? (results.length ? results.length + " good thing" + (results.length === 1 ? "" : "s") + " for <q>" + esc(q) + "</q>" : "Nothing yet for <q>" + esc(q) + "</q>")
      : "Everything good";

    // Right rail: people connected to these results, and nearby searches.
    var ids = new Set(results.map(function (e) { return e.id; }));
    var people = [];
    results.slice(0, 12).forEach(function (e) {
      SFG.linkedTo(e).forEach(function (p) { if (p.type === "person" && !ids.has(p.id) && people.indexOf(p) < 0) people.push(p); });
    });
    var nearby = SFG.EXAMPLES.filter(function (x) { return x.toLowerCase() !== q.toLowerCase(); });
    nearby = SFG.shuffle(nearby, q).slice(0, 5);

    main.innerHTML = '<div class="wrap results-page"><div class="results-head"><p class="eyebrow">Search results</p><h1>' + headline + "</h1>" + readAs + chips + "</div>" + seg +
      '<div class="results-layout"><div><div class="results-list" id="resultsList"></div><div id="afterResults"></div></div>' +
      '<aside class="rail">' +
      (people.length ? '<div class="panel"><h4>People behind these</h4>' + people.slice(0, 4).map(miniHTML).join("") + "</div>" : "") +
      '<div class="panel"><h4>Keep searching</h4><div class="chips" style="margin:0">' + nearby.map(function (x) { return '<button class="chip" type="button" data-query="' + esc(x) + '">' + esc(x) + "</button>"; }).join("") + "</div></div>" +
      '<div class="panel grad"><h4>Missing something?</h4><p>Know someone doing good that should be here?</p><button class="btn" type="button" data-action="add">Add it ' + ICON.arrow + "</button></div>" +
      "</aside></div>" +
      '<div id="moreHost"></div><div class="loader" id="sentinel"><span class="spin"></span>Finding more good…</div></div>';

    var list = document.getElementById("resultsList");
    var after = document.getElementById("afterResults");
    if (!results.length) {
      list.innerHTML = '<div class="empty"><div class="big-emoji">' + ICON.spark + "</div><h2>Good exists here too. We just haven't found it yet.</h2>" +
        "<p>We're still mapping this corner of the world. Try a broader search, one of these, or tell us what we're missing.</p>" +
        '<div class="chips">' + SFG.EXAMPLES.slice(0, 6).map(function (x) { return '<button class="chip" type="button" data-query="' + esc(x) + '">' + esc(x) + "</button>"; }).join("") + "</div></div>";
    }
    var i = 0, PAGE = 8, finished = false;
    function more() {
      if (finished || !list.isConnected) return;
      var slice = results.slice(i, i + PAGE);
      slice.forEach(function (e, k) { list.appendChild(el(resultHTML(e, i + k === 0 && q && !params.type))); });
      i += slice.length;
      if (i >= results.length) {
        finished = true;
        if (results.length) after.innerHTML = '<div class="end-note"><div class="big">That\'s everything for now.</div><p>But there\'s more good where that came from — keep scrolling.</p></div>';
        document.getElementById("moreHost").innerHTML = '<div class="divider-title">Keep exploring</div><div id="moreGrid"></div>';
        endlessFeed(document.getElementById("moreGrid"), document.getElementById("sentinel"), SFG.stream("foryou"), { skip: ids, promptOffset: 2 });
      }
    }
    more();
    onReach(document.getElementById("sentinel"), more);
  }

  function viewSaved(params) {
    var shared = params.ids ? params.ids.split(",").filter(function (id) { return SFG.byId(id); }) : null;
    var ids = shared || saved;
    var title = shared ? "A list someone shared with you" : "Your saved good";
    var sub = shared
      ? ids.length + " things someone thought you should know about. Save the ones you like."
      : ids.length ? ids.length + " thing" + (ids.length === 1 ? "" : "s") + " worth coming back to." : "";
    main.innerHTML = '<div class="wrap"><div class="page-head"><p class="eyebrow">' + (shared ? "Shared list" : "Saved") + "</p><h1>" + title + "</h1><p>" + sub + "</p>" +
      (!shared && ids.length ? '<div class="chips"><button class="chip" type="button" data-action="share-list">' + ICON.share + " Share this list</button></div>" : "") +
      '</div><div id="savedGrid"></div><div id="savedAfter"></div><div class="loader" id="sentinel" style="visibility:hidden"></div></div>';
    var grid = document.getElementById("savedGrid");
    if (!ids.length) {
      grid.innerHTML = '<div class="empty"><div class="big-emoji">' + ICON.heart + "</div><h2>Nothing saved yet.</h2>" +
        "<p>Tap the heart on anything that makes you go “wait, that exists?” and it'll live here.</p>" +
        '<a class="btn btn-grad" href="#/explore">Start exploring ' + ICON.arrow + "</a></div>";
      return;
    }
    var m = new Masonry(grid);
    masonries.push(m);
    ids.forEach(function (id) { m.add(el(cardHTML(SFG.byId(id)))); });
    // Suggest what to explore next, based on what's saved.
    var recs = [], seen = new Set(ids);
    ids.slice(0, 6).forEach(function (id) { SFG.related(SFG.byId(id), 4).forEach(function (r) { if (!seen.has(r.id)) { seen.add(r.id); recs.push(r); } }); });
    if (recs.length) {
      document.getElementById("savedAfter").innerHTML = '<div class="divider-title">Because you saved these</div><div id="recGrid"></div>';
      var rm = new Masonry(document.getElementById("recGrid"));
      masonries.push(rm);
      recs.slice(0, 8).forEach(function (r) { rm.add(el(cardHTML(r))); });
    }
  }

  function viewAbout() {
    main.innerHTML =
      '<section class="about-hero"><p class="eyebrow" style="color:rgba(255,255,255,.85)">About</p><h1>Good exists everywhere. It\'s just hard to find.</h1>' +
      "<p>Search for the Good is a search engine for the people, products, brands, and projects making the world better.</p></section>" +
      '<div class="manifesto">' +
      "<h2>Why this exists</h2>" +
      "<p>Try searching the internet for the good stuff. You'll get ads, SEO, and whatever's most popular. Scroll a feed and you'll get whatever makes you angriest. Turn on the news and you'll get what went wrong today.</p>" +
      '<div class="contrast"><div><b>Search engines</b><span>optimize for ads.</span></div><div><b>Social feeds</b><span>optimize for outrage.</span></div><div><b>The news</b><span>optimizes for conflict.</span></div></div>' +
      "<p>Meanwhile, somewhere right now, someone is fixing a broken toaster for a stranger. A company is turning plastic into income. A founder is training grandmothers to become solar engineers. A runner is detouring to visit a lonely neighbour.</p>" +
      "<p>That's the stuff we want to be able to find. So we're building a place to search for it.</p>" +
      "<h2>Four ways to make things better</h2>" +
      '<div class="cat-grid">' + Object.keys(CAT).map(function (c) {
        return '<a class="cat-card ' + c + '" href="#/explore?f=' + c + '"><h3>' + CAT[c].label + "</h3><p>" + esc(CAT[c].blurb) + "</p></a>";
      }).join("") + "</div>" +
      "<h2>What makes the cut</h2>" +
      '<ul class="rules yes">' +
      ["It's real. A real person, product, brand, or project you can look up today.", "It's tangible. It does something useful you can point to, not just a statement about values.",
        "It's worth knowing about. The kind of thing that makes you say “wait, that exists?”"].map(function (r) { return "<li>" + ICON.check + "<span>" + r + "</span></li>"; }).join("") +
      "</ul><p>And what doesn't:</p>" +
      '<ul class="rules no">' +
      ["Political campaigns, partisan causes, and culture-war content.", "Slogans, inspirational quotes, and corporate purpose statements with nothing behind them.",
        "Paid placement. Nobody can buy their way in, or buy a better rank."].map(function (r) { return "<li>" + ICON.minus + "<span>" + r + "</span></li>"; }).join("") +
      "</ul>" +
      "<h2>How results are ranked</h2>" +
      "<p>No goodness score. We don't think you can boil a company down to a number, and we're suspicious of anyone who says they can. Results are ranked by how well they match what you asked for, what kind of good you're looking for, where, and whether it's something you can buy or join. Then we nudge hidden gems up, because the point is discovery.</p>" +
      "<h2>The fine print</h2>" +
      "<p>Everything here is independently surfaced as an example. Search for the Good isn't affiliated with, endorsed by, or partnered with anyone listed, and inclusion isn't a certification or a guarantee. Companies change; always check the source before you act. If something here is wrong, tell us and we'll fix it.</p>" +
      "</div>" +
      '<section class="closer"><h2>Find good.<br>Do good.</h2><a class="btn btn-grad" href="#/explore" style="height:52px;padding:0 28px;font-size:16px">Go find something ' + ICON.arrow + "</a></section>";
  }

  /* ======================================================================
     Detail drawer
     ====================================================================== */
  function renderDetail(e) {
    var linked = SFG.linkedTo(e);
    var rel = SFG.related(e, 4);
    var areas = '<div class="areas">' + Object.keys(CAT).map(function (c) {
      var on = e.areas.indexOf(c) >= 0;
      return '<div class="area ' + c + (on ? " on" : "") + (e.cat === c ? " primary" : "") + '"><i></i>' + CAT[c].label + "</div>";
    }).join("") + "</div>";
    var founders = (e.founders || []).map(function (f) {
      var p = linked.filter(function (x) { return x.type === "person" && x.name === f; })[0];
      return p ? '<a href="#" data-open-link="' + p.id + '">' + esc(f) + "</a>" : esc(f);
    }).join(", ");
    var facts = [["Where", (SFG.FLAGS[e.country] || "") + " " + esc(e.city === SFG.COUNTRIES[e.country] ? e.city : e.city + ", " + SFG.COUNTRIES[e.country])],
      ["Type", esc(TYPES[e.type] + " · " + e.kind)]];
    if (e.founded) facts.push(["Started", e.founded]);
    if (founders) facts.push([e.founders.length > 1 ? "Founders" : "Founder", founders]);
    if (e.role) facts.push(["Known for", esc(e.role)]);
    facts.push(["Discovery", DISCOVERY[e.discovery]]);
    if (e.buyable) facts.push(["Get involved", e.type === "brand" ? "You can buy or use this" : "You can join or take part"]);

    var visit = e.site ? '<a class="btn btn-grad" href="https://' + esc(e.site) + '" target="_blank" rel="noopener">' + (e.type === "person" ? "See their work" : "Visit website") + " " + ICON.ext + "</a>" : "";
    var html =
      '<div data-cat="' + e.cat + '"><div class="d-hero cover' + (e.type === "person" ? " is-person" : "") + '"><div class="clip">' + orbs(e) + "</div>" + logoTile(e) + "</div>" +
      '<div class="d-main">' + metaLine(e) + "<h2 id=\"dTitle\">" + esc(e.name) + "</h2>" + '<p class="tagline">' + esc(e.tagline) + "</p>" +
      '<div class="d-actions">' + visit +
      '<button class="btn btn-ghost' + (isSaved(e.id) ? " on" : "") + '" type="button" data-save="' + e.id + '">' + ICON.heart + "<span>" + (isSaved(e.id) ? "Saved" : "Save") + "</span></button>" +
      '<button class="btn btn-ghost" type="button" data-action="share" data-id="' + e.id + '">' + ICON.share + "<span>Share</span></button></div>" +
      '<div class="d-section"><h4>Why it\'s interesting</h4><div class="callout"><p>' + esc(e.why) + "</p></div></div>" +
      '<div class="d-section"><h4>' + (e.type === "person" ? "Their story" : "What they do") + "</h4><p>" + esc(e.about) + "</p></div>" +
      '<div class="d-section"><h4>Impact areas</h4>' + areas + "</div>" +
      '<div class="d-section"><h4>At a glance</h4><dl class="facts">' + facts.map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + f[1] + "</dd></div>"; }).join("") + "</dl></div>" +
      (linked.length ? '<div class="d-section"><h4>' + (e.type === "person" ? "What they're building" : "The people behind it") + "</h4>" + linked.map(miniHTML).join("") + "</div>" : "") +
      '<div class="d-section"><h4>Explore related</h4><div class="chips" style="margin:0">' +
      e.tags.filter(function (t) { return t !== "founder"; }).slice(0, 6).map(function (t) { return '<a class="chip" href="#/search?q=' + encodeURIComponent(SFG.prettyTag(t).toLowerCase()) + '">' + esc(SFG.prettyTag(t)) + "</a>"; }).join("") + "</div></div>" +
      '<div class="d-section"><h4>If you like this, explore these</h4><div class="related-grid">' + rel.map(relHTML).join("") + "</div></div>" +
      '<p class="fine disclaimer">Independently surfaced as an example of real-world good. Search for the Good is not affiliated with, endorsed by, or partnered with ' + esc(e.name) + ". Details may have changed — check the source.</p>" +
      "</div></div>";
    drawerBody.innerHTML = html;
    drawerBody.scrollTop = 0;
    drawer.querySelector(".drawer-panel").setAttribute("aria-labelledby", "dTitle");
  }

  var lastFocus = null;
  function showDrawer(id) {
    var e = SFG.byId(id);
    if (!e) return hideDrawer();
    renderDetail(e);
    if (!drawer.classList.contains("open")) {
      lastFocus = document.activeElement;
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      setTimeout(function () { drawer.querySelector(".drawer-close").focus({ preventScroll: true }); }, 50);
    }
    document.title = e.name + " — Search for the Good";
  }
  function hideDrawer() {
    if (!drawer.classList.contains("open")) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.isConnected) lastFocus.focus({ preventScroll: true });
  }
  // Each drawer open is a history entry, so Back closes it (or steps back
  // through related items). history.state.d counts how deep we are.
  function depth() { return (history.state && history.state.d) || 0; }
  function openDetail(id) {
    var r = parseHash();
    r.params.open = id;
    history.pushState({ d: depth() + 1 }, "", buildHash(r));
    route();
  }
  function closeDetail() {
    var d = depth();
    if (d > 0) { history.go(-d); return; }
    var r = parseHash();
    delete r.params.open;
    history.replaceState(null, "", buildHash(r));
    route();
  }

  /* ======================================================================
     Add-something-good modal
     ====================================================================== */
  function openAdd() {
    addModal.classList.add("open");
    addModal.setAttribute("aria-hidden", "false");
    setTimeout(function () { addModal.querySelector("input").focus(); }, 60);
  }
  function closeAdd() {
    addModal.classList.remove("open");
    addModal.setAttribute("aria-hidden", "true");
  }
  document.getElementById("addForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = Object.fromEntries(new FormData(ev.target).entries());
    data.at = new Date().toISOString();
    try {
      var list = JSON.parse(localStorage.getItem("sftg.submissions.v1") || "[]");
      list.push(data);
      localStorage.setItem("sftg.submissions.v1", JSON.stringify(list));
    } catch (e) { /* ignore */ }
    ev.target.reset();
    closeAdd();
    toast("Got it — thanks for adding to the good. ✦");
  });

  /* ======================================================================
     Routing
     ====================================================================== */
  function parseHash() {
    var h = location.hash.replace(/^#/, "") || "/";
    var qi = h.indexOf("?");
    var path = qi >= 0 ? h.slice(0, qi) : h;
    var params = {};
    if (qi >= 0) new URLSearchParams(h.slice(qi + 1)).forEach(function (v, k) { params[k] = v; });
    return { path: path || "/", params: params };
  }
  function buildHash(r) {
    var keys = Object.keys(r.params).filter(function (k) { return r.params[k] !== undefined && r.params[k] !== ""; });
    return "#" + r.path + (keys.length ? "?" + keys.map(function (k) { return k + "=" + encodeURIComponent(r.params[k]); }).join("&") : "");
  }
  function viewKey(r) {
    var p = Object.assign({}, r.params); delete p.open;
    if (r.path === "/explore" || r.path === "/") return "home";
    return r.path + "?" + JSON.stringify(p);
  }
  function go(h) { location.hash = h; }

  var lastViewKey = null;
  function route() {
    var r = parseHash();
    var key = viewKey(r);
    if (key !== lastViewKey) {
      var prev = lastViewKey;
      lastViewKey = key;
      teardown();
      if (heroObserver) { heroObserver.disconnect(); heroObserver = null; }
      document.body.classList.remove("on-hero");
      document.title = "Search for the Good";
      document.querySelectorAll("[data-nav]").forEach(function (a) {
        var n = a.getAttribute("data-nav");
        a.classList.toggle("active", (n === "explore" && r.path === "/explore") || "/" + n === r.path);
      });
      if (r.path === "/search") viewSearch(r.params);
      else if (r.path === "/saved") viewSaved(r.params);
      else if (r.path === "/about") viewAbout();
      else viewHome(r.params, r.path === "/explore");
      if (r.path !== "/explore" && !(prev === null && r.params.open)) window.scrollTo(0, 0);
      if (r.path !== "/search") document.querySelector("#topSearch input").value = "";
      syncSaves();
    } else if (key === "home" && r.path === "/explore" && !r.params.open && !drawer.classList.contains("open")) {
      var f = r.params.f || "foryou";
      var active = document.querySelector("#tabs .tab.active");
      if (!active || active.getAttribute("data-tab") !== f) renderFeed(f, r.params.r || "");
      var feed = document.getElementById("feed");
      if (feed) window.scrollTo({ top: feed.getBoundingClientRect().top + window.scrollY - topbar.offsetHeight + 10, behavior: "smooth" });
    }
    if (r.params.open) showDrawer(r.params.open);
    else { hideDrawer(); if (r.path !== "/search") document.title = "Search for the Good"; }
  }
  window.addEventListener("hashchange", route);

  /* ======================================================================
     Global event delegation
     ====================================================================== */
  document.addEventListener("click", function (ev) {
    var t = ev.target;
    var save = t.closest("[data-save]");
    if (save) { ev.preventDefault(); ev.stopPropagation(); toggleSave(save.getAttribute("data-save"), save); return; }
    if (t.closest("[data-stop]")) return;
    var openLink = t.closest("[data-open-link]");
    if (openLink) { ev.preventDefault(); openDetail(openLink.getAttribute("data-open-link")); return; }
    var act = t.closest("[data-action]");
    if (act) {
      var a = act.getAttribute("data-action");
      if (a === "close") { ev.preventDefault(); closeDetail(); return; }
      if (a === "add") { ev.preventDefault(); openAdd(); return; }
      if (a === "close-add") { ev.preventDefault(); closeAdd(); return; }
      if (a === "share") {
        var url = location.href.split("#")[0] + "#/explore?open=" + act.getAttribute("data-id");
        copy(url, "Link copied — go spread some good.");
        return;
      }
      if (a === "share-list") {
        copy(location.href.split("#")[0] + "#/saved?ids=" + saved.join(","), "Link to your list copied.");
        return;
      }
    }
    var q = t.closest("[data-query]");
    if (q) { ev.preventDefault(); go("#/search?q=" + encodeURIComponent(q.getAttribute("data-query"))); return; }
    var href = t.closest("[data-href]");
    if (href) { ev.preventDefault(); go(href.getAttribute("data-href")); return; }
    var tab = t.closest("[data-tab]");
    if (tab) { renderFeed(tab.getAttribute("data-tab"), ""); scrollFeedTop(); return; }
    var region = t.closest("[data-region]");
    if (region) { renderFeed("world", region.getAttribute("data-region")); return; }
    var open = t.closest("[data-open]");
    if (open && !t.closest("a[href]")) { ev.preventDefault(); openDetail(open.getAttribute("data-open")); }
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") {
      if (addModal.classList.contains("open")) return closeAdd();
      if (drawer.classList.contains("open")) return closeDetail();
    }
    if ((ev.key === "Enter" || ev.key === " ") && ev.target.matches && ev.target.matches("article[tabindex]")) {
      ev.preventDefault();
      ev.target.click();
    }
    if (ev.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) {
      ev.preventDefault();
      var hero = document.querySelector("#heroSearch input");
      var heroVisible = hero && hero.getBoundingClientRect().bottom > topbar.offsetHeight;
      (heroVisible ? hero : document.querySelector("#topSearch input")).focus();
    }
  });
  function scrollFeedTop() {
    var feed = document.getElementById("feed");
    if (!feed) return;
    var y = feed.getBoundingClientRect().top + window.scrollY - topbar.offsetHeight + 10;
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
  }
  function copy(text, msg) {
    var done = function () { toast(msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    ta.remove();
  }

  route();
})();
