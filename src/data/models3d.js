export const models3d = {
  "repo": "physicsforge-chapter1",
  "chapterNumber": 1,
  "chapterName": "Electric Charges and Fields",
  "shortName": "Charges and Fields",
  "count": 20,
  "models": [
    {
      "id": "model-01",
      "number": 1,
      "title": "Point Charge Field Cloud",
      "kind": "charge-field",
      "formula": "E = kq/r^2",
      "concept": "Radial field arrows show why field strength falls with distance.",
      "exam": "Direction errors are common: field is away from positive charge and toward negative charge.",
      "labels": [
        "source charge",
        "field arrows",
        "test charge"
      ],
      "color": "#2563eb"
    },
    {
      "id": "model-02",
      "number": 2,
      "title": "Electric Dipole Field",
      "kind": "dipole",
      "formula": "p = q(2a)",
      "concept": "Two opposite charges create curved field lines and a dipole axis.",
      "exam": "Use axial and equatorial point formulas separately.",
      "labels": [
        "+q",
        "-q",
        "dipole axis"
      ],
      "color": "#b45309"
    },
    {
      "id": "model-03",
      "number": 3,
      "title": "Uniform Electric Field Plates",
      "kind": "capacitor",
      "formula": "E = sigma/epsilon0",
      "concept": "Parallel plates produce nearly uniform field between the plates.",
      "exam": "Ignore edge effects only when plates are large and close.",
      "labels": [
        "positive plate",
        "negative plate",
        "uniform E"
      ],
      "color": "#0f766e"
    },
    {
      "id": "model-04",
      "number": 4,
      "title": "Gauss Sphere Flux",
      "kind": "charge-field",
      "formula": "Phi = q/epsilon0",
      "concept": "A closed spherical surface samples field from every direction.",
      "exam": "Flux depends on enclosed charge, not the sphere radius.",
      "labels": [
        "Gaussian surface",
        "normal area",
        "enclosed charge"
      ],
      "color": "#dc2626"
    },
    {
      "id": "model-05",
      "number": 5,
      "title": "Ring Field Axis",
      "kind": "dipole",
      "formula": "E = kQx/(x^2 + R^2)^(3/2)",
      "concept": "A charged ring gives zero field at centre and axial field away from centre.",
      "exam": "Remember the field is maximum at x = R/sqrt(2).",
      "labels": [
        "charged ring",
        "axis",
        "field peak"
      ],
      "color": "#7c3aed"
    },
    {
      "id": "model-06",
      "number": 6,
      "title": "Line Charge Cylinder",
      "kind": "magnetic",
      "formula": "E = lambda/(2 pi epsilon0 r)",
      "concept": "Cylindrical symmetry makes the field radial around a long line charge.",
      "exam": "Use cylindrical Gaussian surface, not a sphere.",
      "labels": [
        "line charge",
        "cylinder",
        "radial field"
      ],
      "color": "#2563eb"
    },
    {
      "id": "model-07",
      "number": 7,
      "title": "Electric Field Superposition",
      "kind": "charge-field",
      "formula": "E_net = vector sum E_i",
      "concept": "Several field arrows combine as vectors, not scalars.",
      "exam": "Do not add magnitudes when directions differ.",
      "labels": [
        "E1",
        "E2",
        "resultant"
      ],
      "color": "#b45309"
    },
    {
      "id": "model-08",
      "number": 8,
      "title": "Electric Dipole Torque",
      "kind": "phasor",
      "formula": "tau = pE sin theta",
      "concept": "A dipole in uniform field rotates toward alignment.",
      "exam": "Torque is zero at theta = 0 and theta = 180 degree.",
      "labels": [
        "dipole moment",
        "field",
        "torque"
      ],
      "color": "#0f766e"
    },
    {
      "id": "model-09",
      "number": 9,
      "title": "Charge Pair Force Balance",
      "kind": "circuit",
      "formula": "F = kq1q2/r^2",
      "concept": "Equal and opposite forces act along the line joining charges.",
      "exam": "The two forces are equal in magnitude even for unequal charges.",
      "labels": [
        "q1",
        "q2",
        "action-reaction"
      ],
      "color": "#dc2626"
    },
    {
      "id": "model-10",
      "number": 10,
      "title": "Field Line Density",
      "kind": "charge-field",
      "formula": "E proportional to line density",
      "concept": "Crowded arrows near charge show stronger field.",
      "exam": "Field lines never cross.",
      "labels": [
        "dense region",
        "weak region",
        "direction"
      ],
      "color": "#7c3aed"
    },
    {
      "id": "model-11",
      "number": 11,
      "title": "Electric Flux Patch",
      "kind": "default",
      "formula": "dPhi = E dA cos theta",
      "concept": "A tilted area patch receives less flux than a perpendicular patch.",
      "exam": "Use angle between E and area vector.",
      "labels": [
        "area vector",
        "E field",
        "projected area"
      ],
      "color": "#2563eb"
    },
    {
      "id": "model-12",
      "number": 12,
      "title": "Conducting Sphere Field",
      "kind": "charge-field",
      "formula": "E_inside = 0",
      "concept": "Charges sit on the surface and field inside conductor is zero.",
      "exam": "Inside a conductor in electrostatic equilibrium, field is zero.",
      "labels": [
        "surface charge",
        "zero inside",
        "external E"
      ],
      "color": "#b45309"
    },
    {
      "id": "model-13",
      "number": 13,
      "title": "Nonuniform Field Gradient",
      "kind": "wave",
      "formula": "F = qE",
      "concept": "A test charge accelerates more in stronger field regions.",
      "exam": "Field direction is force direction only for positive test charge.",
      "labels": [
        "weak field",
        "strong field",
        "test charge"
      ],
      "color": "#0f766e"
    },
    {
      "id": "model-14",
      "number": 14,
      "title": "Charge Quantization Stack",
      "kind": "atom",
      "formula": "q = ne",
      "concept": "Charge appears in integral multiples of elementary charge.",
      "exam": "A body cannot have 2.5e net charge.",
      "labels": [
        "electron unit",
        "integer n",
        "net charge"
      ],
      "color": "#dc2626"
    },
    {
      "id": "model-15",
      "number": 15,
      "title": "Coulomb Vector Triangle",
      "kind": "phasor",
      "formula": "F_net = vector sum F",
      "concept": "For three charges, force is resolved into components.",
      "exam": "Use vector directions before adding.",
      "labels": [
        "F1",
        "F2",
        "net force"
      ],
      "color": "#7c3aed"
    },
    {
      "id": "model-16",
      "number": 16,
      "title": "Electric Field Zero Point",
      "kind": "energy-level",
      "formula": "E1 + E2 = 0",
      "concept": "Between like charges a zero-field point can appear depending on magnitudes.",
      "exam": "For unlike charges, zero point lies outside the segment.",
      "labels": [
        "charge A",
        "charge B",
        "zero field"
      ],
      "color": "#2563eb"
    },
    {
      "id": "model-17",
      "number": 17,
      "title": "Shielding Cage",
      "kind": "capacitor",
      "formula": "E_inside conductor = 0",
      "concept": "A conducting enclosure shields its interior from external static field.",
      "exam": "Shielding is electrostatic, not magic insulation.",
      "labels": [
        "outer surface",
        "cavity",
        "zero E"
      ],
      "color": "#b45309"
    },
    {
      "id": "model-18",
      "number": 18,
      "title": "Oil Drop Charge Balance",
      "kind": "thermal",
      "formula": "qE = mg",
      "concept": "A suspended drop balances electric and gravitational forces.",
      "exam": "Use sign and magnitude carefully.",
      "labels": [
        "drop",
        "electric force",
        "weight"
      ],
      "color": "#0f766e"
    },
    {
      "id": "model-19",
      "number": 19,
      "title": "Dipole Potential Surface",
      "kind": "dipole",
      "formula": "V = kp cos theta/r^2",
      "concept": "Equipotential lobes show positive and negative regions around a dipole.",
      "exam": "Potential is scalar but can be positive or negative.",
      "labels": [
        "positive lobe",
        "negative lobe",
        "zero plane"
      ],
      "color": "#dc2626"
    },
    {
      "id": "model-20",
      "number": 20,
      "title": "Field Mapping Lab",
      "kind": "default",
      "formula": "E = -dV/dr",
      "concept": "Field lines are perpendicular to equipotential surfaces.",
      "exam": "Equipotential crossing field lines at right angle is a key NCERT idea.",
      "labels": [
        "equipotential",
        "field line",
        "normal direction"
      ],
      "color": "#7c3aed"
    }
  ]
}
