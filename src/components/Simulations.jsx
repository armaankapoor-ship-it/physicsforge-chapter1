import { useMemo, useState } from 'react'
import { Activity, Compass, Gauge, Orbit, SlidersHorizontal, Sparkles, Zap } from 'lucide-react'
import { DiagramRenderer, FieldMini } from './PhysicsDiagrams'
import { AlertBox, ConceptCard, FormulaBox, SectionShell } from './ui'

const k = 9e9
const epsilon0 = 8.854e-12

function fmt(value, digits = 2) {
  if (!Number.isFinite(value)) return 'not defined'
  if (Math.abs(value) >= 10000 || Math.abs(value) < 0.01) return value.toExponential(digits)
  return Number(value.toFixed(digits)).toString()
}

export default function Simulations() {
  return (
    <SectionShell
      id="simulations"
      eyebrow="Interactive simulation lab"
      title="Eight frontend-only electrostatics simulations."
      description="All simulations use local React state and SVG math. No paid API, backend, database or external asset is required."
      tone="tint"
    >
      <div className="grid gap-6">
        <CoulombExplorer />
        <ElectricFieldExplorer />
        <FieldLineExplorer />
        <FluxExplorer />
        <GaussExplorer />
        <DipoleTorqueExplorer />
        <SphereExplorer />
        <SuperpositionExplorer />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ConceptCard icon={SlidersHorizontal} kicker="Controls" title="Exam variables" color="blue">The sliders expose charge, distance, angle, symmetry and radius, exactly the quantities students change in numericals.</ConceptCard>
        <ConceptCard icon={Compass} kicker="Vectors" title="Direction visible" color="amber">Field and force directions are shown visually so sign mistakes become easier to catch.</ConceptCard>
        <ConceptCard icon={Gauge} kicker="Outputs" title="Live values" color="teal">Force, electric field, flux, torque and Gaussian-field results update instantly.</ConceptCard>
        <ConceptCard icon={Zap} kicker="Free stack" title="No backend" color="orange">Everything runs in the browser with React, SVG and local math only.</ConceptCard>
      </div>
    </SectionShell>
  )
}

function SimulationCard({ title, icon: Icon = Activity, children, explanation, insight, ask }) {
  return (
    <article className="glass-card overflow-hidden">
      <div className="border-b border-slate-200 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[.04] md:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-300/12 dark:text-amber-200"><Icon size={20} /></span>
          <h3 className="text-xl font-black tracking-tight text-ink dark:text-white">{title}</h3>
        </div>
      </div>
      <div className="grid gap-5 p-5 md:p-6">
        {children}
        <p className="text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{explanation}</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <AlertBox title="Exam insight" tone="meaning">{insight}</AlertBox>
          <AlertBox title="What NEET/JEE can ask" tone="neet">{ask}</AlertBox>
        </div>
      </div>
    </article>
  )
}

function Slider({ label, value, min, max, step = 1, unit = '', onChange }) {
  return (
    <label className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[.045]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[.14em] text-slate-500 dark:text-slate-400">{label}</span>
        <strong className="font-mono text-sm text-ink dark:text-white">{value}{unit}</strong>
      </div>
      <input className="range-control" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

function CoulombExplorer() {
  const [q1, setQ1] = useState(2)
  const [q2, setQ2] = useState(-3)
  const [rCm, setR] = useState(30)
  const r = rCm / 100
  const force = k * Math.abs(q1 * 1e-6 * q2 * 1e-6) / (r * r)
  const nature = q1 * q2 > 0 ? 'repulsion' : 'attraction'
  return (
    <SimulationCard
      title="Coulomb Force Explorer"
      icon={Zap}
      explanation="Change charges and separation to see the inverse-square force and the attraction/repulsion rule."
      insight="Magnitude uses absolute values; signs decide direction."
      ask="NEET asks direct force and attraction/repulsion. JEE Main adds vectors and unit conversion."
    >
      <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
        <div className="grid gap-3">
          <Slider label="q1" value={q1} min={-10} max={10} unit=" microC" onChange={setQ1} />
          <Slider label="q2" value={q2} min={-10} max={10} unit=" microC" onChange={setQ2} />
          <Slider label="distance" value={rCm} min={10} max={100} unit=" cm" onChange={setR} />
          <FormulaBox title="Live output">
            F = {fmt(force)} N<br />
            Interaction = {nature}
          </FormulaBox>
        </div>
        <div className="visual-panel">
          <DiagramRenderer type={nature === 'repulsion' ? 'coulomb-repel' : 'coulomb-attract'} />
        </div>
      </div>
    </SimulationCard>
  )
}

function ElectricFieldExplorer() {
  const [q, setQ] = useState(4)
  const [rCm, setR] = useState(20)
  const r = rCm / 100
  const field = k * Math.abs(q * 1e-6) / (r * r)
  return (
    <SimulationCard
      title="Electric Field of a Point Charge"
      icon={Compass}
      explanation="A point charge produces radial electric field. Positive source charges send field outward; negative source charges pull field inward."
      insight="E = kQ/r^2 has the same inverse-square distance dependence as Coulomb force."
      ask="Questions can ask field magnitude, direction, or what happens when distance is doubled."
    >
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid gap-3">
          <Slider label="source charge Q" value={q} min={-10} max={10} unit=" microC" onChange={setQ} />
          <Slider label="distance r" value={rCm} min={5} max={100} unit=" cm" onChange={setR} />
          <FormulaBox title="Live output">
            E = {fmt(field)} N/C<br />
            Direction = {q >= 0 ? 'outward from charge' : 'inward toward charge'}
          </FormulaBox>
        </div>
        <div className="visual-panel">
          <FieldMini sign={q >= 0 ? '+' : '-'} label={`E = ${fmt(field)} N/C`} />
        </div>
      </div>
    </SimulationCard>
  )
}

function FieldLineExplorer() {
  const [mode, setMode] = useState('dipole-field')
  return (
    <SimulationCard
      title="Field-Line Polarity Simulator"
      icon={Sparkles}
      explanation="Switch between positive charge, negative charge, uniform field and dipole field patterns."
      insight="Field lines start on positive charge, end on negative charge and never intersect."
      ask="NEET loves correct/incorrect field-line statements; JEE may use field-line density for strength comparison."
    >
      <div className="grid gap-5 lg:grid-cols-[.55fr_1.45fr]">
        <div className="grid gap-3">
          {[
            ['field-positive', 'Positive source'],
            ['field-negative', 'Negative source'],
            ['uniform-field', 'Uniform field'],
            ['dipole-field', 'Dipole field'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)} className={`dashboard-tab ${mode === id ? 'active' : ''}`}>{label}</button>
          ))}
        </div>
        <div className="visual-panel"><DiagramRenderer type={mode} /></div>
      </div>
    </SimulationCard>
  )
}

function FluxExplorer() {
  const [e, setE] = useState(40)
  const [area, setArea] = useState(3)
  const [theta, setTheta] = useState(0)
  const flux = e * area * Math.cos(theta * Math.PI / 180)
  return (
    <SimulationCard
      title="Electric Flux Explorer"
      icon={Gauge}
      explanation="Flux is the normal component of electric field multiplied by area."
      insight="The angle is between E and area vector, not between E and the surface plane."
      ask="NEET asks maximum/zero flux. JEE Main asks signed flux and angle interpretation."
    >
      <div className="grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
        <div className="grid gap-3">
          <Slider label="Electric field" value={e} min={0} max={120} unit=" N/C" onChange={setE} />
          <Slider label="Area" value={area} min={1} max={10} unit=" m^2" onChange={setArea} />
          <Slider label="Theta" value={theta} min={0} max={180} step={5} unit=" deg" onChange={setTheta} />
          <FormulaBox title="Live output">
            Phi = {fmt(flux)} N m^2/C<br />
            cos theta = {Math.cos(theta * Math.PI / 180).toFixed(2)}
          </FormulaBox>
        </div>
        <div className="visual-panel"><DiagramRenderer type="flux-surface" /></div>
      </div>
    </SimulationCard>
  )
}

function GaussExplorer() {
  const [mode, setMode] = useState('line')
  const [density, setDensity] = useState(5)
  const [rCm, setR] = useState(20)
  const r = rCm / 100
  const outputs = useMemo(() => {
    if (mode === 'line') return { type: 'gaussian-cylinder', value: density * 1e-6 / (2 * Math.PI * epsilon0 * r), label: 'E = lambda/(2 pi epsilon0 r)' }
    if (mode === 'sheet') return { type: 'pillbox', value: density * 1e-6 / (2 * epsilon0), label: 'E = sigma/(2 epsilon0)' }
    return { type: 'gaussian-sphere', value: k * density * 1e-6 / (r * r), label: 'E = kQ/r^2 outside sphere' }
  }, [mode, density, r])
  return (
    <SimulationCard
      title="Gauss Law Symmetry Explorer"
      icon={Orbit}
      explanation="Choose the symmetry and watch the recommended Gaussian surface and field formula change."
      insight="Gauss law is always true, but it becomes a field calculator only when symmetry makes E constant on the surface."
      ask="JEE asks derivations for line, sheet and sphere. NEET asks which Gaussian surface to choose."
    >
      <div className="grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              ['line', 'Line'],
              ['sheet', 'Sheet'],
              ['sphere', 'Sphere'],
            ].map(([id, label]) => <button key={id} onClick={() => setMode(id)} className={`dashboard-tab ${mode === id ? 'active' : ''}`}>{label}</button>)}
          </div>
          <Slider label={mode === 'line' ? 'lambda' : mode === 'sheet' ? 'sigma' : 'Q'} value={density} min={1} max={20} unit={mode === 'sphere' ? ' microC' : ' micro SI'} onChange={setDensity} />
          <Slider label="distance r" value={rCm} min={5} max={100} unit=" cm" onChange={setR} />
          <FormulaBox title="Live output">
            {outputs.label}<br />
            E = {fmt(outputs.value)} N/C
          </FormulaBox>
        </div>
        <div className="visual-panel"><DiagramRenderer type={outputs.type} /></div>
      </div>
    </SimulationCard>
  )
}

function DipoleTorqueExplorer() {
  const [p, setP] = useState(4)
  const [e, setE] = useState(30)
  const [theta, setTheta] = useState(60)
  const torque = p * 1e-6 * e * 1e3 * Math.sin(theta * Math.PI / 180)
  return (
    <SimulationCard
      title="Dipole Torque Explorer"
      icon={Compass}
      explanation="A dipole in uniform electric field has zero net force but non-zero torque unless it is parallel or antiparallel to the field."
      insight="Torque is maximum at 90 degrees and zero at 0 and 180 degrees."
      ask="JEE can ask torque, stable/unstable equilibrium and energy orientation."
    >
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid gap-3">
          <Slider label="Dipole moment p" value={p} min={1} max={20} unit=" x10^-6 C m" onChange={setP} />
          <Slider label="Electric field" value={e} min={1} max={100} unit=" x10^3 N/C" onChange={setE} />
          <Slider label="Theta" value={theta} min={0} max={180} step={5} unit=" deg" onChange={setTheta} />
          <FormulaBox title="Live output">tau = {fmt(torque)} N m</FormulaBox>
        </div>
        <div className="visual-panel"><DiagramRenderer type="dipole-torque" /></div>
      </div>
    </SimulationCard>
  )
}

function SphereExplorer() {
  const [mode, setMode] = useState('shell-graph')
  return (
    <SimulationCard
      title="Spherical Field Graph Explorer"
      icon={Activity}
      explanation="Compare the E-r graph of a thin spherical shell and a uniformly charged solid sphere."
      insight="Shell: zero inside. Solid sphere: linear inside. Both behave like point charge outside."
      ask="Graph-based questions often test inside versus outside region and the value at the centre."
    >
      <div className="grid gap-5 lg:grid-cols-[.55fr_1.45fr]">
        <div className="grid gap-3">
          <button onClick={() => setMode('shell-graph')} className={`dashboard-tab ${mode === 'shell-graph' ? 'active' : ''}`}>Spherical shell</button>
          <button onClick={() => setMode('solid-sphere-graph')} className={`dashboard-tab ${mode === 'solid-sphere-graph' ? 'active' : ''}`}>Solid sphere</button>
          <FormulaBox title="Graph rule">{mode === 'shell-graph' ? 'Inside E=0; outside E=kQ/r^2' : 'Inside E=kQr/R^3; outside E=kQ/r^2'}</FormulaBox>
        </div>
        <div className="visual-panel"><DiagramRenderer type={mode} /></div>
      </div>
    </SimulationCard>
  )
}

function SuperpositionExplorer() {
  const [e1, setE1] = useState(40)
  const [e2, setE2] = useState(30)
  const resultant = Math.sqrt(e1 * e1 + e2 * e2)
  const angle = Math.atan2(e2, e1) * 180 / Math.PI
  return (
    <SimulationCard
      title="Perpendicular Superposition Explorer"
      icon={SlidersHorizontal}
      explanation="Two perpendicular fields combine by vector addition, not direct scalar addition."
      insight="If fields are perpendicular, E_net = sqrt(E1^2 + E2^2)."
      ask="JEE Main often asks resultant field from two charges using components."
    >
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid gap-3">
          <Slider label="E1" value={e1} min={0} max={100} unit=" N/C" onChange={setE1} />
          <Slider label="E2" value={e2} min={0} max={100} unit=" N/C" onChange={setE2} />
          <FormulaBox title="Live output">
            E_net = {fmt(resultant)} N/C<br />
            angle = {fmt(angle)} deg above E1
          </FormulaBox>
        </div>
        <div className="visual-panel"><DiagramRenderer type="superposition" /></div>
      </div>
    </SimulationCard>
  )
}
