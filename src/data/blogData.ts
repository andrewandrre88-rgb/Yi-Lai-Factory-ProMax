import type { SocialMediaLinks } from '../components/SocialLinksBar';

export type BlogCategory =
  | 'Engineering'
  | 'Manufacturing'
  | 'Quality Control'
  | 'Packaging Trends'
  | 'Export & Logistics';

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  'Engineering',
  'Manufacturing',
  'Quality Control',
  'Packaging Trends',
  'Export & Logistics',
] as const;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  coverImage: string;
  authorName: string;
  readTime: string;
  tags: string[];
  status: 'published' | 'draft';
  publishedAt: string;
  isEdited?: boolean;
  socialLinks?: SocialMediaLinks;
}

export const STUDIO_IMAGE_PRESETS: ReadonlyArray<{ label: string; src: string }> = [
  { label: 'Trigger Sprayer Studio', src: '/src/assets/images/product_trigger_sprayer_1795008502569.jpg' },
  { label: 'Mini Trigger Studio', src: '/src/assets/images/product_mini_trigger_1795008502797.jpg' },
  { label: 'Foam Trigger Studio', src: '/src/assets/images/product_foam_trigger_1795008503693.jpg' },
  { label: 'Lotion Pump Studio', src: '/src/assets/images/product_lotion_pump_1795008503779.jpg' },
  { label: 'Fine Mist Sprayer Studio', src: '/src/assets/images/product_fine_mist_1795008505359.jpg' },
  { label: 'Bottle Caps & Closures', src: '/src/assets/images/product_bottle_caps_1795008504005.jpg' },
  { label: 'Nozzle & Valve Close-Up', src: '/src/assets/images/detail_nozzle_closeup_1795008701972.jpg' },
  { label: 'Pump Mechanism Anatomy', src: '/src/assets/images/detail_pump_mechanism_1795008703095.jpg' },
  { label: 'Mounted Bottle Pairing', src: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg' },
  { label: '60° Spray QC Bench', src: '/src/assets/images/detail_qc_spray_test_1795008705224.jpg' },
  { label: 'Injection Moulding Hall', src: '/src/assets/images/factory_injection_moulding_1795005762839.jpg' },
  { label: 'Automatic Assembly Line', src: '/src/assets/images/factory_assembly_line_1795005763368.jpg' },
  { label: 'Export Packing & Ningbo', src: '/src/assets/images/factory_export_packaging_1795005763378.jpg' },
  { label: 'Yuyao Factory Campus', src: '/assets/aistudio/Modern_Factory_Entrance_with_Corporate_Signage_7fb1e225.png' },
];

export const STARTER_BLOG_POSTS: BlogPost[] = [
  {
    id: 'selecting-304-vs-316-springs-for-bleach-and-cleaners',
    slug: 'selecting-304-vs-316-springs-for-bleach-and-cleaners',
    title: 'Selecting 304 vs 316 Stainless Steel Springs for Household & Chemical Cleaners',
    excerpt:
      'Why choosing the wrong spring alloy causes premature trigger failure in alkaline degreasers and chlorine formulas — and how external non-contact chambers extend shelf life.',
    content: `One of the most frequent failure modes importers report in low-cost trigger sprayers has nothing to do with the shroud or trigger lever — it happens inside the compression chamber when aggressive cleaning formulas attack the return spring.

At Yi Lai Plastics Industry in Yuyao, we evaluate every buyer's liquid chemistry before recommending a spring and gasket pairing. For standard pH-neutral glass cleaners, alcohol sanitizers, and mild surface disinfectants, our 304 stainless steel spring housed in an external non-contact chamber provides crisp, smooth return force across more than 10,000 actuations.

However, sodium hypochlorite (bleach), bathroom acid descalers, and high-alkaline oven or wheel degreasers require upgraded protection. Even small trace vapours inside the chamber will pit standard 304 wire over six to twelve months in transit or retail storage. For those lines, our YL-TS28C and YL-FT28H chemical-grade sprayers pair 316 marine-grade stainless steel springs with FKM or EPDM valve seals — or our all-plastic metal-free valving option for extreme oxidizers.

Before approving bulk PO tooling, always request an immersion test using your exact finished liquid at 40°C for 14 days alongside our -0.06 MPa vacuum leak inspection.`,
    category: 'Engineering',
    coverImage: '/src/assets/images/detail_nozzle_closeup_1795008701972.jpg',
    authorName: 'Yi Lai Tooling Engineering Team',
    readTime: '4 min read',
    tags: ['316 SS Spring', 'Chemical Resistance', 'Trigger Sprayers'],
    status: 'published',
    publishedAt: '2026-11-12',
  },
  {
    id: 'spi-bottle-neck-finish-guide-28-400-vs-28-410',
    slug: 'spi-bottle-neck-finish-guide-28-400-vs-28-410',
    title: 'SPI Bottle Neck Finishes Explained: Matching 24/410, 28/400 & 28/410 Closures',
    excerpt:
      'A practical importer guide to measuring neck diameter and thread turns so your trigger sprayers, lotion pumps, and flip-top caps seal without leaks.',
    content: `Ordering 50,000 trigger sprayers only to discover the skirt bottoms out a millimetre above your PET bottle shoulder — or fails to compress the PE liner — is an avoidable supply chain headache. Understanding the two numbers in an SPI neck specification prevents thread mismatches every time.

The first number (18, 20, 24, 28, or 33) represents the outer diameter of the bottle threads in millimetres. The second number (400, 410, or 415) indicates thread height and number of turns:
• 400 neck: Shallow skirt with 1.0 thread turn — common on US-style Trigger Sprayers (28/400) and wide-mouth detergent bottles.
• 410 neck: Medium height with 1.5 thread turns — the global workhorse for Shampoo Lotion Pumps (24/410, 28/410) and Trigger Sprayers.
• 415 neck: Tall collar with 2.0 full turns — favored in slim cosmetic fine mist bottles (18/415, 20/415).

At Yi Lai Plastics, our in-house extrusion lines also angle-cut dip tubes to match your exact bottle height to within ±1.0 mm, ensuring minimal residual waste at the bottom corner of your container.`,
    category: 'Quality Control',
    coverImage: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg',
    authorName: 'QC & Compatibility Lab',
    readTime: '5 min read',
    tags: ['SPI Threads', '28/410', '28/400', 'Dip Tube'],
    status: 'published',
    publishedAt: '2026-11-05',
  },
  {
    id: 'pantone-colour-matching-65-injection-machines',
    slug: 'pantone-colour-matching-65-injection-machines',
    title: 'Inside Our Yuyao Plant: How In-House Masterbatch Mixing Locks Pantone Shades',
    excerpt:
      'When your trigger shroud, bottle cap, and lotion pump collar sit side by side on supermarket shelves, colour drift isn’t acceptable.',
    content: `Private-label and national cleaning brands increasingly sell coordinated shelf ranges: a trigger spray for kitchen countertops, a foam trigger for bathroom tiles, and a flip-top cap for refill bottles. If different factories supply each closure, slight resin shade differences become obvious under harsh retail LED lighting.

Because Yi Lai operates more than 65 hydraulic and all-electric injection moulding machines in Yuyao, we mix virgin PP and PE colour masterbatches in a single climate-controlled colour room. Each Pantone solid coated code (such as PMS 286 C Ocean Blue or custom matte shades) is verified under D65 lightbox illumination against physical colour plaques retained from your sample approval.

Whether your SKU calls for ribbed glossy triggers, soft-touch matte mini triggers, or matching 24/410 flip-top closures, every part shares identical UV stabilization and pigment dispersion.`,
    category: 'Manufacturing',
    coverImage: '/src/assets/images/factory_injection_moulding_1795005762839.jpg',
    authorName: 'Production Operations · Yuyao',
    readTime: '3 min read',
    tags: ['Pantone Matching', 'Injection Moulding', 'Private Label'],
    status: 'published',
    publishedAt: '2026-10-27',
  },
  {
    id: 'vacuum-leak-testing-export-shipping-ningbo',
    slug: 'vacuum-leak-testing-export-shipping-ningbo',
    title: 'Passing -0.06 MPa Vacuum Leak Testing & Ocean Freight Consolidation via Ningbo',
    excerpt:
      'How pre-shipment vacuum chambers and automatic torque stations prevent pressure-change leakage across Red Sea, European, and South American routes.',
    content: `Dispensers shipped across ocean freight containers face steep diurnal temperature swings — climbing above 50°C inside metal containers crossing equatorial waters — followed by air-freight pressure drops for e-commerce fulfillment.

On our 13+ automatic assembly lines in Yuyao, every batch undergoes statistical and inline quality gates:
1. Automated primer stroke verification (ensuring prime within 3–4 pulls).
2. 60° spray dispersion geometry check and dosage tolerance gauging (±0.10 ml).
3. Vacuum chamber testing at -0.06 MPa for 5 minutes with bottles inverted horizontally.

Once palletized in double-wall export cartons with inner PE moisture liners, goods dispatch 45 minutes down the highway directly into Ningbo Beilun Port for fast weekly LCL and 40HQ container sailings.`,
    category: 'Export & Logistics',
    coverImage: '/src/assets/images/factory_export_packaging_1795005763378.jpg',
    authorName: 'Export Logistics Desk · Ningbo',
    readTime: '4 min read',
    tags: ['FOB Ningbo', 'Vacuum Leak Test', 'Export Cartoning'],
    status: 'published',
    publishedAt: '2026-10-18',
  },
];
