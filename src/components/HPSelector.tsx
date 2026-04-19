interface HPSelectorProps {
  hp: number
  onHpChange: (hp: number) => void
}

export function HPSelector(props: HPSelectorProps) {
  const options = Array.from({ length: 31 }, (_, i) => i)

  return (
    <div style={{ display: 'flex', 'align-items': 'center', gap: '6px' }}>
      <label
        style={{
          color: 'var(--sq-overlay-text-muted)',
          'font-size': '12px',
          'text-transform': 'uppercase',
          'letter-spacing': '1px',
        }}
      >
        HP
      </label>
      <select
        value={props.hp}
        onChange={(e) => props.onHpChange(parseInt(e.currentTarget.value, 10))}
        style={{
          background: 'var(--sq-ctrl-bg)',
          border: '1px solid var(--sq-ctrl-border)',
          color: 'var(--sq-ctrl-text)',
          'border-radius': '4px',
          padding: '4px 8px',
          'font-size': '13px',
          'font-family': 'inherit',
          cursor: 'pointer',
        }}
      >
        {options.map((n) => (
          <option value={n}>{n}</option>
        ))}
      </select>
    </div>
  )
}
