import { For } from 'solid-js'
import type { CharacterData } from '../types'

interface GMModeProps {
  enabled: boolean
  characterName: string
  savedCharacters: Record<string, CharacterData>
  onToggle: (enabled: boolean) => void
  onSave: () => void
  onLoad: (name: string) => void
  onHelpOpen: () => void
}

export function GMMode(props: GMModeProps) {
  const savedNames = () => Object.keys(props.savedCharacters)

  return (
    <div
      style={{
        background: 'var(--sq-row-3)',
        'border-top': '1px solid var(--sq-row-border)',
        padding: '8px 14px',
        display: 'flex',
        gap: '10px',
        'align-items': 'center',
        'flex-wrap': 'wrap',
      }}
    >
      <span
        style={{
          color: 'var(--sq-overlay-text-muted)',
          'font-size': '12px',
          'text-transform': 'uppercase',
          'letter-spacing': '1px',
        }}
      >
        GM
      </span>
      {/* Toggle switch */}
      <div
        onClick={() => props.onToggle(!props.enabled)}
        style={{
          width: '36px',
          height: '18px',
          background: props.enabled ? 'var(--sq-accent)' : 'var(--sq-ctrl-bg)',
          border: `1px solid ${props.enabled ? 'var(--sq-accent)' : 'var(--sq-ctrl-border)'}`,
          'border-radius': '9px',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          'flex-shrink': '0',
        }}
      >
        <div
          style={{
            width: '14px',
            height: '14px',
            background: '#ffffff',
            'border-radius': '50%',
            position: 'absolute',
            top: '1px',
            left: props.enabled ? '19px' : '1px',
            transition: 'left 0.2s',
          }}
        />
      </div>
      {props.enabled && (
        <>
          <button
            onClick={props.onSave}
            disabled={!props.characterName}
            style={{
              background: 'var(--sq-ctrl-bg)',
              border: '1px solid var(--sq-accent)',
              color: 'var(--sq-accent)',
              'border-radius': '4px',
              padding: '3px 10px',
              'font-size': '12px',
              'font-family': 'inherit',
              cursor: props.characterName ? 'pointer' : 'not-allowed',
              opacity: props.characterName ? '1' : '0.4',
            }}
          >
            Save
          </button>
          <select
            onChange={(e) => {
              if (e.currentTarget.value) props.onLoad(e.currentTarget.value)
              e.currentTarget.value = ''
            }}
            style={{
              background: 'var(--sq-ctrl-bg)',
              border: '1px solid var(--sq-ctrl-border)',
              color: 'var(--sq-ctrl-text)',
              'border-radius': '4px',
              padding: '3px 8px',
              'font-size': '12px',
              'font-family': 'inherit',
              cursor: 'pointer',
            }}
          >
            <option value="">Load character...</option>
            <For each={savedNames()}>
              {(name) => <option value={name}>{name}</option>}
            </For>
          </select>
        </>
      )}
      {/* Help button — always visible */}
      <button
        onClick={props.onHelpOpen}
        style={{
          'margin-left': 'auto',
          background: 'var(--sq-ctrl-bg)',
          border: '1px solid var(--sq-ctrl-border)',
          color: 'var(--sq-overlay-text)',
          'border-radius': '50%',
          width: '24px',
          height: '24px',
          'font-size': '13px',
          'font-weight': '700',
          'font-family': 'inherit',
          cursor: 'pointer',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'flex-shrink': '0',
        }}
      >
        ?
      </button>
    </div>
  )
}
