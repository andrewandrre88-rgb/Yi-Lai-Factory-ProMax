import {
  BLUEPRINT_PARTS,
  BlueprintPart,
  EXPORT_MARKETS,
  ExportMarket,
  LanguageCode,
  MATCHER_OPTIONS,
  MatcherOption,
  NOZZLE_COLOURS,
  NozzleColour,
  PRODUCT_CATEGORIES,
  ProductCategory,
  ProductVariant,
} from './factoryData';

export interface AppStrings {
  brandShort: string;
  brandFull: string;
  heroCheck1: string;
  heroCheck2: string;
  heroCheck3: string;
  strokeSingular: string;
  strokePlural: string;
  resetCounterAria: string;
  conveyorBlue: string[];
  conveyorRed: string[];
  orbitKicker: string;
  orbitTitle: string;
  orbitSub: string;
  orbitSeries: string;
  orbitPaused: string;
  orbitPlant: string;
  orbitBrowseAll: string;
  matcherKicker: string;
  matcherTitle: string;
  matcherSub: string;
  matcherRecommended: string;
  matcherRequestSamples: string;
  matcherSeeRange: string;
  blueprintKicker: string;
  blueprintTitle: string;
  blueprintSub: string;
  blueprintResinLabel: string;
  blueprintOptionsLabel: string;
  blueprintAssembleBtn: string;
  blueprintExplodeBtn: string;
  labKicker: string;
  labTitle: string;
  labSub: string;
  labStepOutput: string;
  labStepColour: string;
  labPantonePlaceholder: string;
  labLogoOn: string;
  labLogoOff: string;
  labStepNeck: string;
  labStepBottle: string;
  labRequestSample: string;
  labTestSpray: string;
  labPatterns: Record<'Spray' | 'Stream' | 'Foam', string>;
  labBottles: Record<'clear-pet' | 'amber-glass' | 'frosted-hdpe', string>;
  factoryKicker: string;
  factoryTitle: string;
  factorySub: string;
  factoryQcPass: string;
  factoryPauseLine: string;
  factoryAutoCycleLine: string;
  factoryCampusCaption: string;
  factoryCampusSub: string;
  factoryStageCodes: string[];
  factoryStageTitles: string[];
  factoryStageDetails: string[];
  factorySteps: Array<{ num: string; title: string; desc: string; accent: 'blue' | 'crimson' }>;
  factoryPhotoCaptions: string[];
  whyKicker: string;
  whyTitle: string;
  whySub: string;
  whyCerts: string;
  whyPillars: Array<{ title: string; desc: string; accent: 'blue' | 'crimson' }>;
  exportKicker: string;
  exportTitle: string;
  exportSub: string;
  exportOriginTitle: string;
  exportOriginSub: string;
  exportQuotePrefix: string;
  offerKicker: string;
  offerTitle: string;
  offerSub: string;
  offerRevealInstant: string;
  offerBadge: string;
  offerOfferTitle: string;
  offerOfferDesc: string;
  offerClaimBtn: string;
  offerCanvasHeadline: string;
  offerCanvasSub: string;
  quoteKicker: string;
  quoteTitle: string;
  quoteSub: string;
  quoteEmailLabel: string;
  quotePhoneLabel: string;
  quoteAddressLabel: string;
  quoteAddressValue: string;
  quoteRefLabel: string;
  quoteReceivedTitle: string;
  quoteThankYou1: string;
  quoteThankYou2: string;
  quoteThankYou3: string;
  quoteSubmitAnother: string;
  quoteFieldName: string;
  quotePlaceholderName: string;
  quoteFieldCompany: string;
  quotePlaceholderCompany: string;
  quoteFieldEmail: string;
  quotePlaceholderEmail: string;
  quoteFieldCountry: string;
  quotePlaceholderCountry: string;
  quoteFieldProduct: string;
  quoteCustomSamplePack: string;
  quoteFieldQty: string;
  quotePlaceholderQty: string;
  quoteFieldReq: string;
  quotePlaceholderReq: string;
  quoteErrRequired: string;
  quoteErrEmail: string;
  quoteDirectNote: string;
  quoteSendBtn: string;
  footerSince: string;
  footerSummary: string;
  footerColProducts: string;
  footerColFactory: string;
  footerColContact: string;
  footerLinkRange: string;
  footerLinkLab: string;
  footerLinkLines: string;
  footerLinkExport: string;
  footerLinkQuote: string;
  footerCopyright: string;
  footerBottomRight: string;
  productsBackHome: string;
  productsDownloadSpec: string;
  productsKicker: string;
  productsTitle: string;
  productsSub: string;
  productsSearchPlaceholder: string;
  productsNeckLabel: string;
  productsAllNecks: string;
  productsAllSeries: string;
  productsEmptyTitle: string;
  productsEmptySub: string;
  productsResetFilters: string;
  productsSeriesLabel: string;
  productsCompareSeries: string;
  productsNeckFinishLabel: string;
  productsDosageLabel: string;
  productsGalleryLabel: string;
  productsPhotosWord: string;
  productsViewProduct: string;
  productsQuoteBtn: string;
  productsLabKicker: string;
  productsLabTitle: string;
  productsLabSub: string;
  productsLabBtn: string;
  detailAllProducts: string;
  detailFobNote: string;
  detailNeckPrefix: string;
  detailOutputPrefix: string;
  detailMoqPrefix: string;
  detailOverviewTitle: string;
  detailTechSpecsTitle: string;
  detailSpecNeck: string;
  detailSpecDosage: string;
  detailSpecClosure: string;
  detailSpecSpring: string;
  detailSpecMaterials: string;
  detailSpecLeadTime: string;
  detailSpecApps: string;
  detailPrefColour: string;
  detailTargetVolume: string;
  detailVolumes: string[];
  detailColours: Array<{ name: string; hex: string; border?: boolean }>;
  detailRequestSamplesBtn: string;
  detailCustomizeBtn: string;
  detailCertBadge1: string;
  detailCertBadge2: string;
  detailMoreInSeries: string;
  modalCloseAria: string;
  modalDosage: string;
  modalClosure: string;
  modalSpring: string;
  modalMoq: string;
  modalApps: string;
  modalQuoteBtn: string;
  backToTopTitle: string;
  whatsappCtaLabel: string;
  whatsappTitle: string;
  menuOpenAria: string;
  menuCloseAria: string;
}

const APP_STRINGS: Record<LanguageCode, AppStrings> = {
  en: {
    brandShort: 'Yi Lai Plastics',
    brandFull: 'Yi Lai Plastics Industry',
    heroCheck1: 'OEM & ODM tooling',
    heroCheck2: 'Custom Pantone colours & logos',
    heroCheck3: 'FOB Ningbo port dispatch',
    strokeSingular: 'stroke',
    strokePlural: 'strokes',
    resetCounterAria: 'Reset stroke counter',
    conveyorBlue: [
      '65+ INJECTION MACHINES',
      '13+ AUTOMATIC LINES',
      'PANTONE COLOUR MATCHING',
      'CUSTOM LOGO PRINTING',
      'SHIPPED FROM NINGBO PORT',
      'ISO 9001 QUALITY CONTROL',
    ],
    conveyorRed: [
      'TRIGGER SPRAYERS',
      'LOTION PUMPS',
      'FINE MIST SPRAYERS',
      'FOAM TRIGGERS',
      'MINI TRIGGERS',
      'BOTTLE CAPS',
      'OEM & ODM',
    ],
    orbitKicker: 'The Yi Lai Orbit',
    orbitTitle: 'One factory at the centre of your packaging line',
    orbitSub:
      'Hover any dispensing line to inspect live specifications, or click to view full neck finishes and dosage tolerances.',
    orbitSeries: 'SERIES',
    orbitPaused: 'Orbit paused',
    orbitPlant: 'Yuyao Plant',
    orbitBrowseAll: 'Browse all 6 product lines & specs',
    matcherKicker: 'Product Matcher',
    matcherTitle: 'What are you filling?',
    matcherSub:
      'Select your formula category and we will match the optimal Yi Lai dispenser and spring specification.',
    matcherRecommended: 'Recommended Dispenser',
    matcherRequestSamples: 'Request samples',
    matcherSeeRange: 'See the range',
    blueprintKicker: 'Engineering Blueprint',
    blueprintTitle: 'Six parts. One perfect spray.',
    blueprintSub:
      'Every Yi Lai trigger is built from precision parts moulded on our own machines in Yuyao, so every seal, piston stroke, and thread locks together exactly as designed.',
    blueprintResinLabel: 'Resin / Alloy:',
    blueprintOptionsLabel: 'Options:',
    blueprintAssembleBtn: 'Put it back together',
    blueprintExplodeBtn: 'Explode blueprint',
    labKicker: 'The Nozzle Lab',
    labTitle: 'Build your sprayer. We mould it.',
    labSub:
      'Choose the spray pattern, bottle pairing, neck finish, and resin colour your brand needs. Every part is moulded on our own machines for exact Pantone consistency.',
    labStepOutput: '1 · Nozzle output',
    labStepColour: '2 · Colour',
    labPantonePlaceholder: 'Optional Pantone code (e.g. PMS 286 C)',
    labLogoOn: 'Logo imprint: ON',
    labLogoOff: 'Logo imprint: OFF',
    labStepNeck: '3 · Neck finish',
    labStepBottle: '4 · Bottle pairing preview',
    labRequestSample: 'Request this sample',
    labTestSpray: 'Test spray',
    labPatterns: { Spray: 'Spray', Stream: 'Stream', Foam: 'Foam' },
    labBottles: {
      'clear-pet': 'Clear PET',
      'amber-glass': 'Amber',
      'frosted-hdpe': 'White HDPE',
    },
    factoryKicker: 'From Resin to Pallet',
    factoryTitle: 'One factory. Every step under our roof.',
    factorySub:
      'Keeping tooling, injection moulding, assembly, and QC inspection in one facility in Yuyao means steadier tolerance control, faster samples, and zero surprises between order and delivery.',
    factoryQcPass: 'QC Pass',
    factoryPauseLine: 'Pause line',
    factoryAutoCycleLine: 'Auto-cycle line',
    factoryCampusCaption: 'Yi Lai Plastics Industry · Manufacturing Campus, Yuyao, Ningbo',
    factoryCampusSub: 'Office · Moulding Hall · Container Loading Bay',
    factoryStageCodes: ['01 MOULD', '02 ASSEMBLE', '03 TEST', '04 PACK'],
    factoryStageTitles: [
      'Precision Injection Moulding',
      'Automated High-Speed Assembly',
      'Vacuum & Spray Calibration QC',
      'Export Cartoning & Palletizing',
    ],
    factoryStageDetails: [
      '65+ hydraulic and all-electric machines mould shrouds, triggers, pistons, and closures in virgin PP/PE.',
      '13+ automatic lines insert 304/316 stainless steel springs, ball valves, and pistons at consistent torque.',
      '100% automated vacuum leak detection (-0.06 MPa), priming stroke verification, and spray dispersion imaging.',
      'Double-walled export cartons, PE inner liner bags, and pallet wrapping staged 45 minutes from Ningbo Port.',
    ],
    factorySteps: [
      {
        num: '01',
        title: 'Mould design',
        desc: 'Your bottle neck, thread pitch, and dosage targets become precision CAD tooling drawings.',
        accent: 'blue',
      },
      {
        num: '02',
        title: 'Injection moulding',
        desc: '65+ machines mould shrouds, triggers, pistons, and closures in your Pantone colours.',
        accent: 'blue',
      },
      {
        num: '03',
        title: 'Automatic assembly',
        desc: '13+ automatic lines assemble springs, valves, and dip tubes consistently at high volume.',
        accent: 'blue',
      },
      {
        num: '04',
        title: 'Quality inspection',
        desc: 'Vacuum leak testing, spray-pattern dispersion checks, and per-stroke dosage calibration.',
        accent: 'crimson',
      },
      {
        num: '05',
        title: 'Packing & export',
        desc: 'Cartoned to your warehouse spec and dispatched smoothly through Ningbo Beilun Port.',
        accent: 'crimson',
      },
    ],
    factoryPhotoCaptions: [
      'Injection Moulding Hall · 65+ Machines',
      'Automatic Assembly · 13+ Lines',
      'Export Warehouse · FOB Ningbo Port',
    ],
    whyKicker: 'Why Buyers Choose Yi Lai',
    whyTitle: 'A partner built for importers and private labels',
    whySub:
      'Whether you fill your own household cleaners or supply regional supermarkets and distributors, we tailor the sprayer output, resin shade, and export carton markings to how you sell.',
    whyCerts: 'ISO 9001:2015 Certified · SGS Material Tested · RoHS & REACH Compliant',
    whyPillars: [
      {
        title: 'Factory-direct pricing',
        desc: 'Deal directly with the moulding plant in Yuyao — no trading companies or middlemen.',
        accent: 'blue',
      },
      {
        title: 'OEM & private label',
        desc: 'Pantone-matched virgin PP resin, custom shroud logo imprinting, and dip tubes cut to spec.',
        accent: 'crimson',
      },
      {
        title: 'Free sample evaluation',
        desc: 'Test leakage, torque, and spray dispersion directly on your own bottles before tooling or bulk PO.',
        accent: 'blue',
      },
      {
        title: 'Flexible container orders',
        desc: 'Standard MOQ from 10,000 pieces per SKU — mixed colours and LCL/FCL consolidations available.',
        accent: 'crimson',
      },
    ],
    exportKicker: 'From Yuyao to Your Warehouse',
    exportTitle: 'Built for export markets',
    exportSub:
      "Our factory sits 45 minutes from Ningbo Beilun Port — one of the world's busiest deep-water container terminals — enabling fast weekly vessel consolidation.",
    exportOriginTitle: 'NINGBO PORT',
    exportOriginSub: 'Yi Lai Factory · 45 min',
    exportQuotePrefix: 'Quote freight:',
    offerKicker: 'Try It Yourself',
    offerTitle: 'Spray to reveal your welcome offer',
    offerSub:
      'Press, hold, and drag across the card — just like squeezing one of our trigger sprayers on the line.',
    offerRevealInstant: 'Prefer not to spray? Reveal it instantly',
    offerBadge: 'New Buyer Sample Pack',
    offerOfferTitle: 'Free 50-Piece Assorted Sample Box + Free Pantone Match',
    offerOfferDesc:
      'Includes trigger sprayers, lotion pumps, and fine mist dispensers shipped directly from Yuyao for bottle fit & leak testing.',
    offerClaimBtn: 'Claim sample pack',
    offerCanvasHeadline: 'HOLD & DRAG TO SPRAY',
    offerCanvasSub: 'Sweep across the card to reveal your sample pack offer',
    quoteKicker: 'Request a Quote',
    quoteTitle: "Tell us your bottle. We'll match the sprayer.",
    quoteSub:
      'Share your product category, bottle neck finish, and target volume — our engineering & export sales desk replies within 24 hours with FOB Ningbo pricing and sample options.',
    quoteEmailLabel: 'Direct Export Email',
    quotePhoneLabel: 'WhatsApp / WeChat Desk',
    quoteAddressLabel: 'Moulding & Assembly Plant',
    quoteAddressValue: 'Yuyao, Ningbo, Zhejiang, China',
    quoteRefLabel: 'INQUIRY REFERENCE',
    quoteReceivedTitle: 'Quotation request received',
    quoteThankYou1: 'Thank you,',
    quoteThankYou2: 'Our Ningbo export team has logged your inquiry for',
    quoteThankYou3: 'and will reply within 24 hours to',
    quoteSubmitAnother: 'Submit another product inquiry',
    quoteFieldName: 'Your name *',
    quotePlaceholderName: 'Ahmed Hassan',
    quoteFieldCompany: 'Company *',
    quotePlaceholderCompany: 'Company or brand name',
    quoteFieldEmail: 'Business email *',
    quotePlaceholderEmail: 'buyer@company.com',
    quoteFieldCountry: 'Destination country / port',
    quotePlaceholderCountry: 'e.g. Saudi Arabia, Brazil, UK',
    quoteFieldProduct: 'Product line',
    quoteCustomSamplePack: 'Custom Multi-Product Sample Pack',
    quoteFieldQty: 'Estimated quantity (pcs)',
    quotePlaceholderQty: 'e.g. 50,000',
    quoteFieldReq: 'Bottle neck size, Pantone colour, dip tube length & requirements',
    quotePlaceholderReq: 'Neck size (e.g. 28/400), colour, nozzle type, bottle height for dip tube...',
    quoteErrRequired: 'Please enter your name, company, and business email address.',
    quoteErrEmail: 'Please enter a valid email address.',
    quoteDirectNote: 'Direct factory quote · No third-party brokers.',
    quoteSendBtn: 'Send inquiry',
    footerSince: 'Yuyao, Ningbo · Since 2009',
    footerSummary:
      'In-house mould engineering, injection moulding, automatic assembly, and export packaging for trigger sprayers, lotion pumps, fine mist sprayers, and custom bottle caps.',
    footerColProducts: 'Products',
    footerColFactory: 'Factory',
    footerColContact: 'Contact',
    footerLinkRange: 'Product range',
    footerLinkLab: 'Nozzle lab',
    footerLinkLines: 'Production lines',
    footerLinkExport: 'Export markets',
    footerLinkQuote: 'Request a quote',
    footerCopyright: '© 2026 Yi Lai Plastics Industry. All rights reserved.',
    footerBottomRight: 'FOB Ningbo Beilun Port · OEM & ODM Dispensing Systems',
    productsBackHome: 'Back to factory overview',
    productsDownloadSpec: '2026 Catalog PDF (98p)',
    productsKicker: '2026 Product Catalog · 81 Models Across 8 Series',
    productsTitle: 'Precision dispensing solutions for every bottle on the shelf',
    productsSub:
      'Browse flagship product pages or filter the complete 2026 catalog directory (TS, MTS, LPS, FMS, FP, FNP, PMS & BC series) by neck finish and application.',
    productsSearchPlaceholder: 'Search model (e.g. TS001, MTS005, LPS012, BC007), FEA 15, lotion...',
    productsNeckLabel: 'Neck:',
    productsAllNecks: 'All necks',
    productsAllSeries: 'All Series',
    productsEmptyTitle: 'No matching dispensing models found',
    productsEmptySub: 'Try clearing your search filter or selecting a different neck finish.',
    productsResetFilters: 'Reset all filters',
    productsSeriesLabel: 'SERIES',
    productsCompareSeries: 'Compare series table',
    productsNeckFinishLabel: 'Neck Finish',
    productsDosageLabel: 'Dosage',
    productsGalleryLabel: 'Gallery',
    productsPhotosWord: 'product photos',
    productsViewProduct: 'View product',
    productsQuoteBtn: 'Quote',
    productsLabKicker: 'Custom Moulding & Pantone Match',
    productsLabTitle: 'Need custom colours, logo imprinting, or custom dip tube lengths?',
    productsLabSub:
      'Configure your exact nozzle output, resin shade, and bottle pairing interactively in our Nozzle Lab.',
    productsLabBtn: 'Open Nozzle Lab',
    detailAllProducts: 'All Products',
    detailFobNote: 'FOB Ningbo Port',
    detailNeckPrefix: 'Neck',
    detailOutputPrefix: 'Output',
    detailMoqPrefix: 'MOQ',
    detailOverviewTitle: 'Product Overview & Engineering',
    detailTechSpecsTitle: 'Technical Specifications',
    detailSpecNeck: 'SPI Neck Finish',
    detailSpecDosage: 'Dosage Output',
    detailSpecClosure: 'Closure Texture',
    detailSpecSpring: 'Spring / Valve System',
    detailSpecMaterials: 'Resin & Component Grade',
    detailSpecLeadTime: 'Standard Production Lead Time',
    detailSpecApps: 'Recommended Applications',
    detailPrefColour: '1 · Preferred Resin Colour:',
    detailTargetVolume: '2 · Target Order / Sample Tier',
    detailVolumes: ['10,000 pcs', '50,000 pcs', '100,000+ pcs', 'Sample Pack (50 pcs)'],
    detailColours: [
      { name: 'Ocean Blue', hex: '#155EEF' },
      { name: 'Pure White', hex: '#FFFFFF', border: true },
      { name: 'Matte Black', hex: '#1C2434' },
      { name: 'Signal Red', hex: '#E1262D' },
      { name: 'Custom Pantone', hex: 'linear-gradient(135deg,#155EEF,#E1262D,#F2B705)' },
    ],
    detailRequestSamplesBtn: 'Request quote / free samples',
    detailCustomizeBtn: 'Customize in Lab',
    detailCertBadge1: 'ISO 9001:2015 & SGS tested',
    detailCertBadge2: 'Direct FOB Ningbo shipping',
    detailMoreInSeries: 'More models in',
    modalCloseAria: 'Close specifications modal',
    modalDosage: 'Dosage:',
    modalClosure: 'Closure:',
    modalSpring: 'Spring / Valve:',
    modalMoq: 'MOQ:',
    modalApps: 'Applications:',
    modalQuoteBtn: 'Quote this model',
    backToTopTitle: 'Back to top',
    whatsappCtaLabel: 'Chat on WhatsApp',
    whatsappTitle: 'WhatsApp +86 13757050848',
    menuOpenAria: 'Open navigation menu',
    menuCloseAria: 'Close navigation menu',
  },
  es: {
    brandShort: 'Yi Lai Plastics',
    brandFull: 'Yi Lai Plastics Industry',
    heroCheck1: 'Matricería OEM y ODM',
    heroCheck2: 'Colores Pantone y logotipo propio',
    heroCheck3: 'Despacho directo FOB Puerto Ningbo',
    strokeSingular: 'pulsación',
    strokePlural: 'pulsaciones',
    resetCounterAria: 'Reiniciar contador de pulsaciones',
    conveyorBlue: [
      '65+ INYECTORAS EN PLANTA',
      '13+ LÍNEAS AUTOMÁTICAS',
      'IGUALACIÓN PANTONE EXACTA',
      'IMPRESIÓN DE LOGOTIPO',
      'DESPACHO DESDE PUERTO NINGBO',
      'CONTROL DE CALIDAD ISO 9001',
    ],
    conveyorRed: [
      'ATOMIZADORES DE GATILLO',
      'BOMBAS DE LOCIÓN',
      'PULVERIZADORES FINE MIST',
      'GATILLOS DE ESPUMA',
      'MINI GATILLOS',
      'TAPAS PARA ENVASES',
      'OEM Y ODM',
    ],
    orbitKicker: 'El Ecosistema Yi Lai',
    orbitTitle: 'Una sola fábrica en el centro de su línea de envasado',
    orbitSub:
      'Pase el cursor sobre cualquier línea dosificadora para ver especificaciones en vivo o haga clic para consultar roscas y dosis.',
    orbitSeries: 'SERIE',
    orbitPaused: 'Órbita en pausa',
    orbitPlant: 'Planta Yuyao',
    orbitBrowseAll: 'Ver las 6 líneas de productos y fichas',
    matcherKicker: 'Selector de Producto',
    matcherTitle: '¿Qué producto va a envasar?',
    matcherSub:
      'Seleccione su tipo de fórmula y le recomendaremos el dosificador y resorte Yi Lai más adecuado.',
    matcherRecommended: 'Dosificador Recomendado',
    matcherRequestSamples: 'Solicitar muestras',
    matcherSeeRange: 'Ver la gama',
    blueprintKicker: 'Plano de Ingeniería',
    blueprintTitle: 'Seis piezas. Un rocío perfecto.',
    blueprintSub:
      'Cada gatillo Yi Lai se fabrica con piezas de precisión moldeadas en nuestras propias máquinas en Yuyao, asegurando sellado, dosificación y rosca exactos.',
    blueprintResinLabel: 'Resina / Aleación:',
    blueprintOptionsLabel: 'Opciones:',
    blueprintAssembleBtn: 'Ensamblar piezas',
    blueprintExplodeBtn: 'Ver despiece técnico',
    labKicker: 'Laboratorio de Boquillas',
    labTitle: 'Diseñe su atomizador. Nosotros lo moldeamos.',
    labSub:
      'Elija el patrón de rocío, tipo de botella, rosca y color de resina que su marca necesita. Moldeamos cada pieza en planta con fidelidad Pantone.',
    labStepOutput: '1 · Salida de boquilla',
    labStepColour: '2 · Color',
    labPantonePlaceholder: 'Código Pantone opcional (ej. PMS 286 C)',
    labLogoOn: 'Logotipo impreso: SÍ',
    labLogoOff: 'Logotipo impreso: NO',
    labStepNeck: '3 · Rosca del cuello',
    labStepBottle: '4 · Vista previa con envase',
    labRequestSample: 'Solicitar esta muestra',
    labTestSpray: 'Probar rocío',
    labPatterns: { Spray: 'Atomizado', Stream: 'Chorro', Foam: 'Espuma' },
    labBottles: {
      'clear-pet': 'PET Transparente',
      'amber-glass': 'Ámbar',
      'frosted-hdpe': 'HDPE Blanco',
    },
    factoryKicker: 'De la Resina al Pallet',
    factoryTitle: 'Una fábrica. Cada proceso bajo nuestro techo.',
    factorySub:
      'Centralizar matricería, inyección, ensamblaje e inspección en Yuyao garantiza tolerancias estables, muestras rápidas y entregas sin sorpresas.',
    factoryQcPass: 'QC Aprobado',
    factoryPauseLine: 'Pausar línea',
    factoryAutoCycleLine: 'Ciclo automático',
    factoryCampusCaption: 'Yi Lai Plastics Industry · Planta Industrial, Yuyao, Ningbo',
    factoryCampusSub: 'Oficinas · Nave de Inyección · Muelle de Carga',
    factoryStageCodes: ['01 INYECCIÓN', '02 ENSAMBLAJE', '03 PRUEBAS', '04 EMPAQUE'],
    factoryStageTitles: [
      'Inyección de Alta Precisión',
      'Ensamblaje Automático de Alta Velocidad',
      'Control de Vacío y Calibración de Rocío',
      'Encajado y Paletizado de Exportación',
    ],
    factoryStageDetails: [
      'Más de 65 inyectoras hidráulicas y eléctricas moldean carcasas, gatillos, pistones y tapas en PP/PE virgen.',
      'Más de 13 líneas automáticas insertan resortes 304/316, válvulas y pistones con torque uniforme.',
      'Detección de fugas por vacío (-0.06 MPa), verificación de cebado e imagen de dispersión en cada lote.',
      'Cajas de exportación de doble pared, bolsas interiores de PE y pallets listos a 45 minutos del Puerto de Ningbo.',
    ],
    factorySteps: [
      {
        num: '01',
        title: 'Diseño de molde',
        desc: 'Sus medidas de cuello, paso de rosca y dosis se convierten en planos CAD y moldes de precisión.',
        accent: 'blue',
      },
      {
        num: '02',
        title: 'Moldeo por inyección',
        desc: 'Más de 65 inyectoras producen carcasas, gatillos, pistones y tapas en sus colores Pantone.',
        accent: 'blue',
      },
      {
        num: '03',
        title: 'Ensamblaje automático',
        desc: '13+ líneas automáticas ensamblan resortes, válvulas y tubos pescantes a gran escala.',
        accent: 'blue',
      },
      {
        num: '04',
        title: 'Control de calidad',
        desc: 'Pruebas de vacío antifugas, verificación de cono de rocío y calibración exacta por pulsación.',
        accent: 'crimson',
      },
      {
        num: '05',
        title: 'Empaque y exportación',
        desc: 'Embalado según su estándar logístico y embarcado por el Puerto de Ningbo Beilun.',
        accent: 'crimson',
      },
    ],
    factoryPhotoCaptions: [
      'Nave de Inyección · 65+ Máquinas',
      'Ensamblaje Automático · 13+ Líneas',
      'Almacén de Exportación · FOB Puerto Ningbo',
    ],
    whyKicker: 'Por Qué Elegir Yi Lai',
    whyTitle: 'Un socio fabricado para importadores y marcas blancas',
    whySub:
      'Tanto si envasa productos de limpieza como si distribuye a supermercados, adaptamos la dosis, el color de resina y el marcado de cajas a su mercado.',
    whyCerts: 'Certificación ISO 9001:2015 · Pruebas SGS · Cumplimiento RoHS y REACH',
    whyPillars: [
      {
        title: 'Precio directo de fábrica',
        desc: 'Trato directo con nuestra planta en Yuyao, sin intermediarios ni comercializadoras.',
        accent: 'blue',
      },
      {
        title: 'OEM y marca privada',
        desc: 'Resina PP virgen igualada a Pantone, tampografía de logotipo y tubo pescante a medida.',
        accent: 'crimson',
      },
      {
        title: 'Evaluación con muestras gratis',
        desc: 'Pruebe sellado, torque y atomización en sus propias botellas antes de confirmar pedidos.',
        accent: 'blue',
      },
      {
        title: 'Pedidos flexibles por contenedor',
        desc: 'MOQ estándar desde 10,000 pzas por referencia, con mezcla de colores y consolidación LCL/FCL.',
        accent: 'crimson',
      },
    ],
    exportKicker: 'De Yuyao a Su Almacén',
    exportTitle: 'Preparados para mercados de exportación',
    exportSub:
      'Nuestra fábrica está a 45 minutos del Puerto de Ningbo Beilun, una de las terminales de contenedores más activas del mundo, con salidas semanales.',
    exportOriginTitle: 'PUERTO NINGBO',
    exportOriginSub: 'Fábrica Yi Lai · 45 min',
    exportQuotePrefix: 'Cotizar flete:',
    offerKicker: 'Pruébelo Ahora',
    offerTitle: 'Atomice para descubrir su oferta de bienvenida',
    offerSub:
      'Mantenga presionado y deslice sobre la tarjeta, tal como al accionar nuestros gatillos en línea.',
    offerRevealInstant: '¿Prefiere verla al instante? Revelar oferta',
    offerBadge: 'Caja de Muestras Nuevos Compradores',
    offerOfferTitle: 'Caja de 50 Muestras Surtidas Gratis + Igualación Pantone',
    offerOfferDesc:
      'Incluye gatillos, bombas de loción y atomizadores fine mist enviados desde Yuyao para pruebas en sus envases.',
    offerClaimBtn: 'Reclamar caja de muestras',
    offerCanvasHeadline: 'MANTENGA Y DESLICE PARA ATOMIZAR',
    offerCanvasSub: 'Pase el cursor por la tarjeta para revelar la oferta',
    quoteKicker: 'Solicitar Cotización',
    quoteTitle: 'Indíquenos su envase. Nosotros ajustamos el cabezal.',
    quoteSub:
      'Comparta categoría de producto, rosca y volumen estimado; nuestro equipo técnico y de exportación responde en menos de 24 horas con precios FOB Ningbo.',
    quoteEmailLabel: 'Correo Directo de Exportación',
    quotePhoneLabel: 'Atención WhatsApp / WeChat',
    quoteAddressLabel: 'Planta de Inyección y Ensamblaje',
    quoteAddressValue: 'Yuyao, Ningbo, Zhejiang, China',
    quoteRefLabel: 'REFERENCIA DE CONSULTA',
    quoteReceivedTitle: 'Solicitud de cotización recibida',
    quoteThankYou1: 'Gracias,',
    quoteThankYou2: 'Nuestro equipo en Ningbo registró su solicitud de',
    quoteThankYou3: 'y responderá en 24 horas a',
    quoteSubmitAnother: 'Enviar otra consulta de producto',
    quoteFieldName: 'Su nombre *',
    quotePlaceholderName: 'Carlos Mendoza',
    quoteFieldCompany: 'Empresa *',
    quotePlaceholderCompany: 'Nombre de su empresa o marca',
    quoteFieldEmail: 'Correo corporativo *',
    quotePlaceholderEmail: 'compras@empresa.com',
    quoteFieldCountry: 'País o puerto de destino',
    quotePlaceholderCountry: 'ej. Chile, México, España, Brasil',
    quoteFieldProduct: 'Línea de producto',
    quoteCustomSamplePack: 'Paquete Surtido de Muestras Personalizado',
    quoteFieldQty: 'Cantidad estimada (pzas)',
    quotePlaceholderQty: 'ej. 50,000',
    quoteFieldReq: 'Rosca del envase, color Pantone, largo del tubo y requisitos',
    quotePlaceholderReq: 'Rosca (ej. 28/400), color, tipo de boquilla, altura del frasco...',
    quoteErrRequired: 'Por favor ingrese su nombre, empresa y correo electrónico corporativo.',
    quoteErrEmail: 'Por favor ingrese un correo electrónico válido.',
    quoteDirectNote: 'Cotización directa de fábrica · Sin intermediarios.',
    quoteSendBtn: 'Enviar solicitud',
    footerSince: 'Yuyao, Ningbo · Desde 2009',
    footerSummary:
      'Ingeniería de moldes, inyección plástica, ensamblaje automático y embalaje de exportación para atomizadores de gatillo, bombas de loción y tapas.',
    footerColProducts: 'Productos',
    footerColFactory: 'Fábrica',
    footerColContact: 'Contacto',
    footerLinkRange: 'Catálogo completo',
    footerLinkLab: 'Laboratorio de boquillas',
    footerLinkLines: 'Líneas de producción',
    footerLinkExport: 'Mercados de exportación',
    footerLinkQuote: 'Solicitar cotización',
    footerCopyright: '© 2026 Yi Lai Plastics Industry. Todos los derechos reservados.',
    footerBottomRight: 'FOB Puerto Ningbo Beilun · Sistemas Dosificadores OEM y ODM',
    productsBackHome: 'Volver al resumen de fábrica',
    productsDownloadSpec: 'Catálogo 2026 PDF (98 pág.)',
    productsKicker: 'Catálogo 2026 · 81 Modelos en 8 Series Industriales',
    productsTitle: 'Soluciones de dosificación de precisión para cada envase',
    productsSub:
      'Explore modelos destacados o filtre el directorio completo 2026 (series TS, MTS, LPS, FMS, FP, FNP, PMS y BC) por rosca y aplicación.',
    productsSearchPlaceholder: 'Buscar modelo (ej. TS001, MTS005, LPS012, BC007), FEA 15...',
    productsNeckLabel: 'Rosca:',
    productsAllNecks: 'Todas',
    productsAllSeries: 'Todas las series',
    productsEmptyTitle: 'No se encontraron modelos coincidentes',
    productsEmptySub: 'Intente borrar la búsqueda o elegir otra medida de rosca.',
    productsResetFilters: 'Restablecer filtros',
    productsSeriesLabel: 'SERIE',
    productsCompareSeries: 'Comparar tabla de la serie',
    productsNeckFinishLabel: 'Rosca',
    productsDosageLabel: 'Dosis',
    productsGalleryLabel: 'Galería',
    productsPhotosWord: 'fotos del producto',
    productsViewProduct: 'Ver producto',
    productsQuoteBtn: 'Cotizar',
    productsLabKicker: 'Moldeo a Medida e Igualación Pantone',
    productsLabTitle: '¿Necesita colores personalizados, logotipo o tubos cortados a medida?',
    productsLabSub:
      'Configure la boquilla, tono de resina y tipo de envase de forma interactiva en nuestro Laboratorio.',
    productsLabBtn: 'Abrir Laboratorio',
    detailAllProducts: 'Todos los Productos',
    detailFobNote: 'FOB Puerto Ningbo',
    detailNeckPrefix: 'Rosca',
    detailOutputPrefix: 'Dosis',
    detailMoqPrefix: 'MOQ',
    detailOverviewTitle: 'Descripción General e Ingeniería',
    detailTechSpecsTitle: 'Especificaciones Técnicas',
    detailSpecNeck: 'Acabado de Rosca SPI',
    detailSpecDosage: 'Dosis por Pulsación',
    detailSpecClosure: 'Textura del Cierre',
    detailSpecSpring: 'Sistema de Resorte / Válvula',
    detailSpecMaterials: 'Grado de Resina y Componentes',
    detailSpecLeadTime: 'Plazo Estándar de Producción',
    detailSpecApps: 'Aplicaciones Recomendadas',
    detailPrefColour: '1 · Color de Resina Preferido:',
    detailTargetVolume: '2 · Volumen Objetivo o Muestra',
    detailVolumes: ['10,000 pzas', '50,000 pzas', '100,000+ pzas', 'Pack de Muestras (50 pzas)'],
    detailColours: [
      { name: 'Azul Océano', hex: '#155EEF' },
      { name: 'Blanco Puro', hex: '#FFFFFF', border: true },
      { name: 'Negro Mate', hex: '#1C2434' },
      { name: 'Rojo Señal', hex: '#E1262D' },
      { name: 'Pantone a Medida', hex: 'linear-gradient(135deg,#155EEF,#E1262D,#F2B705)' },
    ],
    detailRequestSamplesBtn: 'Solicitar cotización / muestras',
    detailCustomizeBtn: 'Personalizar en Lab',
    detailCertBadge1: 'ISO 9001:2015 y pruebas SGS',
    detailCertBadge2: 'Envío directo FOB Ningbo',
    detailMoreInSeries: 'Más modelos en',
    modalCloseAria: 'Cerrar ventana de especificaciones',
    modalDosage: 'Dosis:',
    modalClosure: 'Cierre:',
    modalSpring: 'Resorte / Válvula:',
    modalMoq: 'MOQ:',
    modalApps: 'Aplicaciones:',
    modalQuoteBtn: 'Cotizar este modelo',
    backToTopTitle: 'Volver arriba',
    whatsappCtaLabel: 'Chatear por WhatsApp',
    whatsappTitle: 'WhatsApp +86 13757050848',
    menuOpenAria: 'Abrir menú de navegación',
    menuCloseAria: 'Cerrar menú de navegación',
  },
  ar: {
    brandShort: 'Yi Lai Plastics',
    brandFull: 'Yi Lai Plastics Industry',
    heroCheck1: 'تصميم قوالب OEM و ODM',
    heroCheck2: 'ألوان بانتون مخصصة وطباعة الشعار',
    heroCheck3: 'شحن مباشر من ميناء نينغبو FOB',
    strokeSingular: 'ضغطة',
    strokePlural: 'ضغطات',
    resetCounterAria: 'إعادة ضبط عداد الضغطات',
    conveyorBlue: [
      '+65 ماكينة حقن بلاستيك',
      '+13 خط تجميع أوتوماتيكي',
      'مطابقة دقيقة لألوان بانتون',
      'طباعة الشعار حسب الطلب',
      'شحن مباشر من ميناء نينغبو',
      'ضبط الجودة ISO 9001',
    ],
    conveyorRed: [
      'بخاخات الزناد',
      'مضخات اللوشن',
      'بخاخات الرذاذ الدقيق',
      'بخاخات الرغوة',
      'ميني تريجر',
      'أغطية العبوات',
      'تصنيع OEM و ODM',
    ],
    orbitKicker: 'منظومة Yi Lai المتكاملة',
    orbitTitle: 'مصنع واحد في قلب خط التعبئة الخاص بك',
    orbitSub:
      'مرّر المؤشر فوق أي خط إنتاج لاستعراض المواصفات الفورية، أو انقر للاطلاع على مقاسات العنق ومعدلات الضخ الكاملة.',
    orbitSeries: 'السلسلة',
    orbitPaused: 'تم إيقاف المدار مؤقتاً',
    orbitPlant: 'مصنع يوياو',
    orbitBrowseAll: 'تصفح جميع خطوط الإنتاج الـ 6 والمواصفات',
    matcherKicker: 'أداة اختيار البخاخ المناسب',
    matcherTitle: 'ما نوع السائل الذي تقوم بتعبئته؟',
    matcherSub:
      'اختر فئة التركيبة وسنقوم بترشيح رأس البخاخ أو المضخة ومواصفات النابض الأنسب لخط إنتاجك.',
    matcherRecommended: 'الموزع الموصى به',
    matcherRequestSamples: 'اطلب عينات مجانية',
    matcherSeeRange: 'عرض هذه الفئة',
    blueprintKicker: 'المخطط الهندسي',
    blueprintTitle: 'ستة أجزاء. رذاذ متقن.',
    blueprintSub:
      'يتم تصنيع كل بخاخ زناد من Yi Lai باستخدام أجزاء دقيقة تُحقن على ماكيناتنا داخل مصنعنا في يوياو، لضمان إحكام الغلق ودقة الضخ والتوافق التام.',
    blueprintResinLabel: 'الخامة / المعدن:',
    blueprintOptionsLabel: 'خيارات التخصيص:',
    blueprintAssembleBtn: 'تجميع الأجزاء معاً',
    blueprintExplodeBtn: 'عرض المخطط التفصيلي',
    labKicker: 'مختبر تخصيص الفوهات',
    labTitle: 'صمّم بخاخك. ونحن نُنتجه.',
    labSub:
      'اختر نمط الرش وشكل العبوة ومقاس العنق ولون البلاستيك الذي تحتاجه علامتك التجارية. يتم الحقن بالكامل داخل مصنعنا لضمان تطابق ألوان بانتون.',
    labStepOutput: '1 · نمط الرش',
    labStepColour: '2 · اللون',
    labPantonePlaceholder: 'رمز بانتون اختياري (مثال: PMS 286 C)',
    labLogoOn: 'طباعة الشعار: مفعّل',
    labLogoOff: 'طباعة الشعار: غير مفعّل',
    labStepNeck: '3 · مقاس عنق العبوة',
    labStepBottle: '4 · معاينة على العبوة',
    labRequestSample: 'اطلب هذه العينة',
    labTestSpray: 'اختبر الرش',
    labPatterns: { Spray: 'رذاذ', Stream: 'تيار مباشر', Foam: 'رغوة' },
    labBottles: {
      'clear-pet': 'PET شفاف',
      'amber-glass': 'عنبر داكن',
      'frosted-hdpe': 'HDPE أبيض',
    },
    factoryKicker: 'من الحبيبات إلى الحاوية',
    factoryTitle: 'مصنع واحد. كل مرحلة تحت سقف واحد.',
    factorySub:
      'الجمع بين تصميم القوالب والحقن والتجميع وفحص الجودة في منشأة واحدة في يوياو يعني جودة ثابتة وعينات أسرع وتوريداً موثوقاً دون مفاجآت.',
    factoryQcPass: 'اجتاز الفحص',
    factoryPauseLine: 'إيقاف الخط',
    factoryAutoCycleLine: 'تشغيل تلقائي',
    factoryCampusCaption: 'شركة Yi Lai Plastics Industry · المقر الصناعي، يوياو، نينغبو',
    factoryCampusSub: 'الإدارة · صالة الحقن · ساحة شحن الحاويات',
    factoryStageCodes: ['01 الحقن', '02 التجميع', '03 الفحص', '04 التعبئة'],
    factoryStageTitles: [
      'حقن البلاستيك عالي الدقة',
      'التجميع الأوتوماتيكي فائق السرعة',
      'فحص التسرب بالتفريغ ومعايرة الرش',
      'التغليف والتعبئة على الطبليات للتصدير',
    ],
    factoryStageDetails: [
      'أكثر من 65 ماكينة حقن هيدروليكية وكهربائية لتصنيع الأغطية والزنادات والمكابس من خامات PP/PE النقية.',
      'أكثر من 13 خط تجميع أوتوماتيكي لتركيب نوابض الفولاذ 304/316 وصمامات الكرة والمكابس بعزم ثابت.',
      'فحص آلي بنسبة 100% ضد التسرب تحت التفريغ (-0.06 MPa) والتحقق من دقة الضخ وتوزيع الرذاذ.',
      'كراتين تصدير مزدوجة الجدار وأكياس حماية داخلية على بعد 45 دقيقة فقط من ميناء نينغبو.',
    ],
    factorySteps: [
      {
        num: '01',
        title: 'تصميم القوالب',
        desc: 'تحويل مقاسات العنق وخطوة السن والجرعة المطلوبة إلى رسومات CAD وقوالب دقيقة.',
        accent: 'blue',
      },
      {
        num: '02',
        title: 'الحقن البلاستيكي',
        desc: 'أكثر من 65 ماكينة حقن تُشكّل الهياكل والزنادات والمكابس بألوان بانتون المطلوبة.',
        accent: 'blue',
      },
      {
        num: '03',
        title: 'التجميع الأوتوماتيكي',
        desc: '13+ خطاً أوتوماتيكياً لتجميع النوابض والصمامات وأنابيب السحب بكفاءة إنتاجية عالية.',
        accent: 'blue',
      },
      {
        num: '04',
        title: 'فحص الجودة',
        desc: 'اختبارات التفريغ الهوائي لمنع التسرب وفحص زاوية الرش ومعايرة حجم الجرعة لكل ضغطة.',
        accent: 'crimson',
      },
      {
        num: '05',
        title: 'التعبئة والتصدير',
        desc: 'تعبئة بالكراتين وفق مواصفات مستودعكم وشحن سلس عبر ميناء نينغبو بيلون.',
        accent: 'crimson',
      },
    ],
    factoryPhotoCaptions: [
      'صالة حقن البلاستيك · +65 ماكينة',
      'خطوط التجميع الأوتوماتيكي · +13 خطاً',
      'مستودع التصدير · تسليم ميناء نينغبو',
    ],
    whyKicker: 'لماذا يختارنا المستوردون',
    whyTitle: 'شريك تصنيع موثوق للمستوردين والعلامات التجارية الخاصة',
    whySub:
      'سواء كنتم تقومون بتعبئة المنظفات المنزلية أو التوريد للمتاجر والموزعين، فإننا نخصص كمية الضخ ودرجة اللون وبيانات الكراتين وفق متطلبات سوقكم.',
    whyCerts: 'معتمد ISO 9001:2015 · فحوصات خامات SGS · متوافق مع RoHS و REACH',
    whyPillars: [
      {
        title: 'أسعار مباشرة من المصنع',
        desc: 'تعامل مباشر مع مصنع الحقن والتجميع في يوياو دون وسطاء أو شركات وساطة.',
        accent: 'blue',
      },
      {
        title: 'تصنيع OEM وعلامة خاصة',
        desc: 'خامات PP نقية مطابقة لأكواد بانتون، طباعة شعار علامتكم، وقص أنابيب السحب حسب طول العبوة.',
        accent: 'crimson',
      },
      {
        title: 'عينات مجانية للاختبار',
        desc: 'اختبروا إحكام الغلق وعزم الشد وتوزيع الرش مباشرة على عبواتكم قبل اعتماد الطلبات الكبيرة.',
        accent: 'blue',
      },
      {
        title: 'مرونة في شحن الحاويات',
        desc: 'الحد الأدنى للطلب يبدأ من 10,000 قطعة للصنف مع إمكانية تنويع الألوان والشحن الجزئي أو الكامل.',
        accent: 'crimson',
      },
    ],
    exportKicker: 'من يوياو إلى مستودعكم',
    exportTitle: 'جاهز لأسواق التصدير العالمية',
    exportSub:
      'يقع مصنعنا على بُعد 45 دقيقة من ميناء نينغبو بيلون — أحد أكبر موانئ الحاويات العميقة في العالم — مما يتيح تجميع وشحن الحاويات أسبوعياً بسرعة عالية.',
    exportOriginTitle: 'ميناء نينغبو',
    exportOriginSub: 'مصنع Yi Lai · 45 دقيقة',
    exportQuotePrefix: 'اطلب تسعير الشحن:',
    offerKicker: 'جرّب بنفسك',
    offerTitle: 'رشّ البطاقة لكشف عرض الترحيب الخاص بك',
    offerSub:
      'اضغط مع السحب عبر البطاقة لمحاكاة تجربة الضغط على بخاخاتنا عالية الدقة.',
    offerRevealInstant: 'تفضّل العرض الفوري؟ اكشف العرض الآن',
    offerBadge: 'باقة عينات المشترين الجدد',
    offerOfferTitle: 'صندوق 50 عينة متنوعة مجاناً + مطابقة لون بانتون مجانية',
    offerOfferDesc:
      'يتضمن بخاخات زناد ومضخات لوشن وبخاخات رذاذ دقيق تُشحن مباشرة من يوياو لاختبار الملاءمة على عبواتكم.',
    offerClaimBtn: 'اطلب باقة العينات',
    offerCanvasHeadline: 'اضغط واسحب للرش وكشف العرض',
    offerCanvasSub: 'مرّر عبر البطاقة لاستعراض عرض باقة العينات المجانية',
    quoteKicker: 'طلب عرض سعر',
    quoteTitle: 'أخبرنا بمواصفات عبوتك لنجهز لك البخاخ الأنسب.',
    quoteSub:
      'شاركنا فئة المنتج ومقاس العنق والكمية المطلوبة — يرد فريق المبيعات والهندسة خلال 24 ساعة بأسعار FOB نينغبو وخيارات العينات.',
    quoteEmailLabel: 'البريد المباشر للتصدير',
    quotePhoneLabel: 'خدمة واتساب / وي شات',
    quoteAddressLabel: 'مصنع الحقن والتجميع',
    quoteAddressValue: 'يوياو، نينغبو، تشجيانغ، الصين',
    quoteRefLabel: 'الرقم المرجعي للطلب',
    quoteReceivedTitle: 'تم استلام طلب عرض السعر بنجاح',
    quoteThankYou1: 'شكراً لك،',
    quoteThankYou2: 'قام فريق التصدير في نينغبو بتسجيل طلبك لكمية',
    quoteThankYou3: 'وسيرد عليك خلال 24 ساعة على البريد',
    quoteSubmitAnother: 'إرسال طلب تسعير آخر',
    quoteFieldName: 'الاسم الكامل *',
    quotePlaceholderName: 'أحمد حسن',
    quoteFieldCompany: 'الشركة *',
    quotePlaceholderCompany: 'اسم الشركة أو العلامة التجارية',
    quoteFieldEmail: 'البريد الإلكتروني الرسمي *',
    quotePlaceholderEmail: 'buyer@company.com',
    quoteFieldCountry: 'بلد أو ميناء الوصول',
    quotePlaceholderCountry: 'مثال: السعودية، الإمارات، مصر، الأردن',
    quoteFieldProduct: 'خط الإنتاج المطلوب',
    quoteCustomSamplePack: 'باقة عينات متنوعة مخصصة',
    quoteFieldQty: 'الكمية التقديرية (قطعة)',
    quotePlaceholderQty: 'مثال: 50,000',
    quoteFieldReq: 'مقاس العنق، لون بانتون، طول أنبوب السحب وأي متطلبات أخرى',
    quotePlaceholderReq: 'مثال: عنق 28/400، اللون المطلوب، نوع الفوهة، ارتفاع العبوة...',
    quoteErrRequired: 'يرجى إدخال الاسم واسم الشركة والبريد الإلكتروني الرسمي.',
    quoteErrEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
    quoteDirectNote: 'تسعير مباشر من المصنع · بدون وسطاء.',
    quoteSendBtn: 'إرسال طلب التسعير',
    footerSince: 'يوياو، نينغبو · منذ 2009',
    footerSummary:
      'تصميم القوالب وحقن البلاستيك والتجميع الأوتوماتيكي وتعبئة التصدير لبخاخات الزناد ومضخات اللوشن وبخاخات الرذاذ الدقيق وأغطية العبوات.',
    footerColProducts: 'المنتجات',
    footerColFactory: 'المصنع',
    footerColContact: 'التواصل',
    footerLinkRange: 'كتالوج المنتجات',
    footerLinkLab: 'مختبر التخصيص',
    footerLinkLines: 'خطوط الإنتاج',
    footerLinkExport: 'أسواق التصدير',
    footerLinkQuote: 'اطلب عرض سعر',
    footerCopyright: '© 2026 شركة Yi Lai Plastics Industry. جميع الحقوق محفوظة.',
    footerBottomRight: 'شحن مباشر من ميناء نينغبو بيلون · تصنيع OEM و ODM',
    productsBackHome: 'العودة إلى الصفحة الرئيسية للمصنع',
    productsDownloadSpec: 'كتالوج 2026 PDF (98 صفحة)',
    productsKicker: 'كتالوج 2026 · 81 موديلاً في 8 سلاسل تصنيع',
    productsTitle: 'حلول ضخ ورش متكاملة لكل عبوة على الرف',
    productsSub:
      'استعرض صفحات المنتجات أو ابحث في دليل كتالوج 2026 الكامل (سلاسل TS و MTS و LPS و FMS و FP و FNP و PMS و BC) حسب مقاس العنق.',
    productsSearchPlaceholder: 'ابحث برمز الموديل (مثال TS001, MTS005, LPS012, BC007) أو مقاس العنق...',
    productsNeckLabel: 'العنق:',
    productsAllNecks: 'كل المقاسات',
    productsAllSeries: 'جميع الفئات',
    productsEmptyTitle: 'لا توجد موديلات مطابقة لبحثك',
    productsEmptySub: 'جرّب مسح كلمات البحث أو اختيار مقاس عنق آخر.',
    productsResetFilters: 'إعادة ضبط الفلاتر',
    productsSeriesLabel: 'السلسلة',
    productsCompareSeries: 'مقارنة جدول السلسلة',
    productsNeckFinishLabel: 'مقاس العنق',
    productsDosageLabel: 'معدل الضخ',
    productsGalleryLabel: 'الصور',
    productsPhotosWord: 'صور للمنتج',
    productsViewProduct: 'عرض المنتج',
    productsQuoteBtn: 'تسعير',
    productsLabKicker: 'حقن مخصص ومطابقة ألوان بانتون',
    productsLabTitle: 'هل تحتاج إلى ألوان خاصة أو طباعة شعار أو أطوال أنابيب مخصصة؟',
    productsLabSub:
      'صمّم نمط الفوهة ودرجة اللون وشكل العبوة تفاعلياً داخل مختبر التخصيص.',
    productsLabBtn: 'فتح مختبر الفوهات',
    detailAllProducts: 'جميع المنتجات',
    detailFobNote: 'تسليم ميناء نينغبو FOB',
    detailNeckPrefix: 'العنق',
    detailOutputPrefix: 'الضخ',
    detailMoqPrefix: 'الحد الأدنى',
    detailOverviewTitle: 'نظرة عامة ومزايا الهندسة',
    detailTechSpecsTitle: 'المواصفات الفنية الكاملة',
    detailSpecNeck: 'مقاس عنق العبوة SPI',
    detailSpecDosage: 'معدل الضخ لكل ضغطة',
    detailSpecClosure: 'شكل وتفصيل الغطاء',
    detailSpecSpring: 'نظام النابض / الصمام',
    detailSpecMaterials: 'درجة الخامات والمكونات',
    detailSpecLeadTime: 'مدة الإنتاج القياسية',
    detailSpecApps: 'التطبيقات والاستخدامات الموصى بها',
    detailPrefColour: '1 · لون الخامة المفضل:',
    detailTargetVolume: '2 · الكمية المطلوبة أو باقة العينات',
    detailVolumes: ['10,000 قطعة', '50,000 قطعة', '+100,000 قطعة', 'باقة عينات (50 قطعة)'],
    detailColours: [
      { name: 'أزرق محيطي', hex: '#155EEF' },
      { name: 'أبيض ناصع', hex: '#FFFFFF', border: true },
      { name: 'أسود مطفي', hex: '#1C2434' },
      { name: 'أحمر قياسي', hex: '#E1262D' },
      { name: 'لون بانتون مخصص', hex: 'linear-gradient(135deg,#155EEF,#E1262D,#F2B705)' },
    ],
    detailRequestSamplesBtn: 'اطلب عرض سعر / عينات مجانية',
    detailCustomizeBtn: 'تخصيص في المختبر',
    detailCertBadge1: 'معتمد ISO 9001:2015 ومفحوص من SGS',
    detailCertBadge2: 'شحن مباشر FOB نينغبو',
    detailMoreInSeries: 'موديلات أخرى في',
    modalCloseAria: 'إغلاق نافذة المواصفات',
    modalDosage: 'الضخ:',
    modalClosure: 'الغطاء:',
    modalSpring: 'النابض / الصمام:',
    modalMoq: 'الحد الأدنى للطلب:',
    modalApps: 'الاستخدامات:',
    modalQuoteBtn: 'طلب تسعير هذا الموديل',
    backToTopTitle: 'العودة للأعلى',
    whatsappCtaLabel: 'تواصل عبر واتساب',
    whatsappTitle: 'واتساب ‎+86 13757050848',
    menuOpenAria: 'فتح قائمة التنقل',
    menuCloseAria: 'إغلاق قائمة التنقل',
  },
};

export function getAppStrings(lang: LanguageCode): AppStrings {
  return APP_STRINGS[lang];
}

const MATCHER_OVERRIDES: Partial<Record<LanguageCode, Record<string, Partial<MatcherOption>>>> = {
  es: {
    'window-cleaner': {
      label: 'Limpiavidrios y superficies',
      recommendedTitle: 'Atomizador de Gatillo (YL-TS28A)',
      dosageSpec: '1.25 ml/pulsación · 28/400 o 28/410',
      neckSpec: 'Boquilla Ajustable Spray / Chorro / Off',
      rationale: 'Un rocío fino amplio para cristales y un chorro concentrado para esquinas difíciles con una sola boquilla.',
      compatibilityNote: 'Compatible con surfactantes, alcohol y amoníaco suave gracias a su resina PP virgen y resorte 304.',
    },
    'perfume-mist': {
      label: 'Perfumes y bruma corporal',
      recommendedTitle: 'Pulverizador Fine Mist (YL-FM20)',
      dosageSpec: '0.14 ml/pulsación · 18/415 a 24/410',
      neckSpec: 'Atomizador Micro-Orificio + Sobretapa',
      rationale: 'Genera una nube ultrafina de 45° sin gotas pesadas, ideal para piel, cabello y fragancias ligeras.',
      compatibilityNote: 'Disponible con collarín de aluminio anodizado y empaque PE resistente a alto contenido alcohólico.',
    },
    'hand-soap': {
      label: 'Jabón líquido y loción',
      recommendedTitle: 'Bomba de Loción (YL-LP28)',
      dosageSpec: '2.00 o 4.00 ml/pulsación · 24/410 a 33/410',
      neckSpec: 'Cabezal Lock-Down + Resorte Externo',
      rationale: 'Entrega una dosificación limpia y constante de alta viscosidad con corte antigoteo y resorte fuera del líquido.',
      compatibilityNote: 'Probado al vacío (-0.06 MPa) para envíos marítimos y comercio electrónico sin derrames.',
    },
    'car-degreaser': {
      label: 'Lavado automotriz y desengrasante',
      recommendedTitle: 'Gatillo de Espuma (YL-FT28H)',
      dosageSpec: '1.45 ml/pulsación · 28/400 o 28/410',
      neckSpec: 'Rejilla Espumadora Abatible + Cuello Trinquete',
      rationale: 'Mezcla aire y detergente formando espuma densa que se adhiere a carrocerías, llantas y campanas de cocina.',
      compatibilityNote: 'Disponible con resorte acero 316 y sellos EPDM/FPM resistentes a químicos alcalinos.',
    },
    'travel-skincare': {
      label: 'Cosmética facial y de viaje',
      recommendedTitle: 'Mini Gatillo (YL-MT24)',
      dosageSpec: '0.32 ml/pulsación · 20/410 o 24/410',
      neckSpec: 'Cabezal Compacto + Seguro Deslizante',
      rationale: 'Combina ergonomía de gatillo de un dedo en frascos de 50–200 ml con seguro integrado anti-derrame.',
      compatibilityNote: 'Disponible en colores Pantone a medida y acabado mate satinado desde 10,000 unidades.',
    },
  },
  ar: {
    'window-cleaner': {
      label: 'منظفات الزجاج والأسطح',
      recommendedTitle: 'بخاخ زناد قياسي (YL-TS28A)',
      dosageSpec: '1.25 مل/ضغطة · عنق 28/400 أو 28/410',
      neckSpec: 'فوهة ثلاثية الوضع: رذاذ / تيار / إغلاق',
      rationale: 'يوفر رذاذاً واسعاً لتنظيف الزجاج وتياراً مركزاً للزوايا الصعبة من فوهة واحدة دوّارة.',
      compatibilityNote: 'متوافق مع المنظفات والمحاليل الكحولية باستخدام خامة PP نقية ونابض ستانلس ستيل 304.',
    },
    'perfume-mist': {
      label: 'العطور ومعطرات الجسم',
      recommendedTitle: 'بخاخ رذاذ دقيق (YL-FM20)',
      dosageSpec: '0.14 مل/ضغطة · 18/415 إلى 24/410',
      neckSpec: 'فوهة تذرير دقيقة + غطاء شفاف كامل',
      rationale: 'يُنتج سحابة رذاذ فائقة النعومة بزاوية 45° دون قطرات كبيرة، مناسب للعطور ومنتجات الشعر.',
      compatibilityNote: 'يتوفر بياقة ألمنيوم مؤكسد وحلقة إحكام PE مقاومة لنسب الكحول العالية.',
    },
    'hand-soap': {
      label: 'صابون اليدين واللوشن',
      recommendedTitle: 'مضخة لوشن (YL-LP28)',
      dosageSpec: '2.00 أو 4.00 مل/ضغطة · 24/410 إلى 33/410',
      neckSpec: 'رأس قابل للقفل بالدوران + نابض خارجي',
      rationale: 'تضخ السوائل الكثيفة بسلاسة وثبات مع مانع تنقيط ونابض خارجي لا يلامس التركيبة نهائياً.',
      compatibilityNote: 'مختبرة ضد التسرب تحت ضغط تفريغ -0.06 MPa للشحن البحري والتجارة الإلكترونية.',
    },
    'car-degreaser': {
      label: 'غسيل السيارات ومزيلات الدهون',
      recommendedTitle: 'بخاخ رغوة (YL-FT28H)',
      dosageSpec: '1.45 مل/ضغطة · عنق 28/400 أو 28/410',
      neckSpec: 'شبكة رغوة قابلة للفتح + قفل مانع للفك',
      rationale: 'يمزج المنظف بالهواء لتكوين رغوة كثيفة تلتصق بالأسطح الرأسية والجنوط وأفران المطابخ.',
      compatibilityNote: 'يتوفر بنابض ستانلس ستيل 316 وأختام EPDM/FPM مقاومة للقلويات والمذيبات.',
    },
    'travel-skincare': {
      label: 'منتجات العناية والسفر',
      recommendedTitle: 'ميني تريجر (YL-MT24)',
      dosageSpec: '0.32 مل/ضغطة · 20/410 أو 24/410',
      neckSpec: 'هيكل مدمج + مشبك أمان منزلق',
      rationale: 'يمنح راحة بخاخ الزناد للعبوات الصغيرة من 50 إلى 200 مل مع قفل أمان لمنع التسرب في الحقائب.',
      compatibilityNote: 'متاح الحقن بألوان بانتون المخصصة وتشطيب مطفي حريري بدءاً من 10,000 قطعة.',
    },
  },
};

export function getLocalizedMatcherOptions(lang: LanguageCode): MatcherOption[] {
  const overrides = MATCHER_OVERRIDES[lang];
  if (!overrides) return MATCHER_OPTIONS;
  return MATCHER_OPTIONS.map((item) => ({ ...item, ...(overrides[item.id] ?? {}) }));
}

const BLUEPRINT_OVERRIDES: Partial<Record<LanguageCode, Record<number, Partial<BlueprintPart>>>> = {
  es: {
    1: {
      name: 'Boquilla',
      subtitle: 'Spray · Chorro · Off',
      material: 'POM / PP Virgen',
      tolerance: 'Orificio ±0.03 mm',
      customization: 'Modo rocío, chorro, malla de espuma o seguro infantil',
      description: 'Inserto giratorio de alta precisión que cambia suavemente entre niebla amplia, chorro puntual y cierre hermético.',
    },
    2: {
      name: 'Carcasa',
      subtitle: 'Moldeada en cualquier color',
      material: 'PP Brillante o Mate',
      tolerance: 'Ajuste ±0.05 mm',
      customization: 'Cualquier tono Pantone + logotipo tampografiado o en relieve',
      description: 'Cubierta protectora diseñada para una palanca equilibrada y máxima fidelidad de color en cada lote.',
    },
    3: {
      name: 'Gatillo',
      subtitle: 'Agarre ergonómico',
      material: 'PP Modificado al Impacto',
      tolerance: '+5,000 ciclos probados',
      customization: 'Perfil ergonómico de 2 dedos o compacto de 1 dedo',
      description: 'Palanca de baja fuerza de accionamiento probada para uso continuo sin fatiga ni blanqueamiento del plástico.',
    },
    4: {
      name: 'Pistón y resorte',
      subtitle: 'Salida suave y estable',
      material: 'Acero 304 / 316 + Pistón PE',
      tolerance: 'Dosis ±0.08 ml',
      customization: 'Acero 304 estándar o grado químico 316 reforzado',
      description: 'Cámara autocebante que succiona el líquido en 3–4 pulsaciones y sella herméticamente contra contrapresión.',
    },
    5: {
      name: 'Cierre / Rosca',
      subtitle: 'Tapa roscada lisa o estriada',
      material: 'PP + Junta PE / Espuma',
      tolerance: 'SPI 28/400 y 28/410',
      customization: 'Cuello estriado, liso o trinquete antirretorno',
      description: 'Rosca calibrada por torque con empaque interno compresible para cero fugas en líneas de envasado rápidas.',
    },
    6: {
      name: 'Tubo pescante',
      subtitle: 'Cortado a la altura del frasco',
      material: 'LDPE Virgen',
      tolerance: 'Corte exacto ±1.0 mm',
      customization: 'Corte recto, en ángulo o curvo hacia la esquina',
      description: 'Extruido en planta y cortado a la profundidad exacta de su envase para aprovechar hasta el último mililitro.',
    },
  },
  ar: {
    1: {
      name: 'الفوهة الأمامية',
      subtitle: 'رذاذ · تيار · إغلاق',
      material: 'POM / بولي بروبلين نقي',
      tolerance: 'دقة الثقب ±0.03 مم',
      customization: 'رذاذ، تيار، شبكة رغوة، أو غطاء أمان للأطفال',
      description: 'قطعة أمامية مثقوبة بدقة تدور بسلاسة بين الرذاذ الواسع والتيار المركّز ووضع الإغلاق التام.',
    },
    2: {
      name: 'الهيكل الخارجي',
      subtitle: 'حقن بأي لون مطلوب',
      material: 'PP لامع أو مطفي',
      tolerance: 'تطابق ±0.05 مم',
      customization: 'أي درجة بانتون + طباعة شعار أو حفر بارز',
      description: 'غطاء حماية مصمم لتوفير راحة قبضة متوازنة وثبات تام في درجة اللون عبر جميع الدفعات.',
    },
    3: {
      name: 'الزناد',
      subtitle: 'تصميم مريح لليد',
      material: 'PP عالي التحمل',
      tolerance: 'اختبار +5,000 ضغطة',
      customization: 'تصميم مريح بإصبعين أو مدمج بإصبع واحد',
      description: 'ذراع سحب خفيف المقاومة يقلل إجهاد اليد ومختبر ضد الكسر أو التلف عند الاستخدام المتكرر.',
    },
    4: {
      name: 'المكبس والنابض',
      subtitle: 'تدفق سلس وثابت',
      material: 'فولاذ 304 / 316 + مكبس PE',
      tolerance: 'ثبات الجرعة ±0.08 مل',
      customization: 'ستانلس 304 قياسي أو 316 مقاوم للكيماويات',
      description: 'أسطوانة تحضير ذاتي تسحب السائل خلال 3 إلى 4 ضغطات وتحافظ على إحكام الغلق دون تسرب.',
    },
    5: {
      name: 'غطاء الربط',
      subtitle: 'مضلع أو أملس لسن العبوة',
      material: 'PP + حشوة إحكام PE',
      tolerance: 'معيار SPI 28/400 و 28/410',
      customization: 'مضلع أو أملس أو سن مانع للارتداد',
      description: 'قلوظ معاير بعزم دوران مضبوط مع حشوة داخلية تمنع التسرب أثناء التعبئة السريعة والشحن البحري.',
    },
    6: {
      name: 'أنبوب السحب',
      subtitle: 'مقصوص حسب ارتفاع عبوتك',
      material: 'LDPE نقي',
      tolerance: 'قص مخصص ±1.0 مم',
      customization: 'قص مستقيم أو مائل أو منحني لزاوية القاع',
      description: 'يُبثق داخل مصنعنا ويُقص وفق عمق عبوتك بالضبط لضمان سحب السائل حتى آخر قطرة.',
    },
  },
};

export function getLocalizedBlueprintParts(lang: LanguageCode): BlueprintPart[] {
  const overrides = BLUEPRINT_OVERRIDES[lang];
  if (!overrides) return BLUEPRINT_PARTS;
  return BLUEPRINT_PARTS.map((p) => ({ ...p, ...(overrides[p.id] ?? {}) }));
}

const COLOUR_OVERRIDES: Partial<Record<LanguageCode, Record<string, Partial<NozzleColour>>>> = {
  es: {
    'ocean-blue': { name: 'Azul océano' },
    'signal-red': { name: 'Rojo señal' },
    'pure-white': { name: 'Blanco puro', pantone: 'PP Virgen Blanco' },
    'matte-black': { name: 'Negro mate' },
    'emerald-green': { name: 'Verde esmeralda' },
    'amber-gold': { name: 'Amarillo ámbar' },
  },
  ar: {
    'ocean-blue': { name: 'أزرق محيطي' },
    'signal-red': { name: 'أحمر قياسي' },
    'pure-white': { name: 'أبيض ناصع', pantone: 'PP نقي أبيض' },
    'matte-black': { name: 'أسود مطفي' },
    'emerald-green': { name: 'أخضر زمردي' },
    'amber-gold': { name: 'أصفر كهرماني' },
  },
};

export function getLocalizedNozzleColours(lang: LanguageCode): NozzleColour[] {
  const overrides = COLOUR_OVERRIDES[lang];
  if (!overrides) return NOZZLE_COLOURS;
  return NOZZLE_COLOURS.map((c) => ({ ...c, ...(overrides[c.id] ?? {}) }));
}

const MARKET_OVERRIDES: Partial<Record<LanguageCode, Record<string, Partial<ExportMarket>>>> = {
  es: {
    'middle-east': {
      region: 'Medio Oriente',
      hubs: 'Jebel Ali (Dubái) · Yeda · Dammam · Sohar',
      transitDays: '18 – 24 días tránsito marítimo desde Ningbo',
      incoterms: 'FOB Ningbo / CIF Jebel Ali',
      summary: 'Atomizadores, espumadores y bombas de loción para plantas químicas, cosmética y perfumería regional. Atención en inglés y árabe.',
    },
    'south-america': {
      region: 'Sudamérica',
      hubs: 'Santos (Brasil) · Valparaíso (Chile) · Callao · Buenos Aires',
      transitDays: '32 – 38 días tránsito marítimo desde Ningbo',
      incoterms: 'FOB Ningbo / CIF Santos y Callao',
      summary: 'Suministro en contenedor completo para distribuidores del hogar, cuidado automotriz y maquiladores en Brasil, Chile, Perú y Argentina.',
    },
    europe: {
      region: 'Europa y Reino Unido',
      hubs: 'Róterdam · Hamburgo · Amberes · Valencia',
      transitDays: '26 – 32 días tránsito marítimo desde Ningbo',
      incoterms: 'FOB Ningbo / DDP Puertos UE',
      summary: 'Cierres y dosificadores en PP virgen y opciones PCR con cumplimiento REACH para líneas europeas de limpieza y cosmética.',
    },
    'north-america': {
      region: 'Norteamérica',
      hubs: 'Los Ángeles · Long Beach · Savannah · Vancouver',
      transitDays: '16 – 26 días tránsito marítimo desde Ningbo',
      incoterms: 'FOB Ningbo / CIF Costa Oeste y Este',
      summary: 'Tolerancias de rosca SPI 28/400 y 24/410 totalmente compatibles con líneas automáticas de envasado en Norteamérica.',
    },
  },
  ar: {
    'middle-east': {
      region: 'الشرق الأوسط',
      hubs: 'جبل علي (دبي) · جدة · الدمام · صحار',
      transitDays: '18 – 24 يوماً شحناً بحرياً من نينغبو',
      incoterms: 'FOB نينغبو / CIF جبل علي',
      summary: 'بخاخات ورغوة ومضخات لوشن لمصانع المنظفات وشركات مستحضرات التجميل والعطور في المنطقة مع خدمة عملاء بالعربية.',
    },
    'south-america': {
      region: 'أمريكا الجنوبية',
      hubs: 'سانتوس (البرازيل) · فالبارايسو (تشيلي) · كاياو · بوينس آيرس',
      transitDays: '32 – 38 يوماً شحناً بحرياً من نينغبو',
      incoterms: 'FOB نينغبو / CIF سانتوس وكاياو',
      summary: 'توريد حاويات بكميات تجارية لموزعي المنظفات المنزلية والعناية بالسيارات ومصانع التعبئة في أمريكا اللاتينية.',
    },
    europe: {
      region: 'أوروبا والمملكة المتحدة',
      hubs: 'روتردام · هامبورغ · أنتويرب · فالنسيا',
      transitDays: '26 – 32 يوماً شحناً بحرياً من نينغبو',
      incoterms: 'FOB نينغبو / DDP الموانئ الأوروبية',
      summary: 'عبوات وإغلاقات من البولي بروبلين النقي والمطابقة لمعايير REACH لخطوط التعبئة الأوروبية للنظافة والتجميل.',
    },
    'north-america': {
      region: 'أمريكا الشمالية',
      hubs: 'لوس أنجلوس · لونغ بيتش · سافانا · فانكوفر',
      transitDays: '16 – 26 يوماً شحناً بحرياً من نينغبو',
      incoterms: 'FOB نينغبو / CIF الساحل الغربي والشرقي',
      summary: 'أبعاد قلوظ SPI 28/400 و 24/410 متوافقة بدقة تامة مع خطوط التعبئة الأوتوماتيكية عالية السرعة في أمريكا الشمالية.',
    },
  },
};

export function getLocalizedExportMarkets(lang: LanguageCode): ExportMarket[] {
  const overrides = MARKET_OVERRIDES[lang];
  if (!overrides) return EXPORT_MARKETS;
  return EXPORT_MARKETS.map((m) => ({ ...m, ...(overrides[m.id] ?? {}) }));
}

interface VariantTranslation {
  model?: string;
  dosage?: string;
  closureStyle?: string;
  springType?: string;
  moq?: string;
  materials?: string;
  leadTime?: string;
  applications?: string;
  description?: string;
  features?: string[];
  galleryLabels?: string[];
}

interface CategoryTranslation {
  name?: string;
  shortName?: string;
  summary?: string;
  outputRange?: string;
  moq?: string;
  variants?: Record<string, VariantTranslation>;
}

const CATEGORY_OVERRIDES: Partial<Record<LanguageCode, Record<string, CategoryTranslation>>> = {
  es: {
    'trigger-sprayers': {
      name: 'Atomizadores de Gatillo',
      shortName: 'Gatillos',
      summary: 'Gatillos ergonómicos de tamaño estándar con boquillas ajustables de rocío, chorro y cierre para hogar, jardín y cuidado automotriz.',
      moq: '10,000 pzas',
      variants: {
        'yl-ts28a': {
          model: 'YL-TS28A Estándar Uso Pesado',
          dosage: '1.25 ± 0.10 ml/pulso',
          closureStyle: 'Estriado / Liso / Trinquete',
          springType: 'Acero Inoxidable 304 (Externo)',
          moq: '10,000 pzas',
          materials: 'Carcasa PP Virgen · Tubo LDPE · Resorte 304',
          leadTime: '15–18 días',
          applications: 'Limpiavidrios, desinfectantes multiusos, rociadores de jardín',
          description: 'Nuestro modelo insignia YL-TS28A está diseñado para líneas de limpieza del hogar y mantenimiento comercial. Su boquilla giratoria alterna suavemente entre niebla de 55°, chorro concentrado y bloqueo hermético OFF.',
          features: [
            'Autocebado rápido en 3 a 4 pulsaciones',
            'Probado contra fugas al vacío a -0.06 MPa para exportación marítima',
            'Disponible igualación Pantone e impresión de logotipo en carcasa',
            'Tubo pescante extruido y cortado en ángulo según la altura de su envase',
          ],
          galleryLabels: ['Vista frontal de estudio', 'Boquilla Spray / Chorro / Off', 'Prueba QC de dispersión 60°', 'Instalación en envase'],
        },
        'yl-ts28c': {
          model: 'YL-TS28C Resistente a Químicos',
          dosage: '1.35 ± 0.10 ml/pulso',
          closureStyle: 'Seguro Infantil / Estriado',
          springType: 'Acero 316 Grado Ácido y Álcali',
          moq: '20,000 pzas',
          materials: 'PP Químico · Sello FKM / EPDM · Resorte 316',
          leadTime: '18–22 días',
          applications: 'Lejía/cloro, desincrustantes de baño, desengrasantes de motor',
          description: 'Fabricado para fórmulas ácidas, alcalinas y solventes donde los gatillos comunes fallan. Combina juntas de fluorocarbono / EPDM con un resorte de acero inoxidable 316 aislado del fluido.',
          features: [
            'Resorte reforzado acero 316 apto para cloro y desengrasantes',
            'Opción de collarín de seguridad infantil o trinquete',
            'Cámara de pistón de alto volumen (1.35 ml) para fórmulas densas',
            'Verificación por lote contra agrietamiento químico por estrés',
          ],
          galleryLabels: ['Detalle de boquilla química', 'Perfil de ensamblaje completo', 'Banco de calibración de rocío', 'Línea automática de montaje'],
        },
        'yl-ts28l': {
          model: 'YL-TS28L Invertido 360°',
          dosage: '1.15 ± 0.10 ml/pulso',
          closureStyle: 'Falda Lisa Mate',
          springType: 'Acero 304 + Esfera Contrapeso',
          moq: '20,000 pzas',
          materials: 'PP Mate · Tubo Flexible Silicona · Válvula Esférica',
          leadTime: '18–22 días',
          applications: 'Desinfectantes, detailing automotriz, limpiadores de inodoros',
          description: 'Equipado con válvula interna de doble cámara 360° y pesa inoxidable en la base del tubo flexible, el YL-TS28L pulveriza de forma continua incluso boca abajo.',
          features: [
            'Pulveriza en cualquier ángulo, incluso invertido a 180°',
            'Esfera de acero con peso sigue automáticamente el nivel del líquido',
            'Carcasa mate antideslizante ideal para manos húmedas',
            'Disponible en rosca 28/410 lisa o estriada antirretorno',
          ],
          galleryLabels: ['Integración en línea de envase', 'Perfil del atomizador', 'Detalle de orificio giratorio', 'Prueba de dispersión en ángulo'],
        },
      },
    },
    'mini-trigger-sprayers': {
      name: 'Mini Atomizadores de Gatillo',
      shortName: 'Mini Gatillos',
      summary: 'Gatillos compactos ergonómicos para cuidado personal, peluquería y formatos de viaje sin perder alcance de atomización.',
      moq: '10,000 pzas',
      variants: {
        'yl-mt24': {
          model: 'YL-MT24 Compacto con Clip de Bloqueo',
          dosage: '0.32 ± 0.05 ml/pulso',
          closureStyle: 'Liso Brillante / Mate',
          springType: 'Acero Inoxidable 304',
          moq: '10,000 pzas',
          materials: 'PP Alto Brillo o Mate · Tubo LDPE · Acero 304',
          leadTime: '15–18 días',
          applications: 'Brumas capilares, sprays textiles, tónicos faciales',
          description: 'Combina una silueta cosmética estilizada con ergonomía de un solo dedo. Su clip deslizante bajo el gatillo evita activaciones accidentales en bolsos o paquetería.',
          features: [
            'Clip deslizante de bloqueo evita disparos accidentales',
            'Gatillo suave de un dedo con mínima fuerza de accionamiento',
            'Disponible en cuellos 24/410 y 28/410 lisos o mate satinado',
            'Combinaciones de color entre carcasa y clip a medida',
          ],
          galleryLabels: ['Conjunto compacto en envase', 'Válvula interna y resorte', 'Verificación de cono de bruma', 'Empaque en cajas de exportación'],
        },
        'yl-mt20': {
          model: 'YL-MT20 Cosmético de Viaje',
          dosage: '0.25 ± 0.04 ml/pulso',
          closureStyle: 'Botón de Seguridad en Cuello',
          springType: 'Acero Inoxidable 304',
          moq: '15,000 pzas',
          materials: 'PP Virgen Grado Cosmético · Sello PE · Acero 304',
          leadTime: '15–20 días',
          applications: 'Bruma solar, aromatizantes de ambiente, cuidado de mascotas',
          description: 'Diseñado para frascos delgados 20/410 de 50 ml a 150 ml, entrega una microbruma controlada de 0.25 ml con botón bloqueador transversal en el cuello.',
          features: [
            'Cuello cosmético 20/410 esbelto para frascos de 50–150 ml',
            'Botón bloqueador asegura el gatillo en transporte aéreo o courier',
            'Cámara microatomizadora evita manchas húmedas',
            'Compatible con bases acuosas, hidrolatos y aceites ligeros',
          ],
          galleryLabels: ['Perfil de viaje 20/410', 'Presentación en anaquel', 'Detalles de cuello y tubo', 'Nave de inyección en Yuyao'],
        },
      },
    },
    'foam-triggers': {
      name: 'Gatillos de Espuma',
      shortName: 'Espumadores',
      summary: 'Boquillas con malla aireadora que adhieren espuma activa a superficies verticales — ideales para desengrasantes y lavado automotriz.',
      moq: '10,000 pzas',
      variants: {
        'yl-ft28': {
          model: 'YL-FT28 Dual Espuma / Spray',
          dosage: '1.30 ± 0.10 ml/pulso',
          closureStyle: 'Cuello Estriado Antideslizante',
          springType: 'Acero 304 + Malla Doble Abatible',
          moq: '10,000 pzas',
          materials: 'PP Virgen · Malla Acero/Nylon · Acero 304',
          leadTime: '15–18 días',
          applications: 'Desengrasantes de cocina, antimoho, limpiadores de ducha',
          description: 'Su rejilla frontal abatible permite alternar al instante entre espuma densa adherente (tapa cerrada) y spray directo (tapa abierta), reduciendo la dispersión en el aire.',
          features: [
            'Malla abatible intercambia entre espuma espesa y rocío líquido',
            'Reduce inhalación de niebla en baños y cocinas',
            'Collarín estriado 28/400 y 28/410 de gran agarre con guantes',
            'Colores combinables entre carcasa y cubierta frontal abatible',
          ],
          galleryLabels: ['Tapa de malla abatible', 'Control QC de aireación', 'Ajuste en envase', 'Ensamblaje automatizado'],
        },
        'yl-ft28h': {
          model: 'YL-FT28H Espuma Densa Industrial',
          dosage: '1.55 ± 0.10 ml/pulso',
          closureStyle: 'Trinquete Antirretorno',
          springType: 'Acero 316 Grado Químico',
          moq: '15,000 pzas',
          materials: 'PP Químico · Malla Doble Etapa · Resorte 316',
          leadTime: '18–22 días',
          applications: 'Limpiallantas automotriz, hornos, sanitizantes industriales',
          description: 'Construido para desengrasantes alcalinos pesados y limpieza automotriz. Su cámara de doble etapa entrega 1.55 ml por pulsación con collarín de trinquete seguro.',
          features: [
            'Cámara de 1.55 ml genera espuma densa de larga adherencia',
            'Resorte acero 316 y sellos resistentes a químicos severos',
            'Cuello de trinquete evita aflojamiento en línea de llenado',
            'Probado por +5,000 ciclos sin obstrucción de malla',
          ],
          galleryLabels: ['Cabezal de espuma uso rudo', 'Orificio de precisión', 'Inyección propia en planta', 'Paletización de contenedores'],
        },
      },
    },
    'lotion-pumps': {
      name: 'Bombas de Loción',
      shortName: 'Bombas Loción',
      summary: 'Dosificación suave y precisa para líquidos viscosos con cabezales bloqueables para jabones, champús, cremas y geles.',
      moq: '10,000 pzas',
      variants: {
        'yl-lp28': {
          model: 'YL-LP28 Cierre Lock-Down 2.0cc',
          dosage: '2.00 ± 0.15 ml/pulso',
          closureStyle: 'Liso / Estriado / Collar Aluminio',
          springType: 'Externo Sin Contacto Acero 304',
          moq: '10,000 pzas',
          materials: 'Actuador PP Virgen · Resorte Externo 304 · Tubo LDPE',
          leadTime: '15–18 días',
          applications: 'Jabón de manos, crema corporal, acondicionador, lavaplatos',
          description: 'Nuestra bomba más versátil de 2.0 cc con arquitectura de resorte externo que evita todo contacto entre el metal y su producto. Disponible con collarín de aluminio.',
          features: [
            'El resorte externo nunca entra en contacto con el fluido',
            'Pico antigoteo mantiene limpio el hombro de la botella',
            'Opciones de collarín PP liso, estriado o aluminio anodizado',
            'Sistema twist lock-down certificado a -0.06 MPa de vacío',
          ],
          galleryLabels: ['Acabados blanco, azul y aluminio', 'Resorte, pistón y collarín', 'Conjunto en envase 300 ml', 'Línea limpia de montaje'],
        },
        'yl-lp33': {
          model: 'YL-LP33 Alto Caudal 4.0cc',
          dosage: '4.00 ± 0.25 ml/pulso',
          closureStyle: 'Estriado Ancho / Liso',
          springType: 'Acero Inoxidable 304',
          moq: '10,000 pzas',
          materials: 'PP Pared Gruesa · Tubo Gran Calibre · Acero 304',
          leadTime: '15–20 días',
          applications: 'Champú salón 1L, gel corporal espeso, jarabes',
          description: 'Cilindro de gran capacidad de 4.0 cc y tubo de gran diámetro para formatos familiares de 500 ml a 2 litros y geles de alta viscosidad.',
          features: [
            'Salida de 4.0 ml ideal para envases de 500 ml a 2 L',
            'Tubo ancho y válvula esférica para cremas espesas',
            'Cabezal ancho reforzado soporta presión lateral',
            'Opción en PP grado contacto alimentario',
          ],
          galleryLabels: ['Serie de bomba alto caudal', 'Pistón y tubo ancho interno', 'Capacidad de inyección', 'Preparación de envío'],
        },
        'yl-lp28w': {
          model: 'YL-LP28W Impermeable Up-Lock',
          dosage: '2.00 ± 0.15 ml/pulso',
          closureStyle: 'Faldón con Junta Impermeable',
          springType: 'Externo Acero 304',
          moq: '15,000 pzas',
          materials: 'PP Virgen · Doble Faldón Hermético · Acero 304 Externo',
          leadTime: '18–22 días',
          applications: 'Geles de ducha, limpiadores faciales, uso en baño',
          description: 'Sellado de doble labio contra agua de ducha para evitar filtraciones dentro del envase, con bloqueo Up-Lock sin desperdiciar producto.',
          features: [
            'Doble labio impermeable bloquea entrada de agua en la ducha',
            'Bloqueo Up-Lock cierra sin oprimir el dispensador',
            'Resorte externo evita oxidación y decoloración',
            'Acabados brillante, mate o colores Pantone personalizados',
          ],
          galleryLabels: ['Presentación línea de baño', 'Opciones de acabados', 'Componentes escudo de agua', 'Control automatizado de fugas'],
        },
      },
    },
    'fine-mist-sprayers': {
      name: 'Pulverizadores Fine Mist',
      shortName: 'Fine Mist',
      summary: 'Atomización de micro-orificio que genera una nube sedosa y uniforme para cosmética, perfumes, cabello y ambientadores.',
      moq: '10,000 pzas',
      variants: {
        'yl-fm20': {
          model: 'YL-FM20 Mist Cosmético PP',
          dosage: '0.14 ± 0.02 ml/pulso',
          closureStyle: 'PP Liso + Sobretapa Completa',
          springType: 'Micro-Válvula Acero 304',
          moq: '10,000 pzas',
          materials: 'PP Cosmético · Sobretapa AS/PP · Micro-Válvula 304',
          leadTime: '15–18 días',
          applications: 'Bruma facial hidratante, fijador maquillaje, sanitizantes',
          description: 'Microcámara de vórtice que pulveriza el líquido en una nube seca de 0.14 ml sin goteos. Incluye sobretapa transparente higiénica.',
          features: [
            'Microatomización de 0.14 ml sin gotas pesadas',
            'Incluye capuchón antipolvo completo o medio',
            'Compatible con botellas PET y vidrio 18/415, 20/410 y 24/410',
            'Pulsador ergonómico personalizable en color',
          ],
          galleryLabels: ['Sobretapa y cuellos estriados', 'Microválvula y tubo pescante', 'Control QC de cono fino', 'Ensamblaje en sala limpia'],
        },
        'yl-fm24': {
          model: 'YL-FM24 Fragancia Collar Aluminio',
          dosage: '0.18 ± 0.03 ml/pulso',
          closureStyle: 'Collarín de Aluminio Anodizado',
          springType: 'Micro-Válvula Acero 304',
          moq: '15,000 pzas',
          materials: 'Aluminio Anodizado · Sello PE para Alcohol · Acero 304',
          leadTime: '18–22 días',
          applications: 'Body mist, aguas de colonia, perfumes textiles y hogar',
          description: 'Estética metálica en aluminio anodizado resistente a fragancias alcohólicas, disponible en plata, oro champán, oro rosa y negro.',
          features: [
            'Collarín en aluminio anodizado y sobretapa metálica opcional',
            'Junta resistente a etanol que evita evaporación de esencias',
            'Amplia dispersión de 0.18 ml ideal para body mist',
            'Opciones cepillado, brillante o grabado láser de marca',
          ],
          galleryLabels: ['Serie aluminio plata y blanco', 'Mecanismo atomizador interno', 'Nave de inyección de precisión', 'Empaque para exportación'],
        },
      },
    },
    'bottle-caps-closures': {
      name: 'Tapas y Cierres',
      shortName: 'Tapas',
      summary: 'Tapas roscadas, flip-top y disc-top moldeadas en el mismo PP virgen que nuestros gatillos para una armonía cromática total.',
      outputRange: 'Orificio 2.5 – 6.0 mm',
      moq: '20,000 pzas',
      variants: {
        'yl-fc24': {
          model: 'YL-FC24 Tapa Flip-Top a Presión',
          dosage: 'Apertura 3.0 mm / 5.0 mm',
          closureStyle: 'Bisagra Mariposa Brillante o Mate',
          springType: 'Válvula de Silicona Opcional',
          moq: '20,000 pzas',
          materials: 'PP Virgen Alta Flexibilidad · Sello PE o Válvula Silicona',
          leadTime: '14–18 días',
          applications: 'Champú, gel de ducha, crema corporal, aceites',
          description: 'Bisagra tipo mariposa probada por más de 3,000 aperturas sin blanqueamiento ni rotura, con cierre audible antifugas y válvula de silicona opcional.',
          features: [
            'Bisagra probada a +3,000 ciclos sin fisuras',
            'Clic hermético que evita aperturas durante el transporte',
            'Orificios de 3.0 mm o 5.0 mm y válvula antigoteo opcional',
            'Mismo tono exacto que sus bombas y gatillos Yi Lai',
          ],
          galleryLabels: ['Línea flip-top, disc-top y rosca', 'Moldes multicavidad de tapas', 'Armonía visual de marca', 'Exportación paletizada'],
        },
        'yl-dc24': {
          model: 'YL-DC24 Tapa Disc-Top Presión',
          dosage: 'Apertura Media Luna 3.5 mm',
          closureStyle: 'Lisa / Doble Pared',
          springType: 'N/A — Polipropileno Moldeado',
          moq: '20,000 pzas',
          materials: 'PP Virgen + Tapón PE · Junta Inducción Opcional',
          leadTime: '14–18 días',
          applications: 'Agua micelar, quitaesmaltes, sérums capilares',
          description: 'Cierre de disco presionable con una sola mano y tapón interno que sella al ras cuando está cerrado. Disponible en pared simple o doble pared de hombro recto.',
          features: [
            'Accionamiento suave con un dedo para cosmética líquida',
            'Disco superior enrasado para presentación limpia en tienda',
            'Opciones lisa, estriada o con faldón de aluminio anodizado',
            'Tapón interno elimina exudaciones durante el transporte',
          ],
          galleryLabels: ['Tapas disc-top rojo, azul y blanco', 'Prensas de precisión en Yuyao', 'Ensamblaje automatizado', 'Cajas listas para exportación'],
        },
      },
    },
  },
  ar: {
    'trigger-sprayers': {
      name: 'بخاخات الزناد',
      shortName: 'بخاخات الزناد',
      summary: 'بخاخات زناد مريحة بالحجم الكامل مزودة بفوهات قابلة للتعديل (رذاذ، تيار، إغلاق) لتنظيف المنزل والحدائق والعناية بالسيارات.',
      moq: '10,000 قطعة',
      variants: {
        'yl-ts28a': {
          model: 'YL-TS28A قياسي شديد التحمل',
          dosage: '1.25 ± 0.10 مل/ضغطة',
          closureStyle: 'مضلع / أملس / سن قفل',
          springType: 'فولاذ مقاوم للصدأ 304 (خارجي)',
          moq: '10,000 قطعة',
          materials: 'هيكل PP نقي · أنبوب LDPE · نابض 304',
          leadTime: '15–18 يوماً',
          applications: 'منظفات الزجاج، المطهرات متعددة الأسطح، رشاشات الحدائق',
          description: 'بخاخ الزناد الرائد YL-TS28A مصمم لخطوط التنظيف المنزلي والتجاري عالية الإنتاجية. تدور فوهته الدقيقة بسلاسة بين مخروط رذاذ 55° وتيار مركز وقفل محكم مانع للتسرب، مع نابض خارجي 304 لا يلامس السائل.',
          features: [
            'تحضير ذاتي سريع خلال 3 إلى 4 ضغطات',
            'مختبر ضد التسرب بالتفريغ عند -0.06 MPa للشحن البحري والتجاري',
            'إمكانية مطابقة ألوان بانتون وطباعة شعار العلامة التجارية على الهيكل',
            'أنبوب سحب مبثوق ومقصوص بزاوية مائلة حسب ارتفاع عبوتكم',
          ],
          galleryLabels: ['صورة استوديو أمامية', 'فوهة رذاذ / تيار / إغلاق', 'اختبار جودة التوزيع 60°', 'التركيب على العبوة'],
        },
        'yl-ts28c': {
          model: 'YL-TS28C مقاوم للكيماويات',
          dosage: '1.35 ± 0.10 مل/ضغطة',
          closureStyle: 'قفل أمان للأطفال / مضلع',
          springType: 'فولاذ 316 مقاوم للأحماض والقلويات',
          moq: '20,000 قطعة',
          materials: 'PP مقاوم للكيماويات · ختم FKM / EPDM · نابض 316',
          leadTime: '18–22 يوماً',
          applications: 'المبيضات والكلور، مزيلات التكلس، مزيلات شحوم المحركات',
          description: 'مصمم خصيصاً للتركيبات الحمضية والقلوية والمذيبات القوية. يجمع YL-TS28C بين حشوات FKM / EPDM ونابض فولاذ 316 معزول عن السائل لمنع التآكل أو التصلب أثناء التخزين الطويل.',
          features: [
            'نابض معزز من الفولاذ 316 لمقاومة الكلور والمذيبات',
            'خيار ياقة أمان للأطفال أو قفل مضاد للفك',
            'غرفة مكبس عالية التدفق 1.35 مل للسوائل الكثيفة',
            'مفحوص معملياً ضد التشقق الكيميائي الإجهادي',
          ],
          galleryLabels: ['تفاصيل الفوهة الكيميائية', 'المظهر الجانبي الكامل', 'منصة معايرة الرذاذ', 'خط التجميع الأوتوماتيكي'],
        },
        'yl-ts28l': {
          model: 'YL-TS28L بخاخ مقلوب 360°',
          dosage: '1.15 ± 0.10 مل/ضغطة',
          closureStyle: 'ياقة ناعمة مطفية',
          springType: 'فولاذ 304 + كرة ثقل سفلية',
          moq: '20,000 قطعة',
          materials: 'PP مطفي · أنبوب سيليكون مرن · صمام كرة ستانلس',
          leadTime: '18–22 يوماً',
          applications: 'المعقمات، العناية بالسيارات، منظفات الحواف السفلية',
          description: 'مزود بصمام داخلي ثنائي الغرف يعمل بزاوية 360 درجة وكرة ثقل معدنية في نهاية أنبوب سيليكون مرن، مما يسمح بالرش بسلاسة حتى عند قلب العبوة رأساً على عقب.',
          features: [
            'يرش بسلاسة من أي زاوية بما في ذلك الوضع المقلوب 180°',
            'كرة الثقل المعدنية تتبع مستوى السائل داخل العبوة تلقائياً',
            'هيكل مطفي مانع للانزلاق أثناء الاستخدام بالأيدي المبللة',
            'متوفر بعنق 28/410 أملس أو مضلع مانع للارتداد',
          ],
          galleryLabels: ['التركيب على خط التعبئة', 'الشكل الجانبي للبخاخ', 'تفاصيل فوهة الدوران', 'اختبار الرش متعدد الزوايا'],
        },
      },
    },
    'mini-trigger-sprayers': {
      name: 'بخاخات الزناد المدمجة (ميني)',
      shortName: 'ميني تريجر',
      summary: 'بخاخات صغيرة مريحة بحجم راحة اليد مخصصة لمنتجات العناية الشخصية وصالونات التجميل وعبوات السفر.',
      moq: '10,000 قطعة',
      variants: {
        'yl-mt24': {
          model: 'YL-MT24 مدمج مع مشبك أمان',
          dosage: '0.32 ± 0.05 مل/ضغطة',
          closureStyle: 'أملس لامع أو مطفي',
          springType: 'فولاذ مقاوم للصدأ 304',
          moq: '10,000 قطعة',
          materials: 'PP لامع أو مطفي · أنبوب LDPE · فولاذ 304',
          leadTime: '15–18 يوماً',
          applications: 'بخاخات الشعر، معطرات المفارش، تونر الوجه',
          description: 'يجمع بين المظهر التجميلي الأنيق وسهولة السحب بإصبع واحد. يضم مشبك أمان منزلقاً أسفل الزناد لمنع الضغط العرضي داخل الحقائب أو طرود الشحن.',
          features: [
            'مشبك أمان منزلق مدمج يمنع الرش غير المقصود',
            'سحب ناعم بإصبع واحد بمقاومة منخفضة ومريحة',
            'متوفر بعنق 24/410 و 28/410 أملس أو مطفي حريري',
            'إمكانية تخصيص لون مختلف للهيكل ومشبك الأمان',
          ],
          galleryLabels: ['تجميع مدمج على العبوة', 'الصمام الداخلي والنابض', 'فحص مخروط الرذاذ', 'كراتين التغليف للتصدير'],
        },
        'yl-mt20': {
          model: 'YL-MT20 تجميلي للسفر 20/410',
          dosage: '0.25 ± 0.04 مل/ضغطة',
          closureStyle: 'زر قفل أمان في العنق',
          springType: 'فولاذ مقاوم للصدأ 304',
          moq: '15,000 قطعة',
          materials: 'PP نقي درجة تجميل · حشوة PE · فولاذ 304',
          leadTime: '15–20 يوماً',
          applications: 'رذاذ واقي الشمس، معطرات الغرف، العناية بالحيوانات الأليفة',
          description: 'مصمم خصيصاً للعبوات الرفيعة من 50 إلى 150 مل بعنق 20/410، يطلق رذاذاً ناعماً بمعدل 0.25 مل مع زر تثبيت مدمج في العنق لتأمين العبوة أثناء السفر.',
          features: [
            'مقاس عنق تجميلي رفيع 20/410 مناسب لعبوات 50–150 مل',
            'زر قفل عبر العنق لتأمين الزناد في الشحن الجوي والطرود',
            'غرفة تذرير دقيقة تمنع تبلل الأسطح بقطرات كبيرة',
            'متوافق مع التركيبات المائية والزيوت الخفيفة',
          ],
          galleryLabels: ['تصميم السفر 20/410', 'المظهر على العبوة', 'مواصفات العنق والأنبوب', 'صالة الحقن في يوياو'],
        },
      },
    },
    'foam-triggers': {
      name: 'بخاخات الرغوة',
      shortName: 'بخاخات الرغوة',
      summary: 'فوهات شبكية لتهوية المنظفات وإنتاج رغوة متماسكة تلتصق بالأسطح الرأسية لمزيلات الدهون وغسيل السيارات.',
      moq: '10,000 قطعة',
      variants: {
        'yl-ft28': {
          model: 'YL-FT28 ثنائي الوضع رغوة / رذاذ',
          dosage: '1.30 ± 0.10 مل/ضغطة',
          closureStyle: 'ياقة مضلعة قوية الإمساك',
          springType: 'فولاذ 304 + شبكة رغوة قابلة للفتح',
          moq: '10,000 قطعة',
          materials: 'PP نقي · شبكة ستانلس/نايلون · فولاذ 304',
          leadTime: '15–18 يوماً',
          applications: 'مزيلات دهون المطابخ، منظفات الحمامات والفواصل',
          description: 'يتميز بغطاء شبكي أمامي مفصلي يتيح التبديل الفوري بين الرغوة الكثيفة (عند إغلاق الشبكة) والرش السائل المباشر (عند فتحها)، مما يقلل تطاير الرذاذ أثناء التنظيف.',
          features: [
            'غطاء شبكي مفصلي للتبديل بين الرغوة الكثيفة والرش السائل',
            'يقلل استنشاق الرذاذ المتطاير في الحمامات والمطابخ',
            'ياقة مضلعة 28/400 و 28/410 سهلة الإمساك بالقفازات',
            'تنوع في الألوان بين الهيكل والغطاء الشبكي الأمامي',
          ],
          galleryLabels: ['فوهة الشبكة المفصلية', 'فحص جودة تهوية الرغوة', 'التوافق مع العبوة', 'خط التجميع الأوتوماتيكي'],
        },
        'yl-ft28h': {
          model: 'YL-FT28H رغوة كثيفة للخدمة الشاقة',
          dosage: '1.55 ± 0.10 مل/ضغطة',
          closureStyle: 'سن قفل مانع للارتداد',
          springType: 'فولاذ 316 مقاوم للكيماويات',
          moq: '15,000 قطعة',
          materials: 'PP مقاوم للكيماويات · شبكة مزدوجة · نابض 316',
          leadTime: '18–22 يوماً',
          applications: 'منظفات جنوط السيارات، مزيلات شحوم الأفران والمصانع',
          description: 'مصمم لمنظفات السيارات القوية ومزيلات الدهون القلوية. تضاعف غرفة 1.55 مل من كثافة الرغوة عبر مرحلتي خلط هوائي مع قفل محكم على العبوة.',
          features: [
            'أسطوانة ضخ 1.55 مل لتكوين رغوة غنية وطويلة الثبات',
            'نابض فولاذ 316 وأختام داخلية مقاومة للقلويات والمذيبات',
            'غطاء بقفل مانع للارتداد يثبت بقوة على خطوط التعبئة',
            'مختبر لأكثر من 5,000 ضغطة دون انسداد الشبكة',
          ],
          galleryLabels: ['رأس الرغوة شديد التحمل', 'فوهة التوجيه الدقيقة', 'التصنيع والحقن الداخلي', 'التحميل على الطبليات'],
        },
      },
    },
    'lotion-pumps': {
      name: 'مضخات اللوشن والصابون',
      shortName: 'مضخات اللوشن',
      summary: 'ضخ سلس ومتجانس للسوائل الكثيفة واللزجة مع رؤوس قابلة للقفل لمنتجات الصابون والشامبو والكريمات.',
      moq: '10,000 قطعة',
      variants: {
        'yl-lp28': {
          model: 'YL-LP28 قفل بالدوران 2.0 مل',
          dosage: '2.00 ± 0.15 مل/ضغطة',
          closureStyle: 'أملس / مضلع / ياقة ألمنيوم',
          springType: 'نابض خارجي 304 غير ملامس للسائل',
          moq: '10,000 قطعة',
          materials: 'PP نقي · نابض خارجي 304 · أنبوب LDPE',
          leadTime: '15–18 يوماً',
          applications: 'غسول اليدين، لوشن الجسم، البلسم، سائل الجلي',
          description: 'المضخة الأكثر مرونة بسعة 2.0 مل مع نظام النابض الخارجي الذي يعزل المعدن تماماً عن التركيبة. تقفل بالدوران للأسفل وتتوفر بياقة ألمنيوم مؤكسد فاخرة.',
          features: [
            'النابض الخارجي لا يلامس الصابون أو المواد الفعالة نهائياً',
            'فوهة مانعة للتنقيط تحافظ على نظافة عنق العبوة',
            'متوفرة بياقة PP ناعمة أو مضلعة أو ألمنيوم مؤكسد',
            'قفل دوران محكم يجتاز اختبارات التفريغ -0.06 MPa',
          ],
          galleryLabels: ['خيارات الأبيض والأزرق والألمنيوم', 'مكونات النابض والمكبس', 'التركيب على عبوة 300 مل', 'خط التجميع المعقم'],
        },
        'yl-lp33': {
          model: 'YL-LP33 تدفق عالٍ 4.0 مل',
          dosage: '4.00 ± 0.25 مل/ضغطة',
          closureStyle: 'مضلع عريض / أملس',
          springType: 'فولاذ مقاوم للصدأ 304',
          moq: '10,000 قطعة',
          materials: 'PP سميك · أنبوب سحب عريض · فولاذ 304',
          leadTime: '15–20 يوماً',
          applications: 'عبوات الشامبو العائلية 1 لتر، جل الاستحمام الكثيف، الشراب الغذائي',
          description: 'مصممة بأسطوانة واسعة 4.0 مل وأنبوب سحب كبير القطر لعبوات 500 مل إلى 2 لتر ومنتجات الصالونات والكريمات عالية اللزوجة.',
          features: [
            'ضخة كبيرة 4.0 مل مثالية للعبوات من 500 مل حتى 2 لتر',
            'أنبوب وصمام واسع القطر لضخ الجل والبلسم الكثيف بسلاسة',
            'رأس عريض مقوّى يتحمل الضغط الجانبي المتكرر',
            'متوفرة بخامة PP نقية مطابقة لملامسة الأغذية',
          ],
          galleryLabels: ['سلسلة التدفق العالي', 'المكبس والأنبوب العريض', 'قدرات الحقن البلاستيكي', 'تجهيز كراتين التصدير'],
        },
        'yl-lp28w': {
          model: 'YL-LP28W مقاومة للماء Up-Lock',
          dosage: '2.00 ± 0.15 مل/ضغطة',
          closureStyle: 'حشوة حماية مزدوجة ضد الماء',
          springType: 'نابض خارجي 304',
          moq: '15,000 قطعة',
          materials: 'PP نقي · حشوة مزدوجة عازلة · نابض خارجي 304',
          leadTime: '18–22 يوماً',
          applications: 'جل الاستحمام، غسول الوجه، صابون المناطق الرطبة',
          description: 'مصممة خصيصاً لبيئات الحمام والاستحمام الرطبة، مزودة بحشوة مزدوجة أسفل الرأس تمنع تسرب ماء الدش إلى داخل العبوة، مع قفل علوي لا يهدر المنتج.',
          features: [
            'حاجز مزدوج يمنع دخول الماء داخل العبوة أثناء الاستحمام',
            'قفل Up-Lock علوي يؤمن المضخة دون الضغط وهدر السائل',
            'نابض خارجي يمنع الأكسدة أو تغير لون المستحضر',
            'متوفرة بتشطيب لامع أو مطفي وبأي لون بانتون',
          ],
          galleryLabels: ['التطبيق على عبوات الاستحمام', 'خيارات تشطيب الياقة', 'مكونات الحماية من الماء', 'فحص التسرب الآلي'],
        },
      },
    },
    'fine-mist-sprayers': {
      name: 'بخاخات الرذاذ الدقيق',
      shortName: 'الرذاذ الدقيق',
      summary: 'تذرير دقيق عبر فوهات متناهية الصغر لإنتاج سحابة رذاذ ناعمة ومتجانسة لمستحضرات التجميل والعطور ومعطرات الجو.',
      moq: '10,000 قطعة',
      variants: {
        'yl-fm20': {
          model: 'YL-FM20 تجميلي PP بغطاء كامل',
          dosage: '0.14 ± 0.02 مل/ضغطة',
          closureStyle: 'PP أملس + غطاء شفاف كامل',
          springType: 'صمام دقيق من الفولاذ 304',
          moq: '10,000 قطعة',
          materials: 'PP تجميلي · غطاء AS/PP شفاف · صمام دقيق 304',
          leadTime: '15–18 يوماً',
          applications: 'بخاخات ترطيب الوجه، مثبتات المكياج، معقمات اليد الكحولية',
          description: 'تقنية التدويم الدقيق تفتت السائل إلى سحابة رذاذ جافة الملمس بمعدل 0.14 مل مع غطاء علوي شفاف يحفظ الفوهة نظيفة وصحية.',
          features: [
            'تذرير دقيق 0.14 مل دون قطرات ثقيلة',
            'مزود بغطاء شفاف كامل أو نصفي لحماية الفوهة',
            'يناسب عبوات PET والزجاج بمقاسات 18/415 و 20/410 و 24/410',
            'زر ضغط ناعم قابل للتلوين حسب هوية العلامة التجارية',
          ],
          galleryLabels: ['غطاء الحماية والأعناق المضلعة', 'الصمام الدقيق وأنبوب السحب', 'فحص جودة سحابة الرذاذ', 'التجميع في بيئة نظيفة'],
        },
        'yl-fm24': {
          model: 'YL-FM24 عطور بياقة ألمنيوم',
          dosage: '0.18 ± 0.03 مل/ضغطة',
          closureStyle: 'ياقة ألمنيوم مؤكسد فاخرة',
          springType: 'صمام دقيق من الفولاذ 304',
          moq: '15,000 قطعة',
          materials: 'ألمنيوم مؤكسد · حشوة PE مقاومة للكحول · فولاذ 304',
          leadTime: '18–22 يوماً',
          applications: 'معطرات الجسم، الكولونيا، بخاخات المفارش والغرف',
          description: 'تجمع بين فخامة الألمنيوم المؤكسد (فضي، ذهبي، أسود، وردي) ومقاومة الزيوت العطرية والكحول لتعزيز مظهر عبوات العطور الراقية.',
          features: [
            'ياقة ألمنيوم مؤكسد مع خيار غطاء معدني مطابق',
            'حشوة مقاومة للإيثانول تمنع التبخر أو الانتفاخ',
            'انتشار واسع بمعدل 0.18 مل مثالي لعطور الجسم والغرف',
            'خيارات تشطيب مصقول أو مطفي أو حفر ليزر للشعار',
          ],
          galleryLabels: ['سلسلة الألمنيوم الفضي والأبيض', 'المكونات الداخلية الدقيقة', 'صالة الحقن عالي الدقة', 'التعبئة والتغليف للتصدير'],
        },
      },
    },
    'bottle-caps-closures': {
      name: 'أغطية العبوات والإغلاقات',
      shortName: 'أغطية العبوات',
      summary: 'أغطية ملولبة وقلابة (Flip-Top) وضاغطة (Disc-Top) محقونة من نفس خامة البولي بروبلين النقية لضمان تطابق اللون مع البخاخات.',
      outputRange: 'فتحة 2.5 – 6.0 مم',
      moq: '20,000 قطعة',
      variants: {
        'yl-fc24': {
          model: 'YL-FC24 غطاء قلاب Flip-Top',
          dosage: 'فتحة 3.0 مم / 5.0 مم',
          closureStyle: 'مفصلة فراشة لامعة أو مطفية',
          springType: 'صمام سيليكون اختياري',
          moq: '20,000 قطعة',
          materials: 'PP عالي المرونة · حشوة PE أو صمام سيليكون',
          leadTime: '14–18 يوماً',
          applications: 'الشامبو، جل الاستحمام، كريم الجسم، الزيوت',
          description: 'مفصلة فراشة مرنة مختبرة لأكثر من 3,000 دورة فتح وإغلاق دون تشقق أو تغير لون، مع إغلاق محكم بصوت قفل وصمام سيليكون مانع للتنقيط اختياري.',
          features: [
            'مفصلة فراشة تتحمل أكثر من 3,000 دورة فتح وإغلاق',
            'إغلاق محكم بصوت نقرة واضحة يمنع التسرب أثناء الشحن',
            'فتحة بقطر 3.0 مم أو 5.0 مم مع خيار صمام السيليكون',
            'مطابقة تامة في اللون مع بخاخات ومضخات Yi Lai',
          ],
          galleryLabels: ['تشكيلة الأغطية القلابة والضاغطة', 'قوالب حقن متعددة التجاويف', 'تكامل وتناسق خطوط التعبئة', 'شحن الطبليات بالجملة'],
        },
        'yl-dc24': {
          model: 'YL-DC24 غطاء ضاغط Disc-Top',
          dosage: 'فتحة هلالية 3.5 مم',
          closureStyle: 'أملس / جدار مزدوج',
          springType: 'بولي بروبلين محقون متكامل',
          moq: '20,000 قطعة',
          materials: 'PP نقي + سدادة PE · خيار حشوة لحام حراري',
          leadTime: '14–18 يوماً',
          applications: 'ماء ميسيلار، مزيل طلاء الأظافر، سيروم الشعر',
          description: 'غطاء قرصي يفتح بضغطة إصبع واحدة بسهولة مع سدادة داخلية تحكم غلق القناة تماماً عند الإغلاق. متاح بجدار مفرد أو مزدوج مسطح لمنتجات التجميل.',
          features: [
            'فتح سلس بيد واحدة مثالي لمستحضرات العناية السائلة',
            'قرص علوي مستوٍ يمنح مظهراً أنيقاً على رفوف المتاجر',
            'متوفر بياقة ملساء أو مضلعة أو غلاف ألمنيوم مؤكسد',
            'سدادة هلالية داخلية تمنع التسرب داخل كراتين الشحن',
          ],
          galleryLabels: ['أغطية ضاغطة باللون الأحمر والأزرق والأبيض', 'مكابس الحقن الدقيقة في يوياو', 'تجميع الأغطية الأوتوماتيكي', 'كراتين جاهزة للتصدير'],
        },
      },
    },
  },
};

export function getLocalizedCategories(lang: LanguageCode): ProductCategory[] {
  const catMap = CATEGORY_OVERRIDES[lang];
  if (!catMap) return PRODUCT_CATEGORIES;

  return PRODUCT_CATEGORIES.map((cat) => {
    const cOver = catMap[cat.id];
    if (!cOver) return cat;

    const localizedVariants: ProductVariant[] = cat.variants.map((v) => {
      const vOver = cOver.variants?.[v.slug];
      if (!vOver) return v;

      return {
        ...v,
        model: vOver.model ?? v.model,
        dosage: vOver.dosage ?? v.dosage,
        closureStyle: vOver.closureStyle ?? v.closureStyle,
        springType: vOver.springType ?? v.springType,
        moq: vOver.moq ?? v.moq,
        materials: vOver.materials ?? v.materials,
        leadTime: vOver.leadTime ?? v.leadTime,
        applications: vOver.applications ?? v.applications,
        description: vOver.description ?? v.description,
        features: vOver.features ?? v.features,
        gallery: v.gallery.map((g, i) => ({
          ...g,
          label: vOver.galleryLabels?.[i] ?? g.label,
        })),
      };
    });

    return {
      ...cat,
      name: cOver.name ?? cat.name,
      shortName: cOver.shortName ?? cat.shortName,
      summary: cOver.summary ?? cat.summary,
      outputRange: cOver.outputRange ?? cat.outputRange,
      moq: cOver.moq ?? cat.moq,
      variants: localizedVariants,
    };
  });
}
