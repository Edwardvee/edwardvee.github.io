// Renderiza los segmentos de una línea con resaltado de búsqueda y cursor de bloque
function splitSearch(segs, query) {
  if (!query) return segs
  const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  const out = []
  for (const seg of segs) {
    let last = 0
    let m
    re.lastIndex = 0
    while ((m = re.exec(seg.t)) && m[0].length) {
      if (m.index > last) out.push({ ...seg, t: seg.t.slice(last, m.index) })
      out.push({ ...seg, t: m[0], match: true })
      last = re.lastIndex
    }
    if (last < seg.t.length) out.push({ ...seg, t: seg.t.slice(last) })
  }
  return out
}

function withCursor(segs) {
  const i = segs.findIndex((x) => x.t.length > 0)
  if (i === -1) return [...segs, { t: ' ', c: '', cursor: true }]
  const seg = segs[i]
  return [
    ...segs.slice(0, i),
    { ...seg, t: seg.t[0], cursor: true },
    ...(seg.t.length > 1 ? [{ ...seg, t: seg.t.slice(1) }] : []),
    ...segs.slice(i + 1),
  ]
}

function Seg({ seg, onSegAction }) {
  const interactive = seg.href || seg.open || seg.cmd
  let cls = seg.c ?? ''
  if (seg.match) cls += ' bg-ctp-yellow/35 rounded-[1px]'
  if (seg.cursor) cls += ' vim-cursor'
  if (interactive) cls += ' cursor-pointer'
  if (!interactive) return <span className={cls}>{seg.t}</span>
  const onClick = (e) => {
    e.stopPropagation()
    onSegAction?.(seg)
  }
  if (seg.href)
    return (
      <a href={seg.href} target="_blank" rel="noreferrer" className={cls} onClick={onClick}>
        {seg.t}
      </a>
    )
  return (
    <span role="link" tabIndex={-1} className={cls} onClick={onClick}>
      {seg.t}
    </span>
  )
}

export default function LineContent({ line, cursor = false, query = '', wrap = true, onSegAction }) {
  let segs = splitSearch(line.segs, query)
  if (cursor) segs = withCursor(segs)
  const style = line.hang && wrap ? { paddingLeft: `${line.hang}ch`, textIndent: `-${line.hang}ch` } : undefined
  const noWrap = line.nowrap || !wrap
  const main = (
    <span className={`block ${noWrap ? 'whitespace-pre' : 'whitespace-pre-wrap break-words'}`} style={style}>
      {segs.map((seg, i) => (
        <Seg key={i} seg={seg} onSegAction={onSegAction} />
      ))}
    </span>
  )
  if (!line.right) return <div className={noWrap ? 'overflow-hidden' : ''}>{main}</div>
  return (
    <div className="flex flex-wrap justify-between gap-x-4">
      {main}
      <span className="whitespace-pre">
        {line.right.map((seg, i) => (
          <Seg key={i} seg={seg} onSegAction={onSegAction} />
        ))}
      </span>
    </div>
  )
}
