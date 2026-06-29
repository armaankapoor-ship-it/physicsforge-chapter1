export const derivations = [
  {
    "id": "point-field",
    "title": "Electric Field Due to a Point Charge",
    "startsFrom": "Coulomb law F = kQq0/r^2 and E = F/q0",
    "steps": [
      [
        "Force on test charge",
        "F = kQq0/r^2",
        "The source charge Q exerts force on small positive test charge q0."
      ],
      [
        "Divide by test charge",
        "E = F/q0 = kQ/r^2",
        "Field is force per unit positive charge."
      ],
      [
        "Direction",
        "For Q positive E is outward; for Q negative E is inward",
        "Direction comes from sign of source charge."
      ],
      [
        "Result",
        "E = (1/(4 pi epsilon0)) Q/r^2",
        "Magnitude follows inverse-square law."
      ]
    ],
    "finalFormula": "E = kQ/r^2",
    "shortcut": "For point charge field, remove the test charge from Coulomb force by dividing by q0.",
    "boardStyle": "Start with Coulomb law, define field, cancel q0, then state direction.",
    "mistake": "Do not keep q0 in final field due to source charge."
  },
  {
    "id": "dipole-axial",
    "title": "Field on Axial Line of an Electric Dipole",
    "startsFrom": "Two charges +q and -q separated by 2a",
    "steps": [
      [
        "Write fields",
        "E_plus = kq/(r-a)^2, E_minus = kq/(r+a)^2",
        "At axial point outside, fields oppose along the axis."
      ],
      [
        "Subtract magnitudes",
        "E = kq[(1/(r-a)^2) - (1/(r+a)^2)]",
        "The nearer charge contribution is stronger."
      ],
      [
        "Simplify",
        "E = kq(4ar)/(r^2-a^2)^2",
        "Algebra combines the inverse-square terms."
      ],
      [
        "Far point",
        "For r >> a, E = k(2p)/r^3",
        "Since p=2qa, dipole field falls as 1/r^3."
      ]
    ],
    "finalFormula": "E_axial = k(2p)/r^3 for r >> a",
    "shortcut": "Axial field has factor 2.",
    "boardStyle": "Draw the dipole first and show which two fields oppose before subtracting.",
    "mistake": "Do not use far-field formula when r is comparable to a."
  },
  {
    "id": "dipole-equatorial",
    "title": "Field on Equatorial Line of an Electric Dipole",
    "startsFrom": "Point on perpendicular bisector of dipole",
    "steps": [
      [
        "Equal distances",
        "Distance from each charge = sqrt(r^2+a^2)",
        "Field magnitudes due to +q and -q are equal."
      ],
      [
        "Resolve components",
        "Perpendicular components cancel, axial components add opposite to p",
        "Symmetry decides direction."
      ],
      [
        "Exact form",
        "E = kp/(r^2+a^2)^(3/2)",
        "Result points opposite to dipole moment."
      ],
      [
        "Far point",
        "For r >> a, E = kp/r^3",
        "Equatorial magnitude is half axial magnitude at same r."
      ]
    ],
    "finalFormula": "E_equatorial = kp/r^3 opposite to p for r >> a",
    "shortcut": "Equatorial field has no factor 2 and points opposite p.",
    "boardStyle": "Use components and state cancellation before final formula.",
    "mistake": "Do not draw equatorial field along dipole moment."
  },
  {
    "id": "dipole-torque",
    "title": "Torque on a Dipole in Uniform Field",
    "startsFrom": "Forces on +q and -q in uniform E",
    "steps": [
      [
        "Forces",
        "+q feels qE along E and -q feels qE opposite E",
        "Forces are equal and opposite."
      ],
      [
        "Net force",
        "F_net = 0",
        "Uniform field gives no translational acceleration of dipole centre."
      ],
      [
        "Torque arm",
        "Perpendicular separation gives lever arm 2a sin theta",
        "The pair of forces forms a couple."
      ],
      [
        "Result",
        "tau = qE(2a sin theta) = pE sin theta",
        "Torque aligns p with E."
      ]
    ],
    "finalFormula": "tau = pE sin theta",
    "shortcut": "Maximum torque at 90 degrees.",
    "boardStyle": "Draw force pair and lever arm; then write p=2qa.",
    "mistake": "Do not say a uniform field gives net force on an ideal dipole."
  },
  {
    "id": "flux-flat",
    "title": "Electric Flux Through a Flat Surface",
    "startsFrom": "Uniform field E and area vector A",
    "steps": [
      [
        "Area vector",
        "A is normal to surface",
        "Flux counts crossing relative to the normal."
      ],
      [
        "Component",
        "Effective field through surface = E cos theta",
        "Only normal component crosses the surface."
      ],
      [
        "Multiply area",
        "Phi = (E cos theta)A",
        "Field through every part is same for uniform E."
      ],
      [
        "Result",
        "Phi = EA cos theta",
        "Flux can be positive, zero or negative."
      ]
    ],
    "finalFormula": "Phi = EA cos theta",
    "shortcut": "If theta = 90 degrees, flux is zero.",
    "boardStyle": "State theta is with area vector, not the plane.",
    "mistake": "Using angle with the surface instead of normal gives sine/cosine error."
  },
  {
    "id": "gauss-line",
    "title": "Field Due to Infinite Line Charge",
    "startsFrom": "Gauss law closed flux = q_enclosed/epsilon0",
    "steps": [
      [
        "Choose surface",
        "Use coaxial cylinder of radius r and length l",
        "Cylindrical symmetry makes E constant on curved surface."
      ],
      [
        "Flux",
        "Phi = E(2 pi r l)",
        "End caps have zero flux because E is radial."
      ],
      [
        "Enclosed charge",
        "q_enclosed = lambda l",
        "Charge enclosed depends on cylinder length."
      ],
      [
        "Solve",
        "E(2 pi r l)=lambda l/epsilon0",
        "Length cancels, giving E = lambda/(2 pi epsilon0 r)."
      ]
    ],
    "finalFormula": "E = lambda/(2 pi epsilon0 r)",
    "shortcut": "Line charge field falls as 1/r.",
    "boardStyle": "Draw the Gaussian cylinder and mark zero flux through caps.",
    "mistake": "Do not include end-cap area in flux."
  },
  {
    "id": "gauss-sheet",
    "title": "Field Due to Infinite Plane Sheet",
    "startsFrom": "Gauss law with pillbox surface",
    "steps": [
      [
        "Choose surface",
        "Use pillbox crossing the sheet",
        "Plane symmetry makes field perpendicular and equal on both sides."
      ],
      [
        "Flux",
        "Phi = EA + EA = 2EA",
        "Curved side has zero flux."
      ],
      [
        "Enclosed charge",
        "q_enclosed = sigma A",
        "Charge inside equals density times pillbox face area."
      ],
      [
        "Solve",
        "2EA = sigma A/epsilon0",
        "Area cancels, giving constant field."
      ]
    ],
    "finalFormula": "E = sigma/(2 epsilon0)",
    "shortcut": "Infinite sheet field is independent of distance.",
    "boardStyle": "Draw pillbox with two equal outward flux faces.",
    "mistake": "Do not use 1/r^2 for an infinite sheet."
  },
  {
    "id": "gauss-shell",
    "title": "Field Due to Spherical Shell",
    "startsFrom": "Gauss law with spherical Gaussian surface",
    "steps": [
      [
        "Outside surface",
        "For r>R, q_enclosed=Q",
        "Spherical symmetry makes E constant on sphere."
      ],
      [
        "Outside flux",
        "E(4 pi r^2)=Q/epsilon0",
        "Solve as point charge at centre."
      ],
      [
        "Inside surface",
        "For r<R, q_enclosed=0",
        "No charge lies inside inner Gaussian sphere."
      ],
      [
        "Inside result",
        "E=0",
        "Flux zero and symmetry give zero field inside shell."
      ]
    ],
    "finalFormula": "E_out = kQ/r^2, E_inside = 0",
    "shortcut": "Shell is zero-field inside and point-like outside.",
    "boardStyle": "Separate inside and outside cases clearly.",
    "mistake": "Do not use outside formula inside the shell."
  },
  {
    "id": "solid-sphere",
    "title": "Field of Uniformly Charged Solid Sphere",
    "startsFrom": "Uniform volume charge density rho",
    "steps": [
      [
        "Inside charge",
        "q_enclosed = Q(r^3/R^3)",
        "Charge enclosed grows with volume."
      ],
      [
        "Inside Gauss law",
        "E(4 pi r^2)=Q r^3/(R^3 epsilon0)",
        "Only enclosed charge contributes to net flux."
      ],
      [
        "Inside result",
        "E = kQr/R^3",
        "Field rises linearly from centre."
      ],
      [
        "Outside result",
        "E = kQ/r^2",
        "Outside the whole sphere behaves like point charge."
      ]
    ],
    "finalFormula": "E_inside = kQr/R^3, E_outside = kQ/r^2",
    "shortcut": "Inside linear, outside inverse-square.",
    "boardStyle": "Show q enclosed before applying Gauss law.",
    "mistake": "Using total Q for an inside point is wrong."
  },
  {
    "id": "conductor-surface",
    "title": "Field Near Charged Conducting Surface",
    "startsFrom": "Small pillbox crossing conductor surface",
    "steps": [
      [
        "Inside field",
        "E inside conductor = 0",
        "Free charges cancel internal field at equilibrium."
      ],
      [
        "Flux",
        "Only outside pillbox face contributes: Phi = EA",
        "Side flux is negligible for tiny pillbox."
      ],
      [
        "Charge enclosed",
        "q_enclosed = sigma A",
        "Surface charge lies on conductor."
      ],
      [
        "Gauss law",
        "EA = sigma A/epsilon0",
        "Field just outside is sigma/epsilon0 and perpendicular."
      ]
    ],
    "finalFormula": "E = sigma/epsilon0 just outside conductor",
    "shortcut": "Conductor surface field is twice that of one isolated nonconducting sheet.",
    "boardStyle": "Mention electrostatic equilibrium and perpendicular field.",
    "mistake": "Do not apply this formula to an arbitrary nonconducting surface."
  },
  {
    "id": "gauss-law-statement",
    "title": "Gauss Law from Flux Counting",
    "startsFrom": "Flux through closed surface",
    "steps": [
      [
        "Field line idea",
        "More outward lines mean positive enclosed charge",
        "Flux is a signed count of field crossing."
      ],
      [
        "Closed surface",
        "Lines from outside enter and leave in pairs",
        "External charges give zero net flux through a closed surface."
      ],
      [
        "Enclosed source",
        "Lines beginning or ending inside cause net flux",
        "Only enclosed charge matters."
      ],
      [
        "Mathematical statement",
        "Integral E dot dA = q_enclosed/epsilon0",
        "This is Gauss law."
      ]
    ],
    "finalFormula": "closed flux = q_enclosed/epsilon0",
    "shortcut": "Outside charges can change local E but not net closed flux.",
    "boardStyle": "Explain with field lines, then write the integral statement.",
    "mistake": "Zero net flux does not always mean zero field everywhere."
  },
  {
    "id": "energy-dipole",
    "title": "Potential Energy of Dipole in Uniform Field",
    "startsFrom": "Work done by torque while rotating dipole",
    "steps": [
      [
        "Torque",
        "tau = pE sin theta",
        "Field tries to reduce theta."
      ],
      [
        "Small work",
        "dW_ext = tau dtheta for slow rotation against field",
        "External agent stores energy."
      ],
      [
        "Integrate",
        "U(theta)-U(90 deg) = -pE cos theta",
        "Choose convenient zero at 90 degrees."
      ],
      [
        "Result",
        "U = -pE cos theta",
        "Minimum energy at theta=0."
      ]
    ],
    "finalFormula": "U = -pE cos theta",
    "shortcut": "Stable equilibrium has minimum energy.",
    "boardStyle": "This is advanced foundation; include only if asked beyond NCERT basics.",
    "mistake": "Do not confuse torque zero at 0 and 180 degrees; stability differs."
  }
]
