function curvePath(points) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
}

function BaseSvg({ children, className = '' }) {
  return (
    <svg viewBox="0 0 600 260" className={`h-full min-h-[250px] w-full text-slate-900 dark:text-white ${className}`} role="img">
      {children}
    </svg>
  )
}

function ArrowDefs({ id, color = 'currentColor' }) {
  return (
    <defs>
      <marker id={id} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L9,4.5 L0,9 z" fill={color} />
      </marker>
    </defs>
  )
}

function Axis({ x1 = 48, x2 = 552, y = 198, yTop = 38 }) {
  return (
    <>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeOpacity=".18" strokeWidth="2" />
      <line x1={x1} y1={y} x2={x1} y2={yTop} stroke="currentColor" strokeOpacity=".18" strokeWidth="2" />
      <text x={x2 - 12} y={y + 24} className="fill-slate-500 text-[11px] font-bold">r</text>
      <text x={x1 - 22} y={yTop + 8} className="fill-slate-500 text-[11px] font-bold">E/F</text>
    </>
  )
}

function Charge({ x, y, sign = '+', r = 28 }) {
  const positive = sign === '+'
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={positive ? '#2563eb' : '#f97316'} opacity=".16" stroke={positive ? '#2563eb' : '#f97316'} strokeWidth="4" />
      <text x={x - (positive ? 7 : 5)} y={y + 8} fill={positive ? '#2563eb' : '#f97316'} className="text-[26px] font-black">{sign}</text>
    </g>
  )
}

function Label({ x, y, children, color = '#475569' }) {
  return <text x={x} y={y} fill={color} className="text-[12px] font-black">{children}</text>
}

function PairForce({ kind = 'repel' }) {
  const leftSign = '+'
  const rightSign = kind === 'attract' ? '-' : '+'
  const inward = kind === 'attract'
  return (
    <BaseSvg>
      <ArrowDefs id={`pair-${kind}`} color="#14b8a6" />
      <rect x="38" y="42" width="524" height="176" rx="28" fill="currentColor" opacity=".035" />
      <Charge x={210} y={130} sign={leftSign} />
      <Charge x={390} y={130} sign={rightSign} />
      <line x1="240" y1="130" x2="360" y2="130" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" strokeDasharray="7 8" />
      {inward ? (
        <>
          <line x1="165" y1="130" x2="196" y2="130" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#pair-${kind})`} />
          <line x1="435" y1="130" x2="404" y2="130" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#pair-${kind})`} />
        </>
      ) : (
        <>
          <line x1="198" y1="130" x2="148" y2="130" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#pair-${kind})`} />
          <line x1="402" y1="130" x2="452" y2="130" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#pair-${kind})`} />
        </>
      )}
      <Label x="270" y="116" color="#64748b">separation r</Label>
      <Label x="86" y="128" color="#14b8a6">F</Label>
      <Label x="470" y="128" color="#14b8a6">F</Label>
      <Label x="238" y="202" color="#2563eb">{kind === 'attract' ? 'unlike charges attract' : 'like charges repel'}</Label>
    </BaseSvg>
  )
}

function ChargeBasics({ kind = 'charge-signs' }) {
  if (kind === 'quantization') {
    return (
      <BaseSvg>
        <line x1="76" y1="132" x2="524" y2="132" stroke="currentColor" strokeOpacity=".18" strokeWidth="3" />
        {[-3, -2, -1, 0, 1, 2, 3].map((n, index) => {
          const x = 96 + index * 68
          return (
            <g key={n}>
              <line x1={x} y1="112" x2={x} y2="152" stroke={n === 0 ? '#64748b' : '#2563eb'} strokeWidth="3" />
              <circle cx={x} cy="132" r="12" fill={n === 0 ? '#94a3b8' : n > 0 ? '#2563eb' : '#f97316'} />
              <Label x={x - 18} y="184" color={n > 0 ? '#2563eb' : n < 0 ? '#f97316' : '#64748b'}>{n === 0 ? '0' : `${n > 0 ? '+' : ''}${n}e`}</Label>
            </g>
          )
        })}
        <Label x="154" y="76" color="#14b8a6">allowed charges are integer multiples of e</Label>
      </BaseSvg>
    )
  }
  if (kind === 'conservation') {
    return (
      <BaseSvg>
        <ArrowDefs id="transfer" color="#14b8a6" />
        <rect x="72" y="62" width="150" height="116" rx="24" fill="#2563eb" opacity=".12" stroke="#2563eb" strokeWidth="3" />
        <rect x="378" y="62" width="150" height="116" rx="24" fill="#f97316" opacity=".12" stroke="#f97316" strokeWidth="3" />
        <text x="118" y="112" className="fill-blue-600 text-[20px] font-black">+5C</text>
        <text x="428" y="112" className="fill-orange-600 text-[20px] font-black">-2C</text>
        <line x1="236" y1="120" x2="362" y2="120" stroke="#14b8a6" strokeWidth="5" markerEnd="url(#transfer)" />
        <Label x="244" y="101" color="#14b8a6">transfer only</Label>
        <Label x="112" y="206" color="#64748b">before total = after total</Label>
        <Label x="372" y="206" color="#64748b">charge is conserved</Label>
      </BaseSvg>
    )
  }
  return (
    <BaseSvg>
      <PairForce kind="repel" />
    </BaseSvg>
  )
}

function ConductorInsulator() {
  const dots = Array.from({ length: 10 }, (_, i) => [92 + (i % 5) * 28, 90 + Math.floor(i / 5) * 50])
  return (
    <BaseSvg>
      <rect x="56" y="56" width="218" height="146" rx="24" fill="#2563eb" opacity=".1" stroke="#2563eb" strokeWidth="3" />
      <rect x="326" y="56" width="218" height="146" rx="24" fill="#f97316" opacity=".1" stroke="#f97316" strokeWidth="3" />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill="#2563eb" />)}
      {dots.map(([x, y], i) => <circle key={`b-${i}`} cx={x + 270} cy={y} r="7" fill="#f97316" opacity=".55" />)}
      <path d="M86 174 C130 150, 164 192, 218 158" fill="none" stroke="#14b8a6" strokeWidth="4" strokeDasharray="7 7" />
      <Label x="104" y="42" color="#2563eb">conductor: mobile charge</Label>
      <Label x="354" y="42" color="#f97316">insulator: localized charge</Label>
    </BaseSvg>
  )
}

function Induction() {
  return (
    <BaseSvg>
      <ArrowDefs id="induction-flow" color="#14b8a6" />
      {[70, 220, 370].map((x, i) => (
        <g key={x}>
          <rect x={x} y="46" width="120" height="160" rx="24" fill="currentColor" opacity=".035" stroke="currentColor" strokeOpacity=".1" />
          <circle cx={x + 60} cy="125" r="34" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" />
          {i === 0 && <rect x={x + 8} y="90" width="18" height="70" rx="9" fill="#f97316" />}
          {i === 1 && <line x1={x + 60} y1="160" x2={x + 60} y2="202" stroke="#14b8a6" strokeWidth="4" />}
          <Label x={x + 26} y="228" color="#64748b">{['polarize', 'ground', 'charged'][i]}</Label>
          <text x={x + 42} y="131" className="fill-blue-600 text-[16px] font-black">{i === 2 ? '+' : '+  -'}</text>
        </g>
      ))}
      <line x1="194" y1="126" x2="215" y2="126" stroke="#14b8a6" strokeWidth="4" markerEnd="url(#induction-flow)" />
      <line x1="344" y1="126" x2="365" y2="126" stroke="#14b8a6" strokeWidth="4" markerEnd="url(#induction-flow)" />
    </BaseSvg>
  )
}

function Graph({ kind = 'force-distance' }) {
  const points = Array.from({ length: 120 }, (_, index) => {
    const x = 58 + (index / 119) * 480
    const u = 0.35 + (index / 119) * 3.2
    let y
    if (kind === 'flux-angle') y = 122 - 76 * Math.cos((index / 119) * Math.PI)
    else if (kind === 'shell-graph') y = x < 260 ? 198 : 198 - 112 / (1 + ((x - 260) / 70) ** 2)
    else if (kind === 'solid-sphere-graph') y = x < 260 ? 198 - (x - 58) * 0.55 : 198 - 112 / (1 + ((x - 260) / 76) ** 2)
    else if (kind === 'field-zero-conductor') y = x < 300 ? 198 : 82
    else y = 198 - 140 / (u * u)
    return [x, Math.max(50, Math.min(198, y))]
  })
  return (
    <BaseSvg>
      <Axis />
      <path d={curvePath(points)} fill="none" stroke={kind === 'flux-angle' ? '#14b8a6' : '#2563eb'} strokeWidth="5" strokeLinecap="round" />
      {['shell-graph', 'solid-sphere-graph'].includes(kind) && (
        <>
          <line x1="260" y1="44" x2="260" y2="206" stroke="#f97316" strokeDasharray="7 7" strokeWidth="2" />
          <Label x="252" y="226" color="#f97316">R</Label>
        </>
      )}
      {kind === 'flux-angle' && (
        <>
          <Label x="72" y="70" color="#14b8a6">max</Label>
          <Label x="283" y="220" color="#f97316">90 deg</Label>
          <Label x="468" y="86" color="#14b8a6">negative</Label>
        </>
      )}
      {kind === 'field-zero-conductor' && <Label x="102" y="178" color="#64748b">inside conductor: E=0</Label>}
    </BaseSvg>
  )
}

function Superposition() {
  return (
    <BaseSvg>
      <ArrowDefs id="super" color="#14b8a6" />
      <line x1="240" y1="180" x2="385" y2="180" stroke="#2563eb" strokeWidth="5" markerEnd="url(#super)" />
      <line x1="240" y1="180" x2="240" y2="72" stroke="#f97316" strokeWidth="5" markerEnd="url(#super)" />
      <line x1="240" y1="180" x2="385" y2="72" stroke="#14b8a6" strokeWidth="6" markerEnd="url(#super)" />
      <Label x="305" y="201" color="#2563eb">E1</Label>
      <Label x="204" y="126" color="#f97316">E2</Label>
      <Label x="330" y="116" color="#14b8a6">E net</Label>
      <rect x="70" y="50" width="460" height="170" rx="26" fill="currentColor" opacity=".035" />
    </BaseSvg>
  )
}

function RadialField({ sign = '+' }) {
  const inward = sign === '-'
  const cx = 300
  const cy = 130
  const angles = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2)
  return (
    <BaseSvg>
      <ArrowDefs id={`radial-${sign}`} color="#14b8a6" />
      {angles.map((angle, i) => {
        const start = inward ? 112 : 52
        const end = inward ? 50 : 112
        const x1 = cx + start * Math.cos(angle)
        const y1 = cy + start * Math.sin(angle)
        const x2 = cx + end * Math.cos(angle)
        const y2 = cy + end * Math.sin(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#14b8a6" strokeWidth="3.5" strokeLinecap="round" markerEnd={`url(#radial-${sign})`} />
      })}
      <Charge x={cx} y={cy} sign={sign} r={34} />
      <Label x="210" y="226" color="#14b8a6">{sign === '+' ? 'field lines point outward' : 'field lines point inward'}</Label>
    </BaseSvg>
  )
}

function FieldRules() {
  const rules = [
    ['start +', 64, 60, '#2563eb'],
    ['end -', 330, 60, '#f97316'],
    ['never cross', 64, 156, '#ef4444'],
    ['dense = strong', 330, 156, '#14b8a6'],
  ]
  return (
    <BaseSvg>
      {rules.map(([text, x, y, color]) => (
        <g key={text}>
          <rect x={x} y={y} width="206" height="64" rx="18" fill={color} opacity=".12" stroke={color} strokeWidth="2" />
          <text x={x + 18} y={y + 39} fill={color} className="text-[15px] font-black">{text}</text>
        </g>
      ))}
    </BaseSvg>
  )
}

function UniformField() {
  return (
    <BaseSvg>
      <ArrowDefs id="uniform" color="#14b8a6" />
      <rect x="84" y="48" width="28" height="164" rx="10" fill="#2563eb" opacity=".75" />
      <rect x="488" y="48" width="28" height="164" rx="10" fill="#f97316" opacity=".75" />
      {Array.from({ length: 6 }, (_, i) => {
        const y = 70 + i * 27
        return <line key={i} x1="138" y1={y} x2="462" y2={y} stroke="#14b8a6" strokeWidth="4" markerEnd="url(#uniform)" />
      })}
      <Label x="88" y="38" color="#2563eb">+ plate</Label>
      <Label x="486" y="38" color="#f97316">- plate</Label>
      <Label x="242" y="226" color="#14b8a6">uniform electric field</Label>
    </BaseSvg>
  )
}

function DipoleField({ kind = 'dipole-field' }) {
  if (kind === 'dipole-axial' || kind === 'dipole-equatorial') {
    const equatorial = kind === 'dipole-equatorial'
    return (
      <BaseSvg>
        <ArrowDefs id={kind} color="#14b8a6" />
        <Charge x={230} y={130} sign="-" />
        <Charge x={370} y={130} sign="+" />
        <line x1="230" y1="130" x2="370" y2="130" stroke="currentColor" strokeOpacity=".18" strokeWidth="3" />
        <line x1="300" y1="130" x2="345" y2="130" stroke="#2563eb" strokeWidth="5" markerEnd={`url(${kind})`} />
        <Label x="292" y="116" color="#2563eb">p</Label>
        <circle cx={equatorial ? 300 : 480} cy={equatorial ? 54 : 130} r="8" fill="#14b8a6" />
        <line x1={equatorial ? 300 : 440} y1={equatorial ? 54 : 130} x2={equatorial ? 235 : 520} y2={equatorial ? 54 : 130} stroke="#14b8a6" strokeWidth="5" markerEnd={`url(${kind})`} />
        <Label x={equatorial ? 212 : 456} y={equatorial ? 42 : 104} color="#14b8a6">{equatorial ? 'E opposite p' : 'E along p'}</Label>
        {equatorial && <line x1="300" y1="44" x2="300" y2="210" stroke="currentColor" strokeOpacity=".12" strokeDasharray="7 8" />}
      </BaseSvg>
    )
  }
  return (
    <BaseSvg>
      <ArrowDefs id="dipole" color="#14b8a6" />
      <Charge x={230} y={130} sign="+" />
      <Charge x={370} y={130} sign="-" />
      {[-1, 1].map((s) => (
        <g key={s}>
          <path d={`M230 130 C250 ${45 * s + 130}, 350 ${45 * s + 130}, 370 130`} fill="none" stroke="#14b8a6" strokeWidth="4" markerEnd="url(#dipole)" />
          <path d={`M230 130 C230 ${95 * s + 130}, 370 ${95 * s + 130}, 370 130`} fill="none" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#dipole)" opacity=".75" />
        </g>
      ))}
      <Label x="216" y="226" color="#14b8a6">field lines go from +q to -q</Label>
    </BaseSvg>
  )
}

function DipoleTorque() {
  return (
    <BaseSvg>
      <ArrowDefs id="torque" color="#14b8a6" />
      {Array.from({ length: 5 }, (_, i) => <line key={i} x1="92" y1={64 + i * 34} x2="508" y2={64 + i * 34} stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#torque)" opacity=".7" />)}
      <g transform="translate(300 130) rotate(-32)">
        <line x1="-72" y1="0" x2="72" y2="0" stroke="currentColor" strokeOpacity=".25" strokeWidth="4" />
        <Charge x={-72} y={0} sign="-" r={24} />
        <Charge x={72} y={0} sign="+" r={24} />
        <line x1="-30" y1="-42" x2="20" y2="-42" stroke="#2563eb" strokeWidth="5" markerEnd="url(#torque)" />
        <Label x="-10" y="-52" color="#2563eb">p</Label>
      </g>
      <path d="M382 84 A70 70 0 0 1 408 154" fill="none" stroke="#f97316" strokeWidth="5" markerEnd="url(#torque)" />
      <Label x="414" y="128" color="#f97316">torque</Label>
    </BaseSvg>
  )
}

function DensityVisual() {
  return (
    <BaseSvg>
      <line x1="82" y1="92" x2="222" y2="92" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
      {[95, 128, 161, 194].map((x) => <circle key={x} cx={x} cy="92" r="8" fill="#2563eb" />)}
      <rect x="250" y="58" width="118" height="78" rx="16" fill="#f97316" opacity=".16" stroke="#f97316" strokeWidth="3" />
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={270 + (i % 3) * 34} cy={78 + Math.floor(i / 3) * 20} r="5" fill="#f97316" />)}
      <circle cx="466" cy="98" r="52" fill="#14b8a6" opacity=".14" stroke="#14b8a6" strokeWidth="4" />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={438 + (i % 4) * 18} cy={74 + Math.floor(i / 4) * 22} r="4" fill="#14b8a6" />)}
      <Label x="108" y="164" color="#2563eb">lambda = dq/dl</Label>
      <Label x="266" y="164" color="#f97316">sigma = dq/dA</Label>
      <Label x="424" y="164" color="#14b8a6">rho = dq/dV</Label>
    </BaseSvg>
  )
}

function FluxSurface() {
  return (
    <BaseSvg>
      <ArrowDefs id="flux" color="#14b8a6" />
      <polygon points="225,176 410,128 470,166 286,214" fill="#2563eb" opacity=".12" stroke="#2563eb" strokeWidth="3" />
      {Array.from({ length: 6 }, (_, i) => <line key={i} x1={88 + i * 64} y1="58" x2={144 + i * 64} y2="178" stroke="#14b8a6" strokeWidth="3.5" markerEnd="url(#flux)" />)}
      <line x1="348" y1="170" x2="348" y2="76" stroke="#f97316" strokeWidth="5" markerEnd="url(#flux)" />
      <path d="M348 108 A38 38 0 0 1 383 124" fill="none" stroke="#f97316" strokeWidth="3" />
      <Label x="360" y="102" color="#f97316">A vector</Label>
      <Label x="430" y="94" color="#14b8a6">E</Label>
      <Label x="382" y="136" color="#64748b">theta</Label>
    </BaseSvg>
  )
}

function Gaussian({ kind = 'gauss-closed' }) {
  if (kind === 'gaussian-cylinder') {
    return (
      <BaseSvg>
        <ArrowDefs id="cylinder" color="#14b8a6" />
        <ellipse cx="300" cy="78" rx="105" ry="28" fill="#2563eb" opacity=".08" stroke="#2563eb" strokeWidth="3" />
        <ellipse cx="300" cy="182" rx="105" ry="28" fill="#2563eb" opacity=".08" stroke="#2563eb" strokeWidth="3" />
        <line x1="195" y1="78" x2="195" y2="182" stroke="#2563eb" strokeWidth="3" />
        <line x1="405" y1="78" x2="405" y2="182" stroke="#2563eb" strokeWidth="3" />
        <line x1="300" y1="42" x2="300" y2="218" stroke="#f97316" strokeWidth="5" />
        {[225, 375].map((x) => <line key={x} x1="300" y1="130" x2={x} y2="130" stroke="#14b8a6" strokeWidth="4" markerEnd="url(#cylinder)" />)}
        <Label x="315" y="52" color="#f97316">line charge lambda</Label>
        <Label x="208" y="120" color="#14b8a6">radial E</Label>
      </BaseSvg>
    )
  }
  if (kind === 'pillbox') {
    return (
      <BaseSvg>
        <ArrowDefs id="pillbox" color="#14b8a6" />
        <rect x="72" y="120" width="456" height="18" rx="9" fill="#f97316" opacity=".32" />
        <rect x="238" y="78" width="124" height="104" rx="28" fill="#2563eb" opacity=".09" stroke="#2563eb" strokeWidth="3" />
        <line x1="300" y1="78" x2="300" y2="42" stroke="#14b8a6" strokeWidth="5" markerEnd="url(#pillbox)" />
        <line x1="300" y1="182" x2="300" y2="218" stroke="#14b8a6" strokeWidth="5" markerEnd="url(#pillbox)" />
        <Label x="384" y="118" color="#f97316">sheet sigma</Label>
        <Label x="322" y="58" color="#14b8a6">EA</Label>
        <Label x="322" y="214" color="#14b8a6">EA</Label>
      </BaseSvg>
    )
  }
  if (kind === 'gaussian-sphere') {
    return (
      <BaseSvg>
        <ArrowDefs id="sphere" color="#14b8a6" />
        <circle cx="300" cy="130" r="92" fill="#2563eb" opacity=".06" stroke="#2563eb" strokeWidth="4" strokeDasharray="8 8" />
        <Charge x={300} y={130} sign="+" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const a = deg * Math.PI / 180
          return <line key={deg} x1={300 + 42 * Math.cos(a)} y1={130 + 42 * Math.sin(a)} x2={300 + 92 * Math.cos(a)} y2={130 + 92 * Math.sin(a)} stroke="#14b8a6" strokeWidth="4" markerEnd="url(#sphere)" />
        })}
        <Label x="374" y="62" color="#2563eb">Gaussian sphere</Label>
      </BaseSvg>
    )
  }
  return (
    <BaseSvg>
      <ArrowDefs id="closed" color="#14b8a6" />
      <ellipse cx="300" cy="130" rx="142" ry="90" fill="#2563eb" opacity=".06" stroke="#2563eb" strokeWidth="4" />
      <Charge x={300} y={130} sign="+" />
      {[35, 90, 145, 215, 270, 325].map((deg) => {
        const a = deg * Math.PI / 180
        return <line key={deg} x1={300 + 54 * Math.cos(a)} y1={130 + 34 * Math.sin(a)} x2={300 + 130 * Math.cos(a)} y2={130 + 80 * Math.sin(a)} stroke="#14b8a6" strokeWidth="4" markerEnd="url(#closed)" />
      })}
      <Charge x={504} y={78} sign="-" r={18} />
      <Label x="160" y="226" color="#14b8a6">net flux counts enclosed charge only</Label>
    </BaseSvg>
  )
}

function ConductorSurface({ kind = 'conductor-surface' }) {
  if (kind === 'shielding') {
    return (
      <BaseSvg>
        <ArrowDefs id="shield" color="#14b8a6" />
        {Array.from({ length: 5 }, (_, i) => <line key={i} x1="72" y1={66 + i * 32} x2="202" y2={66 + i * 32} stroke="#14b8a6" strokeWidth="4" markerEnd="url(#shield)" />)}
        <rect x="236" y="48" width="150" height="164" rx="28" fill="#64748b" opacity=".22" stroke="#64748b" strokeWidth="8" />
        <rect x="274" y="86" width="74" height="88" rx="18" fill="white" opacity=".85" />
        <Label x="258" y="228" color="#64748b">conducting shell</Label>
        <Label x="410" y="132" color="#14b8a6">inside E = 0</Label>
      </BaseSvg>
    )
  }
  return (
    <BaseSvg>
      <ArrowDefs id="surface" color="#14b8a6" />
      <rect x="86" y="96" width="428" height="68" rx="20" fill="#64748b" opacity=".22" stroke="#64748b" strokeWidth="4" />
      {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={126 + i * 62} cy="96" r="7" fill="#2563eb" />)}
      {Array.from({ length: 6 }, (_, i) => <line key={i} x1={128 + i * 68} y1="82" x2={128 + i * 68} y2="38" stroke="#14b8a6" strokeWidth="4" markerEnd="url(#surface)" />)}
      <Label x="202" y="140" color="#64748b">inside conductor: E=0</Label>
      <Label x="375" y="42" color="#14b8a6">outside E perpendicular</Label>
    </BaseSvg>
  )
}

function TrapMap() {
  const cards = [
    ['SI units', 'microC -> C', 58, 58, '#2563eb'],
    ['Direction', 'negative q reverses F', 318, 58, '#f97316'],
    ['Symmetry', 'choose correct model', 58, 154, '#14b8a6'],
    ['q enclosed', 'ignore outside charge', 318, 154, '#b45309'],
  ]
  return (
    <BaseSvg>
      {cards.map(([title, text, x, y, color]) => (
        <g key={title}>
          <rect x={x} y={y} width="224" height="58" rx="18" fill={color} opacity=".12" stroke={color} strokeWidth="2" />
          <text x={x + 16} y={y + 24} fill={color} className="text-[13px] font-black">{title}</text>
          <text x={x + 16} y={y + 43} fill={color} className="text-[11px] font-bold">{text}</text>
        </g>
      ))}
    </BaseSvg>
  )
}

export function DiagramRenderer({ type }) {
  if (type === 'charge-signs') return <PairForce kind="repel" />
  if (['quantization', 'conservation'].includes(type)) return <ChargeBasics kind={type} />
  if (type === 'conductor-insulator') return <ConductorInsulator />
  if (type === 'induction') return <Induction />
  if (type === 'coulomb-repel') return <PairForce kind="repel" />
  if (type === 'coulomb-attract') return <PairForce kind="attract" />
  if (['force-distance', 'flux-angle', 'shell-graph', 'solid-sphere-graph', 'field-zero-conductor'].includes(type)) return <Graph kind={type} />
  if (type === 'superposition') return <Superposition />
  if (type === 'field-positive') return <RadialField sign="+" />
  if (type === 'field-negative') return <RadialField sign="-" />
  if (type === 'field-rules') return <FieldRules />
  if (type === 'uniform-field') return <UniformField />
  if (['dipole-field', 'dipole-axial', 'dipole-equatorial'].includes(type)) return <DipoleField kind={type} />
  if (type === 'dipole-torque') return <DipoleTorque />
  if (type === 'charge-density') return <DensityVisual />
  if (type === 'flux-surface') return <FluxSurface />
  if (['gauss-closed', 'gaussian-sphere', 'gaussian-cylinder', 'pillbox'].includes(type)) return <Gaussian kind={type} />
  if (['conductor-surface', 'shielding'].includes(type)) return <ConductorSurface kind={type} />
  if (type === 'trap-map') return <TrapMap />
  return <RadialField sign="+" />
}

export function FieldMini({ sign = '+', label = 'electric field lines' }) {
  return (
    <svg viewBox="0 0 560 220" className="min-h-[210px] w-full text-slate-900 dark:text-white" role="img">
      <ArrowDefs id={`mini-${sign}`} color="#14b8a6" />
      <rect x="18" y="18" width="524" height="184" rx="26" fill="currentColor" opacity=".035" />
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2
        const inward = sign === '-'
        const start = inward ? 92 : 46
        const end = inward ? 46 : 92
        const cx = 280
        const cy = 110
        return <line key={i} x1={cx + start * Math.cos(angle)} y1={cy + start * Math.sin(angle)} x2={cx + end * Math.cos(angle)} y2={cy + end * Math.sin(angle)} stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#mini-${sign})`} />
      })}
      <Charge x={280} y={110} sign={sign} r={34} />
      <text x="32" y="42" fill="#2563eb" className="text-[12px] font-black">{label}</text>
    </svg>
  )
}
