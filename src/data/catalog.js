function paint(id, name, highlight, frame, shadow, back, wallpaper, darkText) {
  return { id, name, highlight, frame, shadow, back, wallpaper, darkText };
}

const finishes = {
  burgundy: paint("burgundy", "Burgundy", "#c47284", "#6e3142", "#3a1824", "#5c2836", ["#7a3044", "#3a1520", "#1a0a10"], false),
  glacier: paint("glacier", "Glacier", "#f4f8fb", "#c5d4e2", "#7f9eb3", "#d7e4ef", ["#e7f3fb", "#8eb4cc", "#f7fbfe"], true),
  silver: paint("silver", "Silver", "#ffffff", "#d8d8de", "#8e8e93", "#e8e8ed", ["#f5f5f7", "#c5ced8", "#eef2f6"], true),
  black: paint("black", "Black", "#4a4a4e", "#1d1d1f", "#000000", "#1a1a1c", ["#2c2c2e", "#1c1c1e", "#0a0a0c"], false),
  night: paint("night", "Night Sky", "#4d5e78", "#1c2633", "#0b1016", "#17202b", ["#243044", "#121820", "#0c1016"], false),
  star: paint("star", "Star White", "#ffffff", "#f3f0ea", "#c9c2b6", "#f7f4ef", ["#fbfaf7", "#e7e2da", "#f7f4ef"], true),
  sky: paint("sky", "Sky Blue", "#f5fbff", "#c5dceb", "#7ea8c4", "#d4e7f3", ["#d7ecf8", "#8fb8d4", "#f3f9fc"], true),
  gold: paint("gold", "Light Gold", "#fff8ea", "#e6d3b0", "#b89a68", "#efe0c4", ["#f3e6cf", "#e2c99a", "#fbf6ee"], true),
  cloud: paint("cloud", "Cloud White", "#ffffff", "#f2f2f0", "#c8c8c4", "#f7f7f5", ["#f7f7f5", "#e6e6e3", "#fbfbfa"], true),
  space: paint("space", "Space Black", "#3a3a3c", "#1c1c1e", "#000000", "#141416", ["#2a2a2c", "#111113", "#050506"], false),
  lavender: paint("lavender", "Lavender", "#f8f4fc", "#ddd2ee", "#a894c4", "#e6dcf4", ["#e6dcf3", "#c4b3dc", "#f7f3fb"], true),
  sage: paint("sage", "Sage", "#f7faf3", "#d5dccb", "#8f9b84", "#e3eadc", ["#e3eadc", "#b7c4ae", "#f6f8f3"], true),
  mist: paint("mist", "Mist Blue", "#f7fbfc", "#d5e1e8", "#8aa3b0", "#e2ebf0", ["#dce8ee", "#b7c9d4", "#f4f8fa"], true),
  white: paint("white", "White", "#ffffff", "#f2f2f4", "#c6c6c8", "#f7f7f8", ["#f6f6f7", "#e4e4e6", "#fbfbfb"], true),
  pink: paint("pink", "Pink", "#fff6f8", "#f3d5dc", "#c992a0", "#f8e4ea", ["#f8e0e7", "#e7b7c4", "#fff6f8"], true),
  ultra: paint("ultra", "Ultramarine", "#8ea0e0", "#3a4c96", "#1a2458", "#2f3f86", ["#3d4e98", "#1e2754", "#12162e"], false),
  teal: paint("teal", "Teal", "#f3fbf9", "#b7ddd6", "#6ea79c", "#cfe8e2", ["#cfe7e2", "#8fbfb6", "#f3faf8"], true),
};

const carrierNote =
  "Advertised price includes a carrier connectivity discount. Paying without that activation costs more.";

export const phones = [
  {
    slug: "iphone-18-pro",
    name: "iPhone 18 Pro",
    tagline: "A pro camera, with aperture you can set.",
    summary:
      "Three 48MP cameras sit on a full-width plateau. The main camera changes aperture, telephoto reaches 8x optical quality, and A20 Pro keeps up.",
    category: "pro",
    variant: "pro",
    badge: "New",
    colors: [finishes.burgundy, finishes.glacier, finishes.silver, finishes.black],
    storage: [
      { id: "256", label: "256GB", price: 1199 },
      { id: "512", label: "512GB", price: 1399 },
      { id: "1tb", label: "1TB", price: 1799 },
      { id: "2tb", label: "2TB", price: 2399 },
    ],
    highlights: ["6.3″ ProMotion", "A20 Pro", "Triple 48MP"],
    specs: [
      { label: "Display", value: "6.3-inch OLED, ProMotion 120Hz" },
      { label: "Chip", value: "A20 Pro, 6-core CPU, 7-core GPU" },
      { label: "Camera", value: "Triple 48MP. 4x telephoto, up to 8x optical-quality zoom" },
      { label: "Front camera", value: "18MP Center Stage" },
      { label: "Battery", value: "Up to 36 hours of video playback" },
      { label: "Resistance", value: "IP68 water and dust resistance" },
    ],
  },
  {
    slug: "iphone-18-pro-max",
    name: "iPhone 18 Pro Max",
    tagline: "The longest battery, and the largest Pro display.",
    summary:
      "Same triple 48MP camera system as the 18 Pro, on a 6.9-inch canvas. Video playback is rated up to 45 hours.",
    category: "pro",
    variant: "pro",
    badge: "New",
    colors: [finishes.glacier, finishes.silver, finishes.black, finishes.burgundy],
    storage: [
      { id: "256", label: "256GB", price: 1299 },
      { id: "512", label: "512GB", price: 1499 },
      { id: "1tb", label: "1TB", price: 1899 },
      { id: "2tb", label: "2TB", price: 2499 },
    ],
    highlights: ["6.9″ display", "Up to 45 hrs", "Triple 48MP"],
    specs: [
      { label: "Display", value: "6.9-inch OLED, ProMotion 120Hz" },
      { label: "Chip", value: "A20 Pro, 6-core CPU, 7-core GPU" },
      { label: "Camera", value: "Triple 48MP. 4x telephoto, up to 8x optical-quality zoom" },
      { label: "Front camera", value: "18MP Center Stage" },
      { label: "Battery", value: "Up to 45 hours of video playback" },
      { label: "Resistance", value: "IP68 water and dust resistance" },
    ],
  },
  {
    slug: "iphone-duo",
    name: "iPhone Duo",
    tagline: "Fold it shut. Open a 7.6-inch display.",
    summary:
      "Closed, it is a short, wide phone with a 5.4-inch outer display. Open, the inner display is 7.6 inches and the body is 5.2 mm thick. Dual 48MP cameras and A20 Pro.",
    category: "fold",
    variant: "duo",
    badge: "Foldable",
    colors: [finishes.night, finishes.star],
    storage: [
      { id: "256", label: "256GB", price: 1999 },
      { id: "512", label: "512GB", price: 2199 },
      { id: "1tb", label: "1TB", price: 2599 },
      { id: "2tb", label: "2TB", price: 3199 },
    ],
    highlights: ["7.6″ inner display", "A20 Pro", "5.2 mm open"],
    specs: [
      { label: "Display", value: "5.4-inch outer and 7.6-inch inner OLED, ProMotion 120Hz" },
      { label: "Chip", value: "A20 Pro, 6-core CPU, 7-core GPU" },
      { label: "Camera", value: "Dual 48MP, Main and Ultra Wide" },
      { label: "Front camera", value: "12MP Center Stage outer, under-display inner" },
      { label: "Battery", value: "Up to 44 hours of video playback on the outer display" },
      { label: "Design", value: "Titanium frame, 254 g. 5.2 mm open, 11.3 mm folded" },
    ],
  },
  {
    slug: "iphone-air",
    name: "iPhone Air",
    tagline: "Thin in the hand. Full-size on the table.",
    summary:
      "A 6.5-inch ProMotion display and A19 Pro in an ultra-thin body. One 48MP camera keeps the back quiet.",
    category: "air",
    variant: "air",
    badge: "Thin",
    colors: [finishes.sky, finishes.gold, finishes.cloud, finishes.space],
    storage: [
      { id: "256", label: "256GB", price: 1099 },
      { id: "512", label: "512GB", price: 1299 },
      { id: "1tb", label: "1TB", price: 1699 },
    ],
    highlights: ["6.5″ ProMotion", "A19 Pro", "48MP camera"],
    specs: [
      { label: "Display", value: "6.5-inch OLED, ProMotion 120Hz" },
      { label: "Chip", value: "A19 Pro" },
      { label: "Camera", value: "48MP Fusion main camera, 2x optical-quality crop" },
      { label: "Front camera", value: "18MP Center Stage" },
      { label: "Battery", value: "Up to 27 hours of video playback" },
      { label: "Resistance", value: "IP68 water and dust resistance" },
    ],
  },
  {
    slug: "iphone-17",
    name: "iPhone 17",
    tagline: "The balanced iPhone.",
    summary:
      "ProMotion, Always-On, dual 48MP cameras, and the A19 chip. A strong everyday phone if you do not need telephoto.",
    category: "everyday",
    variant: "dual",
    colors: [finishes.lavender, finishes.sage, finishes.mist, finishes.white, finishes.black],
    storage: [
      { id: "256", label: "256GB", price: 899 },
      { id: "512", label: "512GB", price: 1099 },
    ],
    priceNote: carrierNote,
    highlights: ["6.3″ ProMotion", "A19", "Dual 48MP"],
    specs: [
      { label: "Display", value: "6.3-inch OLED, ProMotion 120Hz, Always-On" },
      { label: "Chip", value: "A19" },
      { label: "Camera", value: "Dual 48MP, Main and Ultra Wide" },
      { label: "Front camera", value: "18MP Center Stage" },
      { label: "Battery", value: "Up to 30 hours of video playback" },
      { label: "Resistance", value: "IP68 water and dust resistance" },
    ],
  },
  {
    slug: "iphone-17e",
    name: "iPhone 17e",
    tagline: "The essentials, starting at 256GB.",
    summary:
      "A 6.1-inch display, A19, and a 48MP camera. It skips ProMotion, the ultra-wide camera, and Camera Control.",
    category: "everyday",
    variant: "single",
    colors: [finishes.white, finishes.black, finishes.pink],
    storage: [
      { id: "256", label: "256GB", price: 699 },
      { id: "512", label: "512GB", price: 899 },
    ],
    highlights: ["6.1″ display", "A19", "From 256GB"],
    specs: [
      { label: "Display", value: "6.1-inch OLED" },
      { label: "Chip", value: "A19" },
      { label: "Camera", value: "48MP Fusion main camera, 2x crop" },
      { label: "Front camera", value: "12MP TrueDepth" },
      { label: "Battery", value: "Up to 26 hours of video playback" },
      { label: "Resistance", value: "IP68 water and dust resistance" },
    ],
  },
  {
    slug: "iphone-16",
    name: "iPhone 16",
    tagline: "Still in the lineup. One storage size.",
    summary:
      "A18, a 6.1-inch display, and a 48MP main camera with a 12MP ultra-wide. Sold here in 128GB.",
    category: "everyday",
    variant: "dual",
    colors: [finishes.ultra, finishes.teal, finishes.pink, finishes.white, finishes.black],
    storage: [{ id: "128", label: "128GB", price: 799 }],
    priceNote: carrierNote,
    highlights: ["6.1″ display", "A18", "128GB"],
    specs: [
      { label: "Display", value: "6.1-inch OLED" },
      { label: "Chip", value: "A18" },
      { label: "Camera", value: "48MP main, 12MP Ultra Wide" },
      { label: "Front camera", value: "12MP TrueDepth" },
      { label: "Battery", value: "Up to 22 hours of video playback" },
      { label: "Resistance", value: "IP68 water and dust resistance" },
    ],
  },
];

export const accessories = [
  {
    id: "silicone-case",
    name: "Silicone Case",
    blurb: "Soft-touch case with a raised camera lip and magnetic alignment.",
    price: 49,
    kind: "case",
    colors: [finishes.burgundy, finishes.glacier, finishes.black, finishes.cloud],
  },
  {
    id: "clear-case",
    name: "Clear Case",
    blurb: "A transparent shell that shows the finish you picked.",
    price: 49,
    kind: "clear",
    colors: [finishes.cloud],
  },
  {
    id: "magnetic-charger",
    name: "Magnetic Charger",
    blurb: "A puck that snaps to the magnetic ring on iPhone for wireless charging.",
    price: 39,
    kind: "charger",
    colors: [finishes.white],
  },
  {
    id: "usbc-cable",
    name: "USB-C Charge Cable",
    blurb: "One-meter USB-C cable for charging and data.",
    price: 19,
    kind: "cable",
    colors: [finishes.white],
  },
  {
    id: "magnetic-battery",
    name: "Magnetic Battery",
    blurb: "A slim pack that attaches to the back when you need more hours.",
    price: 99,
    kind: "battery",
    colors: [finishes.white],
  },
];

export const shop = {
  name: "Osric",
  phone: "(415) 555-0198",
  phoneHref: "tel:+14155550198",
  email: "hello@osric.example",
  street: "100 Market Street",
  city: "San Francisco, CA 94105",
  hours: [
    ["Monday – Friday", "10:00 – 19:00"],
    ["Saturday", "10:00 – 18:00"],
    ["Sunday", "11:00 – 17:00"],
  ],
};

export const promos = {
  OSRIC10: { label: "10% off the bag", rate: 0.1 },
  STUDENT: { label: "5% student offer", rate: 0.05 },
};

export const FINANCE_MONTHS = 24;

export function formatPrice(value) {
  const cents = Math.round(Math.abs(value) * 100) % 100 !== 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(value);
}

export function getPhone(slug) {
  return phones.find((phone) => phone.slug === slug) ?? null;
}

export function startingPrice(product) {
  return product.storage[0].price;
}
