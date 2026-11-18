import { useState, useEffect, FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { LanguageCode } from '../data/factoryData';
import { getAppStrings, getLocalizedCategories } from '../data/translations';

export interface QuotePrefill {
  product: string;
  requirements: string;
  country?: string;
}

interface QuoteSectionProps {
  lang: LanguageCode;
  prefill: QuotePrefill | null;
}

export function QuoteSection({ lang, prefill }: QuoteSectionProps) {
  const s = getAppStrings(lang);
  const categories = getLocalizedCategories(lang);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [productId, setProductId] = useState<string>('trigger-sprayers');
  const [quantity, setQuantity] = useState('50,000');
  const [requirements, setRequirements] = useState('');
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!prefill) return;
    if (prefill.product) {
      if (prefill.product === 'custom-sample-pack' || prefill.product === 'Custom Multi-Product Sample Pack') {
        setProductId('custom-sample-pack');
      } else {
        const byIdOrName = categories.find(
          (c) =>
            c.id === prefill.product ||
            c.name.toLowerCase() === prefill.product.toLowerCase() ||
            prefill.product.toLowerCase().includes(c.id.split('-')[0])
        );
        setProductId(byIdOrName ? byIdOrName.id : 'trigger-sprayers');
      }
    }
    if (prefill.requirements) setRequirements(prefill.requirements);
    if (prefill.country) setCountry(prefill.country);
    setSubmittedRef(null);
  }, [prefill]);

  const selectedProductLabel =
    productId === 'custom-sample-pack'
      ? s.quoteCustomSamplePack
      : categories.find((c) => c.id === productId)?.name ?? categories[0].name;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !company.trim() || !email.trim()) {
      setError(s.quoteErrRequired);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError(s.quoteErrEmail);
      return;
    }

    const refCode = `YL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refCode);
  };

  return (
    <section id="quote" className="py-16 sm:py-24 bg-[#F6F9FE]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Direct Factory Info */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
              {s.quoteKicker}
            </p>
            <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight leading-[1.15] text-balance">
              {s.quoteTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {s.quoteSub}
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {s.quoteEmailLabel}
                  </p>
                  <a
                    href="mailto:yilaiplastics@gmail.com"
                    className="text-sm font-bold text-[#0B1B3E] hover:text-[#155EEF] transition-colors"
                  >
                    yilaiplastics@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E1262D] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {s.quotePhoneLabel}
                  </p>
                  <p dir="ltr" className="text-sm font-bold font-mono text-[#0B1B3E]">
                    +86 138 0584 2910
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {s.quoteAddressLabel}
                  </p>
                  <p className="text-sm font-bold text-[#0B1B3E]">
                    {s.quoteAddressValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-9 shadow-sm">
              {submittedRef ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <p className="font-mono text-xs font-semibold text-[#155EEF]">
                    {s.quoteRefLabel} · {submittedRef}
                  </p>
                  <h3 className="font-display font-extrabold text-2xl text-[#0B1B3E]">
                    {s.quoteReceivedTitle}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {s.quoteThankYou1} <strong>{name}</strong> ({company}). {s.quoteThankYou2}{' '}
                    <strong>{quantity}</strong> ({selectedProductLabel}) {s.quoteThankYou3}{' '}
                    <span dir="ltr" className="font-mono text-[#0B1B3E]">{email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedRef(null)}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#155EEF] hover:underline cursor-pointer"
                  >
                    {s.quoteSubmitAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="rfq-name" className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                        {s.quoteFieldName}
                      </label>
                      <input
                        id="rfq-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={s.quotePlaceholderName}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-4 py-2.5 text-sm text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="rfq-company" className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                        {s.quoteFieldCompany}
                      </label>
                      <input
                        id="rfq-company"
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={s.quotePlaceholderCompany}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-4 py-2.5 text-sm text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="rfq-email" className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                        {s.quoteFieldEmail}
                      </label>
                      <input
                        id="rfq-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={s.quotePlaceholderEmail}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-4 py-2.5 text-sm text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="rfq-country" className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                        {s.quoteFieldCountry}
                      </label>
                      <input
                        id="rfq-country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder={s.quotePlaceholderCountry}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-4 py-2.5 text-sm text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="rfq-product" className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                        {s.quoteFieldProduct}
                      </label>
                      <select
                        id="rfq-product"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-4 py-2.5 text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                        <option value="custom-sample-pack">
                          {s.quoteCustomSamplePack}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="rfq-qty" className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                        {s.quoteFieldQty}
                      </label>
                      <input
                        id="rfq-qty"
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder={s.quotePlaceholderQty}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-4 py-2.5 text-sm font-mono tabular-nums text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rfq-req" className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                      {s.quoteFieldReq}
                    </label>
                    <textarea
                      id="rfq-req"
                      rows={3}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder={s.quotePlaceholderReq}
                      className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-4 py-3 text-sm text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors resize-y"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-semibold text-[#E1262D]">
                      {error}
                    </p>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">
                      {s.quoteDirectNote}
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer shadow-sm"
                    >
                      <span>{s.quoteSendBtn}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
