// @ts-nocheck -- ported app uses browser-only state
import React, { useState } from 'react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, Scissors, Store, TrendingUp } from 'lucide-react';

const steps = [
  {
    kicker: 'Comece por aqui',
    title: 'Sua barbearia em um só lugar',
    text: 'Organize a vitrine, a agenda e o movimento do dia direto pelo celular.',
    icon: Scissors,
    points: ['Apresente cortes, barba e produtos', 'Receba pedidos de horário pelo seu link'],
  },
  {
    kicker: 'Vitrine pública',
    title: 'Mostre seu trabalho',
    text: 'Monte uma página clara para o cliente conhecer seus serviços antes de agendar.',
    icon: Store,
    points: ['Escolha o formato dos serviços', 'Personalize capa, contatos e localização'],
  },
  {
    kicker: 'Agenda',
    title: 'Tenha o dia sob controle',
    text: 'Veja os próximos clientes, horários livres e detalhes de cada atendimento.',
    icon: CalendarDays,
    points: ['Acompanhe a fila de hoje', 'Reagende ou bloqueie horários rapidamente'],
  },
  {
    kicker: 'Resultados',
    title: 'Entenda o seu movimento',
    text: 'Acompanhe atendimentos e receitas para tomar decisões melhores na barbearia.',
    icon: TrendingUp,
    points: ['Visualize os principais números', 'Descubra os serviços mais procurados'],
  },
];

export const PlatformOnboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const current = steps[step];
  const Icon = current.icon;

  if (done) {
    return (
      <section className="px-5">
        <div className="flex items-center gap-3 border border-white/10 bg-[#141414] p-4 rounded-2xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Check className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <b className="block text-sm text-white">Você já conhece a Ustudio</b>
            <span className="block text-xs text-white/45">Sua vitrine e agenda estão prontas para configurar.</span>
          </div>
          <button type="button" onClick={() => { setDone(false); setStep(0); }} className="text-xs font-semibold text-white/55 hover:text-white">Rever</button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5" aria-label="Conheça a plataforma">
      <div className="border border-white/10 bg-[#141414] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5f8a]">{current.kicker}</span>
            <p className="text-xs text-white/45">Conheça a Ustudio em menos de 1 minuto</p>
          </div>
          <button type="button" onClick={() => setDone(true)} className="text-xs text-white/45 hover:text-white">Pular</button>
        </div>

        <div className="p-4">
          <div className="mb-4 flex h-32 items-center justify-center rounded-xl border border-white/[0.06] bg-[#0d0d0d]">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff5f8a] text-black shadow-lg shadow-rose-950/30">
              <Icon className="h-6 w-6 stroke-[1.8]" />
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">{current.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-white/55">{current.text}</p>
          <div className="mt-3 space-y-2">
            {current.points.map((point) => (
              <div key={point} className="flex items-center gap-2 text-xs text-white/75">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ff5f8a] text-black"><Check className="h-2.5 w-2.5 stroke-[3]" /></span>
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
          <div className="flex flex-1 gap-1.5" aria-hidden="true">
            {steps.map((_, index) => <span key={index} className={`h-1 flex-1 rounded-full ${index <= step ? 'bg-[#ff5f8a]' : 'bg-white/10'}`} />)}
          </div>
          {step > 0 && (
            <button type="button" aria-label="Voltar" onClick={() => setStep((value) => value - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white"><ChevronLeft className="h-4 w-4" /></button>
          )}
          <button type="button" onClick={() => step === steps.length - 1 ? setDone(true) : setStep((value) => value + 1)} className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-xs font-bold text-black hover:bg-white/90">
            {step === steps.length - 1 ? 'Concluir' : 'Continuar'}
            {step < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
};