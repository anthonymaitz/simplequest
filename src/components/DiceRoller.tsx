const DICE = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']

interface DiceRollerProps {
  die: string
  onDieChange: (die: string) => void
  onRoll: (sides: number) => void
}

export function DiceRoller(props: DiceRollerProps) {
  function handleRoll() {
    const sides = parseInt(props.die.slice(1))
    props.onRoll(sides)
  }

  return (
    <div style={{ display: 'flex', gap: '6px', 'align-items': 'center' }}>
      <select
        value={props.die}
        onChange={(e) => props.onDieChange(e.currentTarget.value)}
        style={{
          background: '#0f3460',
          border: '1px solid #444444',
          color: '#aaaaaa',
          'border-radius': '4px',
          padding: '4px 6px',
          'font-size': '12px',
          'font-family': 'inherit',
          cursor: 'pointer',
        }}
      >
        {DICE.map((d) => (
          <option value={d}>{d}</option>
        ))}
      </select>
      <button
        onClick={handleRoll}
        style={{
          background: 'var(--sq-accent)',
          color: '#ffffff',
          border: 'none',
          'border-radius': '4px',
          padding: '4px 12px',
          'font-size': '12px',
          'font-weight': '700',
          'font-family': 'inherit',
          cursor: 'pointer',
          'text-transform': 'uppercase',
          'letter-spacing': '1px',
        }}
      >
        Roll
      </button>
    </div>
  )
}
