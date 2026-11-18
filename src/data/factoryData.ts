import type { SocialMediaLinks } from '../components/SocialLinksBar';

export type LanguageCode = 'en' | 'es' | 'ar';

export interface ProductGalleryImage {
  src: string;
  label: string;
}

export interface ProductVariant {
  slug: string;
  model: string;
  neckFinish: string;
  dosage: string;
  closureStyle: string;
  springType: string;
  moq: string;
  materials: string;
  leadTime: string;
  applications: string;
  description: string;
  features: string[];
  gallery: ProductGalleryImage[];
  socialLinks?: SocialMediaLinks;
}

export interface ProductCategory {
  id: string;
  index: string;
  name: string;
  shortName: string;
  accent: 'blue' | 'crimson';
  image: string;
  summary: string;
  neckRange: string;
  outputRange: string;
  moq: string;
  variants: ProductVariant[];
}

export interface MatcherOption {
  id: string;
  label: string;
  recommendedCategoryId: string;
  recommendedTitle: string;
  dosageSpec: string;
  neckSpec: string;
  rationale: string;
  compatibilityNote: string;
}

export interface BlueprintPart {
  id: number;
  name: string;
  subtitle: string;
  material: string;
  tolerance: string;
  customization: string;
  description: string;
}

export interface NozzleColour {
  id: string;
  name: string;
  hex: string;
  pantone: string;
  contrastBorder?: boolean;
}

export interface ExportMarket {
  id: string;
  region: string;
  hubs: string;
  transitDays: string;
  incoterms: string;
  summary: string;
  x: number;
  y: number;
}

export const FACTORY_IMAGES = {
  exterior: '/assets/aistudio/Modern_Factory_Entrance_with_Corporate_Signage_7fb1e225.png',
  moulding: '/src/assets/images/factory_injection_moulding_1795005762839.jpg',
  assembly: '/src/assets/images/factory_assembly_line_1795005763368.jpg',
  exportPacking: '/src/assets/images/factory_export_packaging_1795005763378.jpg',
} as const;

export const UI_TRANSLATIONS: Record<
  LanguageCode,
  {
    dir: 'ltr' | 'rtl';
    navProducts: string;
    navCustomize: string;
    navFactory: string;
    navExport: string;
    navBlog: string;
    navContact: string;
    navDashboard: string;
    requestQuote: string;
    heroTrust: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroTitleSuffix: string;
    heroSub: string;
    exploreProducts: string;
    getFreeSamples: string;
    pullTrigger: string;
    kpiYears: string;
    kpiEmployees: string;
    kpiMachines: string;
    kpiLines: string;
  }
> = {
  en: {
    dir: 'ltr',
    navProducts: 'Products',
    navCustomize: 'Customize',
    navFactory: 'Factory',
    navExport: 'Export',
    navBlog: 'Blog',
    navContact: 'Contact',
    navDashboard: 'Dashboard',
    requestQuote: 'Request a quote',
    heroTrust: 'Yuyao, Ningbo · Trigger Sprayer & Dispenser Manufacturer · Since 2009',
    heroTitlePrefix: 'Every',
    heroTitleHighlight: 'engineered',
    heroTitleSuffix: 'in-house.',
    heroSub:
      'Yi Lai Plastics designs, moulds, and assembles trigger sprayers, lotion pumps, fine mist sprayers, and custom closures in Yuyao, Ningbo for brands and distributors worldwide.',
    exploreProducts: 'Explore products',
    getFreeSamples: 'View catalog',
    pullTrigger: 'Pull the trigger',
    kpiYears: 'Years making dispensers',
    kpiEmployees: 'Skilled employees',
    kpiMachines: 'Injection moulding machines',
    kpiLines: 'Automatic assembly lines',
  },
  es: {
    dir: 'ltr',
    navProducts: 'Productos',
    navCustomize: 'Personalizar',
    navFactory: 'Fábrica',
    navExport: 'Exportación',
    navBlog: 'Blog',
    navContact: 'Contacto',
    navDashboard: 'Panel',
    requestQuote: 'Solicitar cotización',
    heroTrust: 'Yuyao, Ningbo · Fabricante de Atomizadores y Bombas · Desde 2009',
    heroTitlePrefix: 'Cada',
    heroTitleHighlight: 'diseñado',
    heroTitleSuffix: 'en planta.',
    heroSub:
      'Yi Lai Plastics diseña, moldea y ensambla atomizadores de gatillo, bombas dosificadoras de loción, pulverizadores de bruma fina y tapas en Yuyao, Ningbo para marcas de todo el mundo.',
    exploreProducts: 'Ver productos',
    getFreeSamples: 'Ver catálogo',
    pullTrigger: 'Apretar el gatillo',
    kpiYears: 'Años fabricando dosificadores',
    kpiEmployees: 'Especialistas en planta',
    kpiMachines: 'Inyectoras de plástico',
    kpiLines: 'Líneas de ensamblaje automático',
  },
  ar: {
    dir: 'rtl',
    navProducts: 'المنتجات',
    navCustomize: 'التخصيص',
    navFactory: 'المصنع',
    navExport: 'التصدير',
    navBlog: 'المدونة',
    navContact: 'اتصل بنا',
    navDashboard: 'لوحة التحكم',
    requestQuote: 'اطلب عرض سعر',
    heroTrust: 'يوياو، نينغبو · مصنع بخاخات الزناد ومضخات اللوشن · منذ 2009',
    heroTitlePrefix: 'كل',
    heroTitleHighlight: 'مصمم ومصنّع',
    heroTitleSuffix: 'في مصنعنا.',
    heroSub:
      'تقوم شركة Yi Lai Plastics بتصميم وقولبة وتجميع بخاخات الزناد ومضخات اللوشن وبخاخات الرذاذ الدقيق والأغطية المخصصة في يوياو، نينغبو للعلامات التجارية والموزعين حول العالم.',
    exploreProducts: 'استكشف المنتجات',
    getFreeSamples: 'عرض الكتالوج',
    pullTrigger: 'اسحب الزناد',
    kpiYears: 'عاماً في صناعة البخاخات',
    kpiEmployees: 'موظفاً وفنياً ماهراً',
    kpiMachines: 'ماكينة حقن بلاستيك',
    kpiLines: 'خط تجميع أوتوماتيكي',
  },
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'trigger-sprayers',
    index: '01',
    name: 'Trigger Sprayers',
    shortName: 'Trigger Sprayers',
    accent: 'blue',
    image: '/src/assets/images/product_trigger_sprayer_1795008502569.jpg',
    summary:
      'Full-size ergonomic triggers with adjustable spray, stream, and off nozzles for household cleaning, garden, and automotive care.',
    neckRange: '28/400 · 28/410 · 28/415',
    outputRange: '1.10 – 1.40 ml',
    moq: '10,000 pcs',
    variants: [
      {
        slug: 'yl-ts28a',
        model: 'YL-TS28A Standard Heavy Duty',
        neckFinish: '28/400 & 28/410',
        dosage: '1.25 ± 0.10 ml/stroke',
        closureStyle: 'Ribbed / Smooth / Ratchet',
        springType: '304 Stainless Steel (External)',
        moq: '10,000 pcs',
        materials: 'Virgin PP Shroud & Closure · LDPE Dip Tube · 304 SS Spring',
        leadTime: '15–18 days',
        applications: 'Glass cleaners, multi-surface disinfectants, garden misting',
        description:
          'Our flagship YL-TS28A trigger sprayer is engineered for high-volume household cleaning and commercial maintenance lines. Its precision-bored spinner nozzle rotates effortlessly between a wide 55° mist cone, a focused jet stream, and a positive leak-proof OFF lock. Built with an external non-contact 304 stainless steel spring and virgin polypropylene piston housing, it delivers repeatable 1.25 ml output from first prime to final drop.',
        features: [
          'Self-priming within 3 to 4 trigger strokes',
          'Vacuum leak tested at -0.06 MPa for sea & e-commerce transit',
          'Custom Pantone colour matching & pad-printed shroud logo available',
          'Dip tube extruded in-house and angle-cut to your exact bottle height',
        ],
        gallery: [
          { src: '/src/assets/images/product_trigger_sprayer_1795008502569.jpg', label: 'Studio Front Profile' },
          { src: '/src/assets/images/detail_nozzle_closeup_1795008701972.jpg', label: 'Spray / Stream / Off Nozzle' },
          { src: '/src/assets/images/detail_qc_spray_test_1795008705224.jpg', label: '60° Dispersion QC Test' },
          { src: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg', label: 'Mounted Bottle Pairing' },
        ],
      },
      {
        slug: 'yl-ts28c',
        model: 'YL-TS28C Chemical Resistant',
        neckFinish: '28/400 & 28/410',
        dosage: '1.35 ± 0.10 ml/stroke',
        closureStyle: 'Child-Lock / Ribbed',
        springType: '316 SS Acid & Alkali Grade',
        moq: '20,000 pcs',
        materials: 'Chemical-Grade PP · FKM / EPDM Seal · 316 SS Spring',
        leadTime: '18–22 days',
        applications: 'Bleach, bathroom descalers, wheel & engine degreasers',
        description:
          'Purpose-built for aggressive acid, alkaline, and solvent-based formulations where standard triggers fail. The YL-TS28C pairs chemical-resistant fluorocarbon / EPDM valve seals with a heavy-duty 316 stainless steel spring isolated from direct fluid contact, preventing swelling, valve sticking, or spring corrosion during long shelf storage.',
        features: [
          'Upgraded 316 stainless steel spring for bleach & degreasers',
          'Optional child-resistant ratchet or safety lock collar',
          'High-output 1.35 ml piston chamber for thick surfactants',
          'Batch-verified for zero stress cracking under chemical immersion',
        ],
        gallery: [
          { src: '/src/assets/images/detail_nozzle_closeup_1795008701972.jpg', label: 'Chemical Nozzle Detail' },
          { src: '/src/assets/images/product_trigger_sprayer_1795008502569.jpg', label: 'Full Assembly Profile' },
          { src: '/src/assets/images/detail_qc_spray_test_1795008705224.jpg', label: 'Spray Calibration Bench' },
          { src: '/src/assets/images/factory_assembly_line_1795005763368.jpg', label: 'Automated Line Assembly' },
        ],
      },
      {
        slug: 'yl-ts28l',
        model: 'YL-TS28L Upside-Down 360°',
        neckFinish: '28/410',
        dosage: '1.15 ± 0.10 ml/stroke',
        closureStyle: 'Smooth Matte Skirt',
        springType: '304 SS + Weighted Ball',
        moq: '20,000 pcs',
        materials: 'Matte PP Shroud · Flexible Silicone Tube · SS Ball Valve',
        leadTime: '18–22 days',
        applications: 'Sanitizing sprays, car detailing, under-rim cleaners',
        description:
          'Engineered with an internal 360-degree dual-valve chamber and weighted stainless steel sinker ball at the base of a flexible silicone dip tube, the YL-TS28L sprays continuously even when inverted upside down. Ideal for bathroom rim cleaners, under-chassis automotive detailing, and hard-to-reach sanitizing applications.',
        features: [
          'Sprays smoothly at any angle including 180° inverted',
          'Weighted stainless intake ball follows liquid level automatically',
          'Smooth matte ergonomic shroud resists wet-hand slipping',
          'Available with 28/410 smooth or ribbed anti-backoff closure',
        ],
        gallery: [
          { src: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg', label: 'Bottle Line Integration' },
          { src: '/src/assets/images/product_trigger_sprayer_1795008502569.jpg', label: 'Sprayer Profile' },
          { src: '/src/assets/images/detail_nozzle_closeup_1795008701972.jpg', label: 'Spinner Orifice Detail' },
          { src: '/src/assets/images/detail_qc_spray_test_1795008705224.jpg', label: 'Angle Dispersion Test' },
        ],
      },
    ],
  },
  {
    id: 'mini-trigger-sprayers',
    index: '02',
    name: 'Mini Trigger Sprayers',
    shortName: 'Mini Triggers',
    accent: 'blue',
    image: '/src/assets/images/product_mini_trigger_1795008502797.jpg',
    summary:
      'Compact, palm-sized triggers engineered for personal care, salon haircare, and travel bottles without sacrificing spray reach.',
    neckRange: '20/410 · 24/410 · 28/410',
    outputRange: '0.25 – 0.45 ml',
    moq: '10,000 pcs',
    variants: [
      {
        slug: 'yl-mt24',
        model: 'YL-MT24 Compact Lock-Clip',
        neckFinish: '24/410 & 28/410',
        dosage: '0.32 ± 0.05 ml/stroke',
        closureStyle: 'Smooth Gloss / Matte',
        springType: '304 Stainless Steel',
        moq: '10,000 pcs',
        materials: 'High-Gloss or Matte PP · Clear LDPE Tube · 304 SS',
        leadTime: '15–18 days',
        applications: 'Hair leave-in mist, linen sprays, facial toners',
        description:
          'The YL-MT24 pairs a refined cosmetic silhouette with single-finger trigger ergonomics. A sliding safety lock-clip sits directly beneath the actuator to prevent accidental spraying inside gym bags or e-commerce parcels, while its precision 0.32 ml atomizing nozzle produces an even hair and fabric mist.',
        features: [
          'Integrated snap-slide lock clip prevents accidental actuation',
          'Soft-touch 1-finger trigger pull requires minimal actuation force',
          'Available in 24/410 and 28/410 smooth or satin matte collars',
          'Custom colour shroud & contrasting lock-clip combinations',
        ],
        gallery: [
          { src: '/src/assets/images/product_mini_trigger_1795008502797.jpg', label: 'Compact Bottle Assembly' },
          { src: '/src/assets/images/detail_pump_mechanism_1795008703095.jpg', label: 'Internal Valve & Spring' },
          { src: '/src/assets/images/detail_qc_spray_test_1795008705224.jpg', label: 'Mist Cone Verification' },
          { src: '/src/assets/images/factory_export_packaging_1795005763378.jpg', label: 'Export Carton Packing' },
        ],
      },
      {
        slug: 'yl-mt20',
        model: 'YL-MT20 Travel Cosmetic',
        neckFinish: '20/410',
        dosage: '0.25 ± 0.04 ml/stroke',
        closureStyle: 'Safety Button Lock',
        springType: '304 Stainless Steel',
        moq: '15,000 pcs',
        materials: 'Cosmetic-Grade Virgin PP · PE Liner · 304 SS',
        leadTime: '15–20 days',
        applications: 'Sunscreen mist, room fragrances, pet grooming sprays',
        description:
          'Sized specifically for slim 50 ml to 150 ml 20/410 bottles, the YL-MT20 delivers a controlled 0.25 ml fine-droplet spray with a push-button locking pin through the neck. Its lightweight profile balances small travel containers so bottles stay upright on retail shelves.',
        features: [
          'Slim 20/410 cosmetic neck footprint for 50–150 ml bottles',
          'Push-button locking pin secures trigger during air & parcel shipping',
          'Micro-atomizing swirl chamber avoids heavy wet spotting',
          'Compatible with water-based, hydrosol, and light oil blends',
        ],
        gallery: [
          { src: '/src/assets/images/product_mini_trigger_1795008502797.jpg', label: '20/410 Travel Profile' },
          { src: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg', label: 'Retail Shelf Pairing' },
          { src: '/src/assets/images/detail_pump_mechanism_1795008703095.jpg', label: 'Collar & Dip Tube Specs' },
          { src: '/src/assets/images/factory_injection_moulding_1795005762839.jpg', label: 'Yuyao Moulding Hall' },
        ],
      },
    ],
  },
  {
    id: 'foam-triggers',
    index: '03',
    name: 'Foam Triggers',
    shortName: 'Foam Triggers',
    accent: 'crimson',
    image: '/src/assets/images/product_foam_trigger_1795008503693.jpg',
    summary:
      'Aerator mesh foaming nozzles that cling to vertical surfaces — purpose-built for degreasers, oven cleaners, and car-wash detergents.',
    neckRange: '28/400 · 28/410',
    outputRange: '1.20 – 1.60 ml',
    moq: '10,000 pcs',
    variants: [
      {
        slug: 'yl-ft28',
        model: 'YL-FT28 Dual-Mode Foam/Spray',
        neckFinish: '28/400 & 28/410',
        dosage: '1.30 ± 0.10 ml/stroke',
        closureStyle: 'Ribbed Grip Collar',
        springType: '304 SS + Double Mesh Flap',
        moq: '10,000 pcs',
        materials: 'Virgin PP · Stainless / Nylon Mesh Screen · 304 SS',
        leadTime: '15–18 days',
        applications: 'Kitchen degreasers, mould removers, shower foam',
        description:
          'Featuring a hinged flip-open foaming screen directly in front of the orifice, the YL-FT28 lets end users switch seamlessly between cling foam (flap closed) and direct liquid spray (flap open). Dense air-liquid mixing reduces overspray inhalation and keeps active detergent clinging to vertical tiles and range hoods.',
        features: [
          'Flip-open mesh hood toggles between cling foam and liquid spray',
          'Reduces airborne mist drift for bathroom & kitchen formulas',
          'High-grip 28/400 and 28/410 ribbed collar for gloved hands',
          'Custom dual-tone shroud & hinged flap colour combinations',
        ],
        gallery: [
          { src: '/src/assets/images/product_foam_trigger_1795008503693.jpg', label: 'Flip-Open Mesh Hood' },
          { src: '/src/assets/images/detail_qc_spray_test_1795008705224.jpg', label: 'Aeration Output QC' },
          { src: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg', label: 'Bottle Fitment' },
          { src: '/src/assets/images/factory_assembly_line_1795005763368.jpg', label: 'Automated Assembly' },
        ],
      },
      {
        slug: 'yl-ft28h',
        model: 'YL-FT28H Thick Cling Foam',
        neckFinish: '28/410',
        dosage: '1.55 ± 0.10 ml/stroke',
        closureStyle: 'Ratchet Anti-Backoff',
        springType: '316 SS Chemical Grade',
        moq: '15,000 pcs',
        materials: 'Chemical-Grade PP · Dual-Stage Mesh · 316 SS Spring',
        leadTime: '18–22 days',
        applications: 'Automotive wheel foam, heavy grill & industrial cleaners',
        description:
          'Built for heavy-duty automotive wheel cleaners, alkaline oven degreasers, and commercial food-plant sanitizers. The YL-FT28H expands output to 1.55 ml per pull through a dual-stage foaming chamber with a ratchet lock closure that prevents accidental loosening on filling lines.',
        features: [
          '1.55 ml high-volume piston chamber builds thick clinging foam',
          '316 stainless steel spring & chemical-resistant inner seals',
          'Ratchet anti-backoff collar locks firmly onto 28/410 necks',
          'Tested for 5,000+ cycles without mesh clogging or trigger fatigue',
        ],
        gallery: [
          { src: '/src/assets/images/product_foam_trigger_1795008503693.jpg', label: 'Heavy-Duty Foam Head' },
          { src: '/src/assets/images/detail_nozzle_closeup_1795008701972.jpg', label: 'Precision Orifice Housing' },
          { src: '/src/assets/images/factory_injection_moulding_1795005762839.jpg', label: 'In-House Moulding' },
          { src: '/src/assets/images/factory_export_packaging_1795005763378.jpg', label: 'Container Palletizing' },
        ],
      },
    ],
  },
  {
    id: 'lotion-pumps',
    index: '04',
    name: 'Lotion Pumps',
    shortName: 'Lotion Pumps',
    accent: 'blue',
    image: '/src/assets/images/product_lotion_pump_1795008503779.jpg',
    summary:
      'Smooth, consistent high-viscosity dosing with lock-down and clip-lock heads for lotions, shampoos, hand soaps, and kitchen liquids.',
    neckRange: '24/410 · 28/410 · 33/410',
    outputRange: '2.00 – 4.00 ml',
    moq: '10,000 pcs',
    variants: [
      {
        slug: 'yl-lp28',
        model: 'YL-LP28 Lock-Down 2.0cc',
        neckFinish: '24/410 & 28/410',
        dosage: '2.00 ± 0.15 ml/stroke',
        closureStyle: 'Smooth / Ribbed / Aluminium Collar',
        springType: 'External Non-Contact 304 SS',
        moq: '10,000 pcs',
        materials: 'Virgin PP Actuator · 304 External Spring · LDPE Tube',
        leadTime: '15–18 days',
        applications: 'Hand wash, body lotion, conditioner, liquid dish soap',
        description:
          'Our most versatile 2.0 cc lotion dispenser featuring an external spring architecture that keeps metal completely isolated from your liquid formula. Twist-to-lock down saddle head secures cleanly for shipping, and optional brushed aluminium or electroplated collars elevate personal care shelf appeal.',
        features: [
          'External spring never contacts lotions, soaps, or active ingredients',
          'Clean anti-drip spout cut-off keeps bottle shoulders spotless',
          'Available with smooth PP, ribbed PP, or anodized aluminium collar',
          'Lock-down twist mechanism passes -0.06 MPa vacuum leak tests',
        ],
        gallery: [
          { src: '/src/assets/images/product_lotion_pump_1795008503779.jpg', label: 'White, Blue & Alu Finishes' },
          { src: '/src/assets/images/detail_pump_mechanism_1795008703095.jpg', label: 'Spring, Piston & Collar Set' },
          { src: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg', label: '300 ml Soap Bottle Pairing' },
          { src: '/src/assets/images/factory_assembly_line_1795005763368.jpg', label: 'Cleanroom Assembly Line' },
        ],
      },
      {
        slug: 'yl-lp33',
        model: 'YL-LP33 High-Output 4.0cc',
        neckFinish: '28/410 & 33/410',
        dosage: '4.00 ± 0.25 ml/stroke',
        closureStyle: 'Wide Ribbed / Smooth',
        springType: '304 Stainless Steel',
        moq: '10,000 pcs',
        materials: 'Heavy-Wall Virgin PP · Wide-Bore Dip Tube · 304 SS',
        leadTime: '15–20 days',
        applications: 'Salon 1L shampoo jugs, viscous body wash, food syrups',
        description:
          'Designed with a generous 4.0 cc cylinder and oversized wide-bore dip tube for 500 ml to 2 L family packs, salon backbar shampoos, and dense body creams. Dispenses thick viscous formulas smoothly in a single effortless press without stalling.',
        features: [
          'High-output 4.0 ml stroke ideal for 500 ml – 2 L containers',
          'Wide-bore intake & ball valve handle thick gels and conditioners',
          'Reinforced wide saddle head resists side-load stress',
          'Food-contact compliant virgin polypropylene resin option',
        ],
        gallery: [
          { src: '/src/assets/images/product_lotion_pump_1795008503779.jpg', label: 'High-Output Pump Series' },
          { src: '/src/assets/images/detail_pump_mechanism_1795008703095.jpg', label: 'Internal Piston & Tube' },
          { src: '/src/assets/images/factory_injection_moulding_1795005762839.jpg', label: 'Moulding Capacity' },
          { src: '/src/assets/images/factory_export_packaging_1795005763378.jpg', label: 'Export Carton Staging' },
        ],
      },
      {
        slug: 'yl-lp28w',
        model: 'YL-LP28W Water-Shield Up-Lock',
        neckFinish: '28/410',
        dosage: '2.00 ± 0.15 ml/stroke',
        closureStyle: 'Waterproof Gasket Skirt',
        springType: 'External 304 SS',
        moq: '15,000 pcs',
        materials: 'Virgin PP · Dual Waterproof Skirt · External 304 SS',
        leadTime: '18–22 days',
        applications: 'Shower gels, facial cleansers, wet-environment soaps',
        description:
          'Built specifically for wet shower and bath environments, the YL-LP28W incorporates a precision dual-lip water-shield skirt beneath the actuator that blocks shower water from seeping back into the bottle neck. Its up-lock twist collar prevents messy product waste during locking.',
        features: [
          'Anti-water-ingress dual lip protects formulas in shower environments',
          'Up-lock collar locks without depressing & wasting product on shelf',
          'External spring architecture prevents oxidation & discoloration',
          'Available in gloss, matte, or custom Pantone colour sets',
        ],
        gallery: [
          { src: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg', label: 'Bath & Shower Line Look' },
          { src: '/src/assets/images/product_lotion_pump_1795008503779.jpg', label: 'Collar Finish Options' },
          { src: '/src/assets/images/detail_pump_mechanism_1795008703095.jpg', label: 'Water-Shield Components' },
          { src: '/src/assets/images/factory_assembly_line_1795005763368.jpg', label: 'Automated Leak Testing' },
        ],
      },
    ],
  },
  {
    id: 'fine-mist-sprayers',
    index: '05',
    name: 'Fine Mist Sprayers',
    shortName: 'Fine Mist Sprayers',
    accent: 'blue',
    image: '/src/assets/images/product_fine_mist_1795008505359.jpg',
    summary:
      'Precision micro-orifice atomization delivering an even, silky cloud for cosmetics, fragrances, hair care, and air fresheners.',
    neckRange: '18/410 · 20/410 · 24/410',
    outputRange: '0.12 – 0.20 ml',
    moq: '10,000 pcs',
    variants: [
      {
        slug: 'yl-fm20',
        model: 'YL-FM20 PP Cosmetic Mist',
        neckFinish: '18/415 · 20/410 · 24/410',
        dosage: '0.14 ± 0.02 ml/stroke',
        closureStyle: 'Smooth PP + Full Overcap',
        springType: '304 SS Micro-Valve',
        moq: '10,000 pcs',
        materials: 'Cosmetic PP · Clear AS / PP Overcap · 304 SS Micro-Valve',
        leadTime: '15–18 days',
        applications: 'Facial hydrating mist, setting sprays, alcohol sanitizers',
        description:
          'Precision-engineered micro-swirl atomization breaks liquid into an ultra-fine, dry-feel 0.14 ml mist cloud ideal for facial toners, makeup setting sprays, and hand sanitizers. Supplied with a crystal-clear snap overcap (half-cap or full-cap) to keep the actuator sanitary.',
        features: [
          'Ultra-fine 0.14 ml micro-atomization with zero heavy droplets',
          'Full or half transparent dust overcap included',
          'Fits 18/415, 20/410, and 24/410 PET and glass cosmetic bottles',
          'Smooth snap-fit finger pad with custom colour actuator options',
        ],
        gallery: [
          { src: '/src/assets/images/product_fine_mist_1795008505359.jpg', label: 'Overcap & Ribbed Collars' },
          { src: '/src/assets/images/detail_pump_mechanism_1795008703095.jpg', label: 'Micro-Valve & Dip Tube' },
          { src: '/src/assets/images/detail_qc_spray_test_1795008705224.jpg', label: 'Mist Cloud Pattern QC' },
          { src: '/src/assets/images/factory_assembly_line_1795005763368.jpg', label: 'Cleanroom Assembly' },
        ],
      },
      {
        slug: 'yl-fm24',
        model: 'YL-FM24 Alu-Collar Fragrance',
        neckFinish: '20/410 & 24/410',
        dosage: '0.18 ± 0.03 ml/stroke',
        closureStyle: 'Anodized Aluminium Collar',
        springType: '304 SS Micro-Valve',
        moq: '15,000 pcs',
        materials: 'Anodized Aluminium Shell · Alcohol-Rated PE Seal · 304 SS',
        leadTime: '18–22 days',
        applications: 'Body mist, linen sprays, cologne, room fragrance',
        description:
          'Combining anodized aluminium luxury aesthetics with high-alcohol fragrance compatibility, the YL-FM24 elevates body mists, colognes, and linen sprays. Available in matte silver, champagne gold, rose gold, and black anodized shells with matching metal-overshell overcaps.',
        features: [
          'Anodized aluminium collar & optional matching metallic overcap',
          'High-ethanol gasket resists fragrance oil swelling and evaporation',
          'Generous 0.18 ml wide-angle mist dispersion for body & room sprays',
          'Custom brushed, glossy, or laser-engraved brand collar options',
        ],
        gallery: [
          { src: '/src/assets/images/product_fine_mist_1795008505359.jpg', label: 'Anodized Silver & White Series' },
          { src: '/src/assets/images/detail_pump_mechanism_1795008703095.jpg', label: 'Precision Atomizer Internals' },
          { src: '/src/assets/images/factory_injection_moulding_1795005762839.jpg', label: 'Precision Moulding Hall' },
          { src: '/src/assets/images/factory_export_packaging_1795005763378.jpg', label: 'Export Carton Packaging' },
        ],
      },
    ],
  },
  {
    id: 'bottle-caps-closures',
    index: '06',
    name: 'Bottle Caps & Closures',
    shortName: 'Bottle Caps',
    accent: 'crimson',
    image: '/src/assets/images/product_bottle_caps_1795008504005.jpg',
    summary:
      'Screw caps, flip-tops, disc tops, and push-pull closures moulded in matching virgin PP resin for total packaging line colour harmony.',
    neckRange: '18/410 · 24/410 · 28/410',
    outputRange: '2.5 – 6.0 mm orifice',
    moq: '20,000 pcs',
    variants: [
      {
        slug: 'yl-fc24',
        model: 'YL-FC24 Snap Flip-Top',
        neckFinish: '20/410 · 24/410 · 28/410',
        dosage: '3.0 mm / 5.0 mm aperture',
        closureStyle: 'Gloss or Matte Butterfly Hinge',
        springType: 'Silicone Valve Optional',
        moq: '20,000 pcs',
        materials: 'High-Flex Virgin PP · Optional PE Liner / Silicone Valve',
        leadTime: '14–18 days',
        applications: 'Shampoo, shower gel, body lotion, cooking oils',
        description:
          'Moulded with an enduring butterfly living hinge tested to over 3,000 snap cycles without whitening or tearing. Available in glossy mirror finish or fine frosted matte texture with an optional no-drip silicone cross-slit valve for inverted squeezy bottles.',
        features: [
          'Living butterfly hinge tested to 3,000+ open/close cycles',
          'Crisp audible snap seal prevents leakage in transit',
          'Available with 3.0 mm or 5.0 mm orifice and optional silicone valve',
          'Colour-matched in-house to match your sprayers and pumps',
        ],
        gallery: [
          { src: '/src/assets/images/product_bottle_caps_1795008504005.jpg', label: 'Flip-Top, Disc & Screw Lineup' },
          { src: '/src/assets/images/factory_injection_moulding_1795005762839.jpg', label: 'Multi-Cavity Closure Moulding' },
          { src: '/src/assets/images/detail_bottle_mounted_1795008703253.jpg', label: 'Brand Packaging Harmony' },
          { src: '/src/assets/images/factory_export_packaging_1795005763378.jpg', label: 'Bulk Pallet Export' },
        ],
      },
      {
        slug: 'yl-dc24',
        model: 'YL-DC24 Press Disc-Top',
        neckFinish: '20/410 · 24/410 · 28/410',
        dosage: '3.5 mm Crescent Opening',
        closureStyle: 'Smooth / Double-Wall',
        springType: 'N/A — Moulded Polypropylene',
        moq: '20,000 pcs',
        materials: 'Virgin PP + PE Sealing Plug · Optional Foil-Lined Gasket',
        leadTime: '14–18 days',
        applications: 'Micellar water, nail polish remover, hair serums',
        description:
          'Clean one-handed finger-press disc top closure engineered with a tight-fitting internal plug that seals the dispensing channel flush when closed. Offered in single-wall glossy, matte, or double-wall flush-shoulder silhouettes for toners, oils, and serums.',
        features: [
          'Smooth one-handed press actuation for liquid skincare & serums',
          'Flush-fit top disc sits cleanly for upright retail presentation',
          'Available in smooth, ribbed, or luxury anodized aluminium skirt',
          'Tight-seal internal crescent plug eliminates weeping in cartons',
        ],
        gallery: [
          { src: '/src/assets/images/product_bottle_caps_1795008504005.jpg', label: 'Red, Blue & White Disc Tops' },
          { src: '/src/assets/images/factory_injection_moulding_1795005762839.jpg', label: 'Yuyao Precision Presses' },
          { src: '/src/assets/images/factory_assembly_line_1795005763368.jpg', label: 'Automated Closure Assembly' },
          { src: '/src/assets/images/factory_export_packaging_1795005763378.jpg', label: 'Export Ready Cartons' },
        ],
      },
    ],
  },
];

export const MATCHER_OPTIONS: MatcherOption[] = [
  {
    id: 'window-cleaner',
    label: 'Window & surface cleaner',
    recommendedCategoryId: 'trigger-sprayers',
    recommendedTitle: 'Trigger Sprayer (YL-TS28A)',
    dosageSpec: '1.25 ml/stroke · 28/400 or 28/410',
    neckSpec: 'Adjustable Spray / Stream / Off Nozzle',
    rationale: 'A wide fine spray for glass surfaces and a concentrated jet stream for corners: one nozzle handles both jobs.',
    compatibilityNote: 'Compatible with surfactant, alcohol, and mild ammonia formulas using virgin PP resin and 304 SS spring.',
  },
  {
    id: 'perfume-mist',
    label: 'Perfume & body mist',
    recommendedCategoryId: 'fine-mist-sprayers',
    recommendedTitle: 'Fine Mist Sprayer (YL-FM20)',
    dosageSpec: '0.14 ml/stroke · 18/415 to 24/410',
    neckSpec: 'Micro-Orifice Atomizer + Full Dust Cap',
    rationale: 'Produces an ultra-fine 45° dispersion cone with zero large droplets, giving skin and hair sprays a light dry feel.',
    compatibilityNote: 'Optional anodized aluminium collar and PE gasket rated for high-ethanol fragrance blends.',
  },
  {
    id: 'hand-soap',
    label: 'Hand soap & lotion',
    recommendedCategoryId: 'lotion-pumps',
    recommendedTitle: 'Lotion Pump (YL-LP28)',
    dosageSpec: '2.00 or 4.00 ml/stroke · 24/410 to 33/410',
    neckSpec: 'Lock-Down Head + External Spring',
    rationale: 'Delivers clean, repeatable high-viscosity dosing with anti-drip cut-off and an external spring that never touches your formula.',
    compatibilityNote: 'Leak-tested at -0.06 MPa vacuum pressure for e-commerce and palletized ocean transit.',
  },
  {
    id: 'car-degreaser',
    label: 'Car-wash & degreaser',
    recommendedCategoryId: 'foam-triggers',
    recommendedTitle: 'Foam Trigger (YL-FT28H)',
    dosageSpec: '1.45 ml/stroke · 28/400 or 28/410',
    neckSpec: 'Flip-Open Aerator Screen + Ratchet Collar',
    rationale: 'Aerates detergent into dense clinging foam that stays on vertical car panels, wheels, and kitchen hoods longer.',
    compatibilityNote: 'Available with 316 stainless steel springs and EPDM/FPM chemical-resistant seals for alkaline degreasers.',
  },
  {
    id: 'travel-skincare',
    label: 'Travel-size skincare',
    recommendedCategoryId: 'mini-trigger-sprayers',
    recommendedTitle: 'Mini Trigger Sprayer (YL-MT24)',
    dosageSpec: '0.32 ml/stroke · 20/410 or 24/410',
    neckSpec: 'Compact Shroud + Slide Safety Lock',
    rationale: 'Brings single-finger trigger ergonomics to 50 ml – 200 ml bottles with an integrated clip lock to prevent bag spills.',
    compatibilityNote: 'Custom Pantone shroud moulding and satin matte textures available from 10,000 pieces.',
  },
];

export const BLUEPRINT_PARTS: BlueprintPart[] = [
  {
    id: 1,
    name: 'Nozzle',
    subtitle: 'Spray · Stream · Off',
    material: 'POM / Virgin PP',
    tolerance: '±0.03 mm orifice',
    customization: 'Spray, stream, foam mesh, or child-lock cap',
    description:
      'Precision-bored spinner insert rotates smoothly between wide mist, pinpoint jet stream, and locked off position.',
  },
  {
    id: 2,
    name: 'Shroud',
    subtitle: 'Moulded in any colour',
    material: 'High-Gloss or Matte PP',
    tolerance: '±0.05 mm snap fit',
    customization: 'Any Pantone shade + pad-printed or embossed logo',
    description:
      'Outer protective housing engineered for balanced finger leverage and crisp brand colour consistency across batches.',
  },
  {
    id: 3,
    name: 'Trigger',
    subtitle: 'Ergonomic grip',
    material: 'Impact-Modified PP',
    tolerance: '5,000+ cycle rated',
    customization: 'Contoured 2-finger or compact 1-finger profile',
    description:
      'Low actuation force lever tested for fatigue-free repetitive squeezing without cracking or hinge whitening.',
  },
  {
    id: 4,
    name: 'Piston & spring',
    subtitle: 'Smooth, steady output',
    material: '304 / 316 SS + PE Piston',
    tolerance: '±0.08 ml stroke consistency',
    customization: 'Standard 304 SS or heavy chemical-grade 316 SS',
    description:
      'Self-priming cylinder chamber draws liquid in 3–4 pulls and maintains airtight seal against bottle back-pressure.',
  },
  {
    id: 5,
    name: 'Closure',
    subtitle: 'Ribbed or smooth screw cap',
    material: 'PP + PE / Foam Gasket',
    tolerance: 'SPI 28/400 & 28/410',
    customization: 'Ribbed, smooth, or anti-backoff ratchet collar',
    description:
      'Torque-calibrated threading with compressible inner liner ensures zero leakage during high-speed capping and sea freight.',
  },
  {
    id: 6,
    name: 'Dip tube',
    subtitle: 'Cut to your bottle height',
    material: 'Virgin LDPE',
    tolerance: '±1.0 mm custom cut',
    customization: 'Straight, angled, or bottom-corner curve cut',
    description:
      'Extruded in-house and cut specifically to your container depth so consumers dispense down to the final millilitre.',
  },
];

export const NOZZLE_COLOURS: NozzleColour[] = [
  { id: 'ocean-blue', name: 'Ocean blue', hex: '#155EEF', pantone: 'PMS 2728 C' },
  { id: 'signal-red', name: 'Signal red', hex: '#E1262D', pantone: 'PMS 185 C' },
  { id: 'pure-white', name: 'Pure white', hex: '#FFFFFF', pantone: 'White Virgin PP', contrastBorder: true },
  { id: 'matte-black', name: 'Matte black', hex: '#1C2434', pantone: 'PMS Black 6 C' },
  { id: 'emerald-green', name: 'Emerald green', hex: '#129A63', pantone: 'PMS 3395 C' },
  { id: 'amber-gold', name: 'Amber yellow', hex: '#F2B705', pantone: 'PMS 1235 C' },
];

export const EXPORT_MARKETS: ExportMarket[] = [
  {
    id: 'middle-east',
    region: 'Middle East',
    hubs: 'Jebel Ali (Dubai) · Jeddah · Dammam · Sohar',
    transitDays: '18 – 24 days sea freight from Ningbo',
    incoterms: 'FOB Ningbo / CIF Jebel Ali',
    summary:
      'Sprayers, foam triggers, and lotion pumps for regional cleaning chemical plants, personal care fillers, and fragrance houses. Enquiries welcome in Arabic & English.',
    x: 56,
    y: 52,
  },
  {
    id: 'south-america',
    region: 'South America',
    hubs: 'Santos (Brazil) · Valparaíso (Chile) · Callao · Buenos Aires',
    transitDays: '32 – 38 days sea freight from Ningbo',
    incoterms: 'FOB Ningbo / CIF Santos & Callao',
    summary:
      'High-volume container supply for household distributors, automotive care brands, and contract fillers across Brazil, Chile, Peru, and Argentina. Enquiries welcome in Spanish.',
    x: 28,
    y: 72,
  },
  {
    id: 'europe',
    region: 'Europe & UK',
    hubs: 'Rotterdam · Hamburg · Antwerp · Valencia',
    transitDays: '26 – 32 days sea freight from Ningbo',
    incoterms: 'FOB Ningbo / DDP EU Ports',
    summary:
      'REACH-compliant virgin PP and PCR-ready dispensing closures engineered for European private-label homecare and cosmetic filling lines.',
    x: 49,
    y: 34,
  },
  {
    id: 'north-america',
    region: 'North America',
    hubs: 'Los Angeles · Long Beach · Savannah · Vancouver',
    transitDays: '16 – 26 days sea freight from Ningbo',
    incoterms: 'FOB Ningbo / CIF US West & East Coast',
    summary:
      'Consistent SPI 28/400 and 24/410 thread tolerances compatible with high-speed automated North American bottling lines.',
    x: 20,
    y: 42,
  },
];
