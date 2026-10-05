// @ts-nocheck -- ported app uses browser-only state
import React, { useRef, useState } from 'react';
import { ChevronRight, Image, LockKeyhole, Play, Upload, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

type Editor = 'banners' | 'videos' | null;

const PositionSelector = ({ value, onChange }) => (
  <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#0d0d0d] p-1">
    {[['above-tabs', 'Acima das abas'], ['below-categories', 'Abaixo das categorias']].map(([option, label]) => (
      <button key={option} type="button" onClick={() => onChange(option)} className={`min-h-9 rounded-lg px-2 text-[10px] font-semibold ${value === option ? 'bg-white text-black' : 'text-white/45'}`}>{label}</button>
    ))}
  </div>
);

const UpgradeBadge = () => <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-1 text-[10px] font-bold text-amber-300"><LockKeyhole className="h-3 w-3" /> R$ 7,90</span>;

export const PublicPagePreferences: React.FC = () => {
  const { profile, saveProfile, setIsBannerModalOpen, showToast } = useApp();
  const [editor, setEditor] = useState<Editor>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videos = profile.promoVideos || [];

  const addVideos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).slice(0, Math.max(0, 4 - videos.length));
    if (!files.length) return;
    if (files.some((file) => file.size > 700 * 1024)) {
      showToast('Cada vídeo deve ter até 700 KB para ser salvo neste aparelho');
      return;
    }
    Promise.all(files.map((file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ id: `v_${Date.now()}_${file.name}`, url: reader.result, name: file.name });
      reader.readAsDataURL(file);
    }))).then((items) => saveProfile({ promoVideos: [...videos, ...items] }));
  };

  const cards = [
    { id: 'banners', title: 'Banners promocionais', detail: 'Imagem, texto e posição individual', icon: Image, premium: true },
    { id: 'videos', title: 'Carrossel de vídeos', detail: `${videos.length} de 4 vídeos · formato 200 × 300`, icon: Play, premium: true },
  ];

  return (
    <section className="px-5 space-y-2.5">
      <div className="flex items-baseline justify-between"><h3 className="text-sm font-bold text-white">Personalizar página pública</h3><span className="text-xs text-white/40">Toque para editar</span></div>
      {cards.map((card) => {
        const Icon = card.icon;
        return <button key={card.id} type="button" onClick={() => card.id === 'banners' ? setIsBannerModalOpen(true) : setEditor(card.id as Editor)} className="flex w-full items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-[#141414] p-3.5 text-left hover:border-white/15 hover:bg-[#1a1a1a]">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/70"><Icon className="h-3.5 w-3.5" /></span>
          <span className="min-w-0 flex-1"><span className="flex items-center gap-2"><b className="truncate text-xs text-white">{card.title}</b>{card.premium && <UpgradeBadge />}</span><span className="mt-0.5 block truncate text-[11.5px] text-white/45">{card.detail}</span></span>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" />
        </button>;
      })}

      {editor && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 sm:items-center sm:p-4" onClick={() => setEditor(null)}>
        <div className="max-h-[90vh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl border border-white/15 bg-[#161616] p-5 sm:rounded-3xl" onClick={(event) => event.stopPropagation()}>
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3.5">
            <div><h3 className="text-base font-bold text-white">Carrossel de vídeos</h3>{editor === 'videos' && <div className="mt-1"><UpgradeBadge /></div>}</div>
            <button type="button" onClick={() => setEditor(null)} aria-label="Fechar" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#262626] text-white/70"><X className="h-4 w-4" /></button>
          </div>

          {editor === 'videos' && <div className="space-y-4">
            <div className="no-scrollbar flex gap-2 overflow-x-auto">{videos.length ? videos.map((video) => <div key={video.id} className="relative h-[300px] w-[200px] flex-none overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]"><video src={video.url} muted controls className="h-full w-full object-cover" /><button type="button" onClick={() => saveProfile({ promoVideos: videos.filter((item) => item.id !== video.id) })} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"><X className="h-3.5 w-3.5" /></button></div>) : <div className="flex h-[300px] w-[200px] flex-none flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-[#0d0d0d] text-white/35"><Play className="h-7 w-7" /><span className="text-[10px]">200 × 300</span></div>}</div>
            <PositionSelector value={profile.videoCarouselPosition || 'below-categories'} onChange={(videoCarouselPosition) => saveProfile({ videoCarouselPosition })} />
            <input ref={inputRef} type="file" accept="video/*" multiple className="hidden" onChange={addVideos} />
            <button type="button" onClick={() => inputRef.current?.click()} className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-xs font-bold text-black"><Upload className="h-4 w-4" /> Enviar vídeos</button>
            <p className="text-center text-[10px] text-white/35">Demonstração local do recurso premium · até 4 vídeos de 700 KB</p>
          </div>}
        </div>
      </div>}
    </section>
  );
};
