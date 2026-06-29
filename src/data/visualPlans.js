export const visualPlans = [
  {
    "id": "charge-signs",
    "title": "Positive and Negative Charge",
    "category": "Infographic",
    "diagramType": "charge-signs",
    "shows": "Two charge types with force arrows.",
    "labels": [
      "+ charge",
      "- charge",
      "repel",
      "attract"
    ],
    "concept": "Sign decides direction of electrostatic interaction.",
    "removesConfusion": "Students stop treating charge as only a magnitude.",
    "manual": "Draw plus/minus circles and arrows between like/unlike pairs.",
    "digital": "Use SVG circles, signs and arrows; no external assets.",
    "mode": "2D infographic",
    "implementation": "Reusable charge-pair SVG with color-coded arrows."
  },
  {
    "id": "quantization",
    "title": "Quantization Ladder",
    "category": "Infographic",
    "diagramType": "quantization",
    "shows": "Allowed charge values as integer multiples of e.",
    "labels": [
      "-3e",
      "-2e",
      "-e",
      "0",
      "+e",
      "+2e"
    ],
    "concept": "Charge is discrete microscopically.",
    "removesConfusion": "Removes fractional-electron misconception.",
    "manual": "Draw equally spaced ticks on a number line.",
    "digital": "SVG number line with labelled charge packets.",
    "mode": "2D infographic",
    "implementation": "Map integers to ticks and labels."
  },
  {
    "id": "conservation",
    "title": "Charge Conservation During Transfer",
    "category": "Infographic",
    "diagramType": "conservation",
    "shows": "Before-after charge bookkeeping.",
    "labels": [
      "before",
      "after",
      "net charge"
    ],
    "concept": "Total isolated charge remains constant.",
    "removesConfusion": "Students learn sign-aware addition.",
    "manual": "Draw two bodies before and after with same net sum.",
    "digital": "SVG bar cards with algebra labels.",
    "mode": "Infographic",
    "implementation": "Generate before/after blocks from charge values."
  },
  {
    "id": "conductor-insulator",
    "title": "Conductor vs Insulator",
    "category": "Infographic",
    "diagramType": "conductor-insulator",
    "shows": "Mobile versus localized charges.",
    "labels": [
      "metal",
      "plastic",
      "free electrons"
    ],
    "concept": "Material response depends on charge mobility.",
    "removesConfusion": "Stops belief that insulators cannot be charged.",
    "manual": "Draw moving dots in metal and fixed dots in insulator.",
    "digital": "SVG split panel with mobile/fixed charge dots.",
    "mode": "Animated infographic",
    "implementation": "Animate conductor dots lightly; keep insulator dots fixed."
  },
  {
    "id": "induction",
    "title": "Charging by Induction Sequence",
    "category": "Infographic",
    "diagramType": "induction",
    "shows": "Four-step induction process.",
    "labels": [
      "charged rod",
      "ground",
      "separation",
      "final charge"
    ],
    "concept": "A body can be charged without contact.",
    "removesConfusion": "Clarifies final charge sign after grounding.",
    "manual": "Draw rod near sphere, ground wire, then removal sequence.",
    "digital": "SVG step panels with arrows.",
    "mode": "Flowchart infographic",
    "implementation": "Four SVG mini panels arranged responsively."
  },
  {
    "id": "coulomb-repel",
    "title": "Coulomb Force for Like Charges",
    "category": "Field",
    "diagramType": "coulomb-repel",
    "shows": "Repulsive force along line of centres.",
    "labels": [
      "q1",
      "q2",
      "F12",
      "F21",
      "r"
    ],
    "concept": "Like charges repel with equal and opposite forces.",
    "removesConfusion": "Separates magnitude from direction.",
    "manual": "Draw two plus charges and arrows away.",
    "digital": "SVG charges and bidirectional force arrows.",
    "mode": "2D vector diagram",
    "implementation": "Use marker-end arrows from charge centers outward."
  },
  {
    "id": "coulomb-attract",
    "title": "Coulomb Force for Unlike Charges",
    "category": "Field",
    "diagramType": "coulomb-attract",
    "shows": "Attractive force along line of centres.",
    "labels": [
      "+q",
      "-q",
      "attraction",
      "r"
    ],
    "concept": "Unlike charges attract.",
    "removesConfusion": "Students see negative sign as direction.",
    "manual": "Draw plus and minus with arrows toward each other.",
    "digital": "SVG charge pair with inward arrows.",
    "mode": "2D vector diagram",
    "implementation": "Reuse charge-pair component with sign switch."
  },
  {
    "id": "force-distance",
    "title": "Force vs Distance Graph",
    "category": "Graph",
    "diagramType": "force-distance",
    "shows": "Inverse-square decrease of Coulomb force.",
    "labels": [
      "F",
      "r",
      "1/r^2"
    ],
    "concept": "Force decreases rapidly with separation.",
    "removesConfusion": "Stops linear graph misconception.",
    "manual": "Draw steep decreasing curve.",
    "digital": "SVG axes and y=1/r^2 path.",
    "mode": "Graph-based",
    "implementation": "Generate points from inverse-square function."
  },
  {
    "id": "superposition",
    "title": "Superposition Vector Addition",
    "category": "Field",
    "diagramType": "superposition",
    "shows": "Two field vectors forming a resultant.",
    "labels": [
      "E1",
      "E2",
      "E_net"
    ],
    "concept": "Net field is vector sum.",
    "removesConfusion": "Students stop adding magnitudes blindly.",
    "manual": "Draw two arrows and diagonal resultant.",
    "digital": "SVG vector triangle/parallelogram.",
    "mode": "Vector diagram",
    "implementation": "Reusable arrows with component labels."
  },
  {
    "id": "field-positive",
    "title": "Field of Positive Point Charge",
    "category": "Field",
    "diagramType": "field-positive",
    "shows": "Radial outward field lines.",
    "labels": [
      "+Q",
      "E outward"
    ],
    "concept": "Positive source pushes positive test charge outward.",
    "removesConfusion": "Clarifies field direction.",
    "manual": "Draw arrows radiating outward.",
    "digital": "SVG radial arrows from central charge.",
    "mode": "Field-line diagram",
    "implementation": "Compute arrow endpoints around circle."
  },
  {
    "id": "field-negative",
    "title": "Field of Negative Point Charge",
    "category": "Field",
    "diagramType": "field-negative",
    "shows": "Radial inward field lines.",
    "labels": [
      "-Q",
      "E inward"
    ],
    "concept": "Negative source pulls positive test charge inward.",
    "removesConfusion": "Avoids reversing negative source field.",
    "manual": "Draw arrows pointing toward centre.",
    "digital": "SVG radial arrows to central charge.",
    "mode": "Field-line diagram",
    "implementation": "Reverse marker direction from positive case."
  },
  {
    "id": "field-rules",
    "title": "Electric Field Line Rules",
    "category": "Infographic",
    "diagramType": "field-rules",
    "shows": "Rules for drawing field lines.",
    "labels": [
      "start +",
      "end -",
      "never cross",
      "density"
    ],
    "concept": "Field lines encode direction and strength.",
    "removesConfusion": "Removes intersection and closed-loop mistakes.",
    "manual": "Draw mini rules with ticks/crosses.",
    "digital": "SVG rule cards.",
    "mode": "Infographic",
    "implementation": "Grid of labelled mini diagrams."
  },
  {
    "id": "uniform-field",
    "title": "Uniform Electric Field",
    "category": "Field",
    "diagramType": "uniform-field",
    "shows": "Parallel equally spaced field arrows.",
    "labels": [
      "uniform E",
      "+ plate",
      "- plate"
    ],
    "concept": "Uniform field has same magnitude and direction everywhere.",
    "removesConfusion": "Shows why force is constant.",
    "manual": "Draw parallel arrows from + plate to - plate.",
    "digital": "SVG plates and parallel arrows.",
    "mode": "Field-line diagram",
    "implementation": "Generate evenly spaced arrows."
  },
  {
    "id": "dipole-field",
    "title": "Dipole Field Lines",
    "category": "Field",
    "diagramType": "dipole-field",
    "shows": "Curved lines from positive to negative charge.",
    "labels": [
      "+q",
      "-q",
      "field lines"
    ],
    "concept": "Dipole field pattern is directional and symmetric.",
    "removesConfusion": "Clarifies line start and end.",
    "manual": "Draw plus and minus with curved connecting lines.",
    "digital": "SVG Bezier curves with arrowheads.",
    "mode": "Field-line diagram",
    "implementation": "Use mirrored Bezier paths."
  },
  {
    "id": "dipole-axial",
    "title": "Dipole Axial Point",
    "category": "Field",
    "diagramType": "dipole-axial",
    "shows": "Axial line field components.",
    "labels": [
      "axial line",
      "p",
      "E axial"
    ],
    "concept": "Axial field is along p in far field.",
    "removesConfusion": "Removes 2 factor confusion.",
    "manual": "Draw point on dipole axis and component arrows.",
    "digital": "SVG dipole with point and arrows.",
    "mode": "Vector diagram",
    "implementation": "Use line-of-axis component labels."
  },
  {
    "id": "dipole-equatorial",
    "title": "Dipole Equatorial Point",
    "category": "Field",
    "diagramType": "dipole-equatorial",
    "shows": "Equatorial line field direction.",
    "labels": [
      "equatorial line",
      "E opposite p"
    ],
    "concept": "Equatorial field points opposite p.",
    "removesConfusion": "Removes direction trap.",
    "manual": "Draw point on perpendicular bisector.",
    "digital": "SVG dipole with perpendicular point and resultant.",
    "mode": "Vector diagram",
    "implementation": "Use component cancellation arrows."
  },
  {
    "id": "dipole-torque",
    "title": "Dipole Torque in Uniform Field",
    "category": "Field",
    "diagramType": "dipole-torque",
    "shows": "Forces on dipole in uniform field create torque.",
    "labels": [
      "p",
      "E",
      "theta",
      "tau"
    ],
    "concept": "Uniform field rotates dipole.",
    "removesConfusion": "Separates net force zero from torque nonzero.",
    "manual": "Draw tilted dipole in parallel field.",
    "digital": "SVG rotated dipole with force arrows.",
    "mode": "Animated vector diagram",
    "implementation": "Rotate dipole group based on theta."
  },
  {
    "id": "charge-density",
    "title": "Continuous Charge Densities",
    "category": "Infographic",
    "diagramType": "charge-density",
    "shows": "Line, surface and volume charge density.",
    "labels": [
      "lambda",
      "sigma",
      "rho"
    ],
    "concept": "Extended charge is described by density.",
    "removesConfusion": "Students choose correct density symbol.",
    "manual": "Draw charged line, sheet and solid.",
    "digital": "SVG three mini panels.",
    "mode": "Infographic",
    "implementation": "Reusable density icons."
  },
  {
    "id": "flux-surface",
    "title": "Electric Flux Through Surface",
    "category": "Field",
    "diagramType": "flux-surface",
    "shows": "Area vector and field crossing surface.",
    "labels": [
      "E",
      "A vector",
      "theta",
      "Phi"
    ],
    "concept": "Flux depends on component normal to surface.",
    "removesConfusion": "Angle with normal becomes clear.",
    "manual": "Draw tilted surface with normal and field arrows.",
    "digital": "SVG slanted plane and arrows.",
    "mode": "3D-like 2D diagram",
    "implementation": "Use polygon for surface and arrow normal."
  },
  {
    "id": "flux-angle",
    "title": "Flux vs Angle Graph",
    "category": "Graph",
    "diagramType": "flux-angle",
    "shows": "Cosine variation of flux.",
    "labels": [
      "Phi",
      "theta",
      "0",
      "90 deg"
    ],
    "concept": "Flux is maximum at 0 degrees and zero at 90 degrees.",
    "removesConfusion": "Removes sine/cosine confusion.",
    "manual": "Draw cosine curve from 0 to 180.",
    "digital": "SVG axes with cosine path.",
    "mode": "Graph-based",
    "implementation": "Generate points from cos theta."
  },
  {
    "id": "gauss-closed",
    "title": "Gauss Law Closed Surface",
    "category": "Field",
    "diagramType": "gauss-closed",
    "shows": "Closed surface enclosing charge.",
    "labels": [
      "q enclosed",
      "outward normal",
      "flux"
    ],
    "concept": "Net flux depends on enclosed charge.",
    "removesConfusion": "Students ignore outside charges for q enclosed.",
    "manual": "Draw closed oval with charge inside and field arrows.",
    "digital": "SVG closed surface with normals.",
    "mode": "Field diagram",
    "implementation": "Ellipse plus radial arrows crossing boundary."
  },
  {
    "id": "gaussian-sphere",
    "title": "Gaussian Sphere",
    "category": "Field",
    "diagramType": "gaussian-sphere",
    "shows": "Spherical Gaussian surface around charge.",
    "labels": [
      "r",
      "E constant",
      "4 pi r^2"
    ],
    "concept": "Spherical symmetry gives constant E on sphere.",
    "removesConfusion": "Shows why E comes out of integral.",
    "manual": "Draw charge at centre with spherical shell.",
    "digital": "SVG circle surface and radial arrows.",
    "mode": "Symmetry diagram",
    "implementation": "Circle represents sphere cross-section."
  },
  {
    "id": "gaussian-cylinder",
    "title": "Line Charge Gaussian Cylinder",
    "category": "Field",
    "diagramType": "gaussian-cylinder",
    "shows": "Cylinder around infinite line charge.",
    "labels": [
      "lambda",
      "r",
      "2 pi r l"
    ],
    "concept": "Cylindrical symmetry for line charge.",
    "removesConfusion": "Students see cap flux is zero.",
    "manual": "Draw line through cylinder with radial arrows.",
    "digital": "SVG cylinder illusion and arrows.",
    "mode": "Symmetry diagram",
    "implementation": "Use ellipses and side lines for cylinder."
  },
  {
    "id": "pillbox",
    "title": "Plane Sheet Pillbox",
    "category": "Field",
    "diagramType": "pillbox",
    "shows": "Pillbox Gaussian surface across sheet.",
    "labels": [
      "sigma",
      "EA",
      "EA"
    ],
    "concept": "Plane sheet field exits both faces.",
    "removesConfusion": "Clarifies factor 2.",
    "manual": "Draw sheet with tiny cylinder crossing it.",
    "digital": "SVG rectangle sheet and pillbox.",
    "mode": "Symmetry diagram",
    "implementation": "Highlight two equal flux faces."
  },
  {
    "id": "shell-graph",
    "title": "Spherical Shell Field Graph",
    "category": "Graph",
    "diagramType": "shell-graph",
    "shows": "Zero inside, inverse-square outside.",
    "labels": [
      "E",
      "r",
      "R",
      "inside zero"
    ],
    "concept": "Shell shields its interior.",
    "removesConfusion": "Stops using outside formula inside.",
    "manual": "Draw zero line until R then decreasing curve.",
    "digital": "SVG piecewise graph.",
    "mode": "Graph-based",
    "implementation": "Generate two path segments."
  },
  {
    "id": "solid-sphere-graph",
    "title": "Uniform Solid Sphere Field Graph",
    "category": "Graph",
    "diagramType": "solid-sphere-graph",
    "shows": "Linear rise inside, inverse-square fall outside.",
    "labels": [
      "E",
      "r",
      "R"
    ],
    "concept": "Inside enclosed charge grows with r^3.",
    "removesConfusion": "Students see two regions.",
    "manual": "Draw straight rising line then falling curve.",
    "digital": "SVG piecewise graph.",
    "mode": "Graph-based",
    "implementation": "Use line then inverse-square path."
  },
  {
    "id": "conductor-surface",
    "title": "Conducting Surface Field",
    "category": "Field",
    "diagramType": "conductor-surface",
    "shows": "Zero field inside, perpendicular field outside.",
    "labels": [
      "E inside = 0",
      "surface charge",
      "perpendicular E"
    ],
    "concept": "Conductor equilibrium removes internal field.",
    "removesConfusion": "Shows charge can exist with zero inside field.",
    "manual": "Draw metal surface with arrows outside only.",
    "digital": "SVG conductor slab and normal arrows.",
    "mode": "Field diagram",
    "implementation": "No arrows inside conductor region."
  },
  {
    "id": "shielding",
    "title": "Electrostatic Shielding",
    "category": "Infographic",
    "diagramType": "shielding",
    "shows": "Conducting shell blocks internal field.",
    "labels": [
      "external E",
      "cavity",
      "E=0"
    ],
    "concept": "Faraday cage idea for electrostatics.",
    "removesConfusion": "Clarifies shielding is due to surface charge rearrangement.",
    "manual": "Draw box with field outside and quiet cavity.",
    "digital": "SVG conducting enclosure with no inner arrows.",
    "mode": "Infographic",
    "implementation": "Use outer arrows stopping at surface."
  },
  {
    "id": "field-zero-conductor",
    "title": "Field Inside Conductor",
    "category": "Graph",
    "diagramType": "field-zero-conductor",
    "shows": "E is zero throughout conductor interior.",
    "labels": [
      "inside",
      "surface",
      "outside"
    ],
    "concept": "Charges move until field cancels inside.",
    "removesConfusion": "Prevents no-charge misconception.",
    "manual": "Draw region graph: zero inside, jump at surface.",
    "digital": "SVG step-like graph.",
    "mode": "Graph-based",
    "implementation": "Piecewise horizontal and jump marker."
  },
  {
    "id": "trap-map",
    "title": "Electrostatics Trap Map",
    "category": "Infographic",
    "diagramType": "trap-map",
    "shows": "Common errors and corrections.",
    "labels": [
      "SI units",
      "direction",
      "symmetry",
      "q enclosed"
    ],
    "concept": "Error prevention through checkpoints.",
    "removesConfusion": "Students learn what to check before solving.",
    "manual": "Draw four warning cards.",
    "digital": "SVG card grid with icons/text.",
    "mode": "Infographic",
    "implementation": "Static responsive SVG trap dashboard."
  }
]
