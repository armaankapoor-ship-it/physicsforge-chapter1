import { Activity, ArrowRight, BookMarked, Compass, Gauge, Orbit, Shield, Workflow } from 'lucide-react'
import { chapterFlow, chapterSections } from '../data/chapterSections'
import { ConceptCard, FlowchartBlock, SectionShell, SourceNote } from './ui'

const clusters = [
  ['Charge basics', 'Charge types, quantization, conservation and induction.', Activity, 'blue'],
  ['Force and field', 'Coulomb law, vector direction and superposition.', Compass, 'amber'],
  ['Flux and Gauss', 'Area vector, closed flux and symmetry surfaces.', Orbit, 'teal'],
  ['Conductors', 'Electrostatic equilibrium, shielding and field graphs.', Shield, 'orange'],
]

export default function ChapterMap() {
  return (
    <SectionShell
      id="chapter-map"
      eyebrow="Complete chapter map"
      title="The whole chapter as one connected electrostatics story."
      description="Start with charge, build Coulomb force and electric field, visualize field lines, then use flux and Gauss law to solve symmetric charge distributions."
    >
      <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-soft md:p-8">
        <FlowchartBlock steps={chapterFlow} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {clusters.map(([title, text, Icon, color]) => (
          <ConceptCard key={title} icon={Icon} kicker="Study cluster" title={title} color={color}>{text}</ConceptCard>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
        <div className="glass-card p-6">
          <Compass className="text-copper dark:text-amber-300" size={24} />
          <h3 className="mt-4 text-2xl font-black tracking-tight text-ink dark:text-white">30-section route</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
            The order follows NCERT logic but adds NEET speed, JEE Main numerical flow and JEE Advanced-style conceptual foundations wherever useful.
          </p>
          <div className="mt-5">
            <SourceNote />
          </div>
        </div>
        <div className="grid max-h-[560px] gap-3 overflow-y-auto pr-1 section-nav sm:grid-cols-2">
          {chapterSections.map((section) => (
            <a key={section.id} href={`#notes-${section.id}`} className="group rounded-[20px] border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-soft dark:border-white/10 dark:bg-white/[.045] dark:hover:border-amber-300/40">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-100 font-mono text-[11px] font-black text-amber-800 dark:bg-amber-300/12 dark:text-amber-200">{section.module}</span>
                <div>
                  <h3 className="text-sm font-black leading-5 text-ink dark:text-white">{section.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">{section.simple}</p>
                </div>
                <ArrowRight className="ml-auto mt-2 shrink-0 text-slate-300 transition group-hover:-rotate-45 group-hover:text-copper dark:text-slate-600 dark:group-hover:text-amber-300" size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ConceptCard icon={BookMarked} kicker="Boards" title="Writing-ready derivations" color="blue">Each derivation starts from field, flux or symmetry and ends with a clean final formula and mistake warning.</ConceptCard>
        <ConceptCard icon={Workflow} kicker="JEE" title="Formula chaining" color="teal">Numericals are organized around model choice, SI conversion, vector addition and limiting-case checks.</ConceptCard>
        <ConceptCard icon={Gauge} kicker="NEET" title="Fast recall facts" color="orange">Field-line rules, Gauss surfaces, dipole facts and graph shapes are surfaced repeatedly.</ConceptCard>
      </div>
    </SectionShell>
  )
}
