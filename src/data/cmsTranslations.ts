import { LanguageCode } from './factoryData';
import { BlogCategory } from './blogData';

export interface CmsStrings {
  blogKicker: string;
  blogTitle: string;
  blogSub: string;
  blogBackHome: string;
  blogManageBtn: string;
  blogSearchPlaceholder: string;
  blogAllCategories: string;
  blogReadArticle: string;
  blogBackToBlog: string;
  blogPublishedOn: string;
  blogByAuthor: string;
  blogAskEngineerTitle: string;
  blogAskEngineerSub: string;
  blogAskEngineerBtn: string;
  blogRelatedTitle: string;
  blogEmptyTitle: string;
  blogEmptySub: string;
  blogResetFilters: string;
  blogCategoryNames: Record<BlogCategory, string>;

  dashKicker: string;
  dashTitle: string;
  dashSub: string;
  dashBackHome: string;
  dashViewProducts: string;
  dashViewBlog: string;
  dashSignInTitle: string;
  dashSignInSub: string;
  dashSignInBtn: string;
  dashSignOutBtn: string;
  dashUnauthorizedTitle: string;
  dashUnauthorizedSub: string;
  dashSignedInAs: string;
  dashTabProducts: string;
  dashTabBlog: string;
  dashStatActiveProducts: string;
  dashStatPublishedPosts: string;
  dashStatDraftsArchived: string;
  dashStatCategories: string;
  dashAddProduct: string;
  dashEditProduct: string;
  dashAddPost: string;
  dashEditPost: string;
  dashRestoreDefaults: string;
  dashSearchProducts: string;
  dashSearchPosts: string;
  dashAllSeries: string;
  dashAllStatuses: string;
  dashStatusActive: string;
  dashStatusArchived: string;
  dashStatusPublished: string;
  dashStatusDraft: string;
  dashEditBtn: string;
  dashDeleteBtn: string;
  dashConfirmDelete: string;
  dashCancelBtn: string;
  dashSaveProductBtn: string;
  dashSavePostBtn: string;
  dashSaving: string;
  dashNoProducts: string;
  dashNoPosts: string;

  fieldSeries: string;
  fieldModel: string;
  fieldSlug: string;
  fieldNeckFinish: string;
  fieldDosage: string;
  fieldClosureStyle: string;
  fieldSpringType: string;
  fieldMoq: string;
  fieldLeadTime: string;
  fieldMaterials: string;
  fieldApplications: string;
  fieldDescription: string;
  fieldFeatures: string;
  fieldGallery: string;
  fieldAddGalleryImage: string;
  fieldStatus: string;
  fieldPresetSelect: string;
  fieldCustomUrlPlaceholder: string;
  fieldImageCaptionPlaceholder: string;

  fieldPostTitle: string;
  fieldPostCategory: string;
  fieldPostAuthor: string;
  fieldPostReadTime: string;
  fieldPostDate: string;
  fieldPostCoverImage: string;
  fieldPostExcerpt: string;
  fieldPostContent: string;
  fieldPostTags: string;
  fieldUploadImage: string;
  fieldUploadMultiple: string;
  fieldUploading: string;
  fieldDropHint: string;
  fieldUploadInvalidType: string;
  fieldUploadTooLarge: string;
  fieldUploadFailed: string;
  fieldImagePreviewAlt: string;
  fieldPostImagesHeading: string;
  fieldUploadPostImages: string;
  fieldPlacementTop: string;
  fieldPlacementMiddle: string;
  fieldPlacementBottom: string;
  fieldPlacementAuto: string;
  fieldSetAsCover: string;
  dashTabSocial: string;
  socialSectionTitle: string;
  socialSectionSub: string;
  socialSaveBtn: string;
  socialSavedMsg: string;
  socialAutoAttachLabel: string;
  socialAutoAttachSub: string;
  socialNoLinksYet: string;
  socialManageShortcut: string;
  socialAccountSlotLabel: string;
  socialGmailHint: string;
  dashTabSeo: string;
  seoSectionTitle: string;
  seoSectionSub: string;
  seoScoreLabel: string;
  seoApplyRecommendedBtn: string;
  seoSaveBtn: string;
  seoSavedMsg: string;
  seoSerpPreviewTitle: string;
  seoFieldTitle: string;
  seoFieldTitleHint: string;
  seoFieldDesc: string;
  seoFieldDescHint: string;
  seoFieldKeywords: string;
  seoFieldKeywordsHint: string;
  seoFieldCanonical: string;
  seoFieldRobots: string;
  seoFieldRobotsOn: string;
  seoFieldRobotsOff: string;
  seoSocialCardHeading: string;
  seoFieldOgTitle: string;
  seoFieldOgDesc: string;
  seoFieldOgImage: string;
  seoWebmastersHeading: string;
  seoWebmastersSub: string;
  seoGoogleLabel: string;
  seoBingLabel: string;
  seoYandexLabel: string;
  seoBaiduLabel: string;
  seoChecklistTitle: string;
  seoSitemapHeading: string;
  seoDownloadSitemapBtn: string;
  seoDownloadRobotsBtn: string;
}

const CMS_STRINGS: Record<LanguageCode, CmsStrings> = {
  en: {
    blogKicker: 'Factory Journal · Engineering & Export Insights',
    blogTitle: 'Dispensing Engineering & Packaging Notes',
    blogSub:
      'Technical guides from our Yuyao tooling room, quality control lab, and Ningbo export desk to help buyers specify leak-free sprayers and pumps.',
    blogBackHome: 'Back to factory overview',
    blogManageBtn: 'Manage in Dashboard',
    blogSearchPlaceholder: 'Search articles, SPI 28/410, 316 spring, Pantone...',
    blogAllCategories: 'All Topics',
    blogReadArticle: 'Read article',
    blogBackToBlog: 'All Articles',
    blogPublishedOn: 'Published',
    blogByAuthor: 'By',
    blogAskEngineerTitle: 'Need bottle fit testing or chemical compatibility samples?',
    blogAskEngineerSub:
      'Request our free 50-piece evaluation box shipped from Yuyao with 304 and 316 SS options.',
    blogAskEngineerBtn: 'Request technical samples',
    blogRelatedTitle: 'More from the Yi Lai Factory Journal',
    blogEmptyTitle: 'No matching articles found',
    blogEmptySub: 'Try another search keyword or switch category filter.',
    blogResetFilters: 'Reset filters',
    blogCategoryNames: {
      Engineering: 'Engineering',
      Manufacturing: 'Manufacturing',
      'Quality Control': 'Quality Control',
      'Packaging Trends': 'Packaging Trends',
      'Export & Logistics': 'Export & Logistics',
    },

    dashKicker: 'Yi Lai Plastics · Factory CMS',
    dashTitle: 'Product & Blog Management Dashboard',
    dashSub:
      'Create, update, publish, or remove dispensing product models and factory blog articles live on the storefront.',
    dashBackHome: 'Back to site',
    dashViewProducts: 'View Products Page',
    dashViewBlog: 'View Blog Page',
    dashSignInTitle: 'Sign in to Factory Admin Dashboard',
    dashSignInSub:
      'Use your authorized Google factory administrator account to manage live products and blog posts stored in Firestore.',
    dashSignInBtn: 'Sign in with Google',
    dashSignOutBtn: 'Sign out',
    dashUnauthorizedTitle: 'Administrator Access Required',
    dashUnauthorizedSub:
      'This Google account does not have edit permissions. Please sign in with the authorized factory administrator email.',
    dashSignedInAs: 'Signed in as',
    dashTabProducts: 'Products Catalogue',
    dashTabBlog: 'Blog Posts',
    dashStatActiveProducts: 'Active Products',
    dashStatPublishedPosts: 'Published Posts',
    dashStatDraftsArchived: 'Drafts & Archived',
    dashStatCategories: 'Manufacturing Series',
    dashAddProduct: 'Add New Product',
    dashEditProduct: 'Edit Product Model',
    dashAddPost: 'New Blog Post',
    dashEditPost: 'Edit Blog Post',
    dashRestoreDefaults: 'Sync Starter Catalogue',
    dashSearchProducts: 'Search products by model, neck, or dosage...',
    dashSearchPosts: 'Search blog posts by title or author...',
    dashAllSeries: 'All Series',
    dashAllStatuses: 'All Statuses',
    dashStatusActive: 'Active',
    dashStatusArchived: 'Archived',
    dashStatusPublished: 'Published',
    dashStatusDraft: 'Draft',
    dashEditBtn: 'Edit',
    dashDeleteBtn: 'Delete',
    dashConfirmDelete: 'Confirm Delete',
    dashCancelBtn: 'Cancel',
    dashSaveProductBtn: 'Save Product',
    dashSavePostBtn: 'Save Blog Post',
    dashSaving: 'Saving...',
    dashNoProducts: 'No products match the current filter.',
    dashNoPosts: 'No blog posts match the current filter.',

    fieldSeries: 'Manufacturing Series',
    fieldModel: 'Model Code & Title *',
    fieldSlug: 'URL Slug (letters, numbers, hyphens)',
    fieldNeckFinish: 'SPI Neck Finish *',
    fieldDosage: 'Dosage Output *',
    fieldClosureStyle: 'Closure Style',
    fieldSpringType: 'Spring / Valve System',
    fieldMoq: 'Standard MOQ',
    fieldLeadTime: 'Lead Time',
    fieldMaterials: 'Materials & Resin Grade',
    fieldApplications: 'Recommended Applications',
    fieldDescription: 'Full Engineering Description *',
    fieldFeatures: 'Key Features (one per line)',
    fieldGallery: 'Product Image Gallery (up to 6 images)',
    fieldAddGalleryImage: 'Add Image Row',
    fieldStatus: 'Visibility Status',
    fieldPresetSelect: 'Choose studio/factory photo...',
    fieldCustomUrlPlaceholder: 'Or paste image URL / path...',
    fieldImageCaptionPlaceholder: 'Caption (e.g. Studio Front Profile)',

    fieldPostTitle: 'Article Title *',
    fieldPostCategory: 'Category',
    fieldPostAuthor: 'Author / Team Name',
    fieldPostReadTime: 'Read Time',
    fieldPostDate: 'Publish Date',
    fieldPostCoverImage: 'Cover Image',
    fieldPostExcerpt: 'Short Excerpt *',
    fieldPostContent: 'Article Body (blank lines separate paragraphs) *',
    fieldPostTags: 'Tags (comma separated)',
    fieldUploadImage: 'Upload Photo',
    fieldUploadMultiple: 'Drop or click to upload product photos',
    fieldUploading: 'Uploading...',
    fieldDropHint: 'PNG, JPG, WebP up to 12 MB · Auto-optimized',
    fieldUploadInvalidType: 'Please choose a valid image file (PNG, JPG, WebP, GIF).',
    fieldUploadTooLarge: 'Image file must be 12 MB or smaller.',
    fieldUploadFailed: 'Could not process the selected image file.',
    fieldImagePreviewAlt: 'Image preview',
    fieldPostImagesHeading: 'Article Photos & Section Placement (Top / Middle / Bottom)',
    fieldUploadPostImages: 'Upload multiple images (top, middle, bottom)',
    fieldPlacementTop: 'Top',
    fieldPlacementMiddle: 'Middle',
    fieldPlacementBottom: 'Bottom',
    fieldPlacementAuto: 'Auto (Top → Mid → Bottom)',
    fieldSetAsCover: 'Set Cover',
    dashTabSocial: 'Social Media Links',
    socialSectionTitle: 'Official Social Media Links',
    socialSectionSub:
      'Save up to 5 accounts per platform across Facebook, Instagram, TikTok, YouTube, LinkedIn, X (Twitter), Snapchat, Pinterest, and Gmail. Whenever you publish a new product or blog post, all saved links attach automatically.',
    socialSaveBtn: 'Save Social Links',
    socialSavedMsg: 'Social media links saved — ready for new products & blog posts.',
    socialAutoAttachLabel: 'Auto-Attached Social Media Links',
    socialAutoAttachSub:
      'All saved social accounts are automatically attached to this post on publish.',
    socialNoLinksYet: 'No social media links saved yet. Configure them in the Social Media Links tab.',
    socialManageShortcut: 'Edit social links',
    socialAccountSlotLabel: 'Account',
    socialGmailHint: 'Enter Gmail address or URL',
    dashTabSeo: 'SEO',
    seoSectionTitle: 'Search Engine Optimization (SEO) Studio',
    seoSectionSub:
      'Optimize your titles, meta descriptions, keywords, OpenGraph share cards, Schema.org structured data, and webmaster verification codes for Google, Bing, Yahoo, Yandex, DuckDuckGo, and Baidu.',
    seoScoreLabel: 'SEO Health Score',
    seoApplyRecommendedBtn: 'Apply Recommended SEO',
    seoSaveBtn: 'Save & Publish SEO',
    seoSavedMsg: 'SEO settings saved and applied live to search engine metadata.',
    seoSerpPreviewTitle: 'Live Google & Search Engine Snippet Preview',
    seoFieldTitle: 'Primary Meta Title *',
    seoFieldTitleHint: 'Recommended: 30–60 characters',
    seoFieldDesc: 'Meta Description *',
    seoFieldDescHint: 'Recommended: 120–160 characters',
    seoFieldKeywords: 'Target Search Keywords (comma separated)',
    seoFieldKeywordsHint: 'Add 6–15 buyer search phrases (e.g. 28/410 trigger sprayer, lotion pump OEM)',
    seoFieldCanonical: 'Preferred Canonical Domain URL (optional)',
    seoFieldRobots: 'Search Engine Indexing',
    seoFieldRobotsOn: 'Index & Follow All Pages (Recommended)',
    seoFieldRobotsOff: 'Noindex (Hide from search engines)',
    seoSocialCardHeading: 'OpenGraph & X Share Card',
    seoFieldOgTitle: 'Social Share Title',
    seoFieldOgDesc: 'Social Share Description',
    seoFieldOgImage: 'Social Share Preview Image (OG Image)',
    seoWebmastersHeading: 'Search Engine Webmaster Verification Codes',
    seoWebmastersSub:
      'Paste verification token codes from Search Console / Webmaster tools to verify site ownership automatically.',
    seoGoogleLabel: 'Google Search Console Token',
    seoBingLabel: 'Bing & Yahoo (msvalidate.01)',
    seoYandexLabel: 'Yandex Webmaster Token',
    seoBaiduLabel: 'Baidu Webmaster Token',
    seoChecklistTitle: 'All-Search-Engine Ranking Audit',
    seoSitemapHeading: 'Sitemap & Crawler Files',
    seoDownloadSitemapBtn: 'Download Live sitemap.xml',
    seoDownloadRobotsBtn: 'Download robots.txt',
  },
  es: {
    blogKicker: 'Diario de Fábrica · Ingeniería y Exportación',
    blogTitle: 'Notas Técnicas de Dosificación y Envases',
    blogSub:
      'Guías prácticas de nuestro taller de moldes en Yuyao, laboratorio de control de calidad y logística desde Puerto de Ningbo.',
    blogBackHome: 'Volver al resumen de fábrica',
    blogManageBtn: 'Gestionar en el Panel',
    blogSearchPlaceholder: 'Buscar artículos, 28/410, resorte 316, Pantone...',
    blogAllCategories: 'Todos los Temas',
    blogReadArticle: 'Leer artículo',
    blogBackToBlog: 'Todos los Artículos',
    blogPublishedOn: 'Publicado',
    blogByAuthor: 'Por',
    blogAskEngineerTitle: '¿Necesita pruebas de compatibilidad o muestras en sus botellas?',
    blogAskEngineerSub:
      'Solicite nuestra caja de 50 muestras surtidas desde Yuyao con opciones de acero 304 y 316.',
    blogAskEngineerBtn: 'Solicitar muestras técnicas',
    blogRelatedTitle: 'Más del Diario Industrial Yi Lai',
    blogEmptyTitle: 'No se encontraron artículos',
    blogEmptySub: 'Pruebe con otra palabra clave o cambie la categoría.',
    blogResetFilters: 'Restablecer filtros',
    blogCategoryNames: {
      Engineering: 'Ingeniería',
      Manufacturing: 'Manufactura',
      'Quality Control': 'Control de Calidad',
      'Packaging Trends': 'Tendencias de Envase',
      'Export & Logistics': 'Exportación y Logística',
    },

    dashKicker: 'Yi Lai Plastics · CMS de Planta',
    dashTitle: 'Panel de Productos y Artículos del Blog',
    dashSub:
      'Cree, edite, publique o elimine modelos dosificadores y artículos técnicos en tiempo real.',
    dashBackHome: 'Volver al sitio',
    dashViewProducts: 'Ver Página Productos',
    dashViewBlog: 'Ver Blog',
    dashSignInTitle: 'Iniciar Sesión en el Panel Administrativo',
    dashSignInSub:
      'Acceda con su cuenta autorizada de Google para gestionar el catálogo y el blog en Firestore.',
    dashSignInBtn: 'Entrar con Google',
    dashSignOutBtn: 'Cerrar sesión',
    dashUnauthorizedTitle: 'Acceso Administrativo Requerido',
    dashUnauthorizedSub:
      'Esta cuenta de Google no tiene permisos de edición. Inicie sesión con el correo autorizado de fábrica.',
    dashSignedInAs: 'Conectado como',
    dashTabProducts: 'Catálogo de Productos',
    dashTabBlog: 'Artículos del Blog',
    dashStatActiveProducts: 'Productos Activos',
    dashStatPublishedPosts: 'Artículos Publicados',
    dashStatDraftsArchived: 'Borradores / Archivados',
    dashStatCategories: 'Series Industriales',
    dashAddProduct: 'Agregar Producto',
    dashEditProduct: 'Editar Producto',
    dashAddPost: 'Nuevo Artículo',
    dashEditPost: 'Editar Artículo',
    dashRestoreDefaults: 'Sincronizar Base Inicial',
    dashSearchProducts: 'Buscar por modelo, rosca o dosis...',
    dashSearchPosts: 'Buscar artículos por título o autor...',
    dashAllSeries: 'Todas las Series',
    dashAllStatuses: 'Todos los Estados',
    dashStatusActive: 'Activo',
    dashStatusArchived: 'Archivado',
    dashStatusPublished: 'Publicado',
    dashStatusDraft: 'Borrador',
    dashEditBtn: 'Editar',
    dashDeleteBtn: 'Eliminar',
    dashConfirmDelete: 'Confirmar',
    dashCancelBtn: 'Cancelar',
    dashSaveProductBtn: 'Guardar Producto',
    dashSavePostBtn: 'Guardar Artículo',
    dashSaving: 'Guardando...',
    dashNoProducts: 'No hay productos con ese filtro.',
    dashNoPosts: 'No hay artículos con ese filtro.',

    fieldSeries: 'Serie de Fabricación',
    fieldModel: 'Código y Nombre del Modelo *',
    fieldSlug: 'Slug URL (letras, números, guiones)',
    fieldNeckFinish: 'Acabado de Rosca SPI *',
    fieldDosage: 'Dosis por Pulsación *',
    fieldClosureStyle: 'Estilo del Cierre',
    fieldSpringType: 'Resorte / Válvula',
    fieldMoq: 'Pedido Mínimo (MOQ)',
    fieldLeadTime: 'Tiempo de Entrega',
    fieldMaterials: 'Materiales y Resina',
    fieldApplications: 'Aplicaciones Recomendadas',
    fieldDescription: 'Descripción Técnica Completa *',
    fieldFeatures: 'Características Clave (una por línea)',
    fieldGallery: 'Galería de Imágenes (hasta 6 fotos)',
    fieldAddGalleryImage: 'Añadir Foto',
    fieldStatus: 'Estado de Publicación',
    fieldPresetSelect: 'Elegir foto del estudio/planta...',
    fieldCustomUrlPlaceholder: 'O pegar URL / ruta de imagen...',
    fieldImageCaptionPlaceholder: 'Descripción de foto...',

    fieldPostTitle: 'Título del Artículo *',
    fieldPostCategory: 'Categoría',
    fieldPostAuthor: 'Autor / Equipo',
    fieldPostReadTime: 'Tiempo de Lectura',
    fieldPostDate: 'Fecha de Publicación',
    fieldPostCoverImage: 'Imagen de Portada',
    fieldPostExcerpt: 'Resumen Corto *',
    fieldPostContent: 'Contenido Completo (líneas en blanco separan párrafos) *',
    fieldPostTags: 'Etiquetas (separadas por comas)',
    fieldUploadImage: 'Subir Foto',
    fieldUploadMultiple: 'Arrastre o haga clic para subir fotos',
    fieldUploading: 'Subiendo...',
    fieldDropHint: 'PNG, JPG, WebP hasta 12 MB · Optimización automática',
    fieldUploadInvalidType: 'Seleccione un archivo de imagen válido (PNG, JPG, WebP, GIF).',
    fieldUploadTooLarge: 'La imagen debe pesar 12 MB o menos.',
    fieldUploadFailed: 'No se pudo procesar la imagen seleccionada.',
    fieldImagePreviewAlt: 'Vista previa de imagen',
    fieldPostImagesHeading: 'Fotos del Artículo y Ubicación (Arriba / Medio / Abajo)',
    fieldUploadPostImages: 'Subir varias imágenes (arriba, medio, abajo)',
    fieldPlacementTop: 'Arriba',
    fieldPlacementMiddle: 'Medio',
    fieldPlacementBottom: 'Abajo',
    fieldPlacementAuto: 'Auto (Arriba → Medio → Abajo)',
    fieldSetAsCover: 'Usar Portada',
    dashTabSocial: 'Redes Sociales',
    socialSectionTitle: 'Redes Sociales Oficiales',
    socialSectionSub:
      'Guarde hasta 5 cuentas por plataforma en Facebook, Instagram, TikTok, YouTube, LinkedIn, X (Twitter), Snapchat, Pinterest y Gmail. Al publicar un nuevo producto o artículo, se adjuntarán automáticamente.',
    socialSaveBtn: 'Guardar Redes Sociales',
    socialSavedMsg: 'Enlaces sociales guardados y activos para nuevas publicaciones.',
    socialAutoAttachLabel: 'Redes Sociales Adjuntas Automáticamente',
    socialAutoAttachSub:
      'Todas sus cuentas sociales guardadas se añadirán automáticamente al publicar.',
    socialNoLinksYet: 'Aún no hay redes guardadas. Configúrelas en la pestaña Redes Sociales.',
    socialManageShortcut: 'Editar redes',
    socialAccountSlotLabel: 'Cuenta',
    socialGmailHint: 'Correo Gmail o enlace',
    dashTabSeo: 'SEO',
    seoSectionTitle: 'Centro de Posicionamiento SEO',
    seoSectionSub:
      'Optimice títulos, metadescripciones, palabras clave, tarjetas OpenGraph, datos estructurados Schema.org y verificación en Google, Bing, Yahoo, Yandex, DuckDuckGo y Baidu.',
    seoScoreLabel: 'Puntuación SEO',
    seoApplyRecommendedBtn: 'Aplicar SEO Recomendado',
    seoSaveBtn: 'Guardar y Publicar SEO',
    seoSavedMsg: 'Configuración SEO guardada y aplicada en vivo al sitio.',
    seoSerpPreviewTitle: 'Vista Previa en Resultados de Búsqueda',
    seoFieldTitle: 'Título SEO Principal *',
    seoFieldTitleHint: 'Recomendado: 30–60 caracteres',
    seoFieldDesc: 'Metadescripción *',
    seoFieldDescHint: 'Recomendado: 120–160 caracteres',
    seoFieldKeywords: 'Palabras Clave Objetivo (separadas por comas)',
    seoFieldKeywordsHint: 'Incluya 6–15 términos de búsqueda de compradores industriales',
    seoFieldCanonical: 'URL Canónica Preferida (opcional)',
    seoFieldRobots: 'Indexación en Buscadores',
    seoFieldRobotsOn: 'Indexar y Seguir Todas las Páginas (Recomendado)',
    seoFieldRobotsOff: 'Noindex (Ocultar de buscadores)',
    seoSocialCardHeading: 'Tarjeta Social OpenGraph y X',
    seoFieldOgTitle: 'Título para Redes Sociales',
    seoFieldOgDesc: 'Descripción para Redes Sociales',
    seoFieldOgImage: 'Imagen de Vista Previa (OG Image)',
    seoWebmastersHeading: 'Códigos de Verificación Webmaster',
    seoWebmastersSub:
      'Pegue los códigos de verificación de Google, Bing/Yahoo, Yandex o Baidu para validar la propiedad automáticamente.',
    seoGoogleLabel: 'Token Google Search Console',
    seoBingLabel: 'Token Bing y Yahoo (msvalidate.01)',
    seoYandexLabel: 'Token Yandex Webmaster',
    seoBaiduLabel: 'Token Baidu Webmaster',
    seoChecklistTitle: 'Auditoría para Todos los Buscadores',
    seoSitemapHeading: 'Archivos Sitemap y Rastreo',
    seoDownloadSitemapBtn: 'Descargar sitemap.xml en vivo',
    seoDownloadRobotsBtn: 'Descargar robots.txt',
  },
  ar: {
    blogKicker: 'مدونة المصنع · الهندسة والتصدير',
    blogTitle: 'مقالات هندسة الضخ وتعبئة العبوات',
    blogSub:
      'أدلة فنية من قسم القوالب في يوياو ومختبر فحص الجودة ومكتب الشحن البحري في نينغبو لمساعدة المشترين في اختيار البخاخات والمضخات.',
    blogBackHome: 'العودة إلى الرئيسية',
    blogManageBtn: 'إدارة من لوحة التحكم',
    blogSearchPlaceholder: 'ابحث في المقالات، مقاس 28/410، نابض 316، بانتون...',
    blogAllCategories: 'جميع المواضيع',
    blogReadArticle: 'اقرأ المقال',
    blogBackToBlog: 'جميع المقالات',
    blogPublishedOn: 'تاريخ النشر',
    blogByAuthor: 'بقلم',
    blogAskEngineerTitle: 'هل تحتاج إلى اختبار الملاءمة أو عينات مقاومة للمواد الكيميائية؟',
    blogAskEngineerSub:
      'اطلب باقة 50 عينة متنوعة مجاناً من مصنعنا في يوياو بخيارات نابض ستانلس 304 و 316.',
    blogAskEngineerBtn: 'اطلب عينات فنية',
    blogRelatedTitle: 'مقالات أخرى من مدونة Yi Lai',
    blogEmptyTitle: 'لا توجد مقالات مطابقة',
    blogEmptySub: 'جرّب كلمة بحث أخرى أو اختر تصنيفاً مختلفاً.',
    blogResetFilters: 'إعادة ضبط الفلاتر',
    blogCategoryNames: {
      Engineering: 'الهندسة والتصميم',
      Manufacturing: 'التصنيع والحقن',
      'Quality Control': 'ضبط الجودة',
      'Packaging Trends': 'اتجاهات التغليف',
      'Export & Logistics': 'التصدير واللوجستيات',
    },

    dashKicker: 'Yi Lai Plastics · نظام إدارة المصنع',
    dashTitle: 'لوحة التحكم في المنتجات والمقالات',
    dashSub:
      'أضف وعدّل وانشر أو احذف موديلات البخاخات والمضخات ومقالات المدونة مباشرة على الموقع.',
    dashBackHome: 'العودة للموقع',
    dashViewProducts: 'عرض صفحة المنتجات',
    dashViewBlog: 'عرض صفحة المدونة',
    dashSignInTitle: 'تسجيل الدخول إلى لوحة تحكم المصنع',
    dashSignInSub:
      'استخدم حساب Google المصرح به لإدارة كتالوج المنتجات ومقالات المدونة المحفوظة في Firestore.',
    dashSignInBtn: 'تسجيل الدخول عبر Google',
    dashSignOutBtn: 'تسجيل الخروج',
    dashUnauthorizedTitle: 'مطلوب صلاحية المسؤول',
    dashUnauthorizedSub:
      'هذا الحساب لا يملك صلاحية التعديل. يرجى تسجيل الدخول ببريد مدير المصنع المصرح به.',
    dashSignedInAs: 'مسجل الدخول باسم',
    dashTabProducts: 'إدارة المنتجات',
    dashTabBlog: 'مقالات المدونة',
    dashStatActiveProducts: 'المنتجات النشطة',
    dashStatPublishedPosts: 'المقالات المنشورة',
    dashStatDraftsArchived: 'المسودات والمؤرشفة',
    dashStatCategories: 'فئات التصنيع',
    dashAddProduct: 'إضافة منتج جديد',
    dashEditProduct: 'تعديل بيانات المنتج',
    dashAddPost: 'إضافة مقال جديد',
    dashEditPost: 'تعديل المقال',
    dashRestoreDefaults: 'مزامنة الكتالوج الأساسي',
    dashSearchProducts: 'ابحث برقم الموديل أو العنق أو الجرعة...',
    dashSearchPosts: 'ابحث بالعنوان أو اسم الكاتب...',
    dashAllSeries: 'جميع الفئات',
    dashAllStatuses: 'جميع الحالات',
    dashStatusActive: 'نشط',
    dashStatusArchived: 'مؤرشف',
    dashStatusPublished: 'منشور',
    dashStatusDraft: 'مسودة',
    dashEditBtn: 'تعديل',
    dashDeleteBtn: 'حذف',
    dashConfirmDelete: 'تأكيد الحذف',
    dashCancelBtn: 'إلغاء',
    dashSaveProductBtn: 'حفظ المنتج',
    dashSavePostBtn: 'حفظ المقال',
    dashSaving: 'جارٍ الحفظ...',
    dashNoProducts: 'لا توجد منتجات مطابقة للتصفية.',
    dashNoPosts: 'لا توجد مقالات مطابقة للتصفية.',

    fieldSeries: 'السلسلة التصنيعية',
    fieldModel: 'رمز واسم الموديل *',
    fieldSlug: 'الرابط المختصر Slug',
    fieldNeckFinish: 'مقاس عنق العبوة SPI *',
    fieldDosage: 'معدل الضخ لكل ضغطة *',
    fieldClosureStyle: 'شكل وتصميم الغطاء',
    fieldSpringType: 'نظام النابض / الصمام',
    fieldMoq: 'الحد الأدنى للطلب MOQ',
    fieldLeadTime: 'مدة التصنيع',
    fieldMaterials: 'الخامات وجودة التصنيع',
    fieldApplications: 'الاستخدامات الموصى بها',
    fieldDescription: 'الوصف الهندسي الكامل *',
    fieldFeatures: 'أبرز المزايا (ميزة في كل سطر)',
    fieldGallery: 'معرض صور المنتج (حتى 6 صور)',
    fieldAddGalleryImage: 'إضافة صورة',
    fieldStatus: 'حالة الظهور',
    fieldPresetSelect: 'اختر من صور الاستوديو والمصنع...',
    fieldCustomUrlPlaceholder: 'أو الصق رابط صورة مخصص...',
    fieldImageCaptionPlaceholder: 'وصف الصورة...',

    fieldPostTitle: 'عنوان المقال *',
    fieldPostCategory: 'التصنيف',
    fieldPostAuthor: 'اسم الكاتب أو القسم',
    fieldPostReadTime: 'وقت القراءة',
    fieldPostDate: 'تاريخ النشر',
    fieldPostCoverImage: 'صورة الغلاف',
    fieldPostExcerpt: 'ملخص قصير للمقال *',
    fieldPostContent: 'نص المقال الكامل (اترك سطراً فارغاً بين الفقرات) *',
    fieldPostTags: 'الوسوم (مفصولة بفاصلة)',
    fieldUploadImage: 'رفع صورة',
    fieldUploadMultiple: 'اسحب الصور هنا أو اضغط للرفع',
    fieldUploading: 'جارٍ الرفع...',
    fieldDropHint: 'PNG, JPG, WebP حتى 12 ميجابايت · تحسين تلقائي',
    fieldUploadInvalidType: 'يرجى اختيار ملف صورة صالح (PNG, JPG, WebP, GIF).',
    fieldUploadTooLarge: 'يجب ألا يتجاوز حجم الصورة 12 ميجابايت.',
    fieldUploadFailed: 'تعذّر معالجة ملف الصورة المحدد.',
    fieldImagePreviewAlt: 'معاينة الصورة',
    fieldPostImagesHeading: 'صور المقال وتوزيعها (أعلى / وسط / أسفل المقال)',
    fieldUploadPostImages: 'رفع عدة صور (أعلى، وسط، أسفل)',
    fieldPlacementTop: 'أعلى المقال',
    fieldPlacementMiddle: 'وسط المقال',
    fieldPlacementBottom: 'أسفل المقال',
    fieldPlacementAuto: 'توزيع تلقائي (أعلى ← وسط ← أسفل)',
    fieldSetAsCover: 'تعيين كغلاف',
    dashTabSocial: 'روابط التواصل الاجتماعي',
    socialSectionTitle: 'روابط حسابات التواصل الاجتماعي',
    socialSectionSub:
      'احفظ حتى 5 حسابات لكل منصة عبر Facebook و Instagram و TikTok و YouTube و LinkedIn و X (Twitter) و Snapchat و Pinterest و Gmail، وسيتم إضافتها تلقائياً مع كل منتج أو مقال جديد.',
    socialSaveBtn: 'حفظ روابط التواصل',
    socialSavedMsg: 'تم حفظ روابط التواصل وهي مفعّلة للمنتجات والمقالات الجديدة.',
    socialAutoAttachLabel: 'روابط التواصل المرفقة تلقائياً',
    socialAutoAttachSub:
      'سيتم إرفاق جميع الحسابات المحفوظة تلقائياً عند النشر.',
    socialNoLinksYet: 'لم يتم حفظ روابط تواصل بعد. أضفها من تبويب روابط التواصل الاجتماعي.',
    socialManageShortcut: 'تعديل الروابط',
    socialAccountSlotLabel: 'حساب',
    socialGmailHint: 'أدخل بريد Gmail أو رابط',
    dashTabSeo: 'SEO',
    seoSectionTitle: 'مركز تحسين محركات البحث (SEO)',
    seoSectionSub:
      'حسّن العناوين والأوصاف التعريفية والكلمات المفتاحية وبطاقات المشاركة والبيانات المهيكلة Schema.org ورموز التحقق لتصدّر نتائج Google و Bing و Yahoo و Yandex و Baidu.',
    seoScoreLabel: 'نقاط قوة السيو',
    seoApplyRecommendedBtn: 'تطبيق إعدادات السيو المقترحة',
    seoSaveBtn: 'حفظ ونشر السيو',
    seoSavedMsg: 'تم حفظ إعدادات السيو وتطبيقها مباشرة على الموقع.',
    seoSerpPreviewTitle: 'معاينة النتيجة في محركات البحث',
    seoFieldTitle: 'العنوان التعريفي الرئيسي *',
    seoFieldTitleHint: 'الموصى به: 30 إلى 60 حرفاً',
    seoFieldDesc: 'الوصف التعريفي (Meta Description) *',
    seoFieldDescHint: 'الموصى به: 120 إلى 160 حرفاً',
    seoFieldKeywords: 'الكلمات المفتاحية المستهدفة (مفصولة بفاصلة)',
    seoFieldKeywordsHint: 'أضف من 6 إلى 15 عبارة بحث تجارية يستخدمها المستوردون',
    seoFieldCanonical: 'الرابط الأساسي Canonical URL (اختياري)',
    seoFieldRobots: 'الأرشفة في محركات البحث',
    seoFieldRobotsOn: 'أرشفة ومتابعة جميع الصفحات (موصى به)',
    seoFieldRobotsOff: 'عدم الأرشفة (Noindex)',
    seoSocialCardHeading: 'بطاقة المشاركة OpenGraph و X',
    seoFieldOgTitle: 'عنوان المشاركة الاجتماعية',
    seoFieldOgDesc: 'وصف المشاركة الاجتماعية',
    seoFieldOgImage: 'صورة المشاركة الاجتماعية (OG Image)',
    seoWebmastersHeading: 'رموز توثيق أدوات مشرفي المواقع',
    seoWebmastersSub:
      'أدخل رموز التحقق من Google Search Console و Bing و Yandex و Baidu لتأكيد الملكية تلقائياً.',
    seoGoogleLabel: 'رمز Google Search Console',
    seoBingLabel: 'رمز Bing و Yahoo (msvalidate.01)',
    seoYandexLabel: 'رمز Yandex Webmaster',
    seoBaiduLabel: 'رمز Baidu Webmaster',
    seoChecklistTitle: 'فحص الترتيب عبر جميع المحركات',
    seoSitemapHeading: 'ملفات خريطة الموقع والزحف',
    seoDownloadSitemapBtn: 'تحميل sitemap.xml المحدّث',
    seoDownloadRobotsBtn: 'تحميل robots.txt',
  },
};

export function getCmsStrings(lang: LanguageCode): CmsStrings {
  return CMS_STRINGS[lang];
}
