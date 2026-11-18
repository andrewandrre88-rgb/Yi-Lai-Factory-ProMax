import { useRef, useState, useEffect, PointerEvent } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LanguageCode } from '../data/factoryData';
import { getAppStrings } from '../data/translations';

interface SprayRevealOfferProps {
  lang: LanguageCode;
  onClaimOffer: (offerNote: string) => void;
}

export function SprayRevealOffer({ lang, onClaimOffer }: SprayRevealOfferProps) {
  const s = getAppStrings(lang);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpraying, setIsSpraying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const strokesRef = useRef(0);

  useEffect(() => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paintMistCard = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = 520;
      const height = 240;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Paint frosted mist cover
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#DCE7FA');
      grad.addColorStop(1, '#C5D8F8');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.direction = lang === 'ar' ? 'rtl' : 'ltr';
      ctx.fillStyle = '#0B1B3E';
      ctx.font =
        lang === 'ar'
          ? '800 22px "Cairo", sans-serif'
          : '800 21px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.offerCanvasHeadline, width / 2, height / 2 - 8);

      ctx.fillStyle = '#334155';
      ctx.font =
        lang === 'ar' ? '600 14px "Cairo", sans-serif' : '500 13px "DM Sans", sans-serif';
      ctx.fillText(s.offerCanvasSub, width / 2, height / 2 + 20);
    };

    paintMistCard();
    document.fonts?.ready.then(() => {
      if (!revealed) paintMistCard();
    });
  }, [lang, revealed, s.offerCanvasHeadline, s.offerCanvasSub]);

  const eraseAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = 520 / rect.width;
    const scaleY = 240 / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 6; i++) {
      const ox = (Math.random() - 0.5) * 44;
      const oy = (Math.random() - 0.5) * 44;
      const r = 12 + Math.random() * 18;
      ctx.beginPath();
      ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    strokesRef.current += 1;
    if (strokesRef.current > 28) {
      setRevealed(true);
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    setIsSpraying(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    eraseAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!isSpraying) return;
    eraseAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsSpraying(false);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F6F9FE]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#081534] via-[#0B1E49] to-[#112A63] text-white p-7 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wider text-[#FF7A80] uppercase">
                {s.offerKicker}
              </p>
              <h2 className="mt-2 font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight text-balance">
                {s.offerTitle}
              </h2>
              <p className="mt-3 text-sm text-blue-100/85 leading-relaxed">
                {s.offerSub}
              </p>
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="mt-5 text-xs font-semibold text-blue-200 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                {s.offerRevealInstant}
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden bg-white text-[#0B1B3E] h-[230px] sm:h-[240px] shadow-inner border border-blue-200/40">
                {/* Underlying Welcome Sample Offer */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center items-start bg-gradient-to-br from-white to-blue-50">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E1262D] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>{s.offerBadge}</span>
                  </div>
                  <h3 className="mt-2 font-display font-extrabold text-xl sm:text-2xl text-[#0B1B3E]">
                    {s.offerOfferTitle}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md">
                    {s.offerOfferDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => onClaimOffer(s.offerOfferTitle)}
                    className="mt-4 inline-flex items-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    <span>{s.offerClaimBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>

                {/* Interactive Spray-Off Canvas Overlay */}
                {!revealed && (
                  <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                    aria-label={s.offerTitle}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
