export const summaryTables = [
  {
    "title": "Charge Properties",
    "columns": [
      "Property",
      "Meaning",
      "Formula/Point",
      "Trap"
    ],
    "rows": [
      [
        "Quantization",
        "Charge packets",
        "q=ne",
        "n integer"
      ],
      [
        "Conservation",
        "Total isolated charge fixed",
        "sum q before=sum q after",
        "add signs"
      ],
      [
        "Additivity",
        "Net charge is algebraic sum",
        "qnet=sum qi",
        "do not add magnitudes"
      ],
      [
        "Types",
        "positive/negative",
        "like repel unlike attract",
        "sign gives direction"
      ]
    ]
  },
  {
    "title": "Point Charge Force vs Field",
    "columns": [
      "Quantity",
      "Formula",
      "Unit",
      "Direction"
    ],
    "rows": [
      [
        "Force",
        "F=k|q1q2|/r^2",
        "N",
        "depends on both signs"
      ],
      [
        "Field",
        "E=kQ/r^2",
        "N/C",
        "outward for +Q inward for -Q"
      ],
      [
        "Force in field",
        "F=qE",
        "N",
        "opposite E for negative q"
      ]
    ]
  },
  {
    "title": "Dipole Summary",
    "columns": [
      "Case",
      "Formula",
      "Direction",
      "High-yield note"
    ],
    "rows": [
      [
        "Moment",
        "p=q(2a)",
        "minus to plus",
        "full separation"
      ],
      [
        "Axial far field",
        "2kp/r^3",
        "along p",
        "factor 2"
      ],
      [
        "Equatorial far field",
        "kp/r^3",
        "opposite p",
        "half axial"
      ],
      [
        "Torque",
        "pE sin theta",
        "aligns p with E",
        "zero net force in uniform E"
      ]
    ]
  },
  {
    "title": "Flux and Gauss Law",
    "columns": [
      "Idea",
      "Formula",
      "Condition",
      "Trap"
    ],
    "rows": [
      [
        "Flat flux",
        "Phi=EA cos theta",
        "uniform E flat area",
        "angle with area vector"
      ],
      [
        "Closed flux",
        "qenc/epsilon0",
        "closed surface",
        "outside charge not in qenc"
      ],
      [
        "Gaussian surface",
        "choose symmetry",
        "line/sheet/sphere",
        "law true but not always useful"
      ]
    ]
  },
  {
    "title": "Gauss Applications",
    "columns": [
      "Distribution",
      "Gaussian surface",
      "Field",
      "Graph"
    ],
    "rows": [
      [
        "Line charge",
        "cylinder",
        "lambda/(2pi epsilon0 r)",
        "1/r"
      ],
      [
        "Plane sheet",
        "pillbox",
        "sigma/(2epsilon0)",
        "constant"
      ],
      [
        "Spherical shell outside",
        "sphere",
        "kQ/r^2",
        "1/r^2"
      ],
      [
        "Shell inside",
        "sphere",
        "0",
        "zero"
      ]
    ]
  },
  {
    "title": "Spherical Charge Graphs",
    "columns": [
      "Object",
      "Inside",
      "At centre",
      "Outside"
    ],
    "rows": [
      [
        "Thin shell",
        "E=0",
        "0",
        "kQ/r^2"
      ],
      [
        "Solid sphere",
        "E=kQr/R^3",
        "0",
        "kQ/r^2"
      ],
      [
        "Conductor",
        "E=0 in material",
        "0 if cavity empty",
        "perpendicular at surface"
      ]
    ]
  },
  {
    "title": "Conductor Facts",
    "columns": [
      "Fact",
      "Meaning",
      "Exam line"
    ],
    "rows": [
      [
        "E inside zero",
        "charges have settled",
        "electrostatic equilibrium"
      ],
      [
        "Charge on surface",
        "excess charge leaves bulk",
        "surface charge density may vary"
      ],
      [
        "Field perpendicular",
        "no tangential component at surface",
        "otherwise charges move"
      ],
      [
        "Shielding",
        "closed conductor protects cavity",
        "Faraday cage idea"
      ]
    ]
  },
  {
    "title": "NEET vs JEE Question Patterns",
    "columns": [
      "Area",
      "NEET pattern",
      "JEE Main pattern"
    ],
    "rows": [
      [
        "Charge basics",
        "q=ne facts",
        "charge transfer bookkeeping"
      ],
      [
        "Coulomb law",
        "direct force/distance",
        "vector superposition"
      ],
      [
        "Field lines",
        "correct/incorrect statements",
        "field cancellation points"
      ],
      [
        "Gauss law",
        "formula applications",
        "derive and graph piecewise fields"
      ]
    ]
  }
]

export const memoryHooks = [
  [
    "Quantization",
    "Charge comes in coins of e."
  ],
  [
    "Conservation",
    "Charge bookkeeping always balances in an isolated system."
  ],
  [
    "Coulomb law",
    "Charge product on top, distance squared below."
  ],
  [
    "Field direction",
    "Positive source sends field out; negative source pulls field in."
  ],
  [
    "Superposition",
    "Add arrows, not just numbers."
  ],
  [
    "Dipole moment",
    "p points from minus to plus."
  ],
  [
    "Axial/equatorial",
    "Axial has 2; equatorial opposes p."
  ],
  [
    "Flux",
    "Area vector decides cosine."
  ],
  [
    "Gauss law",
    "Closed flux counts only inside charge."
  ],
  [
    "Gaussian surfaces",
    "Line-cylinder, plane-pillbox, sphere-sphere."
  ]
]

export const topFormulas = [
  "q = ne",
  "F = k |q1 q2| / r^2",
  "F12 = k q1 q2 r12_hat / r^2",
  "E = F/q0",
  "E = kQ/r^2",
  "E_net = sum Ei",
  "p = q(2a)",
  "E_axial = (1/(4 pi epsilon0)) 2p/r^3",
  "E_equatorial = (1/(4 pi epsilon0)) p/r^3 opposite p",
  "tau = pE sin theta",
  "lambda=dq/dl, sigma=dq/dA, rho=dq/dV",
  "Phi = E A cos theta",
  "closed flux = q_enclosed/epsilon0",
  "E = lambda/(2 pi epsilon0 r)",
  "E = sigma/(2 epsilon0)",
  "E_out=kQ/r^2, E_inside=0",
  "E_inside=kQr/R^3, E_out=kQ/r^2",
  "E_inside = 0, E_just outside = sigma/epsilon0",
  "Phi_closed = q_enclosed/epsilon0",
  "E_between two opposite infinite sheets = sigma/epsilon0",
  "E_inside conductor = 0",
  "E_just outside conductor = sigma/epsilon0",
  "q_enclosed inside solid sphere = Qr^3/R^3",
  "E inside solid sphere = kQr/R^3",
  "F on negative charge is opposite to E"
]

export const topConcepts = [
  "Charge is quantized as q=ne.",
  "Total charge is conserved in an isolated system.",
  "Coulomb force is mutual, equal and opposite.",
  "Electric field is force per unit positive test charge.",
  "Field direction is the force direction on a positive charge.",
  "Point charge field follows inverse-square law.",
  "Net field is vector sum of individual fields.",
  "Field lines start on positive charge and end on negative charge.",
  "Field lines never intersect.",
  "Dipole moment points from negative charge to positive charge.",
  "Far dipole field varies as 1/r^3.",
  "Uniform field gives dipole torque but zero net force.",
  "Flux depends on area vector, not just area.",
  "Gauss law counts enclosed charge for net closed flux.",
  "Gaussian surface choice depends on symmetry.",
  "Infinite line charge field varies as 1/r.",
  "Infinite sheet field is distance-independent.",
  "Spherical shell field is zero inside.",
  "Uniform solid sphere field rises linearly inside.",
  "Conductor has zero electric field inside at electrostatic equilibrium."
]

export const topTraps = [
  "Using fractional n in q=ne.",
  "Adding charge magnitudes instead of algebraic charges.",
  "Forgetting microC to C conversion.",
  "Using distance in cm inside Coulomb law.",
  "Ignoring direction in vector superposition.",
  "Drawing field lines from negative to positive.",
  "Allowing field lines to cross.",
  "Using point-charge formula for line or sheet charge.",
  "Forgetting axial dipole field has factor 2.",
  "Drawing equatorial dipole field along p.",
  "Using angle with surface instead of area vector in flux.",
  "Including outside charges in q enclosed.",
  "Using total Q for inside point of solid sphere.",
  "Saying zero field inside conductor means no surface charge.",
  "Forgetting force on negative charge is opposite to field."
]

export const topDiagrams = [
  "Like and unlike charge force arrows",
  "Quantization number line",
  "Charging by induction sequence",
  "Point charge radial field lines",
  "Electric dipole field lines",
  "Dipole axial and equatorial diagrams",
  "Flux through tilted surface",
  "Gaussian cylinder for line charge",
  "Pillbox for plane sheet",
  "Spherical shell and solid sphere E-r graphs"
]

export const graphPatterns = [
  "Coulomb force versus r: 1/r^2 fall.",
  "Point charge E versus r: 1/r^2 fall.",
  "Line charge E versus r: 1/r fall.",
  "Plane sheet E versus r: constant.",
  "Flux versus theta: cosine curve.",
  "Dipole torque versus theta: sine curve.",
  "Shell E-r: zero inside, inverse-square outside.",
  "Solid sphere E-r: linear inside, inverse-square outside.",
  "Conductor E-r: zero inside conductor region.",
  "Allowed charge graph: discrete steps of e."
]

export const questionTypes = [
  "q=ne integer",
  "charge conservation",
  "Coulomb force",
  "field due to point charge",
  "superposition vector",
  "field-line statement",
  "dipole axial/equatorial",
  "flux angle",
  "Gauss law q enclosed",
  "spherical graph interpretation"
]

export const revisionPlans = {
  "thirtyMinute": [
    "0-5 min: charge properties and Coulomb law.",
    "5-10 min: electric field and field-line rules.",
    "10-15 min: dipole formulas and directions.",
    "15-20 min: flux and Gauss law.",
    "20-25 min: line, sheet, shell and sphere results.",
    "25-30 min: traps plus two quick numericals."
  ],
  "lastDay": [
    "Redraw field lines, Gaussian surfaces and sphere graphs.",
    "Revise formulas with SI units.",
    "Solve one Coulomb vector question and one flux question.",
    "Review conductor and shielding statements.",
    "Do not start a new source; polish traps."
  ],
  "examHall": [
    "Mark signs of charges before substituting.",
    "Convert microC and cm into SI units.",
    "Draw vectors for more than one charge.",
    "For Gauss law, write q enclosed explicitly.",
    "For dipole, check axial/equatorial direction before formula."
  ]
}

export const finalChecklist = [
  "I can explain quantization and conservation of charge.",
  "I can apply Coulomb law with SI units.",
  "I can find field due to one or more point charges.",
  "I can draw correct field lines.",
  "I know dipole moment direction and units.",
  "I can derive axial and equatorial dipole fields at far points.",
  "I can compute torque on a dipole in uniform field.",
  "I can use flux formula with area vector angle.",
  "I can state and apply Gauss law.",
  "I can choose cylinder, pillbox or sphere as Gaussian surface.",
  "I can derive fields of line charge, sheet, shell and solid sphere.",
  "I can list conductor electrostatic equilibrium facts."
]
