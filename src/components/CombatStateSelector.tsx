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
        background: 'var(--sq-row-2)',
        'border-bottom': '1px solid var(--sq-row-border)',
        padding: '8px 14px',
      }}
    >
      {/* Exclusive button group */}
      <div style={{ display: 'flex', gap: '4px', 'flex-wrap': 'wrap' }}>
        <For each={props.statuses}>
          {(s) => {
            const active = () => props.combat === s.id
            return (
              <button
                onClick={() => props.onChange(s.id)}
                style={{
                  background: active() ? 'var(--sq-accent)' : 'var(--sq-ctrl-bg)',
                  color: active() ? '#ffffff' : 'var(--sq-ctrl-text)',
                  border: `1px solid ${active() ? 'var(--sq-accent)' : 'var(--sq-ctrl-border)'}`,
                  'border-radius': '4px',
                  padding: '4px 12px',
                  'font-size': '12px',
                  'font-family': 'inherit',
                  cursor: 'pointer',
                  'font-weight': active() ? '600' : '400',
                  transition: 'all 0.1s',
                }}
              >
                {s.label}
              </button>
            )
          }}
        </For>
      </div>
      {/* Status message */}
      <div
        style={{
          color: 'var(--sq-overlay-text)',
          'font-size': '11px',
          opacity: '0.7',
          'margin-top': '4px',
          'min-height': '14px',
        }}
      >
        {currentStatus()?.message ?? ''}
      </div>
    </div>
  )
}
