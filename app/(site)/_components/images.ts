// Single source of truth for marketing photography.
// Every key is used in exactly one place on the site, so no photo repeats.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export const photos = {
  // Home
  homeHero: { src: unsplash("1555244162-803834f70033"), alt: "Catering buffet with chafing dishes ready to serve" },
  homeOrganizers: { src: unsplash("1469371670807-013ccf25f16a"), alt: "Outdoor wedding aisle decorated with flowers" },
  homeSuppliers: { src: unsplash("1600565193348-f74bd3c7ccdf"), alt: "Chef cooking over an open flame in a professional kitchen" },
  homeTrust: { src: unsplash("1511795409834-ef04bbd61622"), alt: "Elegant banquet table set for guests" },
  homeGuests: { src: unsplash("1528605248644-14dd04022da1"), alt: "Guests enjoying a meal together" },
  homeCta: { src: unsplash("1563379091339-03b21ab4a4f8"), alt: "Biryani served in a brass pot" },

  // For Organizers
  orgHero: { src: unsplash("1519167758481-83f550bb49b3"), alt: "Grand banquet hall set for a reception" },
  orgWeddings: { src: unsplash("1583939003579-730e3918a45a"), alt: "Wedding couple celebrating with guests" },
  orgCorporate: { src: unsplash("1561489413-985b06da5bee"), alt: "Corporate event with attendees at tables" },
  orgPrivate: { src: unsplash("1530103862676-de8c9debad1d"), alt: "Colourful balloons at a private celebration" },
  orgToast: { src: unsplash("1527529482837-4698179dc6ce"), alt: "Friends raising a toast at an evening party" },
  orgCta: { src: unsplash("1585937421612-70a008356fbe"), alt: "Bowls of rich curry ready for service" },

  // For Suppliers
  supHero: { src: unsplash("1581299894007-aaa50297cf16"), alt: "Smiling chef in uniform" },
  supCooks: { src: unsplash("1577219491135-ce391730fb2c"), alt: "Cook finishing a dish under warm kitchen lights" },
  supHelpers: { src: unsplash("1551218808-94e220e084d2"), alt: "Kitchen helper chopping fresh vegetables" },
  supServers: { src: unsplash("1414235077428-338989a2e8c0"), alt: "Plated dinner being served at a table" },
  supCta: { src: unsplash("1596797038530-2c107229654b"), alt: "Curry simmering in a large pan" },

  // How It Works
  howHero: { src: unsplash("1576867757603-05b134ebc379"), alt: "Overhead view of a shared table full of dishes" },
  howOrganizer: { src: unsplash("1515169067868-5387ec356754"), alt: "Event organizers talking at a gathering" },
  howSupplier: { src: unsplash("1528712306091-ed0763094c98"), alt: "Cook stirring food in a pan" },
  howCta: { src: unsplash("1631515243349-e0cb75fb8d3a"), alt: "Bowl of chicken biryani with raita" },

  // About
  aboutHero: { src: unsplash("1556910103-1c02745aae4d"), alt: "People cooking together in a bright kitchen" },
  aboutStory: { src: unsplash("1547573854-74d2a71d0826"), alt: "Table spread with many shared plates" },
  aboutVenue: { src: unsplash("1464366400600-7168b8af9bc3"), alt: "Event tent with tables laid for guests" },
  aboutCta: { src: unsplash("1600891964599-f61ba0e24092"), alt: "Table laden with dishes ready to share" },

  // Contact
  contactSide: { src: unsplash("1601050690597-df0568f70950"), alt: "Freshly made samosas with chutney" },
} as const;

export type PhotoKey = keyof typeof photos;
