export const CATALOG_2026_PDF_URL = '/assets/aistudio/87___BC001_Ribbed_Screw_Cap_d8e9a0cd.pdf';

export const FACTORY_PROFILE_2026 = {
  legalName: 'Ningbo Yilaipulin Plastic Industry Co., Ltd.',
  shortBrand: 'Yi Lai Plastics Industry',
  edition: 'Catalog Edition 2026',
  tagline: 'Precision Dispensing, Trusted Worldwide.',
  location: 'Yuyao, Ningbo, Zhejiang, China',
  email: 'yilaiplastics@gmail.com',
  phoneDisplay: '+86 137 5705 0848',
  yearsExperience: '15+',
  employees: '200+',
  injectionMachines: '65+',
  autoLines: '13+',
} as const;

export type CatalogSeriesId =
  | '01-trigger-sprayers'
  | '02-mini-trigger-sprayers'
  | '03-lotion-pumps'
  | '04-fine-mist-sprayers'
  | '05-foam-pumps'
  | '06-foundation-pumps'
  | '07-perfume-mist-sprayers'
  | '08-bottle-caps';

export interface CatalogSeriesMeta {
  id: CatalogSeriesId;
  seriesNum: string;
  name: string;
  siteCategoryId: string;
  pageRange: string;
  applications: string[];
  highlights: string[];
}

export interface CatalogModelEntry {
  code: string;
  seriesId: CatalogSeriesId;
  siteCategoryId: string;
  name: string;
  material: string;
  neckSizes: string;
  output: string;
  feature: string;
  applications: string;
  page: number;
}

export const CATALOG_SERIES_META: CatalogSeriesMeta[] = [
  {
    id: '01-trigger-sprayers',
    seriesNum: '01',
    name: 'Trigger Sprayers',
    siteCategoryId: 'trigger-sprayers',
    pageRange: 'p. 4–28',
    applications: [
      'Household Cleaning',
      'Garden & Agriculture',
      'Car Care',
      'Hair & Personal Care',
      'Pet Care',
      'Industrial & Chemical',
    ],
    highlights: [
      'Adjustable Spray / Stream / Foam / Off nozzles (N1–N6)',
      '6 trigger lever ergonomics (T1–T6) & 5 closure collars (C1–C5)',
      '14 interchangeable shroud designs (B-1 through P)',
      'Vertical, Horizontal & Oblique piston architectures',
    ],
  },
  {
    id: '02-mini-trigger-sprayers',
    seriesNum: '02',
    name: 'Mini Trigger Sprayers',
    siteCategoryId: 'mini-trigger-sprayers',
    pageRange: 'p. 29–35',
    applications: [
      'Hair & Beauty',
      'Skin & Face Care',
      'Travel & Samples',
      'Glass & Screen Care',
      'Plant Misting',
      'Pet Grooming',
    ],
    highlights: [
      'Compact palm-sized trigger profile with ON/OFF safety lock',
      'Standard, Lockable On/Off & Big Mouse Trigger silhouettes',
      'Fine 0.15–0.25 ml mist atomization with SUS-304 spring',
    ],
  },
  {
    id: '03-lotion-pumps',
    seriesNum: '03',
    name: 'Lotion Pumps',
    siteCategoryId: 'lotion-pumps',
    pageRange: 'p. 36–50',
    applications: [
      'Body Lotion & Creams',
      'Liquid Hand Soap',
      'Shampoo & Conditioner',
      'Shower Gel & Body Wash',
      'Hand Sanitizer',
      'Kitchen & Dish Soap',
    ],
    highlights: [
      '3 lock types: L1 Clip-Lock, L2 Screw-Lock, L3 Switch Lock',
      '3 collar finishes: C1 Smooth, C2 Ribbed, C3 Metal',
      '25+ actuator head shapes across 24/410 to 33/400 necks',
    ],
  },
  {
    id: '04-fine-mist-sprayers',
    seriesNum: '04',
    name: 'Fine Mist Sprayers',
    siteCategoryId: 'fine-mist-sprayers',
    pageRange: 'p. 51–63',
    applications: [
      'Toners & Face Mists',
      'Perfume & Body Mist',
      'Hair Care',
      'Sanitizer & Alcohol',
      'Plant & Garden',
      'Home & Air Fresheners',
    ],
    highlights: [
      'Standard PP, inner-spring, double-wall dome & luxury anodized alu',
      'Short-mouth nasal & atomizer heads for 15 mm – 28/410 necks',
      'Full or half transparent dust overcaps included',
    ],
  },
  {
    id: '05-foam-pumps',
    seriesNum: '05',
    name: 'Foam Pumps',
    siteCategoryId: 'foam-triggers',
    pageRange: 'p. 64–73',
    applications: [
      'Foaming Hand Soap',
      'Facial Cleansers',
      'Hair & Beard Care',
      'Foam Sanitizer',
      'Baby & Kids Care',
      'Household Cleaning',
    ],
    highlights: [
      'Air-liquid foaming pump chamber for 33/410, 40/410 & 45/410 necks',
      'Specialty Flower stamp, Brush head, Heart Brush & Brushed Steel models',
      'Clip-lock & matte black architectural actuators',
    ],
  },
  {
    id: '06-foundation-pumps',
    seriesNum: '06',
    name: 'Foundation & Treatment Pumps',
    siteCategoryId: 'fine-mist-sprayers',
    pageRange: 'p. 74–77',
    applications: [
      'Liquid Foundation',
      'Serums & Essences',
      'Eye & Face Creams',
      'Sunscreen',
      'Hair Oils',
      'Travel Sizes',
    ],
    highlights: [
      'Controlled micro-dosing for pigmented cosmetics & viscous serums',
      'Anodized matte silver/gold collars & tall clear overcaps',
      'Fits 20/410, 24/410, 33/410 & 45/410 glass/PET bottles',
    ],
  },
  {
    id: '07-perfume-mist-sprayers',
    seriesNum: '07',
    name: 'Perfume Mist Sprayers',
    siteCategoryId: 'fine-mist-sprayers',
    pageRange: 'p. 78–85',
    applications: [
      'Fine Fragrance',
      'Body Mists',
      'Travel Perfume',
      'Samples & Testers',
      'Hair Perfume',
      'Home Fragrance',
    ],
    highlights: [
      'Precision 0.07–0.10 ml micro-mist dose for high-ethanol fragrances',
      'FEA 13 / FEA 15 crimp-on & 15/415–18/415 screw options',
      'PMS006 Crimpless 15 mm screw-on sprayer (no crimping machine needed)',
    ],
  },
  {
    id: '08-bottle-caps',
    seriesNum: '08',
    name: 'Bottle Caps & Closures',
    siteCategoryId: 'bottle-caps-closures',
    pageRange: 'p. 86–98',
    applications: [
      'Shampoo & Body Wash',
      'Lotions & Creams',
      'Household Cleaners',
      'Food & Condiments',
      'Pharma & Health',
      'Beverages',
    ],
    highlights: [
      'Ribbed/Lined Screw, Flip-Top, Disc-Top, Push-Pull & Sports caps',
      'BC007 Detergent Measuring Cap (10–30 ml) with drain-back spout',
      'Full diameter coverage from 20/410 up to 62 mm wide-mouth jars',
    ],
  },
];

export const TRIGGER_NOZZLE_CODES = [
  { code: 'N1', label: 'Spray / Spray', pattern: 'Spray' as const, note: 'Dual mist setting' },
  { code: 'N2', label: 'Plastic Mesh / Foam', pattern: 'Foam' as const, note: 'Snap foaming grid' },
  { code: 'N3', label: 'Spray / Stream', pattern: 'Spray' as const, note: '55° mist + pinpoint jet' },
  { code: 'N4', label: 'Plastic Foam', pattern: 'Foam' as const, note: 'Fixed cling-foam aeration' },
  { code: 'N5', label: 'Stream / Spray', pattern: 'Stream' as const, note: 'Long-reach stream first' },
  { code: 'N6', label: 'Foam / Spray', pattern: 'Foam' as const, note: 'Flip foam mesh hood' },
] as const;

export const TRIGGER_LEVER_CODES = [
  { code: 'T1', label: 'Normal Trigger' },
  { code: 'T2', label: 'Two-Finger Trigger' },
  { code: 'T3', label: 'Big Trigger' },
  { code: 'T4', label: 'New Two-Finger Trigger' },
  { code: 'T5', label: 'Frosted Trigger' },
  { code: 'T6', label: 'Three-Finger Trigger' },
] as const;

export const TRIGGER_CLOSURE_CODES = [
  { code: 'C1', neck: '28/415', style: 'Tall neck smooth/ribbed' },
  { code: 'C2', neck: '28/410', style: 'Standard international neck' },
  { code: 'C3', neck: '28/410 Ratchet', style: 'Anti-backoff lock neck' },
  { code: 'C4', neck: '28/400', style: 'Short skirt smooth' },
  { code: 'C5', neck: '28/400', style: 'Short skirt ribbed grip' },
] as const;

export const TRIGGER_SHROUD_STYLES = [
  { code: 'B-1', note: 'Compact classic' },
  { code: 'B-2', note: 'Beveled nose' },
  { code: 'C', note: 'Stepped industrial' },
  { code: 'D', note: 'Contoured ridge' },
  { code: 'E', note: 'Flat-top modern' },
  { code: 'F', note: 'Double-colour split' },
  { code: 'G', note: 'Signature ergonomic' },
  { code: 'H', note: 'Slim arch profile' },
  { code: 'K', note: 'Angular heavy-duty' },
  { code: 'K2', note: 'Rounded extended' },
  { code: 'K3', note: 'Shielded collar' },
  { code: 'L', note: 'Long-reach homecare' },
  { code: 'M', note: 'Sculpted smooth' },
  { code: 'P', note: 'Streamlined dome' },
] as const;

export const TRIGGER_PUMP_ARCHITECTURES = [
  {
    id: 'ordinary',
    title: 'Ordinary Pump (Vertical Piston)',
    description: 'Traditional vertical cylinder layout ideal for economical high-volume household sprays.',
  },
  {
    id: 'horizontal',
    title: 'Horizontal Pump (Horizontal Piston)',
    description: 'Inline horizontal cylinder aligns directly with nozzle bore for fast priming and light pull.',
  },
  {
    id: 'oblique',
    title: 'Oblique Pump (Angled Piston)',
    description: 'Angled piston geometry reduces finger stroke resistance and optimizes internal droplet pressure.',
  },
] as const;

export const LOTION_CUSTOMIZATION_MATRIX = {
  locks: [
    { code: 'L1', name: 'Clip-Lock', note: 'Removable neck clip prevents accidental pump depression in transit' },
    { code: 'L2', name: 'Screw-Lock', note: 'Twist-down / Up-Lock collar seals cleanly at -0.06 MPa' },
    { code: 'L3', name: 'Switch Lock', note: 'Built-in STOP/OPEN rotary collar switch on stem' },
  ],
  finishes: [
    { code: 'C1', name: 'Smooth PP', note: 'Clean high-gloss or matte cosmetic finish' },
    { code: 'C2', name: 'Ribbed PP', note: 'High-grip vertical fluting for automatic capping heads' },
    { code: 'C3', name: 'Anodized Metal', note: 'Aluminium overshell in silver, gold, rose gold, or black' },
  ],
  necks: ['24/410', '24/415', '28/400', '28/410', '28/415', '30/410', '33/400'],
  actuatorNote: '25+ Interchangeable Actuator Head Shapes (Gloss, Matte, Metallic & Switch)',
} as const;

export interface BomPartSpec {
  part: string;
  material: string;
}

export const BOM_SPEC_TABLES: Record<'trigger' | 'miniTrigger' | 'lotion', BomPartSpec[]> = {
  trigger: [
    { part: 'Nozzle', material: 'PP' },
    { part: 'Water Jacket', material: 'LDPE' },
    { part: 'Spin Mechanism', material: 'NBR' },
    { part: 'Shroud', material: 'PP' },
    { part: 'Trigger Lever', material: 'PP' },
    { part: 'Main Body', material: 'PP' },
    { part: 'Spring', material: 'Stainless Steel (304 / 316)' },
    { part: 'Ball Valve', material: 'Glass' },
    { part: 'Lower Lid', material: 'PP' },
    { part: 'Gasket', material: 'PE' },
    { part: 'Closure', material: 'PP' },
    { part: 'Piston', material: 'HDPE' },
    { part: 'Dip Tube', material: 'LDPE' },
  ],
  miniTrigger: [
    { part: 'Spreading Head', material: 'PP' },
    { part: 'Swirl Insert', material: 'POM' },
    { part: 'Nozzle Brace', material: 'PP' },
    { part: 'Trigger Lever', material: 'PP' },
    { part: 'On-Off Safety Lock', material: 'POM' },
    { part: 'Pedestal & Stem', material: 'PP' },
    { part: 'Upper Gasket', material: 'Rubber' },
    { part: 'Chaplet & Housing', material: 'PP' },
    { part: 'Lower Gasket', material: 'PE' },
    { part: 'Spring', material: 'SUS-304' },
    { part: 'Closure & Sub-Stem', material: 'PP' },
    { part: 'Piston', material: 'PE' },
    { part: 'Ball Valve', material: 'Glass' },
    { part: 'Dip Tube', material: 'HDPE' },
  ],
  lotion: [
    { part: 'Button / Actuator', material: 'PP' },
    { part: 'Stem', material: 'PP' },
    { part: 'Seal Ring', material: 'PE' },
    { part: 'Collar', material: 'PP / Anodized Alu' },
    { part: 'Chaplet', material: 'PP' },
    { part: 'Sub-Stem', material: 'PE' },
    { part: 'Piston', material: 'PE' },
    { part: 'Housing / Shell', material: 'PP' },
    { part: 'Spring', material: 'SUS 302 / 304' },
    { part: 'Ball Valve', material: 'Glass' },
    { part: 'Dip Tube', material: 'PE' },
  ],
};

export const CATALOG_MODELS_2026: CatalogModelEntry[] = [
  // 01 Trigger Sprayers (21 models, p. 5–25)
  { code: 'TS001', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Standard Plastic Trigger Sprayer', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.9–1.0 cc', feature: 'Spray / Stream adjustable nozzle', applications: 'Household cleaners, glass sprays', page: 5 },
  { code: 'TS002', seriesId: '01-trigger-sprayers', siteCategoryId: 'foam-triggers', name: 'Standard Plastic Foam Trigger', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.9–1.0 cc', feature: 'Foam / Spray hinged mesh nozzle', applications: 'Kitchen degreasers, bath foam', page: 6 },
  { code: 'TS003', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Standard Plastic Trigger Type H', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.9–1.0 cc', feature: 'Stream / Spray · Type H shroud', applications: 'Multi-surface cleaners, garden', page: 7 },
  { code: 'TS004', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Standard Plastic Trigger Type D', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.9–1.0 cc', feature: 'Two-tone color Type D shroud', applications: 'Car care, branded homecare', page: 8 },
  { code: 'TS005', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'All Plastic Trigger Sprayer', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Stream / Spray · Eco all-plastic', applications: 'Recyclable cleaning lines', page: 9 },
  { code: 'TS006', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'All Plastic Trigger Sprayer (Stream/Spray)', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Contoured smooth shroud', applications: 'Household & pet care', page: 10 },
  { code: 'TS007', seriesId: '01-trigger-sprayers', siteCategoryId: 'foam-triggers', name: 'All Plastic Foam Trigger Sprayer', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Stream / Spray / Foam flip cap', applications: 'Bathroom cleaners, bleach foam', page: 11 },
  { code: 'TS008', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'All Plastic Trigger Sprayer', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Light pull Stream / Spray head', applications: 'Everyday home sprays', page: 12 },
  { code: 'TS009', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'All Plastic Trigger (Multi-Color)', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Color-coded trigger & nozzle', applications: 'Commercial janitorial coding', page: 13 },
  { code: 'TS010', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'All Plastic Trigger (Dual-Tone)', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Multi-color brand customization', applications: 'Private-label detergents', page: 14 },
  { code: 'TS011', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Ergonomic Grip Trigger Sprayer', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Textured grip lever & shroud', applications: 'Garden & extended spraying', page: 15 },
  { code: 'TS012', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Clear Top Cover Trigger Sprayer', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Transparent top shroud window', applications: 'Premium car & hair care', page: 16 },
  { code: 'TS013', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'All Plastic Trigger (Stream/Spray)', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'High-repeatability Stream / Spray', applications: 'Sanitizers & linen mist', page: 17 },
  { code: 'TS014', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Heavy Duty Trigger Sprayer', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.8–0.9 ml/T', feature: 'Reinforced industrial shroud', applications: 'Auto workshop & janitorial', page: 18 },
  { code: 'TS015', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Chemical Resistant Trigger Sprayer', material: 'Chem-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.10–0.12 ml/T', feature: 'Chemical-resistant seals & piston', applications: 'Strong acids, wheel cleaners', page: 19 },
  { code: 'TS016', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Chemical Resistant Trigger (Ribbed)', material: 'Chem-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.10–0.12 ml/T', feature: 'Heavy alkali & solvent resistance', applications: 'Industrial degreasers, bleach', page: 20 },
  { code: 'TS017', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Heavy Duty Trigger (Commercial)', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.10–0.12 ml/T', feature: 'High-impact body & ratchet collar', applications: 'Commercial facility care', page: 21 },
  { code: 'TS018', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Kao Gun Trigger Sprayer', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.10–0.12 ml/T', feature: 'Signature Kao-gun style body', applications: 'Disinfectants & fabric sprays', page: 22 },
  { code: 'TS019', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Agriculture Chemical Trigger', material: 'Chem-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.10–0.12 ml/T', feature: 'Agrochemical & herbicide rated', applications: 'Garden, pests & greenhouses', page: 23 },
  { code: 'TS020', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'Chemical Resistant Trigger (Long)', material: 'Chem-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.10–0.12 ml/T', feature: 'Extended nozzle reach', applications: 'Lab & industrial sanitation', page: 24 },
  { code: 'TS021', seriesId: '01-trigger-sprayers', siteCategoryId: 'trigger-sprayers', name: 'All Plastic Trigger (Metal-Free)', material: 'All-PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.10–0.12 ml/T', feature: 'Fully recyclable mono-material', applications: 'Eco-certified retail brands', page: 25 },

  // 02 Mini Trigger Sprayers (5 models, p. 30–34)
  { code: 'MTS001', seriesId: '02-mini-trigger-sprayers', siteCategoryId: 'mini-trigger-sprayers', name: 'Mini Trigger Sprayer (ON/OFF Lock)', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.15–0.25 ml/T', feature: 'Integrated ON/OFF collar lock', applications: 'Hair mist, screen & linen spray', page: 30 },
  { code: 'MTS002', seriesId: '02-mini-trigger-sprayers', siteCategoryId: 'mini-trigger-sprayers', name: 'Mini Trigger Sprayer (OPEN Lock)', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.15–0.25 ml/T', feature: 'Push-button OPEN safety collar', applications: 'Skincare toners, plant misting', page: 31 },
  { code: 'MTS003', seriesId: '02-mini-trigger-sprayers', siteCategoryId: 'mini-trigger-sprayers', name: 'Mini Trigger Natural Clear', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.15–0.25 ml/T', feature: 'Translucent natural finish + lock', applications: 'Travel samples, salon serums', page: 32 },
  { code: 'MTS004', seriesId: '02-mini-trigger-sprayers', siteCategoryId: 'mini-trigger-sprayers', name: 'Mini Trigger Compact Soft-Pull', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.15–0.25 ml/T', feature: 'Compact ergonomic lever', applications: 'Pet grooming & glass cleaners', page: 33 },
  { code: 'MTS005', seriesId: '02-mini-trigger-sprayers', siteCategoryId: 'mini-trigger-sprayers', name: 'Big Mouse Trigger Sprayer', material: 'PP', neckSizes: '28/400 · 28/410 · 28/415', output: '0.15–0.25 ml/T', feature: 'Rounded Mouse shroud + side lock', applications: 'Salon haircare, facial mists', page: 34 },

  // 03 Lotion Pumps (12 models, p. 37–48)
  { code: 'LPS001', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Big Head Switch Lock', material: 'PP', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Big head + built-in switch lock', applications: 'Hand soap, shampoo, body lotion', page: 37 },
  { code: 'LPS002', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Switch (STOP/OPEN)', material: 'PP', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Rotary STOP/OPEN switch collar', applications: 'Travel & e-commerce bath lines', page: 38 },
  { code: 'LPS003', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Curved Big Head', material: 'PP', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Curved spout + smooth closure', applications: 'Moisturizers, hand sanitizer', page: 39 },
  { code: 'LPS004', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Big Head (Ribbed)', material: 'PP', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Screw-lock stem + ribbed skirt', applications: 'Liquid soap & conditioner', page: 40 },
  { code: 'LPS005', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Big Head (Matte)', material: 'PP', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Soft matte cosmetic actuator', applications: 'Skincare & spa body wash', page: 41 },
  { code: 'LPS006', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Big Head (Up-Lock)', material: 'PP', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Clean anti-drip wide saddle', applications: 'Shower gel & kitchen soap', page: 42 },
  { code: 'LPS007', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Big Head (Smooth)', material: 'PP', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Smooth skirt + lock-down stem', applications: 'High-volume personal care', page: 43 },
  { code: 'LPS008', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Big Head (Dual-Seal)', material: 'PP', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Reinforced leak-proof gasket', applications: 'Dish soap & liquid detergent', page: 44 },
  { code: 'LPS009', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Small Nose Gold Ring', material: 'PP + Alu', neckSizes: '28/400', output: '0.15–0.25 ml/T', feature: 'Gold metallic collar + clip lock', applications: 'Premium lotions & serums', page: 45 },
  { code: 'LPS010', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Big Head 30/410', material: 'PP', neckSizes: '30/410', output: '0.15–0.25 ml/T', feature: 'Mid-size 30 mm bottle neck fit', applications: 'Salon bottles & body creams', page: 46 },
  { code: 'LPS011', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Lotion Pump Big Head 33/400', material: 'PP', neckSizes: '33/400', output: '0.15–0.25 ml/T', feature: 'Wide 33/400 bottle neck fit', applications: 'Family-size 1L shampoo & wash', page: 47 },
  { code: 'LPS012', seriesId: '03-lotion-pumps', siteCategoryId: 'lotion-pumps', name: 'Colorful Metallic Long-Spout Pump', material: 'PP + Alu', neckSizes: '24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Long spout + anodized finishes', applications: 'Boutique bath & cosmetic lines', page: 48 },

  // 04 Fine Mist Sprayers (12 models, p. 52–63)
  { code: 'FMS001', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Standard Fine Mist Sprayer', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Standard smooth collar + overcap', applications: 'Facial toners, hair mists', page: 52 },
  { code: 'FMS002', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Colorful Two-Tone Fine Mist', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Custom dual-color actuator & cap', applications: 'Alcohol sanitizer & room sprays', page: 53 },
  { code: 'FMS003', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Ribbed Closure Fine Mist', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'High-grip white ribbed closure', applications: 'Filling-line cosmetic bottles', page: 54 },
  { code: 'FMS004', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Luxury Glossy Black Fine Mist', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Mirror black w/ matching overcap', applications: 'Men’s grooming & styling sprays', page: 55 },
  { code: 'FMS005', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Micro-Swirl Atomizer Mist', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Extra-fine cloud dispersion', applications: 'Hydrating mist & setting spray', page: 56 },
  { code: 'FMS006', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Short-Mouth Nasal Pump Spray', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Angled short nozzle + clip cap', applications: 'Nasal saline, throat & oral care', page: 57 },
  { code: 'FMS007', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Transparent Crystal Fine Mist', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Full crystal-clear translucent look', applications: 'Pure water & skincare hydrosols', page: 58 },
  { code: 'FMS008', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Aluminum-Clad Luxury Mist', material: 'PP + Alu', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Shiny gold alu shell & overcap', applications: 'Perfume mists & apothecary oils', page: 59 },
  { code: 'FMS009', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Inner-Spring Fine Mist Sprayer', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Smooth wide skirt profile', applications: 'Air fresheners & linen sprays', page: 60 },
  { code: 'FMS010', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Aluminum Collar Fine Mist', material: 'PP + Alu', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Brushed metallic collar wrap', applications: 'Premium hair serums & toners', page: 61 },
  { code: 'FMS011', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Double-Wall Dome Overcap Mist', material: 'PP', neckSizes: '20/410 · 24/410 · 28/410', output: '0.15–0.25 ml/T', feature: 'Flush double-wall glossy dome', applications: 'Luxury dermocosmetics', page: 62 },
  { code: 'FMS012', seriesId: '04-fine-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Spray Pump Head 15 Thread', material: 'PP', neckSizes: '15 mm · 20/410', output: '0.15–0.25 ml/T', feature: 'Slim 15-thread compact head', applications: 'Pocket sanitizers & travel sprays', page: 63 },

  // 05 Foam Pumps (9 models, p. 65–73)
  { code: 'FP001', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Standard Self-Foaming Pump', material: 'PP', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Rich air-liquid foam mesh', applications: 'Foaming hand soap & wash', page: 65 },
  { code: 'FP002', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Wide Head Foam Pump', material: 'PP', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Broad ergonomic palm actuator', applications: 'Facial mousse & body cleanser', page: 66 },
  { code: 'FP003', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Clip-Lock Foam Pump', material: 'PP', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Removable neck safety clip', applications: 'Foam hand sanitizer & travel', page: 67 },
  { code: 'FP004', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Dome Cap Foam Pump', material: 'PP', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Full protective sanitary overcap', applications: 'Baby bath & sensitive skincare', page: 68 },
  { code: 'FP005', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Flower Stamp Foam Pump', material: 'PP', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Dispenses flower-shaped foam', applications: 'Kids hand wash & retail gift', page: 69 },
  { code: 'FP006', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Silicone Brush Foam Pump', material: 'PP + Silicone', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Integrated soft silicone brush', applications: 'Facial exfoliation & beard wash', page: 70 },
  { code: 'FP007', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Stainless Steel Look Foam Pump', material: 'PP + SUS', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Brushed steel collar & actuator', applications: 'Hotel amenities & countertop', page: 71 },
  { code: 'FP008', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Heart Brush Foam Pump', material: 'PP + Silicone', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Heart-shaped silicone brush head', applications: 'Beauty cleansers & pet paw foam', page: 72 },
  { code: 'FP009', seriesId: '05-foam-pumps', siteCategoryId: 'foam-triggers', name: 'Matte Black Architectural Foam Pump', material: 'PP', neckSizes: '33/410 · 40/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Soft-touch matte + flat spout', applications: 'Modern bathroom & men’s care', page: 73 },

  // 06 Foundation Pumps (3 models, p. 75–77)
  { code: 'FNP001', seriesId: '06-foundation-pumps', siteCategoryId: 'fine-mist-sprayers', name: 'Aluminum Collar Foundation Pump', material: 'PP + Alu', neckSizes: '20/410 · 24/410', output: '0.15–0.25 ml/T', feature: 'Matte silver aluminum collar', applications: 'Liquid foundation, BB cream', page: 75 },
  { code: 'FNP002', seriesId: '06-foundation-pumps', siteCategoryId: 'fine-mist-sprayers', name: 'Classic Treatment Foundation Pump', material: 'PP + Alu', neckSizes: '20/410 · 24/410', output: '0.15–0.25 ml/T', feature: 'Clear dome + silver/gold ring', applications: 'Serums, eye creams, primers', page: 76 },
  { code: 'FNP003', seriesId: '06-foundation-pumps', siteCategoryId: 'fine-mist-sprayers', name: 'Dome Cap Treatment Pump', material: 'PP', neckSizes: '33/410 · 45/410', output: '0.15–0.25 ml/T', feature: 'Tall crystal dome dust cap', applications: 'Sunscreen, rich hair oils', page: 77 },

  // 07 Perfume Mist Sprayers (7 models, p. 79–85)
  { code: 'PMS001', seriesId: '07-perfume-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Crimp Perfume Mist Sprayer', material: 'PP + Alu', neckSizes: 'FEA 13 · FEA 15 Crimp', output: '0.07–0.10 ml/T', feature: 'Gold, silver, or black crimp neck', applications: 'Fine fragrance & Eau de Parfum', page: 79 },
  { code: 'PMS002', seriesId: '07-perfume-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Stepped Collar Perfume Sprayer', material: 'PP + Alu', neckSizes: '15/415 · 18/415 Screw', output: '0.07–0.10 ml/T', feature: 'Stepped screw-neck metallic trim', applications: 'Refillable flacons & cologne', page: 80 },
  { code: 'PMS003', seriesId: '07-perfume-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Wide Collar Perfume Sprayer', material: 'PP + Alu', neckSizes: 'FEA 13 · FEA 15 Crimp', output: '0.07–0.10 ml/T', feature: 'Seamless wide anodized shoulder', applications: 'Designer & niche fragrances', page: 81 },
  { code: 'PMS004', seriesId: '07-perfume-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Gold Overcap Perfume Sprayer', material: 'PP + Alu', neckSizes: 'FEA 13 · FEA 15 Crimp', output: '0.07–0.10 ml/T', feature: 'Brushed gold collar & cylinder cap', applications: 'Luxury gift & travel perfume', page: 82 },
  { code: 'PMS005', seriesId: '07-perfume-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Black Overcap Perfume Sprayer', material: 'PP + Alu', neckSizes: 'FEA 13 · FEA 15 Crimp', output: '0.07–0.10 ml/T', feature: 'Matte black metal overshell cap', applications: 'Oud, unisex & hair perfume', page: 83 },
  { code: 'PMS006', seriesId: '07-perfume-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Crimpless Screw Perfume Sprayer', material: 'PP + Alu', neckSizes: '15 mm Screw (Crimpless)', output: '0.07–0.10 ml/T', feature: 'Tool-free twist-on assembly', applications: 'Small-batch perfumery & testers', page: 84 },
  { code: 'PMS007', seriesId: '07-perfume-mist-sprayers', siteCategoryId: 'fine-mist-sprayers', name: 'Colorful Metallic Perfume Sprayer', material: 'PP + Alu', neckSizes: 'FEA 13 · FEA 15 Crimp', output: '0.07–0.10 ml/T', feature: 'Vibrant anodized alu finishes', applications: 'Body mists & youth collections', page: 85 },

  // 08 Bottle Caps & Closures (12 models, p. 87–98)
  { code: 'BC001', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Ribbed Screw Cap', material: 'PP / HDPE', neckSizes: '28 mm · 38 mm', output: 'Inner seal ring', feature: 'Deep vertical ribs + seal ring', applications: 'Beverages, syrups & cleaners', page: 87 },
  { code: 'BC002', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Lined Screw Cap (PE/EVA)', material: 'PP + PE/EVA', neckSizes: '28 mm · 38 mm', output: 'Compression liner', feature: 'Heat-induction or EVA foam liner', applications: 'Chemical & pharma bottles', page: 88 },
  { code: 'BC003', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Deep Ribbed Screw Cap', material: 'PP / HDPE', neckSizes: '28 mm (Ø31.4 × H21)', output: 'Long skirt seal', feature: 'Extended tamper-ready grip skirt', applications: 'Detergents, agro & solvents', page: 89 },
  { code: 'BC004', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Twist Cut-to-Size Nozzle Cap', material: 'PP + LDPE', neckSizes: '20/410 · 24/410 · 28/410', output: 'Variable bore tip', feature: 'Twist-open precision applicator tip', applications: 'Hair dye, adhesives & condiments', page: 90 },
  { code: 'BC005', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Twist Top Spout Cap', material: 'PP + Liner', neckSizes: '24/410 · 28/410', output: '3-part spout', feature: 'Twist cone spout + PE foam liner', applications: 'Glue, oils & precision liquids', page: 91 },
  { code: 'BC006', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Sports Flip Cap (TE Ring)', material: 'PP', neckSizes: '28 mm PCO · 38 mm', output: 'High-flow mouthpiece', feature: 'Tamper-evident band + snap lid', applications: 'Sports drinks, water & tonics', page: 92 },
  { code: 'BC007', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Detergent Measuring Cap', material: 'PP', neckSizes: '38 mm · 42 mm', output: '10–30 ml marked cup', feature: 'Pour spout + drain-back collar', applications: 'Laundry liquid & fabric softener', page: 93 },
  { code: 'BC008', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Oval Flip-Top Cap', material: 'PP', neckSizes: '24/410 · 28/410', output: '3.0–5.0 mm aperture', feature: 'Contoured oval flip-top hinge', applications: 'Shampoo, lotion & travel tubes', page: 94 },
  { code: 'BC009', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Round Butterfly Flip-Top Cap', material: 'PP', neckSizes: '20/410 · 24/410', output: '3.0–5.0 mm aperture', feature: '3,000+ cycle butterfly hinge', applications: 'Body wash, sunscreen & oils', page: 95 },
  { code: 'BC010', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Push-Pull Sport Closure', material: 'PP + LDPE', neckSizes: '24/410 · 28/410', output: 'Direct push-pull flow', feature: 'Dual-resin tight seal valve', applications: 'Dish soap, auto wax & drinks', page: 96 },
  { code: 'BC011', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Large 62 mm Flip-Top Cap', material: 'PP', neckSizes: '62 mm (Ø62 × H31.5 · 10.8g)', output: 'Wide jar pour port', feature: 'Heavy-duty snap hinge + seal ring', applications: 'Food sauces, honey & bulk packs', page: 97 },
  { code: 'BC012', seriesId: '08-bottle-caps', siteCategoryId: 'bottle-caps-closures', name: 'Disc-Top Press Cap', material: 'PP / Alu', neckSizes: '20/410 · 24/410 · 28/410', output: '3.5 mm crescent port', feature: 'Flush disc toggle + optional alu shell', applications: 'Micellar water, toner & oils', page: 98 },
];
