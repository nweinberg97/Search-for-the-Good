/*
 * Search for the Good — curated prototype dataset.
 *
 * Every entry is a real person, brand, or project, surfaced independently as an
 * example of tangible good. Inclusion is not an endorsement, certification,
 * partnership, or claim of affiliation. Descriptions are editorial summaries
 * written for discovery; always check the source before acting on them.
 *
 * Fields
 *   id         unique slug
 *   type       "brand" | "project" | "person"
 *   cat        primary category: health | community | planet | opportunity
 *   areas      every category this entry touches (includes cat)
 *   kind       short human label ("Food rescue app", "Founder", …)
 *   tagline    one-line description shown on cards
 *   why        "Why it's here": the editorial reason for inclusion
 *   about      "What they do": longer description for the detail view
 *   city, country (ISO-2), region
 *   site       domain (used for the website link and logo)
 *   founded    year, where relevant
 *   founders   display names
 *   people     ids of related person entries
 *   tags       search + refinement tags (lowercase, hyphenated)
 *   discovery  "known" (household name) | "rising" (growing) | "gem" (hidden gem)
 *   featured   surfaced more often in the For You feed
 *   buyable    something an individual can buy, use, or join today
 */
window.SFG = window.SFG || {};

window.SFG.DATA = [
  /* ───────────────────────────── HEALTH ───────────────────────────── */
  {
    id: "headspace", name: "Headspace", type: "brand", cat: "health", areas: ["health"],
    kind: "Meditation app",
    tagline: "Meditation and mindfulness, made approachable for people who never thought they'd meditate.",
    why: "Took a practice that felt intimidating and turned it into a few guided minutes anyone can start with today.",
    about: "Headspace began as a London events company before becoming an app with guided meditations, sleep content, and mindfulness exercises. It has since expanded into mental-health coaching and therapy access through employers and health plans.",
    city: "Santa Monica", country: "US", region: "North America", site: "headspace.com",
    founded: 2010, founders: ["Andy Puddicombe", "Rich Pierson"],
    tags: ["mental-health", "mindfulness", "meditation", "sleep", "stress", "app", "wellbeing"],
    discovery: "known", featured: true, buyable: true
  },
  {
    id: "be-my-eyes", name: "Be My Eyes", type: "brand", cat: "health", areas: ["health", "community"],
    kind: "Accessibility app",
    tagline: "A free app that lets blind and low-vision people borrow a stranger's eyes for a minute.",
    why: "Turns millions of everyday volunteers into on-demand sight assistance, one live video call at a time.",
    about: "Be My Eyes connects blind and low-vision users with sighted volunteers over a live video call to read a label, find a dropped item, or navigate a room. It has added AI-powered visual description and specialized help lines run by companies.",
    city: "Copenhagen", country: "DK", region: "Europe", site: "bemyeyes.com",
    founded: 2015, founders: ["Hans Jørgen Wiberg"],
    tags: ["accessibility", "blind", "low-vision", "volunteering", "app", "disability", "connection"],
    discovery: "rising", featured: true, buyable: true
  },
  {
    id: "zipline", name: "Zipline", type: "brand", cat: "health", areas: ["health", "opportunity"],
    kind: "Drone delivery",
    tagline: "Autonomous drones delivering blood, vaccines, and medicine to places roads don't reach well.",
    why: "Started by flying emergency blood to rural hospitals in Rwanda, proving drone logistics could save time when it matters most.",
    about: "Zipline designs and operates autonomous delivery drones. Its first national service launched in Rwanda in 2016 delivering blood products to hospitals, then expanded to Ghana and other countries, and now also delivers consumer and healthcare orders in the United States.",
    city: "South San Francisco", country: "US", region: "North America", site: "flyzipline.com",
    founded: 2014, founders: ["Keller Rinaudo Cliffton"],
    tags: ["healthcare-access", "medical", "logistics", "drones", "rural", "africa", "technology"],
    discovery: "rising", featured: true, buyable: false
  },
  {
    id: "aravind", name: "Aravind Eye Care System", type: "project", cat: "health", areas: ["health", "opportunity"],
    kind: "Eye hospital network",
    tagline: "A hospital network that made world-class cataract surgery affordable at enormous scale.",
    why: "Paying patients help fund free or deeply subsidized care for everyone else, and the model has been studied and copied worldwide.",
    about: "Founded by Dr. G. Venkataswamy with 11 beds, Aravind grew into one of the largest eye-care providers in the world. Its assembly-line efficiency, in-house lens manufacturing (Aurolab), and tiered pricing let it treat huge numbers of patients regardless of ability to pay.",
    city: "Madurai", country: "IN", region: "Asia", site: "aravind.org",
    founded: 1976, founders: ["Dr. G. Venkataswamy"],
    tags: ["healthcare-access", "eye-care", "medical", "affordable", "india", "social-enterprise"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "warby-parker", name: "Warby Parker", type: "brand", cat: "health", areas: ["health", "opportunity"],
    kind: "Eyewear",
    tagline: "Affordable glasses sold direct, with a program that gets glasses to people who need them.",
    why: "Its Buy a Pair, Give a Pair program works with partners like VisionSpring to train people to give eye exams and sell glasses locally.",
    about: "Warby Parker started online selling prescription glasses at a fraction of the usual price, then opened stores and added eye exams. For every pair sold, it funds glasses distribution through partners focused on vision access.",
    city: "New York", country: "US", region: "North America", site: "warbyparker.com",
    founded: 2010, founders: ["Neil Blumenthal", "Dave Gilboa", "Andrew Hunt", "Jeffrey Raider"],
    tags: ["eye-care", "give-back", "one-for-one", "affordable", "retail", "healthcare-access"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "parkrun", name: "parkrun", type: "project", cat: "health", areas: ["health", "community"],
    kind: "Free weekly 5k",
    tagline: "Free, timed 5k walks and runs every Saturday morning, in parks all over the world.",
    why: "No cost, no pressure, no finish-line cutoff — just a weekly ritual that has quietly gotten huge numbers of people moving together.",
    about: "parkrun started with 13 runners in London's Bushy Park. Volunteer-run events now happen weekly across many countries, including Canada, with junior 2k events for kids. Walkers are as welcome as runners.",
    city: "London", country: "GB", region: "Europe", site: "parkrun.com",
    founded: 2004, founders: ["Paul Sinton-Hewitt"],
    tags: ["running", "fitness", "outdoors", "free", "volunteering", "parks", "active", "social-connection"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "whoop", name: "WHOOP", type: "brand", cat: "health", areas: ["health"],
    kind: "Health wearable",
    tagline: "A screenless wearable that tracks sleep, strain, and recovery to build better habits.",
    why: "Makes recovery and sleep quality visible, nudging people to treat rest as part of performance rather than an afterthought.",
    about: "WHOOP makes a subscription wrist and body sensor that measures heart-rate variability, sleep, and strain, translating them into daily recovery guidance. It began with elite athletes and expanded to everyday health.",
    city: "Boston", country: "US", region: "North America", site: "whoop.com",
    founded: 2012, founders: ["Will Ahmed"],
    tags: ["sleep", "recovery", "fitness", "wearable", "preventative-health", "technology"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "eight-sleep", name: "Eight Sleep", type: "brand", cat: "health", areas: ["health"],
    kind: "Sleep technology",
    tagline: "A temperature-controlled mattress cover that adjusts through the night to help you sleep deeper.",
    why: "Treats sleep as the foundation of health and attacks one of its most overlooked variables: temperature.",
    about: "Eight Sleep's Pod sits on top of a mattress, heating or cooling each side of the bed independently and tracking sleep stages without a wearable.",
    city: "New York", country: "US", region: "North America", site: "eightsleep.com",
    founded: 2014, founders: ["Matteo Franceschetti"],
    tags: ["sleep", "recovery", "technology", "wellbeing"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "hatch", name: "Hatch", type: "brand", cat: "health", areas: ["health"],
    kind: "Sleep products",
    tagline: "Sunrise alarms and sound machines designed to make bedtime and wake-up calmer.",
    why: "Takes the phone out of the bedroom and replaces it with light and sound routines built around how sleep actually works.",
    about: "Hatch started with a nightlight and sound machine for babies and expanded into the Restore sunrise alarm for adults, combining wind-down routines, gentle light, and sleep sounds.",
    city: "California", country: "US", region: "North America", site: "hatch.co",
    founders: [],
    tags: ["sleep", "routine", "parents", "wellbeing"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "blue-zones-project", name: "Blue Zones Project", type: "project", cat: "health", areas: ["health", "community"],
    kind: "Community wellbeing program",
    tagline: "Redesigning whole towns so the healthy choice becomes the easy one.",
    why: "Instead of asking individuals to change, it changes streets, menus, schools, and workplaces — the environments that shape behaviour.",
    about: "Built on research into the world's longest-lived communities, Blue Zones Project works with cities on walkability, food environments, and social connection. Places like Albert Lea, Minnesota, and the Beach Cities in California have taken part.",
    city: "Minneapolis", country: "US", region: "North America", site: "bluezones.com",
    founded: 2009, founders: ["Dan Buettner"], people: ["dan-buettner"],
    tags: ["longevity", "healthy-eating", "walkability", "cities", "social-connection", "preventative-health"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "dan-buettner", name: "Dan Buettner", type: "person", cat: "health", areas: ["health", "community"],
    kind: "Explorer & longevity researcher",
    tagline: "The explorer who went looking for the world's longest-lived people — and found five places.",
    why: "Turned years of field research in Okinawa, Sardinia, Nicoya, Ikaria, and Loma Linda into practical lessons about how to live long and well.",
    about: "A National Geographic Fellow and author of The Blue Zones books, Buettner identified common patterns among centenarians: natural movement, purpose, plant-forward eating, and strong social bonds. He later co-founded Blue Zones Project to bring those lessons to American cities.",
    city: "Minneapolis", country: "US", region: "North America", site: "bluezones.com",
    founders: [], people: [], role: "Founder, Blue Zones",
    links: ["blue-zones-project"],
    tags: ["longevity", "research", "happiness", "healthy-eating", "author", "explorer"],
    discovery: "known", featured: true, buyable: false
  },
  {
    id: "wholesome-wave", name: "Wholesome Wave", type: "project", cat: "health", areas: ["health", "opportunity"],
    kind: "Food access nonprofit",
    tagline: "Making fruits and vegetables affordable for families who rely on food assistance.",
    why: "Pioneered doubling food-assistance dollars at farmers markets and produce prescriptions — doctors literally prescribing vegetables.",
    about: "Wholesome Wave builds programs that increase purchasing power for fresh produce among low-income households, and has helped shape produce-incentive policy across the United States.",
    city: "Bridgeport", country: "US", region: "North America", site: "wholesomewave.org",
    founded: 2007, founders: ["Michel Nischan", "Gus Schumacher"],
    tags: ["healthy-eating", "food-access", "nutrition", "produce", "farmers-markets"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "foodshare", name: "FoodShare Toronto", type: "project", cat: "health", areas: ["health", "community"],
    kind: "Food justice organization",
    tagline: "Good, affordable food for every Torontonian — from school snack programs to rooftop gardens.",
    why: "Works on the whole system: school nutrition, affordable produce boxes, urban agriculture, and food education.",
    about: "FoodShare is one of Canada's largest community food organizations, running student nutrition support, Good Food Boxes, school gardens, and programs that put fresh food within reach across Toronto.",
    city: "Toronto", country: "CA", region: "North America", site: "foodshare.net",
    founded: 1985, founders: [],
    tags: ["healthy-eating", "food-access", "nutrition", "schools", "urban-farming", "canada", "youth"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "mamava", name: "Mamava", type: "brand", cat: "health", areas: ["health", "opportunity"],
    kind: "Lactation pods",
    tagline: "Private, freestanding pods so breastfeeding parents aren't stuck in a bathroom stall.",
    why: "A simple piece of infrastructure that makes going back to work, travelling, or attending events easier for new parents.",
    about: "Mamava designs lactation pods now found in airports, stadiums, and workplaces, plus an app to locate them. It grew out of a frustration that public spaces simply weren't designed for nursing parents.",
    city: "Burlington", country: "US", region: "North America", site: "mamava.com",
    founded: 2013, founders: ["Sascha Mayer", "Christine Dodson"],
    tags: ["parents", "workplace", "design", "public-space", "accessibility"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "ron-finley", name: "Ron Finley", type: "person", cat: "health", areas: ["health", "community"],
    kind: "Urban gardener",
    tagline: "The self-described 'Gangsta Gardener' turning neglected curb strips into food.",
    why: "Started planting vegetables on the strip outside his house in South Central LA — and started a movement about growing your own food.",
    about: "Finley's guerrilla gardening in a neighbourhood with little access to fresh food drew a citation from the city, then a petition, then a change in the rules. His TED talk spread the idea that planting food is a radical, practical act.",
    city: "Los Angeles", country: "US", region: "North America", site: "ronfinley.com",
    role: "Founder, The Ron Finley Project",
    tags: ["urban-farming", "healthy-eating", "food-access", "gardening", "neighbourhood", "cities"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "open-food-facts", name: "Open Food Facts", type: "project", cat: "health", areas: ["health", "planet"],
    kind: "Open food database",
    tagline: "A Wikipedia for food labels: scan a barcode, see what's actually inside.",
    why: "A volunteer-built, open database of products from around the world that powers nutrition scores and lets anyone build healthier-shopping tools.",
    about: "Open Food Facts collects ingredients, nutrition facts, and environmental data for food products, contributed by people scanning items with their phones. It is free, open data used by researchers and app developers.",
    city: "Paris", country: "FR", region: "Europe", site: "openfoodfacts.org",
    founded: 2012, founders: ["Stéphane Gigandet"],
    tags: ["healthy-eating", "nutrition", "open-data", "transparency", "app", "technology"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "lufa-farms", name: "Lufa Farms", type: "brand", cat: "health", areas: ["health", "planet"],
    kind: "Rooftop greenhouse farm",
    tagline: "Commercial greenhouses on Montréal rooftops, growing vegetables a few kilometres from your door.",
    why: "Built the world's first commercial rooftop greenhouse and now delivers weekly local food baskets across the city.",
    about: "Lufa grows greens and vegetables on top of existing buildings, using captured rainwater and no synthetic pesticides, and pairs that with an online farmers market sourcing from local producers.",
    city: "Montréal", country: "CA", region: "North America", site: "montreal.lufa.com",
    founded: 2009, founders: ["Mohamed Hage"],
    tags: ["urban-farming", "healthy-eating", "local-food", "canada", "produce", "cities", "groceries"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "charity-water", name: "charity: water", type: "project", cat: "health", areas: ["health", "community"],
    kind: "Clean water nonprofit",
    tagline: "Funding clean-water projects and showing donors the exact well their money built.",
    why: "Rebuilt trust in giving with radical transparency: private donors cover operating costs and projects are tracked with photos and GPS.",
    about: "charity: water funds local partners to build and maintain water projects in communities across Africa and Asia, and reports back on each one so supporters can see where their contribution went.",
    city: "New York", country: "US", region: "North America", site: "charitywater.org",
    founded: 2006, founders: ["Scott Harrison"], people: ["scott-harrison"],
    tags: ["clean-water", "transparency", "africa", "healthcare-access", "give-back"],
    discovery: "known", featured: false, buyable: false
  },
  {
    id: "scott-harrison", name: "Scott Harrison", type: "person", cat: "health", areas: ["health", "community"],
    kind: "Founder",
    tagline: "A New York nightclub promoter who walked away to build one of the most transparent nonprofits around.",
    why: "His story — from nightlife to a hospital ship off West Africa to charity: water — is a reminder that people can completely change direction.",
    about: "After volunteering as a photographer with Mercy Ships, Harrison founded charity: water and designed it around the idea that people would give more if they could see exactly what their money did.",
    city: "New York", country: "US", region: "North America", site: "charitywater.org",
    role: "Founder, charity: water", links: ["charity-water"],
    tags: ["founder", "clean-water", "transparency", "storytelling"],
    discovery: "known", featured: false, buyable: false
  },

  /* ───────────────────────────── PLANET ───────────────────────────── */
  {
    id: "patagonia", name: "Patagonia", type: "brand", cat: "planet", areas: ["planet", "community"],
    kind: "Outdoor apparel",
    tagline: "Outdoor gear built to last — and a company owned, in effect, by the planet.",
    why: "In 2022 its founder transferred ownership to a trust and a nonprofit so profits not reinvested go toward fighting the environmental crisis.",
    about: "Patagonia makes outdoor clothing and gear, repairs it through its Worn Wear program, and has long given a share of sales to grassroots environmental groups. It is a certified B Corp.",
    city: "Ventura", country: "US", region: "North America", site: "patagonia.com",
    founded: 1973, founders: ["Yvon Chouinard"], people: ["yvon-chouinard"],
    tags: ["apparel", "outdoors", "repair", "circular", "durable", "b-corp", "fashion", "give-back"],
    discovery: "known", featured: true, buyable: true
  },
  {
    id: "yvon-chouinard", name: "Yvon Chouinard", type: "person", cat: "planet", areas: ["planet"],
    kind: "Founder & climber",
    tagline: "A blacksmith and rock climber who accidentally built one of the most influential companies on earth.",
    why: "Proved a business could be wildly successful while treating the planet as its main stakeholder — then gave the company away to prove it again.",
    about: "Chouinard started by forging climbing pitons, founded Patagonia, co-founded 1% for the Planet, and wrote 'Let My People Go Surfing'. In 2022 he and his family transferred Patagonia's ownership to the Patagonia Purpose Trust and the Holdfast Collective.",
    city: "Ventura", country: "US", region: "North America", site: "patagonia.com",
    role: "Founder, Patagonia", links: ["patagonia"],
    tags: ["founder", "outdoors", "author", "climbing", "conservation"],
    discovery: "known", featured: true, buyable: false
  },
  {
    id: "allbirds", name: "Allbirds", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Footwear",
    tagline: "Everyday shoes made with materials like merino wool, tree fibre, and sugarcane.",
    why: "Puts a carbon footprint number on its products, nudging the industry toward measuring what fashion actually costs the planet.",
    about: "Allbirds designs shoes and apparel around natural and lower-impact materials, and open-sourced its sugarcane-based foam so other brands could use it.",
    city: "San Francisco", country: "US", region: "North America", site: "allbirds.com",
    founded: 2016, founders: ["Tim Brown", "Joey Zwillinger"],
    tags: ["footwear", "fashion", "materials", "carbon-labels", "apparel", "low-impact"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "too-good-to-go", name: "Too Good To Go", type: "brand", cat: "planet", areas: ["planet", "community"],
    kind: "Food rescue app",
    tagline: "Rescue surplus food from local bakeries, cafés, and stores — usually for a fraction of the price.",
    why: "Makes fighting food waste feel like a small daily win: a 'surprise bag' of food that would otherwise be thrown out.",
    about: "Too Good To Go connects people with businesses that have unsold food at the end of the day. Users reserve a bag in the app and pick it up during a set window. It operates across Europe and North America, including Canadian cities.",
    city: "Copenhagen", country: "DK", region: "Europe", site: "toogoodtogo.com",
    founded: 2015, founders: [],
    tags: ["food-waste", "waste", "circular", "app", "local-business", "food", "groceries"],
    discovery: "known", featured: true, buyable: true
  },
  {
    id: "olio", name: "Olio", type: "brand", cat: "planet", areas: ["planet", "community"],
    kind: "Neighbour sharing app",
    tagline: "Give away spare food and household things to neighbours instead of throwing them out.",
    why: "Started with an unwanted cabbage at a moving day — and became a way for neighbours to meet while keeping good stuff out of the bin.",
    about: "Olio lets people list leftover food, toiletries, and household items for free pickup nearby. Volunteers also collect unsold food from shops and redistribute it through the app.",
    city: "London", country: "GB", region: "Europe", site: "olioapp.com",
    founded: 2015, founders: ["Tessa Clarke", "Saasha Celestial-One"], people: ["tessa-clarke"],
    tags: ["food-waste", "sharing", "neighbourhood", "circular", "app", "volunteering"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "tessa-clarke", name: "Tessa Clarke", type: "person", cat: "planet", areas: ["planet", "community"],
    kind: "Founder",
    tagline: "The founder who couldn't bring herself to throw away good food — so she built an app for it.",
    why: "Turned a personal moment of frustration into a global sharing community that runs largely on neighbours and volunteers.",
    about: "Raised on a dairy farm in Yorkshire, Clarke co-founded Olio after struggling to find someone to take her leftover food when moving house.",
    city: "London", country: "GB", region: "Europe", site: "olioapp.com",
    role: "Co-founder, Olio", links: ["olio"],
    tags: ["founder", "food-waste", "sharing"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "ecosia", name: "Ecosia", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Search engine",
    tagline: "A search engine that uses its profits to fund tree planting and climate projects.",
    why: "A simple switch — change your default search — that channels everyday searches into reforestation, with monthly financial reports.",
    about: "Ecosia is a Berlin-based search engine that has committed its profits to climate action, funding tree planting with local partners and renewable energy. Its founder made the company steward-owned so it can't be sold for profit.",
    city: "Berlin", country: "DE", region: "Europe", site: "ecosia.org",
    founded: 2009, founders: ["Christian Kroll"], people: ["christian-kroll"],
    tags: ["trees", "reforestation", "search", "steward-owned", "transparency", "technology", "climate"],
    discovery: "rising", featured: true, buyable: true
  },
  {
    id: "christian-kroll", name: "Christian Kroll", type: "person", cat: "planet", areas: ["planet"],
    kind: "Founder",
    tagline: "Built a search engine, then legally gave up the right to ever sell it.",
    why: "Made Ecosia steward-owned so its mission and profits can't be bought out — a rare structural commitment.",
    about: "After travelling in South America and Asia, Kroll founded Ecosia to turn search advertising revenue into reforestation.",
    city: "Berlin", country: "DE", region: "Europe", site: "ecosia.org",
    role: "Founder, Ecosia", links: ["ecosia"],
    tags: ["founder", "steward-owned", "trees"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "terracycle", name: "TerraCycle", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Recycling company",
    tagline: "Recycling the things your city won't take — from chip bags to toothbrushes.",
    why: "Built collection programs for hard-to-recycle waste and launched Loop, a platform for products in reusable containers.",
    about: "Started by a Princeton student selling worm-poop fertilizer in reused soda bottles, TerraCycle now runs free and paid recycling programs with brands and retailers in many countries.",
    city: "Trenton", country: "US", region: "North America", site: "terracycle.com",
    founded: 2001, founders: ["Tom Szaky"],
    tags: ["recycling", "waste", "circular", "packaging", "reuse"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "fairphone", name: "Fairphone", type: "brand", cat: "planet", areas: ["planet", "opportunity"],
    kind: "Repairable smartphone",
    tagline: "A modular smartphone you can repair yourself with a screwdriver.",
    why: "Challenges the throwaway-phone cycle with replaceable parts, long software support, and fairer mineral sourcing.",
    about: "Fairphone began as an awareness campaign about conflict minerals in electronics. Its phones are designed so users can swap batteries, screens, and cameras, and the company works to improve conditions in its supply chain.",
    city: "Amsterdam", country: "NL", region: "Europe", site: "fairphone.com",
    founded: 2013, founders: ["Bas van Abel"],
    tags: ["electronics", "repair", "circular", "fair-trade", "technology", "durable"],
    discovery: "rising", featured: true, buyable: true
  },
  {
    id: "back-market", name: "Back Market", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Refurbished electronics",
    tagline: "A marketplace for professionally refurbished phones, laptops, and appliances.",
    why: "Makes the second-life option the convenient one, keeping working electronics in use instead of in landfill.",
    about: "Back Market connects buyers with refurbishers who restore and test devices, offering warranties so refurbished feels as safe as new.",
    city: "Paris", country: "FR", region: "Europe", site: "backmarket.com",
    founded: 2014, founders: ["Thibaud Hug de Larauze", "Quentin Le Brouster", "Vianney Vaute"],
    tags: ["electronics", "refurbished", "circular", "e-waste", "marketplace", "technology"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "cotopaxi", name: "Cotopaxi", type: "brand", cat: "planet", areas: ["planet", "opportunity"],
    kind: "Outdoor gear",
    tagline: "Colourful outdoor gear, much of it made from leftover fabric other brands didn't use.",
    why: "Its Del Día line gives remnant fabric a second life, and a share of revenue funds organizations working on poverty.",
    about: "Cotopaxi is a certified B Corp built around the idea of 'Gear for Good'. It makes packs and apparel with repurposed and recycled materials and runs a foundation supporting community organizations.",
    city: "Salt Lake City", country: "US", region: "North America", site: "cotopaxi.com",
    founded: 2014, founders: ["Davis Smith"], people: ["davis-smith"],
    tags: ["outdoors", "apparel", "remnant", "upcycled", "b-corp", "give-back", "fashion"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "davis-smith", name: "Davis Smith", type: "person", cat: "planet", areas: ["planet", "opportunity"],
    kind: "Founder",
    tagline: "Grew up in Latin America and built an outdoor brand designed to fight poverty from day one.",
    why: "Baked giving into Cotopaxi's founding documents rather than adding it later.",
    about: "Smith spent much of his childhood in Ecuador, Bolivia, and the Dominican Republic, and founded Cotopaxi to pair adventure gear with funding for poverty alleviation.",
    city: "Salt Lake City", country: "US", region: "North America", site: "cotopaxi.com",
    role: "Founder, Cotopaxi", links: ["cotopaxi"],
    tags: ["founder", "outdoors", "latin-america"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "tentree", name: "tentree", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Apparel",
    tagline: "Comfortable everyday clothing from Vancouver, with ten trees planted for every item.",
    why: "Ties every purchase to verified tree planting with partners around the world, and lets customers track their own impact.",
    about: "Founded by a group of friends from Saskatchewan, tentree makes basics with materials like organic cotton, hemp, and TENCEL™ and funds reforestation projects with planting partners.",
    city: "Vancouver", country: "CA", region: "North America", site: "tentree.com",
    founded: 2012, founders: ["Derrick Emsley", "Kalen Emsley", "David Luba"],
    tags: ["apparel", "fashion", "trees", "reforestation", "canada", "b-corp", "clothing"],
    discovery: "rising", featured: true, buyable: true
  },
  {
    id: "blueland", name: "Blueland", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Home cleaning",
    tagline: "Cleaning products as tablets you drop into water in a bottle you keep forever.",
    why: "Stops shipping water around in single-use plastic, which is most of what a spray bottle of cleaner is.",
    about: "Blueland makes hand soap, cleaners, and detergent as concentrated tablets with refillable glass and acrylic bottles, cutting single-use packaging at home.",
    city: "New York", country: "US", region: "North America", site: "blueland.com",
    founded: 2019, founders: ["Sarah Paiji Yoo"],
    tags: ["plastic-free", "refill", "home", "packaging", "waste"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "impossible-foods", name: "Impossible Foods", type: "brand", cat: "planet", areas: ["planet", "health"],
    kind: "Plant-based food",
    tagline: "Plant-based meat designed to satisfy people who love meat.",
    why: "Instead of asking people to give up burgers, it set out to make a better-for-the-planet burger they'd actually choose.",
    about: "Founded by Stanford biochemist Pat Brown, Impossible Foods uses plant proteins and soy leghemoglobin to recreate the taste and texture of meat, aiming to reduce the land and emissions footprint of food.",
    city: "Redwood City", country: "US", region: "North America", site: "impossiblefoods.com",
    founded: 2011, founders: ["Pat Brown"],
    tags: ["plant-based", "food", "climate", "food-systems", "groceries"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "the-ocean-cleanup", name: "The Ocean Cleanup", type: "project", cat: "planet", areas: ["planet"],
    kind: "Ocean plastic removal",
    tagline: "Engineering systems to pull plastic out of rivers and the ocean's garbage patches.",
    why: "Attacks the problem at both ends: large-scale cleanup at sea and solar-powered Interceptors that catch trash in rivers before it reaches the ocean.",
    about: "Started by an 18-year-old after a scuba trip where he saw more plastic than fish, The Ocean Cleanup develops and deploys technology to remove ocean plastic and publishes its research.",
    city: "Rotterdam", country: "NL", region: "Europe", site: "theoceancleanup.com",
    founded: 2013, founders: ["Boyan Slat"], people: ["boyan-slat"],
    tags: ["ocean", "plastic", "waste", "engineering", "rivers", "technology"],
    discovery: "known", featured: true, buyable: false
  },
  {
    id: "boyan-slat", name: "Boyan Slat", type: "person", cat: "planet", areas: ["planet"],
    kind: "Inventor & founder",
    tagline: "Was told it couldn't be done at 18. Has spent the years since doing it anyway.",
    why: "A reminder of what one stubborn young builder can set in motion: dropped out of university to work on ocean plastic full-time.",
    about: "Slat presented his idea at a TEDx talk in Delft, crowdfunded early research, and has led The Ocean Cleanup through many iterations of its cleanup systems.",
    city: "Rotterdam", country: "NL", region: "Europe", site: "theoceancleanup.com",
    role: "Founder, The Ocean Cleanup", links: ["the-ocean-cleanup"],
    tags: ["founder", "inventor", "ocean", "young-builders"],
    discovery: "known", featured: false, buyable: false
  },
  {
    id: "ecovative", name: "Ecovative", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Mycelium materials",
    tagline: "Growing materials from mushroom roots to replace plastic foam, leather, and more.",
    why: "Grows packaging and materials in days from mycelium and agricultural waste — and they compost when you're done.",
    about: "Ecovative began as a student project at Rensselaer Polytechnic Institute and has licensed its mycelium technology for packaging, and spun out companies making food and textile alternatives.",
    city: "Green Island", country: "US", region: "North America", site: "ecovative.com",
    founded: 2007, founders: ["Eben Bayer", "Gavin McIntyre"],
    tags: ["materials", "mycelium", "packaging", "compostable", "biotech", "plastic-free"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "repair-cafe", name: "Repair Café", type: "project", cat: "planet", areas: ["planet", "community"],
    kind: "Community repair meetups",
    tagline: "Bring your broken toaster. A volunteer will help you fix it.",
    why: "Free, local meetups where neighbours repair things together — keeping stuff out of landfill and skills alive.",
    about: "The first Repair Café was held in Amsterdam. The foundation now supports a worldwide network of volunteer-run events where people fix clothes, electronics, furniture, and bikes.",
    city: "Amsterdam", country: "NL", region: "Europe", site: "repaircafe.org",
    founded: 2009, founders: ["Martine Postma"],
    tags: ["repair", "circular", "volunteering", "neighbourhood", "community-space", "skills"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "nudie-jeans", name: "Nudie Jeans", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Denim",
    tagline: "Organic denim with free repairs for as long as you own them.",
    why: "Designs for longevity: free repair shops, resale of used pairs, and a strong stance against throwaway fashion.",
    about: "The Swedish denim brand uses organic and recycled cotton and runs repair shops in cities around the world, plus mobile repair stations.",
    city: "Gothenburg", country: "SE", region: "Europe", site: "nudiejeans.com",
    founded: 2001, founders: ["Maria Erixon"],
    tags: ["fashion", "denim", "repair", "apparel", "durable", "organic", "clothing"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "veja", name: "Veja", type: "brand", cat: "planet", areas: ["planet", "opportunity"],
    kind: "Sneakers",
    tagline: "Sneakers made with organic cotton and wild rubber, bought directly from producers.",
    why: "Spends more on materials and fair pay and almost nothing on traditional advertising — and became popular anyway.",
    about: "Veja sources organic cotton and Amazonian wild rubber directly from producer cooperatives in Brazil and Peru, and publishes detail on its supply chain.",
    city: "Paris", country: "FR", region: "Europe", site: "veja-store.com",
    founded: 2004, founders: ["Sébastien Kopp", "François-Ghislain Morillion"],
    tags: ["footwear", "fashion", "materials", "fair-trade", "transparency"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "carboncure", name: "CarbonCure", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Climate technology",
    tagline: "Locking captured CO₂ inside concrete — permanently.",
    why: "Concrete is everywhere. CarbonCure retrofits existing plants so the most-used building material can store carbon instead of just emitting it.",
    about: "The Nova Scotia company's technology injects captured carbon dioxide into fresh concrete, where it mineralizes. It's used by concrete producers across North America and beyond.",
    city: "Halifax", country: "CA", region: "North America", site: "carboncure.com",
    founded: 2012, founders: ["Robert Niven"],
    tags: ["climate", "carbon-removal", "construction", "canada", "technology", "startups"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "climeworks", name: "Climeworks", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Direct air capture",
    tagline: "Machines that pull CO₂ straight out of the air and store it underground as rock.",
    why: "One of the first companies to operate direct air capture at commercial scale, starting with plants in Iceland.",
    about: "Founded by two engineers who met at ETH Zurich, Climeworks captures carbon dioxide from ambient air and partners with Carbfix to mineralize it in basalt.",
    city: "Zurich", country: "CH", region: "Europe", site: "climeworks.com",
    founded: 2009, founders: ["Christoph Gebald", "Jan Wurzbacher"],
    tags: ["climate", "carbon-removal", "technology", "engineering"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "plastic-bank", name: "Plastic Bank", type: "brand", cat: "planet", areas: ["planet", "opportunity"],
    kind: "Social enterprise",
    tagline: "Paying people in coastal communities to collect plastic before it reaches the ocean.",
    why: "Turns plastic into a form of income: collectors exchange it for money and benefits, and brands buy the recovered material.",
    about: "Vancouver-based Plastic Bank runs collection ecosystems in countries including Haiti, the Philippines, Indonesia, and Brazil, using a blockchain-backed system to track collection and payments.",
    city: "Vancouver", country: "CA", region: "North America", site: "plasticbank.com",
    founded: 2013, founders: ["David Katz", "Shaun Frankson"],
    tags: ["ocean", "plastic", "recycling", "income", "canada", "social-enterprise", "jobs"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "misfits-market", name: "Misfits Market", type: "brand", cat: "planet", areas: ["planet", "health"],
    kind: "Online grocery",
    tagline: "Groceries delivered — including the 'ugly' produce stores usually reject.",
    why: "Makes it easy to buy imperfect and surplus food that would otherwise be wasted, often for less.",
    about: "Misfits Market sources produce and pantry items that don't meet cosmetic standards or are in surplus, and delivers them to homes across much of the United States.",
    city: "Pennsylvania", country: "US", region: "North America", site: "misfitsmarket.com",
    founded: 2018, founders: ["Abhi Ramesh"],
    tags: ["food-waste", "groceries", "produce", "healthy-eating", "delivery"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "flashfood", name: "Flashfood", type: "brand", cat: "planet", areas: ["planet", "opportunity"],
    kind: "Grocery app",
    tagline: "Discounted groceries nearing their best-before date, from stores near you.",
    why: "Lowers grocery bills and cuts food waste at the same time — a rare both-sides win.",
    about: "Toronto-born Flashfood partners with grocery chains so shoppers can buy marked-down food through an app and pick it up in store.",
    city: "Toronto", country: "CA", region: "North America", site: "flashfood.com",
    founded: 2016, founders: ["Josh Domingues"],
    tags: ["food-waste", "groceries", "affordable", "app", "canada", "startups"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "second-harvest", name: "Second Harvest", type: "project", cat: "planet", areas: ["planet", "community"],
    kind: "Food rescue",
    tagline: "Canada's largest food rescue organization, moving surplus food to people who need it.",
    why: "Tackles two problems with one network: food waste and food insecurity, connecting businesses with community programs.",
    about: "Second Harvest runs the Food Rescue app and logistics that redirect surplus food from farms, grocers, and manufacturers to non-profits across Canada.",
    city: "Toronto", country: "CA", region: "North America", site: "secondharvest.ca",
    founded: 1985, founders: [],
    tags: ["food-waste", "food-access", "canada", "logistics", "community"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "gotham-greens", name: "Gotham Greens", type: "brand", cat: "planet", areas: ["planet", "health"],
    kind: "Urban greenhouse farming",
    tagline: "Fresh greens grown in city greenhouses, sometimes on top of the grocery store.",
    why: "Brings food production back into cities with climate-controlled greenhouses that use far less land and water than field farming.",
    about: "Gotham Greens started with a rooftop greenhouse in Brooklyn and now operates greenhouses across the U.S., supplying lettuces, herbs, and dressings to grocers.",
    city: "Brooklyn", country: "US", region: "North America", site: "gothamgreens.com",
    founded: 2009, founders: ["Viraj Puri"],
    tags: ["urban-farming", "local-food", "groceries", "healthy-eating", "cities"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "octopus-energy", name: "Octopus Energy", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Renewable energy supplier",
    tagline: "An energy company built on software, with tariffs that reward using power when it's green and cheap.",
    why: "Showed that customer service and clean energy can be the selling points of a utility — and built a tech platform others now license.",
    about: "Octopus supplies renewable electricity in the UK and several other countries, invests in wind and solar, and offers smart tariffs for EVs and heat pumps.",
    city: "London", country: "GB", region: "Europe", site: "octopus.energy",
    founded: 2015, founders: ["Greg Jackson"],
    tags: ["renewable-energy", "climate", "technology", "electricity", "ev"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "frontier", name: "Frontier", type: "project", cat: "planet", areas: ["planet"],
    kind: "Carbon removal fund",
    tagline: "A commitment by big buyers to purchase carbon removal before it's cheap — so it gets cheap.",
    why: "Uses a proven playbook — guaranteed future demand — to help early carbon-removal startups scale.",
    about: "Launched by Stripe with Alphabet, Shopify, Meta, and McKinsey Sustainability, Frontier is an advance market commitment to buy permanent carbon removal and has signed offtake agreements with emerging suppliers.",
    city: "San Francisco", country: "US", region: "North America", site: "frontierclimate.com",
    founded: 2022, founders: [],
    tags: ["climate", "carbon-removal", "funding", "startups"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "seabin", name: "Seabin Project", type: "project", cat: "planet", areas: ["planet"],
    kind: "Marine cleanup",
    tagline: "Floating bins that quietly skim trash and microplastics from marinas and harbours.",
    why: "Two surfers tired of swimming in rubbish built a simple device — and a program to teach coastal communities about pollution.",
    about: "Seabins are installed in marinas around the world, collecting floating debris, and the project runs data and education programs on water pollution.",
    city: "Sydney", country: "AU", region: "Oceania", site: "seabinproject.com",
    founded: 2015, founders: ["Andrew Turton", "Pete Ceglinski"],
    tags: ["ocean", "plastic", "waste", "engineering", "education"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "thredup", name: "ThredUp", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Online resale",
    tagline: "One of the largest online thrift stores — clean out your closet, shop secondhand.",
    why: "Makes buying used clothing as easy as buying new, keeping garments in circulation longer.",
    about: "ThredUp processes secondhand clothing at scale and powers resale programs for brands that want to take back and resell their own items.",
    city: "Oakland", country: "US", region: "North America", site: "thredup.com",
    founded: 2009, founders: ["James Reinhart"],
    tags: ["fashion", "secondhand", "resale", "circular", "clothing", "apparel"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "natures-path", name: "Nature's Path", type: "brand", cat: "planet", areas: ["planet", "health"],
    kind: "Organic food",
    tagline: "A family-owned organic cereal company from British Columbia that never sold out.",
    why: "Has stayed independent and organic for decades while growing into one of North America's best-known organic breakfast brands.",
    about: "Nature's Path makes organic cereals, granola, and snacks. It supports organic farming, regenerative agriculture, and community gardens through its programs.",
    city: "Richmond", country: "CA", region: "North America", site: "naturespath.com",
    founded: 1985, founders: ["Arran Stephens", "Ratana Stephens"],
    tags: ["organic", "food", "healthy-eating", "canada", "family-owned", "groceries", "regenerative"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "kotn", name: "Kotn", type: "brand", cat: "opportunity", areas: ["opportunity", "planet"],
    kind: "Apparel",
    tagline: "Essentials made with Egyptian cotton bought directly from small farms.",
    why: "Works directly with cotton farmers in the Nile Delta and has funded schools in the communities it sources from.",
    about: "Toronto's Kotn started by fixing a supply chain: paying farmers fairly for high-quality cotton and building long-term partnerships. It is a certified B Corp.",
    city: "Toronto", country: "CA", region: "North America", site: "kotn.com",
    founded: 2015, founders: ["Rami Helali", "Benjamin Sehl", "Mackenzie Yeates"],
    tags: ["apparel", "fashion", "fair-trade", "education", "canada", "b-corp", "clothing", "give-back"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "modo", name: "Modo", type: "brand", cat: "planet", areas: ["planet", "community"],
    kind: "Car-share co-op",
    tagline: "North America's first car-sharing co-op, owned by its members.",
    why: "Lets people live car-light in Vancouver and Victoria, using a shared car only when they need one.",
    about: "Started with two cars in Vancouver, Modo is a member-owned co-operative with a fleet across British Columbia, making it easier to skip owning a car.",
    city: "Vancouver", country: "CA", region: "North America", site: "modo.coop",
    founded: 1997, founders: [],
    tags: ["mobility", "cities", "co-op", "canada", "sharing", "transport"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "bixi", name: "BIXI Montréal", type: "project", cat: "planet", areas: ["planet", "health", "community"],
    kind: "Bike share",
    tagline: "The bike-share system that helped kick off the bike-share era in North America.",
    why: "Its design was exported to cities around the world; at home it makes everyday cycling an easy default.",
    about: "Launched in 2009, BIXI is Montréal's public bike-share network, including e-bikes, and is run as a non-profit for the city.",
    city: "Montréal", country: "CA", region: "North America", site: "bixi.com",
    founded: 2009, founders: [],
    tags: ["mobility", "cycling", "cities", "canada", "transport", "active", "outdoors"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "one-tree-planted", name: "One Tree Planted", type: "project", cat: "planet", areas: ["planet"],
    kind: "Reforestation",
    tagline: "Reforestation projects around the world, supported one tree at a time.",
    why: "Works with local partners on reforestation projects chosen for biodiversity, community benefit, and disaster recovery.",
    about: "Based in Vermont, One Tree Planted funds tree planting across North America, Latin America, Africa, Asia, and the Pacific, often partnering with brands that plant trees with purchases.",
    city: "Shelburne", country: "US", region: "North America", site: "onetreeplanted.org",
    founded: 2014, founders: ["Matt Hill"],
    tags: ["trees", "reforestation", "biodiversity", "conservation"],
    discovery: "rising", featured: false, buyable: false
  },

  /* ─────────────────────────── COMMUNITY ─────────────────────────── */
  {
    id: "goodgym", name: "GoodGym", type: "project", cat: "community", areas: ["community", "health"],
    kind: "Running + volunteering",
    tagline: "A running club where every run stops to help someone.",
    why: "Combines getting fit with doing good: group runs to dig community gardens, and solo runs to visit isolated older neighbours.",
    about: "GoodGym started in London and now operates across the UK. Members run to community tasks or to visit older people who could use the company, turning exercise into connection.",
    city: "London", country: "GB", region: "Europe", site: "goodgym.org",
    founded: 2009, founders: ["Ivo Gormley"],
    tags: ["running", "volunteering", "fitness", "loneliness", "older-adults", "social-connection", "active"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "mens-sheds", name: "Men's Sheds", type: "project", cat: "community", areas: ["community", "health"],
    kind: "Community workshops",
    tagline: "Community workshops where people — mostly men — build things side by side.",
    why: "A simple answer to isolation: a shared shed, some tools, and a reason to show up. The movement has spread worldwide.",
    about: "Men's Sheds began in Australia and spread to Ireland, the UK, Canada, and beyond. Members work on woodworking, repairs, and community projects, and the sheds have become recognized for supporting mental health.",
    city: "Australia", country: "AU", region: "Oceania", site: "mensshed.org",
    founders: [],
    tags: ["loneliness", "mental-health", "community-space", "older-adults", "repair", "skills", "social-connection"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "little-free-library", name: "Little Free Library", type: "project", cat: "community", areas: ["community", "opportunity"],
    kind: "Book sharing",
    tagline: "Take a book, share a book — tiny libraries on front lawns all over the world.",
    why: "Started as a tribute to a mother who loved reading, and became a global network of neighbour-run book exchanges.",
    about: "Todd Bol built the first one in Hudson, Wisconsin. Little Free Library now supports registered book-sharing boxes in many countries and runs programs to put books in neighbourhoods with fewer of them.",
    city: "Hudson", country: "US", region: "North America", site: "littlefreelibrary.org",
    founded: 2009, founders: ["Todd Bol"],
    tags: ["books", "literacy", "neighbourhood", "sharing", "education"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "buy-nothing", name: "Buy Nothing Project", type: "project", cat: "community", areas: ["community", "planet"],
    kind: "Gift economy",
    tagline: "Hyper-local groups where neighbours give and ask for things — no money involved.",
    why: "Swaps transactions for relationships: the side effect of keeping stuff in use is that neighbours actually meet.",
    about: "Started on Bainbridge Island, Washington, the Buy Nothing Project has grown into a global network of local gift-economy groups and an app.",
    city: "Bainbridge Island", country: "US", region: "North America", site: "buynothingproject.org",
    founded: 2013, founders: ["Liesl Clark", "Rebecca Rockefeller"],
    tags: ["sharing", "neighbourhood", "circular", "gift-economy", "social-connection"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "826-valencia", name: "826 Valencia", type: "project", cat: "community", areas: ["community", "opportunity"],
    kind: "Youth writing center",
    tagline: "Free writing and tutoring for kids — behind a storefront that sells pirate supplies.",
    why: "Proved that a learning space can be whimsical and inviting, and inspired a national network of 826 chapters.",
    about: "826 Valencia offers free after-school tutoring, writing workshops, and publishing opportunities for students in San Francisco. Its quirky retail fronts help fund the programs.",
    city: "San Francisco", country: "US", region: "North America", site: "826valencia.org",
    founded: 2002, founders: ["Dave Eggers", "Nínive Calegari"],
    tags: ["youth", "education", "writing", "literacy", "volunteering", "community-space"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "socratica", name: "Socratica", type: "project", cat: "community", areas: ["community", "opportunity"],
    kind: "Builder community",
    tagline: "Weekly sessions where people show up and work on the thing they're obsessed with.",
    why: "A grassroots Waterloo community proving you don't need permission to build — just a room, a time, and other people building too.",
    about: "Socratica began in Waterloo, Ontario, as a co-working symposium for students and makers working on passion projects, and has inspired similar sessions in other cities.",
    city: "Waterloo", country: "CA", region: "North America", site: "socratica.info",
    founded: 2022, founders: [],
    tags: ["builders", "students", "community-space", "canada", "startups", "young-builders", "makers"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "ciclovia", name: "Ciclovía Bogotá", type: "project", cat: "community", areas: ["community", "health", "planet"],
    kind: "Car-free streets",
    tagline: "Every Sunday, Bogotá closes major roads to cars and opens them to people.",
    why: "One of the most-copied public-space ideas in the world: free, weekly, and city-scale.",
    about: "On Sundays and holidays, Bogotá closes well over 100 kilometres of streets to cars so people can walk, cycle, skate, and join free exercise classes. Cities across the Americas have launched their own versions.",
    city: "Bogotá", country: "CO", region: "Latin America", site: "idrd.gov.co",
    founded: 1974, founders: [],
    tags: ["public-space", "cities", "cycling", "active", "outdoors", "free", "mobility"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "superblocks", name: "Barcelona Superblocks", type: "project", cat: "community", areas: ["community", "planet", "health"],
    kind: "Urban redesign",
    tagline: "Turning grids of city streets into car-light neighbourhoods with plazas and playgrounds.",
    why: "A replicable idea for giving streets back to people — less traffic and noise, more shade, places to sit and play.",
    about: "Barcelona's superilles group several blocks together and route through-traffic around them, converting interior intersections into public space. Other cities have studied and adapted the approach.",
    city: "Barcelona", country: "ES", region: "Europe", site: "ajuntament.barcelona.cat",
    founded: 2016, founders: [],
    tags: ["public-space", "cities", "urban-design", "walkability", "neighbourhood"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "high-line", name: "The High Line", type: "project", cat: "community", areas: ["community", "planet"],
    kind: "Public park",
    tagline: "An abandoned elevated railway turned into one of the most famous parks in the world.",
    why: "Two neighbours started a group to save a structure set for demolition — and gave cities a new playbook for reusing infrastructure.",
    about: "Friends of the High Line was founded by Joshua David and Robert Hammond. The park opened in sections starting in 2009 and inspired adaptive-reuse projects in many cities.",
    city: "New York", country: "US", region: "North America", site: "thehighline.org",
    founded: 1999, founders: ["Joshua David", "Robert Hammond"],
    tags: ["public-space", "cities", "parks", "adaptive-reuse", "urban-design"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "majora-carter", name: "Majora Carter", type: "person", cat: "community", areas: ["community", "planet"],
    kind: "Urban revitalization strategist",
    tagline: "Building the kind of neighbourhood in the South Bronx that people don't feel they need to leave.",
    why: "Argues that low-status communities should be developed by and for the people who already live there — and builds projects to prove it.",
    about: "Carter founded Sustainable South Bronx, led the effort to create Hunts Point Riverside Park, and now works as a real estate developer and author focused on talent retention in under-resourced communities.",
    city: "New York", country: "US", region: "North America", site: "majoracartergroup.com",
    role: "Urban revitalization strategist",
    tags: ["cities", "neighbourhood", "public-space", "urban-design", "author"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "vancity", name: "Vancity", type: "brand", cat: "community", areas: ["community", "opportunity"],
    kind: "Credit union",
    tagline: "A member-owned credit union that puts its money to work in its own community.",
    why: "Banks on values: lending to local businesses, co-ops, affordable housing, and community organizations.",
    about: "Vancity is one of Canada's largest credit unions, owned by its members. It shares profits with members and communities and invests in social and environmental projects across BC.",
    city: "Vancouver", country: "CA", region: "North America", site: "vancity.com",
    founded: 1946, founders: [],
    tags: ["banking", "financial-inclusion", "co-op", "canada", "local-business", "housing"],
    discovery: "gem", featured: false, buyable: true
  },

  /* ────────────────────────── OPPORTUNITY ────────────────────────── */
  {
    id: "khan-academy", name: "Khan Academy", type: "brand", cat: "opportunity", areas: ["opportunity"],
    kind: "Free education",
    tagline: "Free, world-class education for anyone, anywhere.",
    why: "Started with a cousin who needed help with math. Grew into free lessons used by students in classrooms and kitchens worldwide.",
    about: "Khan Academy offers free courses in math, science, computing, and more, with practice exercises and an AI tutor (Khanmigo). It is a non-profit and works with school districts to support teachers.",
    city: "Mountain View", country: "US", region: "North America", site: "khanacademy.org",
    founded: 2008, founders: ["Sal Khan"], people: ["sal-khan"],
    tags: ["education", "learning", "free", "students", "online-learning", "technology"],
    discovery: "known", featured: true, buyable: true
  },
  {
    id: "sal-khan", name: "Sal Khan", type: "person", cat: "opportunity", areas: ["opportunity"],
    kind: "Educator & founder",
    tagline: "A hedge-fund analyst who started tutoring his cousin over YouTube — and never stopped.",
    why: "Showed how far one person's simple, generous idea can go when it's given away for free.",
    about: "Sal Khan founded Khan Academy and Khan Lab School, and has become one of the leading voices on how technology, including AI tutors, can personalize learning.",
    city: "Mountain View", country: "US", region: "North America", site: "khanacademy.org",
    role: "Founder, Khan Academy", links: ["khan-academy"],
    tags: ["founder", "education", "teacher", "author"],
    discovery: "known", featured: true, buyable: false
  },
  {
    id: "duolingo", name: "Duolingo", type: "brand", cat: "opportunity", areas: ["opportunity"],
    kind: "Language learning",
    tagline: "Free language lessons that feel like a game (with an owl who won't let you forget).",
    why: "Made language learning free and habit-forming for millions — and its English test opened a lower-cost route into universities.",
    about: "Duolingo teaches dozens of languages plus math and music. Its founder grew up in Guatemala and built it so access to learning wouldn't depend on money.",
    city: "Pittsburgh", country: "US", region: "North America", site: "duolingo.com",
    founded: 2011, founders: ["Luis von Ahn", "Severin Hacker"], people: ["luis-von-ahn"],
    tags: ["education", "languages", "learning", "free", "app", "online-learning"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "luis-von-ahn", name: "Luis von Ahn", type: "person", cat: "opportunity", areas: ["opportunity"],
    kind: "Computer scientist & founder",
    tagline: "The inventor of CAPTCHA who decided to make education free.",
    why: "Grew up in Guatemala seeing how access to English changed people's prospects, and designed Duolingo around that.",
    about: "A Carnegie Mellon professor and MacArthur Fellow, von Ahn co-invented CAPTCHA and reCAPTCHA before co-founding Duolingo.",
    city: "Pittsburgh", country: "US", region: "North America", site: "duolingo.com",
    role: "Co-founder, Duolingo", links: ["duolingo"],
    tags: ["founder", "education", "computer-science", "latin-america"],
    discovery: "rising", featured: false, buyable: false
  },
  {
    id: "kiva", name: "Kiva", type: "project", cat: "opportunity", areas: ["opportunity"],
    kind: "Crowdfunded microloans",
    tagline: "Lend as little as $25 to an entrepreneur on the other side of the world.",
    why: "Made lending personal: you choose the borrower, and repayments come back to lend again.",
    about: "Kiva is a non-profit that crowdfunds loans for small businesses, farmers, students, and refugees, working with field partners around the world.",
    city: "San Francisco", country: "US", region: "North America", site: "kiva.org",
    founded: 2005, founders: ["Matt Flannery", "Jessica Jackley", "Premal Shah"],
    tags: ["microfinance", "financial-inclusion", "entrepreneurship", "small-business", "lending"],
    discovery: "known", featured: true, buyable: true
  },
  {
    id: "shopify", name: "Shopify", type: "brand", cat: "opportunity", areas: ["opportunity"],
    kind: "Commerce platform",
    tagline: "The Ottawa-built platform that lets anyone start an online store this afternoon.",
    why: "Born when its founders couldn't find good software to sell snowboards. Now it's how millions of small businesses get started.",
    about: "Shopify provides tools for online stores, payments, and point of sale. It also co-founded the Frontier carbon removal commitment.",
    city: "Ottawa", country: "CA", region: "North America", site: "shopify.com",
    founded: 2006, founders: ["Tobias Lütke", "Scott Lake", "Daniel Weinand"],
    tags: ["entrepreneurship", "small-business", "canada", "technology", "startups"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "code-org", name: "Code.org", type: "project", cat: "opportunity", areas: ["opportunity"],
    kind: "CS education nonprofit",
    tagline: "Making sure every student gets the chance to learn computer science.",
    why: "Its Hour of Code got students around the world to try programming — and it trains teachers so schools can keep going.",
    about: "Code.org provides free curricula and teacher training and has advocated for computer science to be part of core education.",
    city: "Seattle", country: "US", region: "North America", site: "code.org",
    founded: 2013, founders: ["Hadi Partovi", "Ali Partovi"],
    tags: ["education", "computer-science", "students", "free", "youth", "technology"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "year-up", name: "Year Up", type: "project", cat: "opportunity", areas: ["opportunity"],
    kind: "Workforce development",
    tagline: "Training young adults for professional careers — and placing them in internships.",
    why: "Closes the gap between talented young people without degrees and employers who need skills.",
    about: "Year Up runs an intensive program of skills training and corporate internships, followed by job placement support, in cities across the United States.",
    city: "Boston", country: "US", region: "North America", site: "yearup.org",
    founded: 2000, founders: ["Gerald Chertavian"],
    tags: ["jobs", "employment", "skills", "youth", "workforce", "careers"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "pursuit", name: "Pursuit", type: "project", cat: "opportunity", areas: ["opportunity"],
    kind: "Tech training",
    tagline: "Turning adults without degrees into software engineers.",
    why: "Its income-share model means the program succeeds only when graduates land good jobs.",
    about: "Pursuit trains adults from low-income backgrounds in New York City in software engineering and AI, with job placement support.",
    city: "New York", country: "US", region: "North America", site: "pursuit.org",
    founded: 2011, founders: ["Jukay Hsu"],
    tags: ["jobs", "employment", "skills", "computer-science", "workforce", "careers"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "m-pesa", name: "M-Pesa", type: "brand", cat: "opportunity", areas: ["opportunity"],
    kind: "Mobile money",
    tagline: "Money transfers by text message, with no bank account required.",
    why: "Transformed financial access in Kenya and beyond, letting people send, save, and receive money with a basic phone.",
    about: "Launched by Safaricom and Vodafone, M-Pesa lets users store and transfer money via mobile phone through a network of agents. It's often cited as one of the most successful financial-inclusion innovations.",
    city: "Nairobi", country: "KE", region: "Africa", site: "safaricom.co.ke",
    founded: 2007, founders: [],
    tags: ["financial-inclusion", "banking", "mobile", "africa", "technology", "small-business"],
    discovery: "rising", featured: true, buyable: false
  },
  {
    id: "barefoot-college", name: "Barefoot College", type: "project", cat: "opportunity", areas: ["opportunity", "planet"],
    kind: "Rural skills training",
    tagline: "Training rural women — many of them grandmothers — to become solar engineers.",
    why: "Brings electricity to remote villages by trusting local people with the know-how, not just the hardware.",
    about: "Founded in Tilonia, Rajasthan, Barefoot College teaches practical skills to people in rural communities, with its solar program training women from many countries.",
    city: "Tilonia", country: "IN", region: "Asia", site: "barefootcollege.org",
    founded: 1972, founders: ["Bunker Roy"], people: ["bunker-roy"],
    tags: ["skills", "renewable-energy", "solar", "women", "rural", "education"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "bunker-roy", name: "Bunker Roy", type: "person", cat: "opportunity", areas: ["opportunity", "planet"],
    kind: "Founder & educator",
    tagline: "Went to India's elite schools, then built a college where degrees don't matter.",
    why: "Believes the knowledge to solve rural problems already lives in rural communities — it just needs to be taken seriously.",
    about: "Sanjit 'Bunker' Roy founded Barefoot College in 1972. It has trained people without formal education as solar engineers, teachers, and health workers.",
    city: "Tilonia", country: "IN", region: "Asia", site: "barefootcollege.org",
    role: "Founder, Barefoot College", links: ["barefoot-college"],
    tags: ["founder", "education", "rural", "solar"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "acumen", name: "Acumen", type: "project", cat: "opportunity", areas: ["opportunity"],
    kind: "Impact investor",
    tagline: "Patient capital for companies serving people living in poverty.",
    why: "Invests where traditional investors won't, backing businesses in energy, agriculture, health, and education for low-income customers.",
    about: "Acumen invests philanthropic capital in early-stage enterprises and runs leadership programs, including the Acumen Fellows and Acumen Academy.",
    city: "New York", country: "US", region: "North America", site: "acumen.org",
    founded: 2001, founders: ["Jacqueline Novogratz"], people: ["jacqueline-novogratz"],
    tags: ["impact-investing", "entrepreneurship", "leadership", "funding"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "jacqueline-novogratz", name: "Jacqueline Novogratz", type: "person", cat: "opportunity", areas: ["opportunity"],
    kind: "Founder & author",
    tagline: "Left banking, found her old sweater on a boy in Rwanda, and spent her life on the connections that implies.",
    why: "Coined a practical idea — 'patient capital' — that changed how a lot of people think about investing in poverty.",
    about: "Novogratz founded Acumen and wrote 'The Blue Sweater' and 'Manifesto for a Moral Revolution'.",
    city: "New York", country: "US", region: "North America", site: "acumen.org",
    role: "Founder, Acumen", links: ["acumen"],
    tags: ["founder", "impact-investing", "author"],
    discovery: "rising", featured: false, buyable: false
  },
  {
    id: "givedirectly", name: "GiveDirectly", type: "project", cat: "opportunity", areas: ["opportunity"],
    kind: "Direct cash transfers",
    tagline: "Sending money straight to people living in poverty, and letting them decide what to do with it.",
    why: "One of the most rigorously studied approaches in development — many of its programs are evaluated with randomized trials.",
    about: "GiveDirectly delivers unconditional cash transfers via mobile money in countries across Africa and elsewhere, and publishes research on the results.",
    city: "New York", country: "US", region: "North America", site: "givedirectly.org",
    founded: 2009, founders: ["Michael Faye", "Paul Niehaus", "Jeremy Shapiro", "Rohit Wanchoo"],
    tags: ["financial-inclusion", "research", "africa", "mobile", "transparency"],
    discovery: "rising", featured: false, buyable: false
  },
  {
    id: "homeboy-industries", name: "Homeboy Industries", type: "project", cat: "opportunity", areas: ["opportunity", "community"],
    kind: "Social enterprise",
    tagline: "Jobs, training, and support for people coming out of gangs and prison.",
    why: "Built on a simple idea from its founder: nothing stops a bullet like a job.",
    about: "Founded by Father Greg Boyle in Boyle Heights, Los Angeles, Homeboy runs social enterprises — including a bakery and café — alongside services like tattoo removal, therapy, and case management.",
    city: "Los Angeles", country: "US", region: "North America", site: "homeboyindustries.org",
    founded: 1988, founders: ["Greg Boyle"], people: ["greg-boyle"],
    tags: ["jobs", "employment", "second-chance", "social-enterprise", "food", "skills"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "greg-boyle", name: "Greg Boyle", type: "person", cat: "opportunity", areas: ["opportunity", "community"],
    kind: "Priest & founder",
    tagline: "A Jesuit priest who has spent decades walking alongside former gang members in LA.",
    why: "His philosophy of 'kinship' has influenced how people across the world think about rehabilitation and second chances.",
    about: "Father Greg Boyle founded Homeboy Industries and wrote 'Tattoos on the Heart'. Homeboy's model has inspired a network of similar organizations.",
    city: "Los Angeles", country: "US", region: "North America", site: "homeboyindustries.org",
    role: "Founder, Homeboy Industries", links: ["homeboy-industries"],
    tags: ["founder", "second-chance", "author"],
    discovery: "rising", featured: false, buyable: false
  },
  {
    id: "greyston", name: "Greyston Bakery", type: "brand", cat: "opportunity", areas: ["opportunity", "community"],
    kind: "Open-hiring bakery",
    tagline: "A bakery that hires anyone who walks in — no résumé, no interview, no background check.",
    why: "Pioneered Open Hiring®, and the brownies it bakes have ended up in a lot of famous ice cream.",
    about: "Greyston in Yonkers, New York, gives jobs to people facing barriers to employment, supplies brownies to Ben & Jerry's, and runs a center helping other companies adopt open hiring.",
    city: "Yonkers", country: "US", region: "North America", site: "greyston.org",
    founded: 1982, founders: ["Bernie Glassman"],
    tags: ["jobs", "employment", "open-hiring", "second-chance", "food", "social-enterprise", "b-corp"],
    discovery: "gem", featured: true, buyable: true
  },
  {
    id: "andela", name: "Andela", type: "brand", cat: "opportunity", areas: ["opportunity"],
    kind: "Global tech talent",
    tagline: "Connecting brilliant engineers across Africa and beyond with companies around the world.",
    why: "Bet that talent is evenly distributed while opportunity isn't — and built a marketplace around that bet.",
    about: "Andela started in Lagos training software developers and evolved into a global talent marketplace placing remote engineers with companies.",
    city: "Lagos", country: "NG", region: "Africa", site: "andela.com",
    founded: 2014, founders: [],
    tags: ["jobs", "computer-science", "africa", "careers", "remote-work", "technology"],
    discovery: "rising", featured: false, buyable: false
  },
  {
    id: "hot-bread-kitchen", name: "Hot Bread Kitchen", type: "project", cat: "opportunity", areas: ["opportunity", "community"],
    kind: "Culinary workforce program",
    tagline: "Job training and career paths in food, built for women and people facing barriers to work.",
    why: "Started as a bakery celebrating immigrant women's traditional breads and grew into a launchpad for food careers and businesses.",
    about: "Hot Bread Kitchen runs culinary training, job placement, and an incubator for food entrepreneurs in New York City.",
    city: "New York", country: "US", region: "North America", site: "hotbreadkitchen.org",
    founded: 2008, founders: ["Jessamyn Rodriguez"],
    tags: ["jobs", "skills", "women", "food", "entrepreneurship", "immigrants"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "j-pal", name: "J-PAL", type: "project", cat: "opportunity", areas: ["opportunity", "health"],
    kind: "Research lab",
    tagline: "Testing which anti-poverty programs actually work, using randomized evaluations.",
    why: "Brought scientific rigour to doing good; its co-founders shared the 2019 Nobel Prize in Economics.",
    about: "The Abdul Latif Jameel Poverty Action Lab at MIT runs and synthesizes randomized evaluations across education, health, and finance, and helps governments scale what works.",
    city: "Cambridge", country: "US", region: "North America", site: "povertyactionlab.org",
    founded: 2003, founders: ["Abhijit Banerjee", "Esther Duflo", "Sendhil Mullainathan"],
    tags: ["research", "evidence", "policy", "education", "financial-inclusion"],
    discovery: "gem", featured: false, buyable: false
  },

  /* ─────────────────────── MORE DISCOVERIES ─────────────────────── */
  {
    id: "community-fridges", name: "Community Fridges", type: "project", cat: "community", areas: ["community", "planet", "health"],
    kind: "Neighbourhood mutual aid",
    tagline: "Public fridges on sidewalks where anyone can leave food and anyone can take it.",
    why: "A low-tech, high-trust idea that has spread through neighbourhoods in Toronto, New York, Vancouver, and many other cities.",
    about: "Community fridges are typically hosted by a local business and stocked by neighbours, restaurants, and grocers. Volunteers keep them clean and full.",
    city: "Many cities", country: "CA", region: "North America", site: "",
    founded: 2020, founders: [],
    tags: ["food-access", "food-waste", "neighbourhood", "mutual-aid", "canada", "volunteering"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "ten-thousand-villages", name: "Ten Thousand Villages", type: "brand", cat: "opportunity", areas: ["opportunity", "community"],
    kind: "Fair-trade retailer",
    tagline: "Handmade goods from artisans around the world, sold under fair-trade principles.",
    why: "One of the earliest fair-trade retailers, connecting artisans with stable income and long-term relationships.",
    about: "Ten Thousand Villages began with one woman selling needlework from Puerto Rico out of her car. It has stores across Canada and the US, many supported by volunteers.",
    city: "Pennsylvania", country: "US", region: "North America", site: "tenthousandvillages.com",
    founded: 1946, founders: ["Edna Ruth Byler"],
    tags: ["fair-trade", "artisans", "gifts", "retail", "canada", "income"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "ocean-wise", name: "Ocean Wise", type: "project", cat: "planet", areas: ["planet"],
    kind: "Ocean conservation",
    tagline: "A Vancouver-based ocean conservation organization, from seafood guides to shoreline cleanups.",
    why: "Gives people practical ways to protect oceans — choosing sustainable seafood, joining shoreline cleanups, reducing plastic.",
    about: "Ocean Wise runs the Great Canadian Shoreline Cleanup with partners, a sustainable seafood program, and ocean research and education initiatives.",
    city: "Vancouver", country: "CA", region: "North America", site: "ocean.org",
    founders: [],
    tags: ["ocean", "conservation", "seafood", "canada", "volunteering", "plastic"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "good-food-institute", name: "Good Food Institute", type: "project", cat: "planet", areas: ["planet", "health"],
    kind: "Alternative protein nonprofit",
    tagline: "Open-access research and support for the people building the next generation of protein.",
    why: "Acts like infrastructure for an entire field: funding open research and helping startups and scientists in plant-based, fermented, and cultivated foods.",
    about: "GFI is a non-profit with affiliates in several countries that publishes research and works with scientists, entrepreneurs, and policymakers on alternative proteins.",
    city: "Washington, D.C.", country: "US", region: "North America", site: "gfi.org",
    founded: 2016, founders: ["Bruce Friedrich"],
    tags: ["food-systems", "plant-based", "research", "climate", "startups"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "rewilding-europe", name: "Rewilding Europe", type: "project", cat: "planet", areas: ["planet"],
    kind: "Rewilding",
    tagline: "Bringing back wild landscapes — and wild animals — across Europe.",
    why: "Instead of just protecting what's left, it helps nature recover: reintroducing bison and other species, and backing nature-based local businesses.",
    about: "Rewilding Europe works in landscapes across the continent, restoring natural processes and supporting enterprises that benefit from wilder land.",
    city: "Nijmegen", country: "NL", region: "Europe", site: "rewildingeurope.com",
    founded: 2011, founders: [],
    tags: ["biodiversity", "conservation", "rewilding", "nature"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "habitat", name: "Habitat for Humanity", type: "project", cat: "community", areas: ["community", "opportunity"],
    kind: "Affordable housing",
    tagline: "Building affordable homes alongside the families who will live in them.",
    why: "Homebuyers help build their own homes and pay an affordable mortgage — a hand up rather than a handout. Its ReStores keep building materials in use.",
    about: "Habitat for Humanity works in many countries, including Canada, building and repairing homes with volunteers and running ReStores that resell donated furniture and building supplies.",
    city: "Americus", country: "US", region: "North America", site: "habitat.org",
    founded: 1976, founders: ["Millard Fuller", "Linda Fuller"],
    tags: ["housing", "volunteering", "affordable", "cities", "circular"],
    discovery: "known", featured: false, buyable: true
  },
  {
    id: "hello-tractor", name: "Hello Tractor", type: "brand", cat: "opportunity", areas: ["opportunity", "planet"],
    kind: "Agtech",
    tagline: "'Uber for tractors': helping small farmers in Africa book tractor services by phone.",
    why: "Gives smallholder farmers access to mechanization without having to buy a tractor, and helps tractor owners earn more.",
    about: "Hello Tractor connects tractor owners with farmers through a booking platform and tracking technology, operating in several African countries.",
    city: "Abuja", country: "NG", region: "Africa", site: "hellotractor.com",
    founded: 2014, founders: ["Jehiel Oliver"],
    tags: ["agriculture", "farmers", "africa", "technology", "income", "small-business"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "m-kopa", name: "M-KOPA", type: "brand", cat: "opportunity", areas: ["opportunity", "planet"],
    kind: "Pay-as-you-go finance",
    tagline: "Smartphones, solar, and electric motorbikes paid off in small daily amounts.",
    why: "Turns daily micro-payments into ownership, giving many customers their first credit history.",
    about: "Starting with pay-as-you-go solar home systems in Kenya, M-KOPA now finances smartphones, e-motorbikes, and other essentials across several African countries.",
    city: "Nairobi", country: "KE", region: "Africa", site: "m-kopa.com",
    founded: 2011, founders: ["Jesse Moore", "Nick Hughes", "Chad Larson"],
    tags: ["financial-inclusion", "solar", "africa", "mobile", "renewable-energy", "technology"],
    discovery: "gem", featured: false, buyable: false
  },
  {
    id: "conceptos-plasticos", name: "Conceptos Plásticos", type: "brand", cat: "planet", areas: ["planet", "community"],
    kind: "Building materials",
    tagline: "Lego-like bricks made from recycled plastic, used to build homes and classrooms.",
    why: "Turns plastic waste into low-cost, quickly assembled shelters and schools in Colombia and beyond.",
    about: "Conceptos Plásticos, from Bogotá, recycles plastic and rubber into interlocking building blocks that can be assembled without specialized labour.",
    city: "Bogotá", country: "CO", region: "Latin America", site: "conceptosplasticos.com",
    founded: 2011, founders: ["Óscar Méndez"],
    tags: ["plastic", "recycling", "housing", "construction", "latin-america", "circular"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "kheyti", name: "Kheyti", type: "brand", cat: "opportunity", areas: ["opportunity", "planet"],
    kind: "Smallholder farming tech",
    tagline: "Low-cost 'greenhouse-in-a-box' kits for small farmers in India.",
    why: "Helps smallholders grow more with less water and protects crops from extreme weather — a practical tool for climate adaptation.",
    about: "Kheyti's modular greenhouses come with training and market linkages, helping small farmers raise incomes. It won an Earthshot Prize in 2022.",
    city: "Hyderabad", country: "IN", region: "Asia", site: "kheyti.com",
    founded: 2015, founders: [],
    tags: ["agriculture", "farmers", "climate", "income", "india", "startups"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "notpla", name: "Notpla", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Seaweed packaging",
    tagline: "Packaging made from seaweed that disappears naturally.",
    why: "Replaces some of the hardest single-use plastics — sauce sachets, takeaway box linings — with something that composts.",
    about: "London-based Notpla makes packaging from seaweed and plants, used by food delivery companies and events. It won an Earthshot Prize in 2022.",
    city: "London", country: "GB", region: "Europe", site: "notpla.com",
    founded: 2014, founders: ["Rodrigo García González", "Pierre Paslier"],
    tags: ["packaging", "plastic-free", "seaweed", "materials", "compostable", "startups"],
    discovery: "gem", featured: true, buyable: false
  },
  {
    id: "loop", name: "Loop", type: "brand", cat: "planet", areas: ["planet"],
    kind: "Reusable packaging",
    tagline: "Everyday products in durable containers that get returned, cleaned, and refilled.",
    why: "Tests whether the milkman model can work for modern brands at scale.",
    about: "Launched by TerraCycle, Loop partners with brands and retailers to offer products in reusable packaging with return-and-refill systems.",
    city: "Trenton", country: "US", region: "North America", site: "exploreloop.com",
    founded: 2019, founders: ["Tom Szaky"],
    tags: ["reuse", "packaging", "refill", "circular", "waste"],
    discovery: "rising", featured: false, buyable: true
  },
  {
    id: "earthshot-prize", name: "Earthshot Prize", type: "project", cat: "planet", areas: ["planet"],
    kind: "Global prize",
    tagline: "A prize built to find and scale the most promising solutions to environmental problems.",
    why: "A great discovery engine in its own right: every year, a new set of finalists most people have never heard of.",
    about: "The Earthshot Prize awards innovators across five categories each year — protecting nature, clean air, oceans, waste-free living, and climate — and helps finalists scale.",
    city: "London", country: "GB", region: "Europe", site: "earthshotprize.org",
    founded: 2020, founders: [],
    tags: ["climate", "innovation", "startups", "awards", "ocean", "biodiversity"],
    discovery: "rising", featured: false, buyable: false
  },
  {
    id: "refill", name: "Refill", type: "project", cat: "planet", areas: ["planet", "community"],
    kind: "Water refill network",
    tagline: "An app that maps cafés and shops happy to refill your water bottle for free.",
    why: "Makes skipping bottled water easy by showing you every nearby tap that welcomes you.",
    about: "Started by City to Sea in Bristol, Refill lists thousands of refill stations and has expanded to food, coffee cups, and other reusables.",
    city: "Bristol", country: "GB", region: "Europe", site: "refill.org.uk",
    founded: 2015, founders: [],
    tags: ["plastic-free", "refill", "app", "local-business", "water"],
    discovery: "gem", featured: false, buyable: true
  },
  {
    id: "students-on-ice", name: "Students on Ice", type: "project", cat: "community", areas: ["community", "planet", "opportunity"],
    kind: "Youth expeditions",
    tagline: "Taking students on expeditions to the Arctic and Antarctic to inspire the next generation of leaders.",
    why: "Puts young people — including many Inuit and Indigenous youth — face to face with the polar regions alongside scientists and Elders.",
    about: "Founded by Canadian educator Geoff Green, Students on Ice runs ship-based educational expeditions focused on climate, culture, and leadership.",
    city: "Gatineau", country: "CA", region: "North America", site: "studentsonice.com",
    founded: 2000, founders: ["Geoff Green"],
    tags: ["youth", "education", "climate", "arctic", "canada", "outdoors", "leadership"],
    discovery: "gem", featured: false, buyable: true
  }
];
