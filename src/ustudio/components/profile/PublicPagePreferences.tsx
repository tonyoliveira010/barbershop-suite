// @ts-nocheck -- ported app uses browser-only state
import React, { useRef } from 'react';
import { Image, LayoutGrid, List, LockKeyhole, Play, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';

type Position = 'above-tabs' | 'below-categories';

const PositionSelector: React.FC<{ value: Position; onChange: (value: Position) => void }> = ({ value, onChange }) => (
  <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#0d0d0d] p-1" role="radiogroup" aria-label="Posição na página pública">
    {[
      { value: 'above-tabs', label: 'Acima das abas' },
      { value: 'below-categories', label: 'Abaixo das categorias' },
    ].map((option) => (
      <button
        key={option.value}
        type="button"
        role="radio"
        aria-checked={value === option.value}
        onClick={() => onChange(option.value as Position)}
        className={`min-h-9 rounded-lg px-2 text-[10px] font-semibold transition-colors ${value === option.value ? 'bg-white text-black' : 'text-white/45 hover:text-white'}`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

const UpgradeBadge = () => (
  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-1 text-[10px] font-bold text-amber-300">
    <LockKeyhole className="h-3 w-3" /> Upgrade R$ 7,90
  </span>
);

export const PublicPagePreferences: React.FC = () => {
  const { profile, saveProfile, showToast } = useApp();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const serviceDisplay = profile.serviceDisplay || 'list';
  const overlayHeight = profile.coverOverlayHeight ?? 70;
  const overlayIntensity = profile.coverOverlayIntensity ?? 50;

  const explainUpgrade = () => showToast('Recurso disponível no upgrade de R$ 7,90');

  return (
    <section className="space-y-3 px-5">
      <div>
        <h3 className="text-sm font-bold text-white">Exibição da página pública</h3>
        <p className="text-xs text-white/45">Escolha como os serviços e a capa aparecem.</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-[#141414] p-4">
        <div>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/45">Formato dos serviços</span>
          <div className="grid grid-cols-2 gap-2" role="radiogroup">
            {[
              { value: 'cards', label: 'Cards', icon: LayoutGrid },
              { value: 'list', label: 'Lista com foto', icon: List },
            ].map((option) => {
              const Icon = option.icon;
              const selected = serviceDisplay === option.value;
              return (
                <button key={option.value} type="button" role="radio" aria-checked={selected} onClick={() => saveProfile({ serviceDisplay: option.value })} className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-colors ${selected ? 'border-white bg-white text-black' : 'border-white/10 bg-[#0d0d0d] text-white/60 hover:text-white'}`}>
                  <Icon className="h-4 w-4" /> {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <b className="block text-xs text-white">Overlay da capa</b>
              <span className="text-[11px] text-white/40">Melhora a leitura sobre fotos e vídeos.</span>
            </div>
            <Image className="h-4 w-4 text-white/35" />
          </div>
          <label className="mb-3 block">
            <span className="mb-1.5 flex justify-between text-[11px] text-white/60"><span>Altura</span><b className="text-white">{overlayHeight}%</b></span>
            <input type="range" min="25" max="100" step="5" value={overlayHeight} onChange={(event) => saveProfile({ coverOverlayHeight: Number(event.target.value) })} className="w-full accent-[#ff5f8a]" />
          </label>
          <label className="block">
            <span className="mb-1.5 flex justify-between text-[11px] text-white/60"><span>Intensidade</span><b className="text-white">{overlayIntensity}%</b></span>
            <input type="range" min="10" max="90" step="5" value={overlayIntensity} onChange={(event) => saveProfile({ coverOverlayIntensity: Number(event.target.value) })} className="w-full accent-[#ff5f8a]" />
          </label>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-white">Conteúdo promocional</h3>
          <UpgradeBadge />
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141414] p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <b className="text-sm text-white">Banners promocionais</b>
              <p className="mt-0.5 text-[11px] leading-relaxed text-white/45">Destaque ofertas e novidades na sua página.</p>
            </div>
            <LockKeyhole className="h-4 w-4 text-amber-300" />
          </div>
          <div className="mb-3 flex h-20 items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#ff5f8a] to-[#8f0d24] p-3 opacity-55">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/20"><Image className="h-4 w-4" /></span>
            <div><b className="block text-xs text-white">Sua promoção aqui</b><span className="text-[10px] text-white/70">Banner disponível no upgrade</span></div>
          </div>
          <PositionSelector value={profile.bannerPosition || 'above-tabs'} onChange={(bannerPosition) => saveProfile({ bannerPosition })} />
          <button type="button" onClick={explainUpgrade} className="mt-3 w-full rounded-full border border-amber-400/25 bg-amber-400/10 py-2.5 text-xs font-bold text-amber-300">Conhecer upgrade por R$ 7,90</button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#141414] p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <b className="text-sm text-white">Carrossel de vídeos</b>
              <p className="mt-0.5 text-[11px] leading-relaxed text-white/45">Vídeos verticais para mostrar cortes e resultados.</p>
            </div>
            <UpgradeBadge />
          </div>
          <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
            {[0, 1].map((item) => (
              <div key={item} className="relative h-[300px] w-[200px] flex-none overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/30"><Play className="h-7 w-7" /><span className="text-[10px]">200 × 300</span></div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/35"><LockKeyhole className="h-5 w-5 text-white/70" /></div>
              </div>
            ))}
          </div>
          <PositionSelector value={profile.videoCarouselPosition || 'below-categories'} onChange={(videoCarouselPosition) => saveProfile({ videoCarouselPosition })} />
          <input ref={videoInputRef} type="file" accept="video/*" multiple className="hidden" disabled />
          <button type="button" onClick={explainUpgrade} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 py-2.5 text-xs font-bold text-amber-300"><Upload className="h-3.5 w-3.5" /> Liberar envio de vídeos</button>
        </div>
      </div>
    </section>
  );
};