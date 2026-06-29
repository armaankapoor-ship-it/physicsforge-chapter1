import { Calculator, CheckCircle2, ClipboardList } from 'lucide-react'
import { AlertBox, ConceptCard, FormulaBox, SectionShell, Tag } from './ui'

const examples = [
  {
    title: 'Charge quantization',
    tag: 'Charge basics',
    problem: 'A body has 5 x 10^12 excess electrons. Find its charge.',
    steps: ['Excess electrons give negative charge.', 'q = -ne.', 'q = -5 x 10^12 x 1.6 x 10^-19 C.'],
    answer: '-8.0 x 10^-7 C',
    trap: 'Do not forget the negative sign for excess electrons.',
  },
  {
    title: 'Coulomb force',
    tag: 'Force',
    problem: 'Two charges 2 microC and 3 microC are separated by 0.30 m. Find force magnitude.',
    steps: ['Convert microC to C.', 'Use F = kq1q2/r^2.', 'F = 9 x 10^9 x 2 x 10^-6 x 3 x 10^-6 / 0.30^2.'],
    answer: '0.6 N',
    trap: 'Using 30 cm as 30 m or leaving microC unconverted destroys the answer.',
  },
  {
    title: 'Electric field of point charge',
    tag: 'Field',
    problem: 'Find electric field at 0.20 m from a 4 microC positive point charge.',
    steps: ['Use E = kQ/r^2.', 'E = 9 x 10^9 x 4 x 10^-6 / 0.20^2.', 'Direction is outward because source charge is positive.'],
    answer: '9.0 x 10^5 N/C outward',
    trap: 'Magnitude formula does not by itself tell direction; source charge sign does.',
  },
  {
    title: 'Force on negative charge',
    tag: 'Direction',
    problem: 'A charge -2 microC is placed in a uniform electric field 500 N/C toward +x. Find force.',
    steps: ['Use F = qE.', 'Magnitude = 2 x 10^-6 x 500 = 1.0 x 10^-3 N.', 'Negative charge feels force opposite to field.'],
    answer: '1.0 x 10^-3 N toward -x',
    trap: 'Force on a negative charge is opposite to electric field direction.',
  },
  {
    title: 'Perpendicular superposition',
    tag: 'Vector sum',
    problem: 'Two electric fields 30 N/C and 40 N/C act perpendicular to each other. Find resultant.',
    steps: ['Use vector addition.', 'E = sqrt(30^2 + 40^2).', 'This is a 3-4-5 triangle scaled by 10.'],
    answer: '50 N/C',
    trap: 'Do not add perpendicular fields as 30 + 40 = 70 N/C.',
  },
  {
    title: 'Dipole moment',
    tag: 'Dipole',
    problem: 'Charges +2 microC and -2 microC are separated by 6 cm. Find dipole moment.',
    steps: ['Use full separation, not half separation.', 'p = qd.', 'p = 2 x 10^-6 x 0.06.'],
    answer: '1.2 x 10^-7 C m, from -q to +q',
    trap: 'Dipole moment direction is from negative to positive charge.',
  },
  {
    title: 'Dipole torque',
    tag: 'Torque',
    problem: 'A dipole of moment 3 x 10^-6 C m is in field 2 x 10^5 N/C at 30 degrees. Find torque.',
    steps: ['Use tau = pE sin theta.', 'sin 30 degrees = 1/2.', 'tau = 3 x 10^-6 x 2 x 10^5 x 1/2.'],
    answer: '0.3 N m',
    trap: 'Torque is maximum at 90 degrees, not when dipole is already aligned.',
  },
  {
    title: 'Electric flux',
    tag: 'Flux',
    problem: 'A surface of area 0.5 m^2 is placed in field 100 N/C. Area vector makes 60 degrees with field. Find flux.',
    steps: ['Use Phi = EA cos theta.', 'cos 60 degrees = 1/2.', 'Phi = 100 x 0.5 x 1/2.'],
    answer: '25 N m^2/C',
    trap: 'Theta is with the area vector, not necessarily with the plane of the surface.',
  },
  {
    title: 'Gauss law flux',
    tag: 'Gauss',
    problem: 'A closed surface encloses charge 3epsilon0. Find net flux.',
    steps: ['Use closed flux = q enclosed / epsilon0.', 'Phi = 3epsilon0 / epsilon0.', 'Outside charges, if any, do not change net flux.'],
    answer: '3 N m^2/C',
    trap: 'Do not include charges outside the closed surface in q enclosed.',
  },
  {
    title: 'Infinite line charge behavior',
    tag: 'Gauss application',
    problem: 'If distance from an infinite line charge is doubled, what happens to electric field?',
    steps: ['Use E = lambda/(2 pi epsilon0 r).', 'E is proportional to 1/r.', 'Doubling r makes E half.'],
    answer: 'E becomes E/2',
    trap: 'Do not apply point-charge inverse-square behavior to an infinite line charge.',
  },
  {
    title: 'Spherical shell graph',
    tag: 'Graph',
    problem: 'What is electric field at an internal point of a uniformly charged thin spherical shell?',
    steps: ['Choose a Gaussian sphere inside the shell.', 'It encloses no charge.', 'By Gauss law and spherical symmetry, E = 0.'],
    answer: '0',
    trap: 'The outside formula kQ/r^2 is not valid inside the shell.',
  },
  {
    title: 'Uniform solid sphere',
    tag: 'Graph',
    problem: 'For a uniformly charged solid sphere, express field at r=R/2 in terms of surface field Es = kQ/R^2.',
    steps: ['Inside field is E = kQr/R^3.', 'Put r = R/2.', 'E = kQ/(2R^2) = Es/2.'],
    answer: 'Es/2',
    trap: 'Inside a solid sphere, enclosed charge changes with r.',
  },
]

export default function SolvedExamples() {
  return (
    <SectionShell
      id="solved-examples"
      eyebrow="Solved examples"
      title="Exam-style solved examples with traps called out."
      description="These examples cover the fastest scoring numerical and conceptual patterns before the full practice bank."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {examples.map((example, index) => (
          <article key={example.title} className="glass-card p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag>{String(index + 1).padStart(2, '0')}</Tag>
              <Tag>{example.tag}</Tag>
            </div>
            <h3 className="mt-4 text-xl font-black tracking-tight text-ink dark:text-white">{example.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">{example.problem}</p>
            <div className="mt-4 grid gap-2">
              {example.steps.map((step, stepIndex) => (
                <div key={step} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700 dark:bg-white/[.045] dark:text-slate-200">
                  <CheckCircle2 className="mt-1 shrink-0 text-teal-600 dark:text-teal-300" size={16} />
                  <span><strong>Step {stepIndex + 1}:</strong> {step}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3">
              <FormulaBox title="Final answer">{example.answer}</FormulaBox>
              <AlertBox title="Common trap" tone="trap">{example.trap}</AlertBox>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ConceptCard icon={Calculator} kicker="Numericals" title="Formula chain" color="blue">Each solved example shows the exact sequence of model choice, unit conversion and formula use.</ConceptCard>
        <ConceptCard icon={ClipboardList} kicker="Boards" title="Writing style" color="amber">The steps are short enough to reproduce cleanly in board answers.</ConceptCard>
        <ConceptCard icon={CheckCircle2} kicker="Traps" title="Mistake-aware" color="teal">Every solution ends with the most likely exam mistake.</ConceptCard>
      </div>
    </SectionShell>
  )
}
