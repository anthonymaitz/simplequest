import { For, createMemo } from 'solid-js'
import type { CombatState, CombatStatus } from '../types'

interface CombatStateSelectorProps {
  combat: CombatState
  statuses: CombatStatus[]
  onChange: (combat: CombatState) => void
}

export function CombatStateSelector(props: CombatStateSelectorProps) {
  const currentStatus = createMemo(
    () => props.statuses.find((s) => s.id === props.combat)
  )

  return (
    <div
      style={{
        background: '#16213e',
        'border-bottom': '1px solid #222222',
        padding: '8px 14px',
        display: 'flex',
        gap: '10px',
        'align-items': 'center',
      }}
    >
      <select
        value={props.combat}
        onChange={(e) => props.onChange(e.currentTarget.value as CombatState)}
        style={{
          background: '#0f3460',
          border: '1px solid #444444',
          color: '#aaaaaa',
          'border-radius': '4px',
          padding: '4px 8px',
          'font-size': '13px',
          'font-family': 'inherit',
          cursor: 'pointer',
        }}
      >
        <For each={props.statuses}>
          {(s) => <option value={s.id}>{s.label}</option>}
        </For>
      </select>
      <span style={{ color: 'var(--sq-accent)', 'font-size': '12px', flex: '1' }}>
        {currentStatus()?.message ?? ''}
      </span>
    </div>
  )
}
