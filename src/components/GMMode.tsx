import { For } from 'solid-js'
import type { CharacterData } from '../types'

interface GMModeProps {
  enabled: boolean
  characterName: string
  savedCharacters: Record<string, CharacterData>
  onToggle: (enabled: boolean) => void
  onSave: () => void
  onLoad: (name: string) => void
}

export function GMMode(props: GMModeProps) {
  const savedNames = () => Object.keys(props.savedCharacters)

  return (
    <div
      style={{
        background: '#0d0d1a',
        'border-top': '1px solid #222222',
        padding: '8px 14px',
        display: 'flex',
        gap: '10px',
        'align-items': 'center',
        'flex-wrap': 'wrap',
      }}
    >
      <span style={{ color: '#555555', 'font-size': '12px', 'text-transform': 'uppercase', 'letter-spacing': '1px' }}>
        GM
      </span>
      {/* Toggle switch */}
      <div
        onClick={() => props.onToggle(!props.enabled)}
        style={{
          width: '36px',
          height: '18px',
          background: props.enabled ? 'var(--sq-accent)' : '#333333',
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
            top: '2px',
            left: props.enabled ? '20px' : '2px',
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
              background: '#0f3460',
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
              background: '#0f3460',
              border: '1px solid #444444',
              color: '#aaaaaa',
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
    </div>
  )
}
