export const formulas = [
  {
    "id": "charge-quantization",
    "title": "Quantization of Charge",
    "formula": "q = ne",
    "display": "q = ne",
    "symbols": [
      [
        "q",
        "total charge",
        "C"
      ],
      [
        "n",
        "integer number of elementary charges",
        "unitless"
      ],
      [
        "e",
        "elementary charge = 1.6 x 10^-19 C",
        "C"
      ]
    ],
    "meaning": "Charge is granular at microscopic scale.",
    "dimension": "[q] = C; n is dimensionless.",
    "graph": "Allowed charges form equally spaced levels separated by e.",
    "trap": "n must be an integer; fractional n is impossible for isolated charge.",
    "easyExample": "5 excess electrons give q = -5e.",
    "neetExample": "A charge of 3.2 x 10^-19 C equals 2e.",
    "jeeExample": "If a body has 10^13 missing electrons, q = +1.6 microC.",
    "twist": "Macroscopic charge appears continuous only because e is tiny."
  },
  {
    "id": "coulomb-law",
    "title": "Coulomb Law",
    "formula": "F = k |q1 q2| / r^2",
    "display": "F = k |q1 q2| / r^2",
    "symbols": [
      [
        "F",
        "electrostatic force magnitude",
        "N"
      ],
      [
        "q1, q2",
        "point charges",
        "C"
      ],
      [
        "r",
        "separation",
        "m"
      ],
      [
        "k",
        "1/(4 pi epsilon0)",
        "N m^2 C^-2"
      ]
    ],
    "meaning": "Force grows with charge product and falls with square of distance.",
    "dimension": "[kq1q2/r^2] = N.",
    "graph": "F versus r is an inverse-square decreasing curve.",
    "trap": "Convert microC to C and cm to m before substituting.",
    "easyExample": "Doubling r makes F one-fourth.",
    "neetExample": "Like charges repel; unlike charges attract.",
    "jeeExample": "For q1=2 microC, q2=3 microC, r=0.3 m, F=0.6 N.",
    "twist": "The sign decides direction; magnitude is positive."
  },
  {
    "id": "coulomb-vector",
    "title": "Vector Coulomb Law",
    "formula": "F12 = k q1 q2 r12_hat / r^2",
    "display": "F12 = k q1 q2 r12_hat / r^2",
    "symbols": [
      [
        "F12",
        "force on charge 1 due to charge 2",
        "N"
      ],
      [
        "r12_hat",
        "unit vector along separation",
        "unitless"
      ]
    ],
    "meaning": "The force acts along the line joining the charges.",
    "dimension": "Unit vector has no dimension, so dimension is same as Coulomb law.",
    "graph": "Vector arrows show equal and opposite action-reaction forces.",
    "trap": "Do not drop direction when charges lie on axes.",
    "easyExample": "Opposite signs reverse the chosen direction.",
    "neetExample": "Force on q1 and q2 have equal magnitudes and opposite directions.",
    "jeeExample": "Use x and y components for non-collinear systems.",
    "twist": "Vector form is the bridge to superposition."
  },
  {
    "id": "electric-field-definition",
    "title": "Electric Field Definition",
    "formula": "E = F/q0",
    "display": "E = F/q0",
    "symbols": [
      [
        "E",
        "electric field",
        "N C^-1"
      ],
      [
        "F",
        "force on test charge",
        "N"
      ],
      [
        "q0",
        "small positive test charge",
        "C"
      ]
    ],
    "meaning": "Field is force experienced by unit positive test charge.",
    "dimension": "[F/q] = N C^-1.",
    "graph": "Field arrows show direction of force on a positive test charge.",
    "trap": "Test charge should be small enough not to disturb source charges.",
    "easyExample": "10 N on 2 C gives E=5 N/C.",
    "neetExample": "Direction of E is force direction on positive charge.",
    "jeeExample": "Force on negative charge is opposite to E.",
    "twist": "Field can exist even with no test charge present."
  },
  {
    "id": "point-charge-field",
    "title": "Field Due to Point Charge",
    "formula": "E = kQ/r^2",
    "display": "E = kQ/r^2",
    "symbols": [
      [
        "E",
        "field magnitude",
        "N C^-1"
      ],
      [
        "Q",
        "source charge",
        "C"
      ],
      [
        "r",
        "distance from source",
        "m"
      ]
    ],
    "meaning": "Point charge field is radial and inverse-square.",
    "dimension": "[kQ/r^2] = N C^-1.",
    "graph": "E-r graph falls as 1/r^2.",
    "trap": "Positive source gives outward field; negative gives inward field.",
    "easyExample": "Doubling r makes E one-fourth.",
    "neetExample": "At r=0.2 m from 1 microC, E=2.25 x 10^5 N/C.",
    "jeeExample": "Use superposition for multiple point charges.",
    "twist": "Direction cannot be read from magnitude alone."
  },
  {
    "id": "superposition-field",
    "title": "Superposition of Fields",
    "formula": "E_net = sum Ei",
    "display": "E_net = sum Ei",
    "symbols": [
      [
        "E_net",
        "resultant field",
        "N C^-1"
      ],
      [
        "Ei",
        "individual field contribution",
        "N C^-1"
      ]
    ],
    "meaning": "Fields add vectorially because each charge acts independently.",
    "dimension": "All terms have dimension N C^-1.",
    "graph": "Vector triangle or components show cancellation/addition.",
    "trap": "Do not add magnitudes if fields are not parallel.",
    "easyExample": "Equal like charges cancel field at midpoint.",
    "neetExample": "Equal unlike charges add at midpoint between them.",
    "jeeExample": "For perpendicular equal fields E, resultant is sqrt(2)E.",
    "twist": "Superposition remains valid even for many charges."
  },
  {
    "id": "dipole-moment",
    "title": "Electric Dipole Moment",
    "formula": "p = q(2a)",
    "display": "p = q(2a)",
    "symbols": [
      [
        "p",
        "dipole moment",
        "C m"
      ],
      [
        "q",
        "magnitude of either charge",
        "C"
      ],
      [
        "2a",
        "separation between charges",
        "m"
      ]
    ],
    "meaning": "Dipole moment measures strength and orientation of a dipole.",
    "dimension": "[q distance] = C m.",
    "graph": "Dipole arrow points from negative to positive charge.",
    "trap": "Do not use half separation a when formula requires full separation 2a.",
    "easyExample": "q=2 microC, separation=0.1 m gives p=2 x 10^-7 C m.",
    "neetExample": "Polar molecules have permanent dipole moment.",
    "jeeExample": "Torque depends on p, not on q alone.",
    "twist": "Direction of p is conventional, not charge motion."
  },
  {
    "id": "dipole-axial",
    "title": "Dipole Field on Axial Line",
    "formula": "E_axial = (1/(4 pi epsilon0)) 2p/r^3",
    "display": "E_axial = (1/(4 pi epsilon0)) 2p/r^3",
    "symbols": [
      [
        "E_axial",
        "far axial dipole field",
        "N C^-1"
      ],
      [
        "p",
        "dipole moment",
        "C m"
      ],
      [
        "r",
        "distance from dipole centre",
        "m"
      ]
    ],
    "meaning": "Far axial dipole field points along p and falls as 1/r^3.",
    "dimension": "[kp/r^3] = N C^-1.",
    "graph": "Log graph slope is -3 in far field.",
    "trap": "Formula assumes r much greater than dipole size.",
    "easyExample": "Doubling r makes field one-eighth.",
    "neetExample": "Axial field is twice equatorial field at same far r.",
    "jeeExample": "Use exact expression near the dipole.",
    "twist": "Dipole field falls faster than point-charge field."
  },
  {
    "id": "dipole-equatorial",
    "title": "Dipole Field on Equatorial Line",
    "formula": "E_equatorial = (1/(4 pi epsilon0)) p/r^3 opposite p",
    "display": "E_equatorial = (1/(4 pi epsilon0)) p/r^3 opposite p",
    "symbols": [
      [
        "E_equatorial",
        "far equatorial field",
        "N C^-1"
      ],
      [
        "p",
        "dipole moment",
        "C m"
      ],
      [
        "r",
        "distance from centre",
        "m"
      ]
    ],
    "meaning": "Far equatorial field is opposite to dipole moment.",
    "dimension": "[kp/r^3] = N C^-1.",
    "graph": "Magnitude has same 1/r^3 shape but half axial magnitude.",
    "trap": "Direction is opposite p, a common trap.",
    "easyExample": "If axial field is 20 N/C, equatorial field is 10 N/C at same r.",
    "neetExample": "At equatorial points, components along line cancel and along axis add opposite p.",
    "jeeExample": "Use vector components, not scalar subtraction only.",
    "twist": "The 2:1 comparison is high-yield."
  },
  {
    "id": "dipole-torque",
    "title": "Torque on Dipole",
    "formula": "tau = pE sin theta",
    "display": "tau = pE sin theta",
    "symbols": [
      [
        "tau",
        "torque",
        "N m"
      ],
      [
        "p",
        "dipole moment",
        "C m"
      ],
      [
        "E",
        "uniform field",
        "N C^-1"
      ],
      [
        "theta",
        "angle between p and E",
        "radian or degree"
      ]
    ],
    "meaning": "Uniform field tries to align a dipole with E.",
    "dimension": "[pE] = C m x N C^-1 = N m.",
    "graph": "tau-theta graph is a sine curve.",
    "trap": "Net force is zero only for uniform field.",
    "easyExample": "At 90 degrees torque is pE.",
    "neetExample": "At 0 degrees torque is zero and equilibrium is stable.",
    "jeeExample": "At 180 degrees torque is zero but equilibrium is unstable.",
    "twist": "Torque can exist without net force."
  },
  {
    "id": "charge-density",
    "title": "Charge Densities",
    "formula": "lambda=dq/dl, sigma=dq/dA, rho=dq/dV",
    "display": "lambda=dq/dl, sigma=dq/dA, rho=dq/dV",
    "symbols": [
      [
        "lambda",
        "linear charge density",
        "C m^-1"
      ],
      [
        "sigma",
        "surface charge density",
        "C m^-2"
      ],
      [
        "rho",
        "volume charge density",
        "C m^-3"
      ]
    ],
    "meaning": "Density describes how charge is spread over line, surface or volume.",
    "dimension": "Units follow charge divided by length, area or volume.",
    "graph": "Density diagrams show line, sheet and solid distributions.",
    "trap": "Choose density from geometry.",
    "easyExample": "4 microC over 2 m gives lambda=2 microC/m.",
    "neetExample": "Plane sheet problems use sigma.",
    "jeeExample": "Solid sphere problems often use rho.",
    "twist": "Continuous charge uses integration or symmetry."
  },
  {
    "id": "electric-flux",
    "title": "Electric Flux",
    "formula": "Phi = E A cos theta",
    "display": "Phi = E A cos theta",
    "symbols": [
      [
        "Phi",
        "electric flux",
        "N m^2 C^-1"
      ],
      [
        "E",
        "electric field",
        "N C^-1"
      ],
      [
        "A",
        "area",
        "m^2"
      ],
      [
        "theta",
        "angle between E and area vector",
        "degree/radian"
      ]
    ],
    "meaning": "Flux measures field passing through a surface.",
    "dimension": "[EA] = N m^2 C^-1.",
    "graph": "Phi-theta graph is cosine.",
    "trap": "Theta is with area vector, not surface plane.",
    "easyExample": "E=10, A=3, theta=0 gives Phi=30.",
    "neetExample": "At theta=90 degrees flux is zero.",
    "jeeExample": "Negative flux means field enters relative to chosen outward normal.",
    "twist": "Flux is scalar but can be signed."
  },
  {
    "id": "gauss-law",
    "title": "Gauss Law",
    "formula": "closed flux = q_enclosed/epsilon0",
    "display": "closed flux = q_enclosed/epsilon0",
    "symbols": [
      [
        "q_enclosed",
        "charge inside Gaussian surface",
        "C"
      ],
      [
        "epsilon0",
        "permittivity of free space",
        "C^2 N^-1 m^-2"
      ]
    ],
    "meaning": "Net flux through a closed surface counts enclosed charge.",
    "dimension": "[q/epsilon0] = N m^2 C^-1.",
    "graph": "Closed surface diagrams show outgoing minus incoming line count.",
    "trap": "Outside charges do not change net flux.",
    "easyExample": "If q enclosed is zero, net flux is zero.",
    "neetExample": "Field can be non-zero even when net flux is zero.",
    "jeeExample": "Useful field calculations need symmetry.",
    "twist": "Gauss law is universal; simple E formulas are symmetry-dependent."
  },
  {
    "id": "line-charge-field",
    "title": "Infinite Line Charge Field",
    "formula": "E = lambda/(2 pi epsilon0 r)",
    "display": "E = lambda/(2 pi epsilon0 r)",
    "symbols": [
      [
        "lambda",
        "linear charge density",
        "C m^-1"
      ],
      [
        "r",
        "distance from line",
        "m"
      ]
    ],
    "meaning": "Line charge field decreases as 1/r.",
    "dimension": "lambda/(epsilon0 r) has unit N/C.",
    "graph": "E-r graph is a decreasing 1/r curve.",
    "trap": "Do not use point charge 1/r^2 dependence.",
    "easyExample": "Doubling r halves E.",
    "neetExample": "Cylindrical Gaussian surface is used.",
    "jeeExample": "Only curved surface contributes flux.",
    "twist": "This is an ideal infinite-line model."
  },
  {
    "id": "plane-sheet-field",
    "title": "Infinite Plane Sheet Field",
    "formula": "E = sigma/(2 epsilon0)",
    "display": "E = sigma/(2 epsilon0)",
    "symbols": [
      [
        "sigma",
        "surface charge density",
        "C m^-2"
      ],
      [
        "epsilon0",
        "permittivity",
        "C^2 N^-1 m^-2"
      ]
    ],
    "meaning": "Infinite sheet field is constant with distance.",
    "dimension": "sigma/epsilon0 has unit N/C.",
    "graph": "E-r graph is horizontal.",
    "trap": "Formula is for one non-conducting infinite sheet.",
    "easyExample": "Two opposite plates give E=sigma/epsilon0 between them.",
    "neetExample": "Pillbox Gaussian surface is used.",
    "jeeExample": "Outside two equal opposite plates ideal field cancels.",
    "twist": "Independence from distance is idealization."
  },
  {
    "id": "spherical-shell-field",
    "title": "Spherical Shell Field",
    "formula": "E_out=kQ/r^2, E_inside=0",
    "display": "E_out=kQ/r^2, E_inside=0",
    "symbols": [
      [
        "Q",
        "total shell charge",
        "C"
      ],
      [
        "r",
        "distance from centre",
        "m"
      ]
    ],
    "meaning": "A shell acts as point charge outside and shields inside.",
    "dimension": "Both expressions give N/C.",
    "graph": "Graph is zero inside, then inverse-square outside.",
    "trap": "Specify just inside or just outside at the surface.",
    "easyExample": "Centre field is zero.",
    "neetExample": "Outside field at distance r equals point charge field.",
    "jeeExample": "Use spherical Gaussian surface.",
    "twist": "Inside zero field is not because charge is absent on shell."
  },
  {
    "id": "solid-sphere-field",
    "title": "Uniform Solid Sphere Field",
    "formula": "E_inside=kQr/R^3, E_out=kQ/r^2",
    "display": "E_inside=kQr/R^3, E_out=kQ/r^2",
    "symbols": [
      [
        "R",
        "sphere radius",
        "m"
      ],
      [
        "r",
        "distance from centre",
        "m"
      ]
    ],
    "meaning": "Inside field increases linearly; outside falls as point-charge field.",
    "dimension": "kQr/R^3 gives N/C.",
    "graph": "Graph rises to surface then decreases.",
    "trap": "Inside use enclosed charge, not total charge.",
    "easyExample": "At centre E=0.",
    "neetExample": "At surface both formulas match.",
    "jeeExample": "Enclosed charge is Q r^3/R^3.",
    "twist": "This is a favorite graph trap."
  },
  {
    "id": "conductor-field",
    "title": "Conductor in Electrostatic Equilibrium",
    "formula": "E_inside = 0, E_just outside = sigma/epsilon0",
    "display": "E_inside = 0, E_just outside = sigma/epsilon0",
    "symbols": [
      [
        "sigma",
        "surface charge density",
        "C m^-2"
      ],
      [
        "E",
        "field",
        "N C^-1"
      ]
    ],
    "meaning": "Free charges rearrange until internal field is zero.",
    "dimension": "sigma/epsilon0 has unit N/C.",
    "graph": "Field jumps at conducting surface.",
    "trap": "Zero field inside does not mean zero surface charge.",
    "easyExample": "Excess charge lies on outer surface.",
    "neetExample": "Field just outside is perpendicular to surface.",
    "jeeExample": "Electrostatic shielding follows from this.",
    "twist": "This applies in electrostatic equilibrium."
  },
  {
    "id": "force-in-field",
    "title": "Force on Charge in Field",
    "formula": "F = qE",
    "display": "F = qE",
    "symbols": [
      [
        "F",
        "force",
        "N"
      ],
      [
        "q",
        "charge placed in field",
        "C"
      ],
      [
        "E",
        "electric field",
        "N C^-1"
      ]
    ],
    "meaning": "A charge in an electric field experiences force.",
    "dimension": "[qE] = C x N/C = N.",
    "graph": "Force arrows follow E for positive q and oppose E for negative q.",
    "trap": "Do not use E direction for negative charge force.",
    "easyExample": "q=2 C in E=5 N/C gives F=10 N.",
    "neetExample": "Electron force is opposite to field.",
    "jeeExample": "Uniform field gives constant force.",
    "twist": "This links field concept to motion questions."
  }
]

export const formulaGroups = [
  {
    "title": "Charge Basics",
    "formulas": [
      "charge-quantization",
      "charge-density"
    ]
  },
  {
    "title": "Force and Field",
    "formulas": [
      "coulomb-law",
      "coulomb-vector",
      "electric-field-definition",
      "point-charge-field",
      "force-in-field",
      "superposition-field"
    ]
  },
  {
    "title": "Dipole",
    "formulas": [
      "dipole-moment",
      "dipole-axial",
      "dipole-equatorial",
      "dipole-torque"
    ]
  },
  {
    "title": "Flux and Gauss",
    "formulas": [
      "electric-flux",
      "gauss-law",
      "line-charge-field",
      "plane-sheet-field"
    ]
  },
  {
    "title": "Spherical and Conductors",
    "formulas": [
      "spherical-shell-field",
      "solid-sphere-field",
      "conductor-field"
    ]
  }
]
