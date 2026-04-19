import { For } from 'solid-js'

interface EnergyPoolProps {
  energy: boolean[]
  onEnergyClick: (index: number) => void
}

export function EnergyPool(props: EnergyPoolProps) {
  return (
    <div style={{ display: 'flex', gap: '5px', 'align-items': 'center' }}>
      <For each={props.energy}>
        {(filled, i) => (
          <div
            onClick={() => props.onEnergyClick(i())}
            style={{
              width: '14px',
              height: '14px',
              'border-radius': '50%',
              background: filled ? 'var(--sq-accent)' : '#1a1a2e',
              border: `2px solid ${filled ? 'var(--sq-accent)' : '#444444'}`,
              cursor: 'pointer',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          />
        )}
      </For>
    </div>
  )
}
