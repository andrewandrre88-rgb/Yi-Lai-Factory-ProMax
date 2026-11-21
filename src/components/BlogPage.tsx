import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  LayoutDashboard,
  Search,
  Tag,
  User,
} from 'lucide-react';
import { LanguageCode } from '../data/factoryData';
import { BLOG_CATEGORIES, BlogCategory, BlogPost } from '../data/blogData';
import { getCmsStrings } from '../data/cmsTranslations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinksBar, SocialMediaLinks } from './SocialLinksBar';
import { hasAnySocialLink } from '../services/cmsService';
import { FormattedRichContent, toPlainSummary } from '../utils/richText';

interface BlogPageProps {
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  posts: BlogPost[];
  globalSocialLinks?: SocialMediaLinks;
  selectedPostSlug: string | null;
  onSelectPost: (slug: string | null) => void;
  onBackHome: () => void;
  onOpenDashboard: () => void;
  onRequestSamples: (topicNote: string) => void;
}

export function BlogPage({
  lang,
  onChangeLang,
  posts,
  globalSocialLinks,
  selectedPostSlug,
  onSelectPost,
  onBackHome,
  onOpenDashboard,
  onRequestSamples,
}: BlogPageProps) {
  const s = getCmsStrings(lang);
  const [selectedCategory, setSelectedCategory] = useState<'all' | BlogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const publishedPosts = posts.filter((p) => p.status === 'published');
  const activePost = selectedPostSlug
    ? publishedPosts.find((p) => p.slug === selectedPostSlug || p.id === selectedPostSlug) ?? null
    : null;

  if (activePost) {
    const relatedPosts = publishedPosts
      .filter((p) => p.id !== activePost.id)
      .slice(0, 3);

    return (
      <div className="bg-[#F6F9FE] min-h-screen pb-20">
        {/* Top Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
              <button
                type="button"
                onClick={() => onSelectPost(null)}
                className="inline-flex items-center gap-1.5 font-semibold text-[#0B1B3E] hover:text-[#155EEF] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{s.blogBackToBlog}</span>
              </button>
              <span aria-hidden="true">/</span>
              <span className="text-[#E1262D] font-semibold">
                {s.blogCategoryNames[activePost.category] ?? activePost.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
              <button
                type="button"
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155EEF] hover:text-[#0B1B3E] transition-colors cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{s.blogManageBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full Article Layout */}
        <article className="max-w-[920px] mx-auto px-5 sm:px-8 pt-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
              {s.blogCategoryNames[activePost.category] ?? activePost.category}
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0B1B3E] tracking-tight leading-[1.15] text-balance">
              {activePost.title}
            </h1>
            <FormattedRichContent text={activePost.excerpt} variant="excerpt" />

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#0B1B3E]">
                <User className="w-4 h-4 text-[#155EEF]" />
                {s.blogByAuthor} {activePost.authorName}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                <Calendar className="w-4 h-4 text-[#155EEF]" />
                {s.blogPublishedOn}: {activePost.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Clock className="w-4 h-4 text-[#155EEF]" />
                {activePost.readTime}
              </span>
            </div>
          </div>

          <div className="mt-8 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm aspect-[16/9]">
            <img
              src={activePost.coverImage}
              alt={activePost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-5">
            <FormattedRichContent text={activePost.content} variant="article" />

            {activePost.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                {activePost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-[#F8FAFE] border border-slate-200 text-xs font-medium text-[#0B1B3E]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6">
            <SocialLinksBar
              links={
                hasAnySocialLink(activePost.socialLinks)
                  ? activePost.socialLinks
                  : globalSocialLinks
              }
              lang={lang}
            />
          </div>

          {/* Engineering Sample CTA */}
          <div className="mt-8 rounded-3xl bg-[#081534] text-white p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">
                {s.blogAskEngineerTitle}
              </h2>
              <p className="mt-1.5 text-sm text-blue-100/80 max-w-xl">
                {s.blogAskEngineerSub}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRequestSamples(`Blog Article Inquiry: ${activePost.title}`)}
              className="inline-flex items-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{s.blogAskEngineerBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="max-w-[1100px] mx-auto px-5 sm:px-8 mt-14 pt-10 border-t border-slate-200">
            <h2 className="font-display font-extrabold text-2xl text-[#0B1B3E] tracking-tight">
              {s.blogRelatedTitle}
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => {
                    onSelectPost(rel.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group text-start bg-white rounded-2xl border border-slate-200/90 hover:border-[#155EEF] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#E1262D]">
                        {s.blogCategoryNames[rel.category] ?? rel.category}
                      </p>
                      <h3 className="mt-1 font-display font-bold text-base text-[#0B1B3E] group-hover:text-[#155EEF] transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                    </div>
                    <p className="mt-3 font-mono text-xs text-slate-400">
                      {rel.publishedAt} · {rel.readTime}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  const q = searchQuery.trim().toLowerCase();
  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-[#F6F9FE] min-h-screen pb-20">
      {/* Page Hero */}
      <section className="bg-gradient-to-b from-white to-[#EEF4FD] border-b border-slate-200/80 pt-8 pb-12">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#155EEF] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{s.blogBackHome}</span>
            </button>

            <div className="flex flex-wrap items-center gap-4">
              <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
              <button
                type="button"
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] transition-colors cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{s.blogManageBtn}</span>
              </button>
            </div>
          </div>

          <div className="mt-7 max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
              {s.blogKicker}
            </p>
            <h1 className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-[#0B1B3E] tracking-tight text-balance">
              {s.blogTitle}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {s.blogSub}
            </p>
          </div>

          {/* Search & Category Controls */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={s.blogSearchPlaceholder}
                  aria-label={s.blogSearchPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] ps-10 pe-4 py-2.5 text-sm text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2" role="tablist" aria-label={s.blogKicker}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'all'}
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                    selectedCategory === 'all'
                      ? 'bg-[#0B1B3E] text-white border-[#0B1B3E]'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#155EEF]'
                  }`}
                >
                  {s.blogAllCategories} ({publishedPosts.length})
                </button>
                {BLOG_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer border whitespace-nowrap ${
                        active
                          ? 'bg-[#0B1B3E] text-white border-[#0B1B3E]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-[#155EEF]'
                      }`}
                    >
                      {s.blogCategoryNames[cat] ?? cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="mt-4 font-display font-bold text-xl text-[#0B1B3E]">
              {s.blogEmptyTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {s.blogEmptySub}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex items-center gap-2 bg-[#155EEF] text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer"
            >
              {s.blogResetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.2) }}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#155EEF]/60 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPost(post.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden border-b border-slate-100 block cursor-pointer text-start"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-[#E1262D]">
                        {s.blogCategoryNames[post.category] ?? post.category}
                      </span>
                      <span className="font-mono text-slate-400 tabular-nums">
                        {post.publishedAt}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectPost(post.slug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="mt-2 font-display font-extrabold text-xl text-[#0B1B3E] group-hover:text-[#155EEF] transition-colors text-start leading-snug cursor-pointer"
                    >
                      {post.title}
                    </button>

                    <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {toPlainSummary(post.excerpt)}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-slate-500">
                    {post.readTime}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPost(post.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] transition-colors cursor-pointer"
                  >
                    <span>{s.blogReadArticle}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
