import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const src = (...parts) => join(root, 'src', ...parts)

const counts = {
  'NEET MCQ': 100,
  'JEE Main MCQ/Numerical': 100,
  'JEE Advanced Conceptual': 30,
  'Assertion-Reason': 30,
  'Integer-Type': 30,
  'Match-the-Column': 20,
  'Graph-Based': 20,
  'Field-Line-Based': 20,
  'Gauss-Law-Based': 20,
  'Case-Based': 10,
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function jsExport(name, value) {
  return `export const ${name} = ${JSON.stringify(value, null, 2)}\n`
}

function fmt(value, digits = 2) {
  if (!Number.isFinite(value)) return String(value)
  if (Math.abs(value) >= 10000 || Math.abs(value) < 0.01) return value.toExponential(digits)
  return Number(value.toFixed(digits)).toString()
}

const sectionBlueprints = [
  {
    title: 'Introduction to Electric Charges and Fields',
    simple: 'Electrostatics studies charges at rest and the electric fields produced by them.',
    anchor: 'charge creates electric field and electric field exerts force on charge',
    definition: 'Electric charge is the physical property responsible for electric force.',
    formula: 'F = qE',
    units: 'charge in coulomb (C), electric field in N C^-1',
    example: 'A positive test charge accelerates in the direction of electric field.',
    graph: 'Field arrows around source charges show direction and strength.',
    memory: 'Charge is the cause; field is the invisible influence.',
    trap: 'Electric field can exist at a point even when no test charge is placed there.',
    terms: ['charge', 'field', 'force', 'test charge'],
  },
  {
    title: 'Nature and Types of Electric Charge',
    simple: 'There are two kinds of charge: positive and negative. Like charges repel and unlike charges attract.',
    anchor: 'sign of charge decides attraction or repulsion',
    definition: 'Positive and negative charges are two opposite electric states of matter.',
    formula: 'q can be positive or negative',
    units: 'charge in coulomb (C)',
    example: 'Two positive glass rods repel after similar charging.',
    graph: 'Force arrows point away for like charges and toward for unlike charges.',
    memory: 'Same signs separate; opposite signs pull together.',
    trap: 'A negative force sign usually means attraction or opposite direction, not negative magnitude.',
    terms: ['positive charge', 'negative charge', 'repulsion', 'attraction'],
  },
  {
    title: 'Quantization of Charge',
    simple: 'Charge exists in discrete packets, each equal to the elementary charge e.',
    anchor: 'total charge is an integral multiple of elementary charge',
    definition: 'Quantization means q = ne, where n is an integer.',
    formula: 'q = ne',
    units: 'e = 1.6 x 10^-19 C',
    example: 'A body cannot have charge 2.5e; n must be an integer.',
    graph: 'Allowed charge values appear as equally spaced steps on a number line.',
    memory: 'Charge comes in coins of e, never loose dust.',
    trap: 'Macroscopic charge looks continuous only because e is extremely small.',
    terms: ['elementary charge', 'integer multiple', 'electron', 'proton'],
  },
  {
    title: 'Conservation and Additivity of Charge',
    simple: 'Total charge of an isolated system remains constant, and net charge is algebraic sum of charges.',
    anchor: 'charge transfers but is not created or destroyed in isolation',
    definition: 'Charge conservation means total charge before equals total charge after.',
    formula: 'q_net = q1 + q2 + q3 + ...',
    units: 'each charge in coulomb (C)',
    example: 'If one body gains -3 microC, another isolated body loses -3 microC or gains +3 microC.',
    graph: 'Before-after bar chart keeps total charge unchanged.',
    memory: 'Charge bookkeeping never loses a rupee.',
    trap: 'Add signs algebraically; do not add magnitudes blindly.',
    terms: ['conservation', 'additivity', 'isolated system', 'net charge'],
  },
  {
    title: 'Conductors, Insulators and Charging',
    simple: 'Conductors allow free charge motion; insulators hold charge nearly fixed at local regions.',
    anchor: 'charge mobility decides conductor and insulator behavior',
    definition: 'A conductor has mobile charge carriers; an insulator has bound charges.',
    formula: 'no single formula; use charge mobility and material nature',
    units: 'charge in coulomb; surface charge density in C m^-2',
    example: 'Metals are conductors; dry glass and plastic are insulators.',
    graph: 'Charge spreads over conductor but stays localized on insulator.',
    memory: 'Conductor conducts; insulator isolates.',
    trap: 'An insulator can be charged even though charges cannot move freely through it.',
    terms: ['free electron', 'bound charge', 'conductor', 'insulator'],
  },
  {
    title: 'Charging by Induction',
    simple: 'Induction charges a body without direct contact by separating charges using a nearby charged object and grounding.',
    anchor: 'nearby charge redistributes charges before grounding fixes net charge',
    definition: 'Charging by induction is charging without contact.',
    formula: 'charge conservation plus grounding logic',
    units: 'charge in coulomb (C)',
    example: 'A negative rod near a neutral sphere repels electrons to the far side.',
    graph: 'Step diagram: polarization, grounding, removal of ground, removal of rod.',
    memory: 'Induction is influence at a distance.',
    trap: 'The induced final charge is opposite to the inducing rod if grounding is used.',
    terms: ['induction', 'grounding', 'polarization', 'redistribution'],
  },
  {
    title: 'Coulomb Law',
    simple: 'The electrostatic force between two point charges is proportional to product of charges and inversely proportional to square of separation.',
    anchor: 'point charge force follows inverse square law',
    definition: 'Coulomb law gives force between stationary point charges.',
    formula: 'F = k |q1 q2| / r^2',
    units: 'force in newton, charge in coulomb, distance in metre',
    example: 'Doubling separation makes force one-fourth.',
    graph: 'F-r graph is a decreasing inverse-square curve.',
    memory: 'Coulomb force falls as r squared grows.',
    trap: 'Use SI units: microC to C and cm to m.',
    terms: ['Coulomb force', 'point charge', 'inverse square', 'permittivity'],
  },
  {
    title: 'Vector Form of Coulomb Law',
    simple: 'Coulomb force is a vector along the line joining the two charges.',
    anchor: 'direction is as important as magnitude',
    definition: 'The vector form uses unit vector from source charge to the charge experiencing force.',
    formula: 'F12 = k q1 q2 r12_hat / r^2',
    units: 'force in newton; unit vector is dimensionless',
    example: 'If q1q2 is negative, force direction reverses from the chosen unit vector.',
    graph: 'Line-of-centres diagram with arrows shows action-reaction forces.',
    memory: 'Magnitude from formula, direction from signs and line joining.',
    trap: 'Do not treat vector signs as mere plus-minus numbers.',
    terms: ['unit vector', 'line of centres', 'action-reaction', 'direction'],
  },
  {
    title: 'Superposition Principle',
    simple: 'The net electric force or field is the vector sum of individual contributions.',
    anchor: 'electric effects add vectorially',
    definition: 'Superposition means each charge contributes independently to the net effect.',
    formula: 'E_net = E1 + E2 + E3 + ...',
    units: 'electric field in N C^-1',
    example: 'At a midpoint between equal like charges, fields cancel.',
    graph: 'Vector arrows from each source combine into a resultant arrow.',
    memory: 'Add fields like arrows, not like plain numbers.',
    trap: 'Opposite directions subtract; perpendicular directions use Pythagoras.',
    terms: ['resultant', 'vector sum', 'component', 'cancellation'],
  },
  {
    title: 'Electric Field',
    simple: 'Electric field at a point is force per unit positive test charge placed at that point.',
    anchor: 'field describes force capability of source charges',
    definition: 'E = F/q0 for a small positive test charge q0.',
    formula: 'E = F / q0',
    units: 'N C^-1 or V m^-1',
    example: 'A 2 C test charge feeling 10 N experiences E = 5 N C^-1.',
    graph: 'Dense field lines indicate stronger electric field.',
    memory: 'Field is force offered to one coulomb.',
    trap: 'Test charge must be small so it does not disturb source charges.',
    terms: ['test charge', 'source charge', 'field strength', 'N/C'],
  },
  {
    title: 'Electric Field Due to a Point Charge',
    simple: 'A point charge produces radial electric field whose magnitude decreases as 1/r^2.',
    anchor: 'point charge field follows same inverse-square dependence as force',
    definition: 'Field due to a point charge is force per unit positive charge placed nearby.',
    formula: 'E = kQ / r^2',
    units: 'N C^-1',
    example: 'Positive charge field points outward; negative charge field points inward.',
    graph: 'E-r graph decreases as 1/r^2.',
    memory: 'Positive pushes test charge away; negative pulls it inward.',
    trap: 'Use the sign only for direction; magnitude is positive.',
    terms: ['radial field', 'source charge', 'inverse square', 'outward'],
  },
  {
    title: 'Electric Field Lines',
    simple: 'Field lines are visual tools whose tangent gives field direction and whose density shows field strength.',
    anchor: 'field lines translate vectors into a drawing',
    definition: 'An electric field line is a curve tangent to E at every point.',
    formula: 'line density is proportional to |E|',
    units: 'not a formula quantity; E still in N C^-1',
    example: 'Lines start from positive charges and end on negative charges.',
    graph: 'Crowded lines near a charge show stronger field.',
    memory: 'Lines leave plus and land on minus.',
    trap: 'Field lines never intersect; one point cannot have two field directions.',
    terms: ['tangent', 'line density', 'non-intersection', 'direction'],
  },
  {
    title: 'Electric Dipole',
    simple: 'An electric dipole is a pair of equal and opposite charges separated by a small distance.',
    anchor: 'dipole moment measures strength and direction of a dipole',
    definition: 'Dipole moment p = q times separation vector from negative to positive charge.',
    formula: 'p = q(2a)',
    units: 'C m',
    example: 'A +q and -q separated by 2a form a dipole of moment 2qa.',
    graph: 'Dipole field lines leave positive charge and enter negative charge.',
    memory: 'Dipole arrow points from minus to plus.',
    trap: 'The separation in formula is full distance between charges, often 2a.',
    terms: ['dipole', 'dipole moment', 'axial line', 'equatorial line'],
  },
  {
    title: 'Electric Field on Axial Line of a Dipole',
    simple: 'On the axial line far from a dipole, field varies as 1/r^3 and points along dipole moment.',
    anchor: 'dipole field falls faster than point charge field',
    definition: 'Axial line is the line passing through both charges of the dipole.',
    formula: 'E_axial = (1/(4 pi epsilon0)) 2p / r^3 for r >> a',
    units: 'N C^-1',
    example: 'Doubling distance makes far axial dipole field one-eighth.',
    graph: 'E-r graph for dipole falls as 1/r^3.',
    memory: 'Axial has the extra factor 2.',
    trap: 'Use the far-field formula only when r is much larger than dipole half-length.',
    terms: ['axial line', 'far field', 'dipole approximation', '1/r^3'],
  },
  {
    title: 'Electric Field on Equatorial Line of a Dipole',
    simple: 'On the equatorial line far from a dipole, field varies as 1/r^3 and is opposite to dipole moment.',
    anchor: 'equatorial dipole field is opposite to p',
    definition: 'Equatorial line is perpendicular bisector of the dipole axis.',
    formula: 'E_equatorial = (1/(4 pi epsilon0)) p / r^3 opposite to p',
    units: 'N C^-1',
    example: 'At same far distance, axial field is twice equatorial field in magnitude.',
    graph: 'Axial and equatorial comparison shows 2:1 ratio.',
    memory: 'Equatorial erases the 2 and reverses direction.',
    trap: 'Do not draw equatorial field along p; it is opposite to p.',
    terms: ['equatorial line', 'perpendicular bisector', 'opposite direction', '2:1 ratio'],
  },
  {
    title: 'Dipole in Uniform Electric Field',
    simple: 'A dipole in uniform electric field experiences zero net force but a torque that tries to align it with the field.',
    anchor: 'uniform field rotates a dipole without translating its centre',
    definition: 'Torque on dipole is tau = pE sin theta.',
    formula: 'tau = pE sin theta',
    units: 'N m',
    example: 'Torque is maximum at theta = 90 degrees and zero at theta = 0 degrees.',
    graph: 'tau-theta graph follows sine curve.',
    memory: 'Dipole wants to point with the field.',
    trap: 'Net force is zero only in uniform field, not necessarily in non-uniform field.',
    terms: ['torque', 'uniform field', 'stable equilibrium', 'alignment'],
  },
  {
    title: 'Continuous Charge Distribution',
    simple: 'Large charged bodies are handled by charge density: linear, surface or volume.',
    anchor: 'replace many tiny charges by density and integration or symmetry',
    definition: 'Charge density is charge per length, area or volume.',
    formula: 'lambda = dq/dl, sigma = dq/dA, rho = dq/dV',
    units: 'lambda in C m^-1, sigma in C m^-2, rho in C m^-3',
    example: 'A uniformly charged long wire is described by linear charge density lambda.',
    graph: 'Density icons show charge spread over line, surface and volume.',
    memory: 'Line-lambda, Surface-sigma, Volume-rho.',
    trap: 'Choose density according to geometry, not according to what symbol looks familiar.',
    terms: ['lambda', 'sigma', 'rho', 'uniform distribution'],
  },
  {
    title: 'Electric Flux',
    simple: 'Electric flux measures how much electric field passes through a surface.',
    anchor: 'flux depends on field, area and angle',
    definition: 'Flux through a flat surface in uniform field is Phi = EA cos theta.',
    formula: 'Phi = E A cos theta',
    units: 'N m^2 C^-1',
    example: 'Maximum flux occurs when area vector is parallel to field.',
    graph: 'Phi-theta graph is a cosine curve.',
    memory: 'Flux is field crossing area, counted by cosine.',
    trap: 'Theta is angle between E and area vector, not always the plane of surface.',
    terms: ['area vector', 'normal', 'cos theta', 'surface'],
  },
  {
    title: 'Gauss Law',
    simple: 'Total electric flux through a closed surface equals enclosed charge divided by epsilon0.',
    anchor: 'closed-surface flux counts enclosed charge only',
    definition: 'Gauss law: surface integral of E dot dA equals q enclosed by epsilon0.',
    formula: 'Phi_closed = q_enclosed / epsilon0',
    units: 'flux in N m^2 C^-1',
    example: 'A charge outside a closed surface changes local field but not net flux.',
    graph: 'Closed surface with field lines entering and leaving.',
    memory: 'Gauss counts what is inside the surface.',
    trap: 'Do not include charges outside the Gaussian surface in q_enclosed.',
    terms: ['closed surface', 'enclosed charge', 'epsilon0', 'net flux'],
  },
  {
    title: 'Choosing a Gaussian Surface',
    simple: 'Choose a surface that matches symmetry so E is constant or zero on parts of the surface.',
    anchor: 'Gauss law becomes useful only with symmetry',
    definition: 'A Gaussian surface is an imaginary closed surface chosen for flux calculation.',
    formula: 'integral E dot dA = q_enclosed / epsilon0',
    units: 'surface area in m^2, field in N C^-1',
    example: 'Use cylinder for line charge, pillbox for plane sheet and sphere for spherical charge.',
    graph: 'Symmetry map connects charge distribution to Gaussian surface.',
    memory: 'Line-cylinder, plane-pillbox, sphere-sphere.',
    trap: 'Gauss law is always true, but it gives E easily only when symmetry is high.',
    terms: ['symmetry', 'Gaussian surface', 'cylinder', 'pillbox'],
  },
  {
    title: 'Field Due to Infinite Line Charge',
    simple: 'An infinitely long uniformly charged line has radial field E = lambda/(2 pi epsilon0 r).',
    anchor: 'cylindrical symmetry makes E depend only on distance r',
    definition: 'Linear charge density lambda is charge per unit length of the line.',
    formula: 'E = lambda / (2 pi epsilon0 r)',
    units: 'N C^-1',
    example: 'Doubling distance from line halves the field.',
    graph: 'E-r graph for line charge decreases as 1/r.',
    memory: 'Line charge gives one-over-r field.',
    trap: 'Do not use point charge 1/r^2 formula for an infinite line.',
    terms: ['line charge', 'cylindrical surface', 'radial field', '1/r'],
  },
  {
    title: 'Field Due to Infinite Plane Sheet',
    simple: 'An infinite uniformly charged sheet produces constant field independent of distance.',
    anchor: 'plane symmetry gives same field everywhere on each side',
    definition: 'Surface charge density sigma is charge per unit area.',
    formula: 'E = sigma / (2 epsilon0)',
    units: 'N C^-1',
    example: 'Moving twice as far from an ideal infinite sheet does not change field.',
    graph: 'E-r graph is a horizontal line.',
    memory: 'Infinite sheet field stays steady.',
    trap: 'For two oppositely charged sheets, field between them becomes sigma/epsilon0.',
    terms: ['plane sheet', 'surface charge density', 'pillbox', 'constant field'],
  },
  {
    title: 'Field Due to a Spherical Shell',
    simple: 'A uniformly charged thin spherical shell acts like a point charge outside and gives zero field inside.',
    anchor: 'spherical symmetry makes outside field point-charge-like',
    definition: 'For a shell, all charge lies on spherical surface.',
    formula: 'E_out = kQ/r^2, E_inside = 0',
    units: 'N C^-1',
    example: 'At the centre of a charged shell, electric field is zero.',
    graph: 'E-r graph is zero inside and falls as 1/r^2 outside.',
    memory: 'Shell shields the inside.',
    trap: 'At the surface, specify just outside or just inside when needed.',
    terms: ['spherical shell', 'inside field', 'outside field', 'surface charge'],
  },
  {
    title: 'Field Due to Uniform Solid Sphere',
    simple: 'Inside a uniformly charged solid sphere, electric field increases linearly with r; outside it falls as 1/r^2.',
    anchor: 'enclosed charge grows as r^3 inside the sphere',
    definition: 'Uniform volume charge density means charge is spread throughout the volume.',
    formula: 'E_inside = kQ r/R^3, E_outside = kQ/r^2',
    units: 'N C^-1',
    example: 'Field at centre of uniformly charged solid sphere is zero.',
    graph: 'E-r graph rises linearly inside and decreases outside.',
    memory: 'Solid sphere: climb inside, fall outside.',
    trap: 'Do not use full Q for an internal Gaussian sphere; use enclosed charge.',
    terms: ['solid sphere', 'volume density', 'linear inside', 'enclosed charge'],
  },
  {
    title: 'Conductors in Electrostatic Equilibrium',
    simple: 'Inside a conductor at electrostatic equilibrium, electric field is zero and excess charge resides on the surface.',
    anchor: 'free charges move until internal field cancels',
    definition: 'Electrostatic equilibrium means no net motion of charges inside conductor.',
    formula: 'E_inside conductor = 0',
    units: 'electric field in N C^-1',
    example: 'A charged metal sphere has charge on its outer surface.',
    graph: 'Field is zero inside and perpendicular just outside the conductor surface.',
    memory: 'Conductor settles until inside field is cancelled.',
    trap: 'Zero field inside conductor does not mean conductor has no charge.',
    terms: ['electrostatic equilibrium', 'surface charge', 'zero internal field', 'perpendicular field'],
  },
  {
    title: 'Electrostatic Shielding',
    simple: 'A closed conductor protects its interior from external electrostatic fields.',
    anchor: 'charges rearrange on conductor surface to cancel internal field',
    definition: 'Electrostatic shielding is protection of a region by enclosing it in a conductor.',
    formula: 'E_cavity = 0 for electrostatic shielding by closed conductor',
    units: 'electric field in N C^-1',
    example: 'Sensitive instruments can be placed inside a conducting enclosure.',
    graph: 'External field lines terminate and rearrange on conductor surface, not inside cavity.',
    memory: 'Metal cage makes a quiet electrostatic room.',
    trap: 'Shielding here is for electrostatic fields; changing fields require deeper electromagnetic treatment.',
    terms: ['shielding', 'Faraday cage', 'cavity', 'surface redistribution'],
  },
  {
    title: 'Graphs in Electric Charges and Fields',
    simple: 'Graphs reveal whether a field follows 1/r^2, 1/r, constant, zero or linear behavior.',
    anchor: 'graph shape identifies the charge distribution',
    definition: 'A field graph plots magnitude of E versus distance from a symmetric charge distribution.',
    formula: 'point: 1/r^2, line: 1/r, sheet: constant, solid sphere inside: proportional to r',
    units: 'E in N C^-1 and distance in metre',
    example: 'A horizontal E-r graph suggests an infinite sheet in the ideal model.',
    graph: 'Compare point, line, sheet, shell and solid sphere graphs.',
    memory: 'Point falls fast, line falls slow, sheet does not fall.',
    trap: 'Check the region: inside and outside graphs for spheres are different.',
    terms: ['E-r graph', 'inverse square', 'constant field', 'linear region'],
  },
  {
    title: 'JEE and NEET Formula Mastery',
    simple: 'Most problems reduce to choosing the right model, converting units and applying vector direction correctly.',
    anchor: 'formula mastery means model selection plus units plus sign',
    definition: 'A formula is safe only when its assumptions match the situation.',
    formula: 'model -> formula -> SI conversion -> direction check',
    units: 'microC to C, cm to m, area to m^2',
    example: 'Use Gauss law for symmetric extended bodies, not for random charge clusters.',
    graph: 'Formula map links geometry to field formula.',
    memory: 'Model first, formula second.',
    trap: 'Using point-charge formula for an infinite sheet or line gives wrong distance dependence.',
    terms: ['model selection', 'unit conversion', 'limiting case', 'direction check'],
  },
  {
    title: 'Common Conceptual Traps',
    simple: 'Electrostatics traps usually involve sign, vector addition, Gaussian surfaces and field-line rules.',
    anchor: 'many scalar-looking formulas hide vector direction and assumptions',
    definition: 'A conceptual trap is a tempting shortcut that violates a physical rule.',
    formula: 'check sign, symmetry, SI unit and limiting case',
    units: 'all numerical answers should end with SI units',
    example: 'Field lines cannot cross because E has only one direction at a point.',
    graph: 'Trap map pairs wrong statement with correction.',
    memory: 'If the shortcut ignores direction, slow down.',
    trap: 'Do not include outside charges in q_enclosed for net flux.',
    terms: ['sign trap', 'field-line trap', 'Gauss trap', 'unit trap'],
  },
  {
    title: 'Final Revision Section',
    simple: 'Final revision links charge properties, Coulomb law, field, dipole, flux and Gauss law into one exam-ready dashboard.',
    anchor: 'the chapter is a chain from charge to field to flux to symmetry',
    definition: 'Revision sheet compresses formulas, graphs, diagrams, traps and question types.',
    formula: 'q=ne, F=kq1q2/r^2, E=F/q0, Phi=EA cos theta, Phi=q/epsilon0',
    units: 'C, N, N/C, N m^2/C',
    example: 'Before the exam, redraw field lines, Gaussian surfaces and sphere graphs once.',
    graph: 'One-page grid of all high-yield graph patterns.',
    memory: 'Charge -> Force -> Field -> Flux -> Gauss.',
    trap: 'Do not learn Gauss formulas without their symmetry conditions.',
    terms: ['revision', 'formula dashboard', 'diagram recall', 'exam strategy'],
  },
]

function makePractice(bp, index) {
  const q = index + 2
  const r = 0.1 * ((index % 5) + 1)
  const field = 9e9 * q * 1e-6 / (r * r)
  return {
    mcqs: [
      {
        question: `${bp.title}: which statement best captures the idea?`,
        answer: bp.anchor,
        solution: `The core idea is that ${bp.anchor}. This is the safest NCERT-level wording.`,
      },
      {
        question: `Which formula is most directly connected with ${bp.title}?`,
        answer: bp.formula,
        solution: `For this section, start from ${bp.formula} and then apply the correct physical condition.`,
      },
      {
        question: `Which unit check is relevant for ${bp.title}?`,
        answer: bp.units,
        solution: `The SI-unit layer prevents common numerical errors: ${bp.units}.`,
      },
      {
        question: `Which graph idea belongs to ${bp.title}?`,
        answer: bp.graph,
        solution: `The graph memory for this topic is: ${bp.graph}`,
      },
      {
        question: `What is the most likely trap in ${bp.title}?`,
        answer: bp.trap,
        solution: `This trap is common because students memorize the formula without its condition.`,
      },
    ],
    numericals: [
      {
        question: `A charge of ${q} microC is placed ${fmt(r)} m from a point. Estimate the field due to it using k = 9 x 10^9 SI.`,
        answer: `${fmt(field)} N C^-1`,
        solution: `E = kQ/r^2 = 9 x 10^9 x ${q} x 10^-6 / (${fmt(r)})^2 = ${fmt(field)} N C^-1.`,
      },
      {
        question: `A surface of area ${index + 1} m^2 is in a uniform field ${10 * (index + 1)} N C^-1 with area vector parallel to field. Find flux.`,
        answer: `${10 * (index + 1) * (index + 1)} N m^2 C^-1`,
        solution: `Phi = EA cos 0 = ${10 * (index + 1)} x ${index + 1} = ${10 * (index + 1) * (index + 1)} N m^2 C^-1.`,
      },
      {
        question: `A body has ${index + 3} excess electrons. Write its charge in terms of e.`,
        answer: `-${index + 3}e`,
        solution: `Excess electrons give negative charge, so q = -ne = -${index + 3}e.`,
      },
    ],
    assertionReason: [
      {
        assertion: `${bp.title}: ${bp.anchor}.`,
        reason: `This follows from ${bp.definition}`,
        answer: 'Both are true and the reason supports the assertion when the stated model applies.',
      },
      {
        assertion: `${bp.title}: SI units can be skipped if the formula is memorized.`,
        reason: 'Electrostatic formulas contain powers of metre and coulomb.',
        answer: 'Assertion is false but reason is true; SI conversion is essential.',
      },
    ],
    conceptual: {
      question: `Explain ${bp.title} in one sentence without using only a formula.`,
      answer: bp.simple,
      solution: `A strong conceptual answer says: ${bp.simple}`,
    },
    advanced: {
      question: `What limiting-case check makes ${bp.title} safer in JEE-style reasoning?`,
      answer: `Check direction, distance dependence and whether the symmetry/model behind ${bp.formula} is valid.`,
      solution: `Limiting cases expose wrong model selection, especially for point charge versus line, sheet or sphere.`,
    },
  }
}

const chapterSections = sectionBlueprints.map((bp, index) => ({
  id: slugify(bp.title),
  module: String(index + 1).padStart(2, '0'),
  title: bp.title,
  simple: bp.simple,
  ncert: `NCERT builds this idea around ${bp.anchor}. Use the language of source charge, test charge, field direction, symmetry and conservation rather than memorizing disconnected formulas.`,
  neet: `NEET usually asks direct fact, formula, graph or statement questions from this section. High-yield focus: ${bp.formula}; ${bp.trap}`,
  jeeMain: `JEE Main turns this into numerical reasoning by combining SI conversion, vector direction and model choice. Always check whether the geometry justifies the formula.`,
  advanced: `The deeper insight is that electrostatic formulas are symmetry statements. When symmetry changes, the distance dependence or direction can change even if charges remain stationary.`,
  definitions: [bp.definition, `Key condition: ${bp.anchor}.`, `Exam boundary: ${bp.trap}`],
  formulas: [bp.formula, 'k = 1/(4 pi epsilon0) = 9 x 10^9 N m^2 C^-2 where needed', 'Use vector addition for net force or net field'],
  derivation: `Start from the defining physical idea: ${bp.definition} Then apply ${bp.formula} under its valid condition. The mathematical step is safe only after direction, units and symmetry are fixed.`,
  units: [bp.units, 'Use coulomb, metre and newton in numerical substitution.', 'Check final dimensions before writing the answer.'],
  examples: [bp.example, `Formula check: ${bp.formula}.`, `Trap check: ${bp.trap}`],
  keyTerms: bp.terms,
  diagram: `${bp.graph} Draw clean arrows, labels and sign conventions.`,
  simulation: `Interactive slider idea: change charge, distance, angle or symmetry and watch ${bp.anchor} update visually.`,
  animation: `Animate field arrows or charge redistribution so students see why ${bp.simple.toLowerCase()}`,
  graph: bp.graph,
  flowchart: ['Identify source geometry', 'Choose model', 'Mark direction/sign', 'Convert SI units', 'Apply formula', 'Check limiting case'],
  infographic: `Compact card showing definition, formula, units, graph and common trap for ${bp.title}.`,
  memory: bp.memory,
  mistakes: [`Forgetting: ${bp.trap}`, 'Adding vector quantities as simple scalars.', 'Skipping SI conversion for microC or cm.'],
  traps: [bp.trap, 'Using a formula outside its symmetry condition.', 'Confusing field direction with force direction on a negative charge.'],
  ncertLine: bp.definition,
  neetYield: `Memorize ${bp.formula} with its exact condition.`,
  jeeYield: `Use ${bp.anchor} plus vector components for multi-step problems.`,
  practice: makePractice(bp, index),
}))

const chapterFlow = [
  'Charge properties',
  'Coulomb force',
  'Electric field',
  'Field lines',
  'Dipole',
  'Flux',
  'Gauss law',
  'Symmetric fields',
  'Conductors',
  'Revision',
]

const formulas = [
  ['charge-quantization', 'Quantization of Charge', 'q = ne', [['q', 'total charge', 'C'], ['n', 'integer number of elementary charges', 'unitless'], ['e', 'elementary charge = 1.6 x 10^-19 C', 'C']], 'Charge is granular at microscopic scale.', '[q] = C; n is dimensionless.', 'Allowed charges form equally spaced levels separated by e.', 'n must be an integer; fractional n is impossible for isolated charge.', '5 excess electrons give q = -5e.', 'A charge of 3.2 x 10^-19 C equals 2e.', 'If a body has 10^13 missing electrons, q = +1.6 microC.', 'Macroscopic charge appears continuous only because e is tiny.'],
  ['coulomb-law', 'Coulomb Law', 'F = k |q1 q2| / r^2', [['F', 'electrostatic force magnitude', 'N'], ['q1, q2', 'point charges', 'C'], ['r', 'separation', 'm'], ['k', '1/(4 pi epsilon0)', 'N m^2 C^-2']], 'Force grows with charge product and falls with square of distance.', '[kq1q2/r^2] = N.', 'F versus r is an inverse-square decreasing curve.', 'Convert microC to C and cm to m before substituting.', 'Doubling r makes F one-fourth.', 'Like charges repel; unlike charges attract.', 'For q1=2 microC, q2=3 microC, r=0.3 m, F=0.6 N.', 'The sign decides direction; magnitude is positive.'],
  ['coulomb-vector', 'Vector Coulomb Law', 'F12 = k q1 q2 r12_hat / r^2', [['F12', 'force on charge 1 due to charge 2', 'N'], ['r12_hat', 'unit vector along separation', 'unitless']], 'The force acts along the line joining the charges.', 'Unit vector has no dimension, so dimension is same as Coulomb law.', 'Vector arrows show equal and opposite action-reaction forces.', 'Do not drop direction when charges lie on axes.', 'Opposite signs reverse the chosen direction.', 'Force on q1 and q2 have equal magnitudes and opposite directions.', 'Use x and y components for non-collinear systems.', 'Vector form is the bridge to superposition.'],
  ['electric-field-definition', 'Electric Field Definition', 'E = F/q0', [['E', 'electric field', 'N C^-1'], ['F', 'force on test charge', 'N'], ['q0', 'small positive test charge', 'C']], 'Field is force experienced by unit positive test charge.', '[F/q] = N C^-1.', 'Field arrows show direction of force on a positive test charge.', 'Test charge should be small enough not to disturb source charges.', '10 N on 2 C gives E=5 N/C.', 'Direction of E is force direction on positive charge.', 'Force on negative charge is opposite to E.', 'Field can exist even with no test charge present.'],
  ['point-charge-field', 'Field Due to Point Charge', 'E = kQ/r^2', [['E', 'field magnitude', 'N C^-1'], ['Q', 'source charge', 'C'], ['r', 'distance from source', 'm']], 'Point charge field is radial and inverse-square.', '[kQ/r^2] = N C^-1.', 'E-r graph falls as 1/r^2.', 'Positive source gives outward field; negative gives inward field.', 'Doubling r makes E one-fourth.', 'At r=0.2 m from 1 microC, E=2.25 x 10^5 N/C.', 'Use superposition for multiple point charges.', 'Direction cannot be read from magnitude alone.'],
  ['superposition-field', 'Superposition of Fields', 'E_net = sum Ei', [['E_net', 'resultant field', 'N C^-1'], ['Ei', 'individual field contribution', 'N C^-1']], 'Fields add vectorially because each charge acts independently.', 'All terms have dimension N C^-1.', 'Vector triangle or components show cancellation/addition.', 'Do not add magnitudes if fields are not parallel.', 'Equal like charges cancel field at midpoint.', 'Equal unlike charges add at midpoint between them.', 'For perpendicular equal fields E, resultant is sqrt(2)E.', 'Superposition remains valid even for many charges.'],
  ['dipole-moment', 'Electric Dipole Moment', 'p = q(2a)', [['p', 'dipole moment', 'C m'], ['q', 'magnitude of either charge', 'C'], ['2a', 'separation between charges', 'm']], 'Dipole moment measures strength and orientation of a dipole.', '[q distance] = C m.', 'Dipole arrow points from negative to positive charge.', 'Do not use half separation a when formula requires full separation 2a.', 'q=2 microC, separation=0.1 m gives p=2 x 10^-7 C m.', 'Polar molecules have permanent dipole moment.', 'Torque depends on p, not on q alone.', 'Direction of p is conventional, not charge motion.'],
  ['dipole-axial', 'Dipole Field on Axial Line', 'E_axial = (1/(4 pi epsilon0)) 2p/r^3', [['E_axial', 'far axial dipole field', 'N C^-1'], ['p', 'dipole moment', 'C m'], ['r', 'distance from dipole centre', 'm']], 'Far axial dipole field points along p and falls as 1/r^3.', '[kp/r^3] = N C^-1.', 'Log graph slope is -3 in far field.', 'Formula assumes r much greater than dipole size.', 'Doubling r makes field one-eighth.', 'Axial field is twice equatorial field at same far r.', 'Use exact expression near the dipole.', 'Dipole field falls faster than point-charge field.'],
  ['dipole-equatorial', 'Dipole Field on Equatorial Line', 'E_equatorial = (1/(4 pi epsilon0)) p/r^3 opposite p', [['E_equatorial', 'far equatorial field', 'N C^-1'], ['p', 'dipole moment', 'C m'], ['r', 'distance from centre', 'm']], 'Far equatorial field is opposite to dipole moment.', '[kp/r^3] = N C^-1.', 'Magnitude has same 1/r^3 shape but half axial magnitude.', 'Direction is opposite p, a common trap.', 'If axial field is 20 N/C, equatorial field is 10 N/C at same r.', 'At equatorial points, components along line cancel and along axis add opposite p.', 'Use vector components, not scalar subtraction only.', 'The 2:1 comparison is high-yield.'],
  ['dipole-torque', 'Torque on Dipole', 'tau = pE sin theta', [['tau', 'torque', 'N m'], ['p', 'dipole moment', 'C m'], ['E', 'uniform field', 'N C^-1'], ['theta', 'angle between p and E', 'radian or degree']], 'Uniform field tries to align a dipole with E.', '[pE] = C m x N C^-1 = N m.', 'tau-theta graph is a sine curve.', 'Net force is zero only for uniform field.', 'At 90 degrees torque is pE.', 'At 0 degrees torque is zero and equilibrium is stable.', 'At 180 degrees torque is zero but equilibrium is unstable.', 'Torque can exist without net force.'],
  ['charge-density', 'Charge Densities', 'lambda=dq/dl, sigma=dq/dA, rho=dq/dV', [['lambda', 'linear charge density', 'C m^-1'], ['sigma', 'surface charge density', 'C m^-2'], ['rho', 'volume charge density', 'C m^-3']], 'Density describes how charge is spread over line, surface or volume.', 'Units follow charge divided by length, area or volume.', 'Density diagrams show line, sheet and solid distributions.', 'Choose density from geometry.', '4 microC over 2 m gives lambda=2 microC/m.', 'Plane sheet problems use sigma.', 'Solid sphere problems often use rho.', 'Continuous charge uses integration or symmetry.'],
  ['electric-flux', 'Electric Flux', 'Phi = E A cos theta', [['Phi', 'electric flux', 'N m^2 C^-1'], ['E', 'electric field', 'N C^-1'], ['A', 'area', 'm^2'], ['theta', 'angle between E and area vector', 'degree/radian']], 'Flux measures field passing through a surface.', '[EA] = N m^2 C^-1.', 'Phi-theta graph is cosine.', 'Theta is with area vector, not surface plane.', 'E=10, A=3, theta=0 gives Phi=30.', 'At theta=90 degrees flux is zero.', 'Negative flux means field enters relative to chosen outward normal.', 'Flux is scalar but can be signed.'],
  ['gauss-law', 'Gauss Law', 'closed flux = q_enclosed/epsilon0', [['q_enclosed', 'charge inside Gaussian surface', 'C'], ['epsilon0', 'permittivity of free space', 'C^2 N^-1 m^-2']], 'Net flux through a closed surface counts enclosed charge.', '[q/epsilon0] = N m^2 C^-1.', 'Closed surface diagrams show outgoing minus incoming line count.', 'Outside charges do not change net flux.', 'If q enclosed is zero, net flux is zero.', 'Field can be non-zero even when net flux is zero.', 'Useful field calculations need symmetry.', 'Gauss law is universal; simple E formulas are symmetry-dependent.'],
  ['line-charge-field', 'Infinite Line Charge Field', 'E = lambda/(2 pi epsilon0 r)', [['lambda', 'linear charge density', 'C m^-1'], ['r', 'distance from line', 'm']], 'Line charge field decreases as 1/r.', 'lambda/(epsilon0 r) has unit N/C.', 'E-r graph is a decreasing 1/r curve.', 'Do not use point charge 1/r^2 dependence.', 'Doubling r halves E.', 'Cylindrical Gaussian surface is used.', 'Only curved surface contributes flux.', 'This is an ideal infinite-line model.'],
  ['plane-sheet-field', 'Infinite Plane Sheet Field', 'E = sigma/(2 epsilon0)', [['sigma', 'surface charge density', 'C m^-2'], ['epsilon0', 'permittivity', 'C^2 N^-1 m^-2']], 'Infinite sheet field is constant with distance.', 'sigma/epsilon0 has unit N/C.', 'E-r graph is horizontal.', 'Formula is for one non-conducting infinite sheet.', 'Two opposite plates give E=sigma/epsilon0 between them.', 'Pillbox Gaussian surface is used.', 'Outside two equal opposite plates ideal field cancels.', 'Independence from distance is idealization.'],
  ['spherical-shell-field', 'Spherical Shell Field', 'E_out=kQ/r^2, E_inside=0', [['Q', 'total shell charge', 'C'], ['r', 'distance from centre', 'm']], 'A shell acts as point charge outside and shields inside.', 'Both expressions give N/C.', 'Graph is zero inside, then inverse-square outside.', 'Specify just inside or just outside at the surface.', 'Centre field is zero.', 'Outside field at distance r equals point charge field.', 'Use spherical Gaussian surface.', 'Inside zero field is not because charge is absent on shell.'],
  ['solid-sphere-field', 'Uniform Solid Sphere Field', 'E_inside=kQr/R^3, E_out=kQ/r^2', [['R', 'sphere radius', 'm'], ['r', 'distance from centre', 'm']], 'Inside field increases linearly; outside falls as point-charge field.', 'kQr/R^3 gives N/C.', 'Graph rises to surface then decreases.', 'Inside use enclosed charge, not total charge.', 'At centre E=0.', 'At surface both formulas match.', 'Enclosed charge is Q r^3/R^3.', 'This is a favorite graph trap.'],
  ['conductor-field', 'Conductor in Electrostatic Equilibrium', 'E_inside = 0, E_just outside = sigma/epsilon0', [['sigma', 'surface charge density', 'C m^-2'], ['E', 'field', 'N C^-1']], 'Free charges rearrange until internal field is zero.', 'sigma/epsilon0 has unit N/C.', 'Field jumps at conducting surface.', 'Zero field inside does not mean zero surface charge.', 'Excess charge lies on outer surface.', 'Field just outside is perpendicular to surface.', 'Electrostatic shielding follows from this.', 'This applies in electrostatic equilibrium.'],
  ['force-in-field', 'Force on Charge in Field', 'F = qE', [['F', 'force', 'N'], ['q', 'charge placed in field', 'C'], ['E', 'electric field', 'N C^-1']], 'A charge in an electric field experiences force.', '[qE] = C x N/C = N.', 'Force arrows follow E for positive q and oppose E for negative q.', 'Do not use E direction for negative charge force.', 'q=2 C in E=5 N/C gives F=10 N.', 'Electron force is opposite to field.', 'Uniform field gives constant force.', 'This links field concept to motion questions.'],
]

const formulaObjects = formulas.map(([id, title, formula, symbols, meaning, dimension, graph, trap, easyExample, neetExample, jeeExample, twist]) => ({
  id, title, formula, display: formula, symbols, meaning, dimension, graph, trap, easyExample, neetExample, jeeExample, twist,
}))

const formulaGroups = [
  { title: 'Charge Basics', formulas: ['charge-quantization', 'charge-density'] },
  { title: 'Force and Field', formulas: ['coulomb-law', 'coulomb-vector', 'electric-field-definition', 'point-charge-field', 'force-in-field', 'superposition-field'] },
  { title: 'Dipole', formulas: ['dipole-moment', 'dipole-axial', 'dipole-equatorial', 'dipole-torque'] },
  { title: 'Flux and Gauss', formulas: ['electric-flux', 'gauss-law', 'line-charge-field', 'plane-sheet-field'] },
  { title: 'Spherical and Conductors', formulas: ['spherical-shell-field', 'solid-sphere-field', 'conductor-field'] },
]

const derivations = [
  ['point-field', 'Electric Field Due to a Point Charge', 'Coulomb law F = kQq0/r^2 and E = F/q0', [['Force on test charge', 'F = kQq0/r^2', 'The source charge Q exerts force on small positive test charge q0.'], ['Divide by test charge', 'E = F/q0 = kQ/r^2', 'Field is force per unit positive charge.'], ['Direction', 'For Q positive E is outward; for Q negative E is inward', 'Direction comes from sign of source charge.'], ['Result', 'E = (1/(4 pi epsilon0)) Q/r^2', 'Magnitude follows inverse-square law.']], 'E = kQ/r^2', 'For point charge field, remove the test charge from Coulomb force by dividing by q0.', 'Start with Coulomb law, define field, cancel q0, then state direction.', 'Do not keep q0 in final field due to source charge.'],
  ['dipole-axial', 'Field on Axial Line of an Electric Dipole', 'Two charges +q and -q separated by 2a', [['Write fields', 'E_plus = kq/(r-a)^2, E_minus = kq/(r+a)^2', 'At axial point outside, fields oppose along the axis.'], ['Subtract magnitudes', 'E = kq[(1/(r-a)^2) - (1/(r+a)^2)]', 'The nearer charge contribution is stronger.'], ['Simplify', 'E = kq(4ar)/(r^2-a^2)^2', 'Algebra combines the inverse-square terms.'], ['Far point', 'For r >> a, E = k(2p)/r^3', 'Since p=2qa, dipole field falls as 1/r^3.']], 'E_axial = k(2p)/r^3 for r >> a', 'Axial field has factor 2.', 'Draw the dipole first and show which two fields oppose before subtracting.', 'Do not use far-field formula when r is comparable to a.'],
  ['dipole-equatorial', 'Field on Equatorial Line of an Electric Dipole', 'Point on perpendicular bisector of dipole', [['Equal distances', 'Distance from each charge = sqrt(r^2+a^2)', 'Field magnitudes due to +q and -q are equal.'], ['Resolve components', 'Perpendicular components cancel, axial components add opposite to p', 'Symmetry decides direction.'], ['Exact form', 'E = kp/(r^2+a^2)^(3/2)', 'Result points opposite to dipole moment.'], ['Far point', 'For r >> a, E = kp/r^3', 'Equatorial magnitude is half axial magnitude at same r.']], 'E_equatorial = kp/r^3 opposite to p for r >> a', 'Equatorial field has no factor 2 and points opposite p.', 'Use components and state cancellation before final formula.', 'Do not draw equatorial field along dipole moment.'],
  ['dipole-torque', 'Torque on a Dipole in Uniform Field', 'Forces on +q and -q in uniform E', [['Forces', '+q feels qE along E and -q feels qE opposite E', 'Forces are equal and opposite.'], ['Net force', 'F_net = 0', 'Uniform field gives no translational acceleration of dipole centre.'], ['Torque arm', 'Perpendicular separation gives lever arm 2a sin theta', 'The pair of forces forms a couple.'], ['Result', 'tau = qE(2a sin theta) = pE sin theta', 'Torque aligns p with E.']], 'tau = pE sin theta', 'Maximum torque at 90 degrees.', 'Draw force pair and lever arm; then write p=2qa.', 'Do not say a uniform field gives net force on an ideal dipole.'],
  ['flux-flat', 'Electric Flux Through a Flat Surface', 'Uniform field E and area vector A', [['Area vector', 'A is normal to surface', 'Flux counts crossing relative to the normal.'], ['Component', 'Effective field through surface = E cos theta', 'Only normal component crosses the surface.'], ['Multiply area', 'Phi = (E cos theta)A', 'Field through every part is same for uniform E.'], ['Result', 'Phi = EA cos theta', 'Flux can be positive, zero or negative.']], 'Phi = EA cos theta', 'If theta = 90 degrees, flux is zero.', 'State theta is with area vector, not the plane.', 'Using angle with the surface instead of normal gives sine/cosine error.'],
  ['gauss-line', 'Field Due to Infinite Line Charge', 'Gauss law closed flux = q_enclosed/epsilon0', [['Choose surface', 'Use coaxial cylinder of radius r and length l', 'Cylindrical symmetry makes E constant on curved surface.'], ['Flux', 'Phi = E(2 pi r l)', 'End caps have zero flux because E is radial.'], ['Enclosed charge', 'q_enclosed = lambda l', 'Charge enclosed depends on cylinder length.'], ['Solve', 'E(2 pi r l)=lambda l/epsilon0', 'Length cancels, giving E = lambda/(2 pi epsilon0 r).']], 'E = lambda/(2 pi epsilon0 r)', 'Line charge field falls as 1/r.', 'Draw the Gaussian cylinder and mark zero flux through caps.', 'Do not include end-cap area in flux.'],
  ['gauss-sheet', 'Field Due to Infinite Plane Sheet', 'Gauss law with pillbox surface', [['Choose surface', 'Use pillbox crossing the sheet', 'Plane symmetry makes field perpendicular and equal on both sides.'], ['Flux', 'Phi = EA + EA = 2EA', 'Curved side has zero flux.'], ['Enclosed charge', 'q_enclosed = sigma A', 'Charge inside equals density times pillbox face area.'], ['Solve', '2EA = sigma A/epsilon0', 'Area cancels, giving constant field.']], 'E = sigma/(2 epsilon0)', 'Infinite sheet field is independent of distance.', 'Draw pillbox with two equal outward flux faces.', 'Do not use 1/r^2 for an infinite sheet.'],
  ['gauss-shell', 'Field Due to Spherical Shell', 'Gauss law with spherical Gaussian surface', [['Outside surface', 'For r>R, q_enclosed=Q', 'Spherical symmetry makes E constant on sphere.'], ['Outside flux', 'E(4 pi r^2)=Q/epsilon0', 'Solve as point charge at centre.'], ['Inside surface', 'For r<R, q_enclosed=0', 'No charge lies inside inner Gaussian sphere.'], ['Inside result', 'E=0', 'Flux zero and symmetry give zero field inside shell.']], 'E_out = kQ/r^2, E_inside = 0', 'Shell is zero-field inside and point-like outside.', 'Separate inside and outside cases clearly.', 'Do not use outside formula inside the shell.'],
  ['solid-sphere', 'Field of Uniformly Charged Solid Sphere', 'Uniform volume charge density rho', [['Inside charge', 'q_enclosed = Q(r^3/R^3)', 'Charge enclosed grows with volume.'], ['Inside Gauss law', 'E(4 pi r^2)=Q r^3/(R^3 epsilon0)', 'Only enclosed charge contributes to net flux.'], ['Inside result', 'E = kQr/R^3', 'Field rises linearly from centre.'], ['Outside result', 'E = kQ/r^2', 'Outside the whole sphere behaves like point charge.']], 'E_inside = kQr/R^3, E_outside = kQ/r^2', 'Inside linear, outside inverse-square.', 'Show q enclosed before applying Gauss law.', 'Using total Q for an inside point is wrong.'],
  ['conductor-surface', 'Field Near Charged Conducting Surface', 'Small pillbox crossing conductor surface', [['Inside field', 'E inside conductor = 0', 'Free charges cancel internal field at equilibrium.'], ['Flux', 'Only outside pillbox face contributes: Phi = EA', 'Side flux is negligible for tiny pillbox.'], ['Charge enclosed', 'q_enclosed = sigma A', 'Surface charge lies on conductor.'], ['Gauss law', 'EA = sigma A/epsilon0', 'Field just outside is sigma/epsilon0 and perpendicular.']], 'E = sigma/epsilon0 just outside conductor', 'Conductor surface field is twice that of one isolated nonconducting sheet.', 'Mention electrostatic equilibrium and perpendicular field.', 'Do not apply this formula to an arbitrary nonconducting surface.'],
  ['gauss-law-statement', 'Gauss Law from Flux Counting', 'Flux through closed surface', [['Field line idea', 'More outward lines mean positive enclosed charge', 'Flux is a signed count of field crossing.'], ['Closed surface', 'Lines from outside enter and leave in pairs', 'External charges give zero net flux through a closed surface.'], ['Enclosed source', 'Lines beginning or ending inside cause net flux', 'Only enclosed charge matters.'], ['Mathematical statement', 'Integral E dot dA = q_enclosed/epsilon0', 'This is Gauss law.']], 'closed flux = q_enclosed/epsilon0', 'Outside charges can change local E but not net closed flux.', 'Explain with field lines, then write the integral statement.', 'Zero net flux does not always mean zero field everywhere.'],
  ['energy-dipole', 'Potential Energy of Dipole in Uniform Field', 'Work done by torque while rotating dipole', [['Torque', 'tau = pE sin theta', 'Field tries to reduce theta.'], ['Small work', 'dW_ext = tau dtheta for slow rotation against field', 'External agent stores energy.'], ['Integrate', 'U(theta)-U(90 deg) = -pE cos theta', 'Choose convenient zero at 90 degrees.'], ['Result', 'U = -pE cos theta', 'Minimum energy at theta=0.']], 'U = -pE cos theta', 'Stable equilibrium has minimum energy.', 'This is advanced foundation; include only if asked beyond NCERT basics.', 'Do not confuse torque zero at 0 and 180 degrees; stability differs.'],
]

const derivationObjects = derivations.map(([id, title, startsFrom, steps, finalFormula, shortcut, boardStyle, mistake]) => ({
  id, title, startsFrom, steps, finalFormula, shortcut, boardStyle, mistake,
}))

const visualPlans = [
  ['charge-signs', 'Positive and Negative Charge', 'Infographic', 'charge-signs', 'Two charge types with force arrows.', ['+ charge', '- charge', 'repel', 'attract'], 'Sign decides direction of electrostatic interaction.', 'Students stop treating charge as only a magnitude.', 'Draw plus/minus circles and arrows between like/unlike pairs.', 'Use SVG circles, signs and arrows; no external assets.', '2D infographic', 'Reusable charge-pair SVG with color-coded arrows.'],
  ['quantization', 'Quantization Ladder', 'Infographic', 'quantization', 'Allowed charge values as integer multiples of e.', ['-3e', '-2e', '-e', '0', '+e', '+2e'], 'Charge is discrete microscopically.', 'Removes fractional-electron misconception.', 'Draw equally spaced ticks on a number line.', 'SVG number line with labelled charge packets.', '2D infographic', 'Map integers to ticks and labels.'],
  ['conservation', 'Charge Conservation During Transfer', 'Infographic', 'conservation', 'Before-after charge bookkeeping.', ['before', 'after', 'net charge'], 'Total isolated charge remains constant.', 'Students learn sign-aware addition.', 'Draw two bodies before and after with same net sum.', 'SVG bar cards with algebra labels.', 'Infographic', 'Generate before/after blocks from charge values.'],
  ['conductor-insulator', 'Conductor vs Insulator', 'Infographic', 'conductor-insulator', 'Mobile versus localized charges.', ['metal', 'plastic', 'free electrons'], 'Material response depends on charge mobility.', 'Stops belief that insulators cannot be charged.', 'Draw moving dots in metal and fixed dots in insulator.', 'SVG split panel with mobile/fixed charge dots.', 'Animated infographic', 'Animate conductor dots lightly; keep insulator dots fixed.'],
  ['induction', 'Charging by Induction Sequence', 'Infographic', 'induction', 'Four-step induction process.', ['charged rod', 'ground', 'separation', 'final charge'], 'A body can be charged without contact.', 'Clarifies final charge sign after grounding.', 'Draw rod near sphere, ground wire, then removal sequence.', 'SVG step panels with arrows.', 'Flowchart infographic', 'Four SVG mini panels arranged responsively.'],
  ['coulomb-repel', 'Coulomb Force for Like Charges', 'Field', 'coulomb-repel', 'Repulsive force along line of centres.', ['q1', 'q2', 'F12', 'F21', 'r'], 'Like charges repel with equal and opposite forces.', 'Separates magnitude from direction.', 'Draw two plus charges and arrows away.', 'SVG charges and bidirectional force arrows.', '2D vector diagram', 'Use marker-end arrows from charge centers outward.'],
  ['coulomb-attract', 'Coulomb Force for Unlike Charges', 'Field', 'coulomb-attract', 'Attractive force along line of centres.', ['+q', '-q', 'attraction', 'r'], 'Unlike charges attract.', 'Students see negative sign as direction.', 'Draw plus and minus with arrows toward each other.', 'SVG charge pair with inward arrows.', '2D vector diagram', 'Reuse charge-pair component with sign switch.'],
  ['force-distance', 'Force vs Distance Graph', 'Graph', 'force-distance', 'Inverse-square decrease of Coulomb force.', ['F', 'r', '1/r^2'], 'Force decreases rapidly with separation.', 'Stops linear graph misconception.', 'Draw steep decreasing curve.', 'SVG axes and y=1/r^2 path.', 'Graph-based', 'Generate points from inverse-square function.'],
  ['superposition', 'Superposition Vector Addition', 'Field', 'superposition', 'Two field vectors forming a resultant.', ['E1', 'E2', 'E_net'], 'Net field is vector sum.', 'Students stop adding magnitudes blindly.', 'Draw two arrows and diagonal resultant.', 'SVG vector triangle/parallelogram.', 'Vector diagram', 'Reusable arrows with component labels.'],
  ['field-positive', 'Field of Positive Point Charge', 'Field', 'field-positive', 'Radial outward field lines.', ['+Q', 'E outward'], 'Positive source pushes positive test charge outward.', 'Clarifies field direction.', 'Draw arrows radiating outward.', 'SVG radial arrows from central charge.', 'Field-line diagram', 'Compute arrow endpoints around circle.'],
  ['field-negative', 'Field of Negative Point Charge', 'Field', 'field-negative', 'Radial inward field lines.', ['-Q', 'E inward'], 'Negative source pulls positive test charge inward.', 'Avoids reversing negative source field.', 'Draw arrows pointing toward centre.', 'SVG radial arrows to central charge.', 'Field-line diagram', 'Reverse marker direction from positive case.'],
  ['field-rules', 'Electric Field Line Rules', 'Infographic', 'field-rules', 'Rules for drawing field lines.', ['start +', 'end -', 'never cross', 'density'], 'Field lines encode direction and strength.', 'Removes intersection and closed-loop mistakes.', 'Draw mini rules with ticks/crosses.', 'SVG rule cards.', 'Infographic', 'Grid of labelled mini diagrams.'],
  ['uniform-field', 'Uniform Electric Field', 'Field', 'uniform-field', 'Parallel equally spaced field arrows.', ['uniform E', '+ plate', '- plate'], 'Uniform field has same magnitude and direction everywhere.', 'Shows why force is constant.', 'Draw parallel arrows from + plate to - plate.', 'SVG plates and parallel arrows.', 'Field-line diagram', 'Generate evenly spaced arrows.'],
  ['dipole-field', 'Dipole Field Lines', 'Field', 'dipole-field', 'Curved lines from positive to negative charge.', ['+q', '-q', 'field lines'], 'Dipole field pattern is directional and symmetric.', 'Clarifies line start and end.', 'Draw plus and minus with curved connecting lines.', 'SVG Bezier curves with arrowheads.', 'Field-line diagram', 'Use mirrored Bezier paths.'],
  ['dipole-axial', 'Dipole Axial Point', 'Field', 'dipole-axial', 'Axial line field components.', ['axial line', 'p', 'E axial'], 'Axial field is along p in far field.', 'Removes 2 factor confusion.', 'Draw point on dipole axis and component arrows.', 'SVG dipole with point and arrows.', 'Vector diagram', 'Use line-of-axis component labels.'],
  ['dipole-equatorial', 'Dipole Equatorial Point', 'Field', 'dipole-equatorial', 'Equatorial line field direction.', ['equatorial line', 'E opposite p'], 'Equatorial field points opposite p.', 'Removes direction trap.', 'Draw point on perpendicular bisector.', 'SVG dipole with perpendicular point and resultant.', 'Vector diagram', 'Use component cancellation arrows.'],
  ['dipole-torque', 'Dipole Torque in Uniform Field', 'Field', 'dipole-torque', 'Forces on dipole in uniform field create torque.', ['p', 'E', 'theta', 'tau'], 'Uniform field rotates dipole.', 'Separates net force zero from torque nonzero.', 'Draw tilted dipole in parallel field.', 'SVG rotated dipole with force arrows.', 'Animated vector diagram', 'Rotate dipole group based on theta.'],
  ['charge-density', 'Continuous Charge Densities', 'Infographic', 'charge-density', 'Line, surface and volume charge density.', ['lambda', 'sigma', 'rho'], 'Extended charge is described by density.', 'Students choose correct density symbol.', 'Draw charged line, sheet and solid.', 'SVG three mini panels.', 'Infographic', 'Reusable density icons.'],
  ['flux-surface', 'Electric Flux Through Surface', 'Field', 'flux-surface', 'Area vector and field crossing surface.', ['E', 'A vector', 'theta', 'Phi'], 'Flux depends on component normal to surface.', 'Angle with normal becomes clear.', 'Draw tilted surface with normal and field arrows.', 'SVG slanted plane and arrows.', '3D-like 2D diagram', 'Use polygon for surface and arrow normal.'],
  ['flux-angle', 'Flux vs Angle Graph', 'Graph', 'flux-angle', 'Cosine variation of flux.', ['Phi', 'theta', '0', '90 deg'], 'Flux is maximum at 0 degrees and zero at 90 degrees.', 'Removes sine/cosine confusion.', 'Draw cosine curve from 0 to 180.', 'SVG axes with cosine path.', 'Graph-based', 'Generate points from cos theta.'],
  ['gauss-closed', 'Gauss Law Closed Surface', 'Field', 'gauss-closed', 'Closed surface enclosing charge.', ['q enclosed', 'outward normal', 'flux'], 'Net flux depends on enclosed charge.', 'Students ignore outside charges for q enclosed.', 'Draw closed oval with charge inside and field arrows.', 'SVG closed surface with normals.', 'Field diagram', 'Ellipse plus radial arrows crossing boundary.'],
  ['gaussian-sphere', 'Gaussian Sphere', 'Field', 'gaussian-sphere', 'Spherical Gaussian surface around charge.', ['r', 'E constant', '4 pi r^2'], 'Spherical symmetry gives constant E on sphere.', 'Shows why E comes out of integral.', 'Draw charge at centre with spherical shell.', 'SVG circle surface and radial arrows.', 'Symmetry diagram', 'Circle represents sphere cross-section.'],
  ['gaussian-cylinder', 'Line Charge Gaussian Cylinder', 'Field', 'gaussian-cylinder', 'Cylinder around infinite line charge.', ['lambda', 'r', '2 pi r l'], 'Cylindrical symmetry for line charge.', 'Students see cap flux is zero.', 'Draw line through cylinder with radial arrows.', 'SVG cylinder illusion and arrows.', 'Symmetry diagram', 'Use ellipses and side lines for cylinder.'],
  ['pillbox', 'Plane Sheet Pillbox', 'Field', 'pillbox', 'Pillbox Gaussian surface across sheet.', ['sigma', 'EA', 'EA'], 'Plane sheet field exits both faces.', 'Clarifies factor 2.', 'Draw sheet with tiny cylinder crossing it.', 'SVG rectangle sheet and pillbox.', 'Symmetry diagram', 'Highlight two equal flux faces.'],
  ['shell-graph', 'Spherical Shell Field Graph', 'Graph', 'shell-graph', 'Zero inside, inverse-square outside.', ['E', 'r', 'R', 'inside zero'], 'Shell shields its interior.', 'Stops using outside formula inside.', 'Draw zero line until R then decreasing curve.', 'SVG piecewise graph.', 'Graph-based', 'Generate two path segments.'],
  ['solid-sphere-graph', 'Uniform Solid Sphere Field Graph', 'Graph', 'solid-sphere-graph', 'Linear rise inside, inverse-square fall outside.', ['E', 'r', 'R'], 'Inside enclosed charge grows with r^3.', 'Students see two regions.', 'Draw straight rising line then falling curve.', 'SVG piecewise graph.', 'Graph-based', 'Use line then inverse-square path.'],
  ['conductor-surface', 'Conducting Surface Field', 'Field', 'conductor-surface', 'Zero field inside, perpendicular field outside.', ['E inside = 0', 'surface charge', 'perpendicular E'], 'Conductor equilibrium removes internal field.', 'Shows charge can exist with zero inside field.', 'Draw metal surface with arrows outside only.', 'SVG conductor slab and normal arrows.', 'Field diagram', 'No arrows inside conductor region.'],
  ['shielding', 'Electrostatic Shielding', 'Infographic', 'shielding', 'Conducting shell blocks internal field.', ['external E', 'cavity', 'E=0'], 'Faraday cage idea for electrostatics.', 'Clarifies shielding is due to surface charge rearrangement.', 'Draw box with field outside and quiet cavity.', 'SVG conducting enclosure with no inner arrows.', 'Infographic', 'Use outer arrows stopping at surface.'],
  ['field-zero-conductor', 'Field Inside Conductor', 'Graph', 'field-zero-conductor', 'E is zero throughout conductor interior.', ['inside', 'surface', 'outside'], 'Charges move until field cancels inside.', 'Prevents no-charge misconception.', 'Draw region graph: zero inside, jump at surface.', 'SVG step-like graph.', 'Graph-based', 'Piecewise horizontal and jump marker.'],
  ['trap-map', 'Electrostatics Trap Map', 'Infographic', 'trap-map', 'Common errors and corrections.', ['SI units', 'direction', 'symmetry', 'q enclosed'], 'Error prevention through checkpoints.', 'Students learn what to check before solving.', 'Draw four warning cards.', 'SVG card grid with icons/text.', 'Infographic', 'Static responsive SVG trap dashboard.'],
].map(([id, title, category, diagramType, shows, labels, concept, removesConfusion, manual, digital, mode, implementation]) => ({
  id, title, category, diagramType, shows, labels, concept, removesConfusion, manual, digital, mode, implementation,
}))

const summaryTables = [
  { title: 'Charge Properties', columns: ['Property', 'Meaning', 'Formula/Point', 'Trap'], rows: [['Quantization', 'Charge packets', 'q=ne', 'n integer'], ['Conservation', 'Total isolated charge fixed', 'sum q before=sum q after', 'add signs'], ['Additivity', 'Net charge is algebraic sum', 'qnet=sum qi', 'do not add magnitudes'], ['Types', 'positive/negative', 'like repel unlike attract', 'sign gives direction']] },
  { title: 'Point Charge Force vs Field', columns: ['Quantity', 'Formula', 'Unit', 'Direction'], rows: [['Force', 'F=k|q1q2|/r^2', 'N', 'depends on both signs'], ['Field', 'E=kQ/r^2', 'N/C', 'outward for +Q inward for -Q'], ['Force in field', 'F=qE', 'N', 'opposite E for negative q']] },
  { title: 'Dipole Summary', columns: ['Case', 'Formula', 'Direction', 'High-yield note'], rows: [['Moment', 'p=q(2a)', 'minus to plus', 'full separation'], ['Axial far field', '2kp/r^3', 'along p', 'factor 2'], ['Equatorial far field', 'kp/r^3', 'opposite p', 'half axial'], ['Torque', 'pE sin theta', 'aligns p with E', 'zero net force in uniform E']] },
  { title: 'Flux and Gauss Law', columns: ['Idea', 'Formula', 'Condition', 'Trap'], rows: [['Flat flux', 'Phi=EA cos theta', 'uniform E flat area', 'angle with area vector'], ['Closed flux', 'qenc/epsilon0', 'closed surface', 'outside charge not in qenc'], ['Gaussian surface', 'choose symmetry', 'line/sheet/sphere', 'law true but not always useful']] },
  { title: 'Gauss Applications', columns: ['Distribution', 'Gaussian surface', 'Field', 'Graph'], rows: [['Line charge', 'cylinder', 'lambda/(2pi epsilon0 r)', '1/r'], ['Plane sheet', 'pillbox', 'sigma/(2epsilon0)', 'constant'], ['Spherical shell outside', 'sphere', 'kQ/r^2', '1/r^2'], ['Shell inside', 'sphere', '0', 'zero']] },
  { title: 'Spherical Charge Graphs', columns: ['Object', 'Inside', 'At centre', 'Outside'], rows: [['Thin shell', 'E=0', '0', 'kQ/r^2'], ['Solid sphere', 'E=kQr/R^3', '0', 'kQ/r^2'], ['Conductor', 'E=0 in material', '0 if cavity empty', 'perpendicular at surface']] },
  { title: 'Conductor Facts', columns: ['Fact', 'Meaning', 'Exam line'], rows: [['E inside zero', 'charges have settled', 'electrostatic equilibrium'], ['Charge on surface', 'excess charge leaves bulk', 'surface charge density may vary'], ['Field perpendicular', 'no tangential component at surface', 'otherwise charges move'], ['Shielding', 'closed conductor protects cavity', 'Faraday cage idea']] },
  { title: 'NEET vs JEE Question Patterns', columns: ['Area', 'NEET pattern', 'JEE Main pattern'], rows: [['Charge basics', 'q=ne facts', 'charge transfer bookkeeping'], ['Coulomb law', 'direct force/distance', 'vector superposition'], ['Field lines', 'correct/incorrect statements', 'field cancellation points'], ['Gauss law', 'formula applications', 'derive and graph piecewise fields']] },
]

const memoryHooks = [
  ['Quantization', 'Charge comes in coins of e.'],
  ['Conservation', 'Charge bookkeeping always balances in an isolated system.'],
  ['Coulomb law', 'Charge product on top, distance squared below.'],
  ['Field direction', 'Positive source sends field out; negative source pulls field in.'],
  ['Superposition', 'Add arrows, not just numbers.'],
  ['Dipole moment', 'p points from minus to plus.'],
  ['Axial/equatorial', 'Axial has 2; equatorial opposes p.'],
  ['Flux', 'Area vector decides cosine.'],
  ['Gauss law', 'Closed flux counts only inside charge.'],
  ['Gaussian surfaces', 'Line-cylinder, plane-pillbox, sphere-sphere.'],
]

const topFormulas = formulaObjects.slice(0, 18).map((item) => item.display).concat([
  'Phi_closed = q_enclosed/epsilon0',
  'E_between two opposite infinite sheets = sigma/epsilon0',
  'E_inside conductor = 0',
  'E_just outside conductor = sigma/epsilon0',
  'q_enclosed inside solid sphere = Qr^3/R^3',
  'E inside solid sphere = kQr/R^3',
  'F on negative charge is opposite to E',
])

const topConcepts = [
  'Charge is quantized as q=ne.',
  'Total charge is conserved in an isolated system.',
  'Coulomb force is mutual, equal and opposite.',
  'Electric field is force per unit positive test charge.',
  'Field direction is the force direction on a positive charge.',
  'Point charge field follows inverse-square law.',
  'Net field is vector sum of individual fields.',
  'Field lines start on positive charge and end on negative charge.',
  'Field lines never intersect.',
  'Dipole moment points from negative charge to positive charge.',
  'Far dipole field varies as 1/r^3.',
  'Uniform field gives dipole torque but zero net force.',
  'Flux depends on area vector, not just area.',
  'Gauss law counts enclosed charge for net closed flux.',
  'Gaussian surface choice depends on symmetry.',
  'Infinite line charge field varies as 1/r.',
  'Infinite sheet field is distance-independent.',
  'Spherical shell field is zero inside.',
  'Uniform solid sphere field rises linearly inside.',
  'Conductor has zero electric field inside at electrostatic equilibrium.',
]

const topTraps = [
  'Using fractional n in q=ne.',
  'Adding charge magnitudes instead of algebraic charges.',
  'Forgetting microC to C conversion.',
  'Using distance in cm inside Coulomb law.',
  'Ignoring direction in vector superposition.',
  'Drawing field lines from negative to positive.',
  'Allowing field lines to cross.',
  'Using point-charge formula for line or sheet charge.',
  'Forgetting axial dipole field has factor 2.',
  'Drawing equatorial dipole field along p.',
  'Using angle with surface instead of area vector in flux.',
  'Including outside charges in q enclosed.',
  'Using total Q for inside point of solid sphere.',
  'Saying zero field inside conductor means no surface charge.',
  'Forgetting force on negative charge is opposite to field.',
]

const topDiagrams = [
  'Like and unlike charge force arrows',
  'Quantization number line',
  'Charging by induction sequence',
  'Point charge radial field lines',
  'Electric dipole field lines',
  'Dipole axial and equatorial diagrams',
  'Flux through tilted surface',
  'Gaussian cylinder for line charge',
  'Pillbox for plane sheet',
  'Spherical shell and solid sphere E-r graphs',
]

const graphPatterns = [
  'Coulomb force versus r: 1/r^2 fall.',
  'Point charge E versus r: 1/r^2 fall.',
  'Line charge E versus r: 1/r fall.',
  'Plane sheet E versus r: constant.',
  'Flux versus theta: cosine curve.',
  'Dipole torque versus theta: sine curve.',
  'Shell E-r: zero inside, inverse-square outside.',
  'Solid sphere E-r: linear inside, inverse-square outside.',
  'Conductor E-r: zero inside conductor region.',
  'Allowed charge graph: discrete steps of e.',
]

const questionTypes = ['q=ne integer', 'charge conservation', 'Coulomb force', 'field due to point charge', 'superposition vector', 'field-line statement', 'dipole axial/equatorial', 'flux angle', 'Gauss law q enclosed', 'spherical graph interpretation']

const revisionPlans = {
  thirtyMinute: ['0-5 min: charge properties and Coulomb law.', '5-10 min: electric field and field-line rules.', '10-15 min: dipole formulas and directions.', '15-20 min: flux and Gauss law.', '20-25 min: line, sheet, shell and sphere results.', '25-30 min: traps plus two quick numericals.'],
  lastDay: ['Redraw field lines, Gaussian surfaces and sphere graphs.', 'Revise formulas with SI units.', 'Solve one Coulomb vector question and one flux question.', 'Review conductor and shielding statements.', 'Do not start a new source; polish traps.'],
  examHall: ['Mark signs of charges before substituting.', 'Convert microC and cm into SI units.', 'Draw vectors for more than one charge.', 'For Gauss law, write q enclosed explicitly.', 'For dipole, check axial/equatorial direction before formula.'],
}

const finalChecklist = [
  'I can explain quantization and conservation of charge.',
  'I can apply Coulomb law with SI units.',
  'I can find field due to one or more point charges.',
  'I can draw correct field lines.',
  'I know dipole moment direction and units.',
  'I can derive axial and equatorial dipole fields at far points.',
  'I can compute torque on a dipole in uniform field.',
  'I can use flux formula with area vector angle.',
  'I can state and apply Gauss law.',
  'I can choose cylinder, pillbox or sphere as Gaussian surface.',
  'I can derive fields of line charge, sheet, shell and solid sphere.',
  'I can list conductor electrostatic equilibrium facts.',
]

const revisionData = { summaryTables, memoryHooks, topFormulas, topConcepts, topTraps, topDiagrams, graphPatterns, questionTypes, revisionPlans, finalChecklist }

function baseQuestion(id, category, type, question, answer, solution, extra = {}) {
  return {
    id,
    category,
    difficulty: extra.difficulty || 'Medium',
    conceptTag: extra.conceptTag || 'Electric Charges and Fields',
    commonTrap: extra.commonTrap || 'Forgetting direction, symmetry or SI-unit conversion.',
    shortcut: extra.shortcut || 'Write model, convert units, then apply formula.',
    type,
    question,
    answer,
    solution,
    ...extra,
  }
}

function makeMcq(i, category) {
  const mod = i % 10
  const id = `${category.toLowerCase().replace(/[^a-z]+/g, '-')}-${String(i + 1).padStart(3, '0')}`
  if (mod === 0) {
    const n = i + 2
    return baseQuestion(id, category, 'MCQ', `A body has ${n} excess electrons. Its charge is`, [`-${n}e`, `+${n}e`, '0', '-e/2'], `-${n}e`, `Excess electrons mean negative charge, so q=-ne=-${n}e.`, { options: [`-${n}e`, `+${n}e`, '0', '-e/2'], conceptTag: 'Quantization of charge', shortcut: 'Excess electrons give negative sign.' })
  }
  if (mod === 1) {
    const q = (i % 8) + 1
    const r = 0.3
    const e = 9e9 * q * 1e-6 / (r * r)
    return baseQuestion(id, category, 'MCQ', `Electric field at 0.30 m from a ${q} microC point charge is closest to`, [`${fmt(e)} N/C`, `${fmt(e / 2)} N/C`, `${fmt(e * 2)} N/C`, `${fmt(e / 10)} N/C`], `${fmt(e)} N/C`, `E=kQ/r^2=9x10^9 x ${q}x10^-6 /0.30^2 = ${fmt(e)} N/C.`, { options: [`${fmt(e)} N/C`, `${fmt(e / 2)} N/C`, `${fmt(e * 2)} N/C`, `${fmt(e / 10)} N/C`], conceptTag: 'Point charge field' })
  }
  if (mod === 2) {
    return baseQuestion(id, category, 'MCQ', 'Electric field lines can never intersect because', ['field at a point has unique direction', 'charges are quantized', 'Coulomb force is inverse square', 'flux is scalar'], 'field at a point has unique direction', 'If two field lines intersect, the tangent at that point gives two directions of E, impossible.', { options: ['field at a point has unique direction', 'charges are quantized', 'Coulomb force is inverse square', 'flux is scalar'], conceptTag: 'Field line rules' })
  }
  if (mod === 3) {
    return baseQuestion(id, category, 'MCQ', 'For an infinite plane sheet of charge, electric field with distance is', ['constant', 'proportional to r', 'proportional to 1/r', 'proportional to 1/r^2'], 'constant', 'Gauss law with pillbox gives E=sigma/(2epsilon0), independent of distance.', { options: ['constant', 'proportional to r', 'proportional to 1/r', 'proportional to 1/r^2'], conceptTag: 'Gauss law sheet' })
  }
  if (mod === 4) {
    return baseQuestion(id, category, 'MCQ', 'The direction of electric dipole moment is', ['from negative charge to positive charge', 'from positive charge to negative charge', 'always along electric field', 'always opposite electric field'], 'from negative charge to positive charge', 'By convention p points from -q to +q.', { options: ['from negative charge to positive charge', 'from positive charge to negative charge', 'always along electric field', 'always opposite electric field'], conceptTag: 'Dipole moment' })
  }
  if (mod === 5) {
    const eVal = 20 + i
    const area = 2
    const flux = eVal * area
    return baseQuestion(id, category, 'MCQ', `A flat surface of area 2 m^2 has area vector parallel to uniform field ${eVal} N/C. Flux is`, [`${flux} N m^2/C`, `${eVal / 2} N m^2/C`, '0', `${eVal} N m^2/C`], `${flux} N m^2/C`, `Phi=EA cos0=${eVal}x2=${flux} N m^2/C.`, { options: [`${flux} N m^2/C`, `${eVal / 2} N m^2/C`, '0', `${eVal} N m^2/C`], conceptTag: 'Electric flux' })
  }
  if (mod === 6) {
    return baseQuestion(id, category, 'MCQ', 'For a charged spherical shell, field inside the shell is', ['zero', 'kQ/r^2', 'kQr/R^3', 'sigma/epsilon0'], 'zero', 'A Gaussian sphere inside the shell encloses no charge; symmetry gives E=0.', { options: ['zero', 'kQ/r^2', 'kQr/R^3', 'sigma/epsilon0'], conceptTag: 'Spherical shell' })
  }
  if (mod === 7) {
    return baseQuestion(id, category, 'MCQ', 'Inside a conductor in electrostatic equilibrium, electric field is', ['zero', 'maximum', 'parallel to surface', 'same as outside always'], 'zero', 'Free charges move until the internal electric field is cancelled.', { options: ['zero', 'maximum', 'parallel to surface', 'same as outside always'], conceptTag: 'Conductors' })
  }
  if (mod === 8) {
    return baseQuestion(id, category, 'MCQ', 'Far from an electric dipole, axial field varies with distance as', ['1/r^3', '1/r^2', '1/r', 'constant'], '1/r^3', 'Far dipole field on axial line is E=2kp/r^3.', { options: ['1/r^3', '1/r^2', '1/r', 'constant'], conceptTag: 'Dipole field' })
  }
  return baseQuestion(id, category, 'MCQ', 'A Gaussian surface is most useful for finding E when charge distribution has', ['high symmetry', 'random shape', 'only negative charge', 'zero total charge always'], 'high symmetry', 'Gauss law is always true, but simple E calculation needs symmetry.', { options: ['high symmetry', 'random shape', 'only negative charge', 'zero total charge always'], conceptTag: 'Gauss law symmetry' })
}

function makeJee(i) {
  const id = `jee-main-${String(i + 1).padStart(3, '0')}`
  const mod = i % 8
  if (mod === 0) {
    const q1 = (i % 5) + 2
    const q2 = (i % 4) + 3
    const r = 0.2
    const f = 9e9 * q1 * 1e-6 * q2 * 1e-6 / (r * r)
    return baseQuestion(id, 'JEE Main MCQ/Numerical', 'Numerical', `Two charges ${q1} microC and ${q2} microC are separated by 0.20 m. Find force magnitude.`, `${fmt(f)} N`, `F=kq1q2/r^2=9x10^9 x ${q1}x10^-6 x ${q2}x10^-6 /0.20^2 = ${fmt(f)} N.`, { conceptTag: 'Coulomb law', shortcut: 'Use SI units first.' })
  }
  if (mod === 1) {
    const e = 100 + 10 * i
    return baseQuestion(id, 'JEE Main MCQ/Numerical', 'Numerical', `Two perpendicular electric fields of magnitudes ${e} N/C and ${e} N/C act at a point. Find resultant magnitude.`, `${fmt(Math.SQRT2 * e)} N/C`, `Perpendicular vectors add by Pythagoras: E_net=sqrt(E^2+E^2)=sqrt2 E=${fmt(Math.SQRT2 * e)} N/C.`, { conceptTag: 'Superposition' })
  }
  if (mod === 2) {
    const p = i + 1
    const e = 5
    return baseQuestion(id, 'JEE Main MCQ/Numerical', 'Numerical', `A dipole of moment ${p} x 10^-6 C m is in field 5 x 10^4 N/C at 90 degrees. Find torque.`, `${fmt(p * 1e-6 * e * 1e4)} N m`, `tau=pE sin90=${p}x10^-6 x 5x10^4=${fmt(p * 1e-6 * e * 1e4)} N m.`, { conceptTag: 'Dipole torque' })
  }
  if (mod === 3) {
    const lambda = i + 2
    return baseQuestion(id, 'JEE Main MCQ/Numerical', 'Numerical', `For an infinite line charge, if distance from wire is doubled, field becomes what fraction of original?`, '1/2', 'E=lambda/(2pi epsilon0 r), so E is inversely proportional to r. Doubling r halves E.', { conceptTag: 'Line charge graph' })
  }
  if (mod === 4) {
    return baseQuestion(id, 'JEE Main MCQ/Numerical', 'Numerical', 'For a uniformly charged solid sphere, what is E at r=R/2 in terms of surface field Es=kQ/R^2?', 'Es/2', 'Inside E=kQr/R^3. At r=R/2, E=kQ/(2R^2)=Es/2.', { conceptTag: 'Solid sphere graph' })
  }
  if (mod === 5) {
    const q = i + 1
    return baseQuestion(id, 'JEE Main MCQ/Numerical', 'Numerical', `A closed surface encloses charge ${q}epsilon0 in SI units. Find net flux.`, `${q} N m^2/C`, `Gauss law: Phi=q_enclosed/epsilon0=${q}epsilon0/epsilon0=${q} N m^2/C.`, { conceptTag: 'Gauss law' })
  }
  if (mod === 6) {
    return baseQuestion(id, 'JEE Main MCQ/Numerical', 'Numerical', 'At a point on equatorial line of a far dipole, if axial field at same distance is 80 N/C, equatorial field magnitude is', '40 N/C', 'For far dipole, axial magnitude is twice equatorial magnitude.', { conceptTag: 'Dipole axial/equatorial' })
  }
  return baseQuestion(id, 'JEE Main MCQ/Numerical', 'Numerical', 'A negative charge -q is placed in electric field E toward +x. Direction of force is', '-x direction', 'F=qE. For negative q, force is opposite to E.', { conceptTag: 'Force in electric field' })
}

function makeAdvanced(i) {
  const prompts = [
    ['Why can electric field be non-zero on a closed surface even when net flux is zero?', 'Because flux is signed. Field lines entering and leaving can cancel in net flux while local E remains non-zero.'],
    ['Why does an infinite sheet field not decrease with distance in the ideal model?', 'A larger pillbox does not enclose extra charge for fixed face area, and plane symmetry keeps E uniform on faces.'],
    ['Why does dipole field fall as 1/r^3 while point charge field falls as 1/r^2?', 'The net charge of a dipole is zero, so leading monopole term cancels and the dipole term dominates.'],
    ['Why can a conductor have charge but zero field inside?', 'Excess charge rearranges on the surface until internal fields cancel in electrostatic equilibrium.'],
    ['Why is superposition a vector idea?', 'Force and field have direction; two equal magnitudes can cancel, add or produce diagonal resultant depending on angles.'],
  ]
  const [question, answer] = prompts[i % prompts.length]
  return baseQuestion(`advanced-${String(i + 1).padStart(3, '0')}`, 'JEE Advanced Conceptual', 'Conceptual', question, answer, answer, { conceptTag: 'Advanced conceptual insight', difficulty: 'Advanced foundation', shortcut: 'Use symmetry, limiting case and vector direction.' })
}

function makeAssertion(i) {
  const bank = [
    ['Electric field lines never intersect.', 'Electric field has unique direction at a point.', 'Both are true and reason correctly explains assertion.'],
    ['Net flux through a closed surface depends only on enclosed charge.', 'Charges outside the surface produce no electric field anywhere on it.', 'Assertion is true but reason is false; outside charges can produce local field.'],
    ['Inside a charged conducting shell, electric field in the conductor material is zero.', 'Free charges move until electrostatic equilibrium is reached.', 'Both are true and reason correctly explains assertion.'],
    ['Field due to infinite plane sheet is independent of distance.', 'Gauss law with pillbox gives E=sigma/(2epsilon0).', 'Both are true and reason correctly explains assertion.'],
    ['Torque on dipole is maximum when p is parallel to E.', 'tau=pE sin theta.', 'Assertion is false but reason is true; torque is maximum at 90 degrees.'],
  ]
  const [assertion, reason, answer] = bank[i % bank.length]
  return baseQuestion(`assertion-${String(i + 1).padStart(3, '0')}`, 'Assertion-Reason', 'Assertion-Reason', `Assertion: ${assertion} Reason: ${reason}`, answer, answer, { conceptTag: 'Assertion-reason electrostatics' })
}

function makeInteger(i) {
  const n = i + 1
  return baseQuestion(`integer-${String(i + 1).padStart(3, '0')}`, 'Integer-Type', 'Integer', `A closed surface encloses charge ${n}epsilon0. The numerical value of net flux in SI units is`, String(n), `Phi=q/epsilon0=${n}epsilon0/epsilon0=${n}.`, { conceptTag: 'Gauss law integer', shortcut: 'Cancel epsilon0 directly.' })
}

function makeMatch(i) {
  const id = `match-${String(i + 1).padStart(3, '0')}`
  return baseQuestion(id, 'Match-the-Column', 'Match', 'Match the electrostatics formula with its condition.', '1-b, 2-c, 3-d, 4-a', 'Point charge follows inverse-square, line charge follows 1/r, plane sheet is constant, flux uses area vector angle.', {
    columnI: ['Point charge field', 'Line charge field', 'Plane sheet field', 'Flux through flat surface'],
    columnII: ['EA cos theta', 'kQ/r^2', 'lambda/(2pi epsilon0 r)', 'sigma/(2epsilon0)'],
    conceptTag: 'Formula matching',
    shortcut: 'Identify geometry first.',
  })
}

function makeGraph(i) {
  const bank = [
    ['An E-r graph is zero for r<R and decreases as 1/r^2 for r>R. Identify object.', 'Uniformly charged spherical shell', 'A shell gives zero field inside and point-charge-like outside.'],
    ['An E-r graph rises linearly from centre to R and then decreases as 1/r^2. Identify object.', 'Uniformly charged solid sphere', 'Inside field is kQr/R^3, outside kQ/r^2.'],
    ['A force-distance graph decreases to one-fourth when distance doubles. What law is shown?', 'Coulomb inverse-square law', 'F is proportional to 1/r^2.'],
    ['Flux versus angle graph starts maximum at 0 degrees and becomes zero at 90 degrees. Which function?', 'cos theta', 'Phi=EA cos theta.'],
  ]
  const [question, answer, solution] = bank[i % bank.length]
  return baseQuestion(`graph-${String(i + 1).padStart(3, '0')}`, 'Graph-Based', 'Graph', question, answer, solution, { conceptTag: 'Graph interpretation' })
}

function makeFieldLine(i) {
  const bank = [
    ['A diagram shows field lines entering a negative charge. Is it correct?', 'Correct', 'Field lines terminate on negative charges.'],
    ['A diagram shows two electric field lines crossing. Is it correct?', 'Incorrect', 'Field at one point cannot have two directions.'],
    ['A diagram has more crowded field lines near a charge than far away. What does it show?', 'Stronger field near the charge', 'Line density represents field strength.'],
    ['Field lines between two opposite parallel plates are straight, parallel and equally spaced. What field is represented?', 'Uniform electric field', 'Same spacing and direction indicate uniform E.'],
  ]
  const [question, answer, solution] = bank[i % bank.length]
  return baseQuestion(`field-line-${String(i + 1).padStart(3, '0')}`, 'Field-Line-Based', 'Diagram', question, answer, solution, { conceptTag: 'Field-line rules' })
}

function makeGauss(i) {
  const bank = [
    ['Which Gaussian surface is best for an infinite line charge?', 'Coaxial cylinder', 'Cylindrical symmetry makes E constant on curved surface.'],
    ['Which Gaussian surface is best for an infinite plane sheet?', 'Pillbox', 'Flux passes equally through two faces.'],
    ['Which Gaussian surface is best for a spherical shell?', 'Concentric sphere', 'Spherical symmetry makes E constant on the surface.'],
    ['A charge outside a closed Gaussian surface is moved closer. What happens to net flux?', 'No change', 'Net flux depends only on enclosed charge.'],
  ]
  const [question, answer, solution] = bank[i % bank.length]
  return baseQuestion(`gauss-${String(i + 1).padStart(3, '0')}`, 'Gauss-Law-Based', 'Gauss Law', question, answer, solution, { conceptTag: 'Gauss law applications' })
}

function makeCase(i) {
  return baseQuestion(`case-${String(i + 1).padStart(3, '0')}`, 'Case-Based', 'Case', 'Read the case and answer the subquestions.', 'See subquestions', 'Use charge sign, field direction and Gauss law conditions.', {
    caseText: `A student studies a symmetric charge distribution and chooses a Gaussian surface. In trial ${i + 1}, the enclosed charge is ${(i + 1)}epsilon0 and an outside charge is moved without crossing the surface.`,
    subquestions: [
      { question: 'What is the net flux through the surface?', solution: `Phi=${i + 1} N m^2/C by Gauss law.` },
      { question: 'Does moving the outside charge change net flux?', solution: 'No, q enclosed is unchanged.' },
      { question: 'Can local electric field on the surface change?', solution: 'Yes, outside charge can change local E while net flux remains same.' },
    ],
    conceptTag: 'Case-based Gauss law',
  })
}

const questions = [
  ...Array.from({ length: counts['NEET MCQ'] }, (_, i) => makeMcq(i, 'NEET MCQ')),
  ...Array.from({ length: counts['JEE Main MCQ/Numerical'] }, (_, i) => makeJee(i)),
  ...Array.from({ length: counts['JEE Advanced Conceptual'] }, (_, i) => makeAdvanced(i)),
  ...Array.from({ length: counts['Assertion-Reason'] }, (_, i) => makeAssertion(i)),
  ...Array.from({ length: counts['Integer-Type'] }, (_, i) => makeInteger(i)),
  ...Array.from({ length: counts['Match-the-Column'] }, (_, i) => makeMatch(i)),
  ...Array.from({ length: counts['Graph-Based'] }, (_, i) => makeGraph(i)),
  ...Array.from({ length: counts['Field-Line-Based'] }, (_, i) => makeFieldLine(i)),
  ...Array.from({ length: counts['Gauss-Law-Based'] }, (_, i) => makeGauss(i)),
  ...Array.from({ length: counts['Case-Based'] }, (_, i) => makeCase(i)),
]

mkdirSync(src('data'), { recursive: true })
writeFileSync(src('data', 'chapterSections.js'), `${jsExport('chapterSections', chapterSections)}\n${jsExport('chapterFlow', chapterFlow)}`)
writeFileSync(src('data', 'formulas.js'), `${jsExport('formulas', formulaObjects)}\n${jsExport('formulaGroups', formulaGroups)}`)
writeFileSync(src('data', 'derivations.js'), jsExport('derivations', derivationObjects))
writeFileSync(src('data', 'visualPlans.js'), jsExport('visualPlans', visualPlans))
writeFileSync(src('data', 'revisionData.js'), Object.entries(revisionData).map(([name, value]) => jsExport(name, value)).join('\n'))
writeFileSync(src('data', 'questionBank.json'), `${JSON.stringify({
  meta: {
    title: 'Original Electric Charges and Fields Practice Question Bank',
    chapter: 'NCERT Class 12 Physics Chapter 1 - Electric Charges and Fields',
    totalQuestions: questions.length,
    counts,
    generatedFor: ['CBSE Boards', 'NEET', 'JEE Main', 'JEE Advanced conceptual foundation'],
    licenseNote: 'Original generated educational questions. No copied coaching or previous-year content.',
  },
  questions,
}, null, 2)}\n`)

console.log(`Generated Chapter 1 content: ${chapterSections.length} sections, ${formulaObjects.length} formulas, ${derivationObjects.length} derivations, ${visualPlans.length} visuals, ${questions.length} questions.`)
