# Search for the Good

**Find good. Do good.**

A search engine for the people, products, brands, and projects making the world better.

Search engines optimize for ads. Feeds optimize for outrage. The news optimizes for what went wrong. Search for the Good is built for the opposite: a beautiful place to search specifically for the good stuff — and keep finding more.

> Good exists everywhere. It's just hard to find.

---

## What's in the prototype

| | |
|---|---|
| **Search-first home** | One giant search box over the brand gradient, with rotating example queries and one-tap suggestions. |
| **Natural-language search** | "companies helping people sleep better", "Canadian companies doing good", "things helping the planet that I can actually buy" — all answered locally, no API. |
| **"We read this as…"** | The results page shows how a query was interpreted (category, place, buyable, people) and offers refinement chips built from the results themselves. |
| **Endless discovery feed** | For You · New Discoveries · Around the World · People · Health · Planet · Community · Opportunity. Masonry cards with infinite loading. When you've seen everything, it says so honestly and reshuffles. |
| **Detail drawer** | Why it's interesting, what they do, impact areas, at-a-glance facts, the people behind it, and "If you like this, explore these" — the discovery loop. Shareable links, Back button closes it. |
| **People** | Founders and builders are first-class results, linked to what they're building. |
| **Saved** | Heart anything. Saved list with "because you saved these" suggestions and a share link. |
| **Add good** | A submission form (stored locally in the prototype). |
| **About** | The manifesto, the four categories, what makes the cut, how ranking works, and the fine print. |

**104 real entries** across 15 countries — well-known names (Patagonia, Khan Academy, Too Good To Go) mixed with hidden gems (parkrun, Barefoot College, Greyston Bakery, Lufa Farms, CarbonCure, Socratica).

Everything listed is independently surfaced as an example. Search for the Good isn't affiliated with, endorsed by, or partnered with anyone listed, and inclusion isn't a certification.

---

## Run it

No build step, no dependencies. Plain HTML, CSS, and JavaScript.

```bash
# any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

You can also just double-click `index.html`.

### Deploy to GitHub Pages

The included workflow (`.github/workflows/pages.yml`) publishes the repo root on every push to `main`. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**. The site will be at `https://<user>.github.io/search-for-the-good/`.

---

## How it's built

```
index.html          app shell: top bar, drawer, add-good modal, footer
css/styles.css      design system + all components (brand gradient, category colours)
js/data.js          the curated dataset (people, projects, brands)
js/search.js        tokenizer, concept expansion, intent detection, ranking, feeds
js/app.js           hash router, views, masonry + infinite scroll, drawer, saves
assets/logo.svg     the sparkle mark
```

### Search

`js/search.js` turns a query into ranked results without any external service:

1. **Normalize** — lowercase, strip accents, light stemming ("healthier" → "healthy", "communities" → "community").
2. **Join concepts** — multi-word ideas become one term: "giving back" → `giveback`, "food waste" → `foodwaste`, "get outside" → `outdoors`.
3. **Pull out intent** — places ("Canadian", "in Europe"), "I can buy", "founders / people building", categories ("planet", "healthier"), "hidden gems".
4. **Expand** — each term pulls in related vocabulary at reduced weight ("cities" → urban, public space, mobility, walkability…).
5. **Score** — weighted matches across name, founders, kind, tags, category, tagline, why-it's-here, description, and location, plus a coverage bonus for matching every term.
6. **Rank & filter** — intent boosts, a relevance floor that trims weak incidental matches, then small nudges for featured items and hidden gems.

There's deliberately **no "goodness score"**.

### Adding an entry

Add an object to `js/data.js`:

```js
{
  id: "repair-cafe", name: "Repair Café", type: "project",   // brand | project | person
  cat: "planet", areas: ["planet", "community"],            // health | community | planet | opportunity
  kind: "Community repair meetups",
  tagline: "Bring your broken toaster. A volunteer will help you fix it.",
  why: "Free, local meetups where neighbours repair things together…",
  about: "The first Repair Café was held in Amsterdam…",
  city: "Amsterdam", country: "NL", region: "Europe", site: "repaircafe.org",
  founded: 2009, founders: ["Martine Postma"],
  tags: ["repair", "circular", "volunteering"],
  discovery: "gem",          // known | rising | gem
  featured: true, buyable: true
}
```

Link a person to what they built with `people: ["person-id"]` on the brand and `links: ["brand-id"]` on the person.

---

## Brand

- **Palette** — the aqua → cyan → blue gradient from the deck (`#3EE0E6 → #3CB4EA → #4285F4`) with a mint accent. Category colours are bright and warm: coral (Health), amber (Community), teal (Planet), violet (Opportunity). No ESG green.
- **Type** — League Spartan for display (wide, confident, letter-spaced caps for labels), Inter for reading.
- **Mark** — a single four-point sparkle in a gradient circle.
- **Voice** — energetic, curious, human. Closer to Yes Theory, How I Built This, and a YC demo day than a sustainability report. Optimistic without being naive; purposeful without being preachy.

---

## What's next

- A real index: crawl + editorial review pipeline, and a submission queue behind "Add good".
- Accounts, synced saves, and public collections ("Canadian climate startups", "Things I bought that made a difference").
- Local discovery ("good near me") and maps.
- Founder profiles that people can claim and update.
- Semantic search (embeddings) layered on the current intent system.
