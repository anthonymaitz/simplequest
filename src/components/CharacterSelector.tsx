import { For } from 'solid-js'

interface CharacterSelectorProps {
  name: string
  personality: string
  charClass: string
  profession: string
  personalities: string[]
  classes: string[]
  professions: string[]
  locked?: boolean
  onNameChange: (name: string) => void
  onPersonalityChange: (p: string) => void
  onClassChange: (c: string) => void
  onProfessionChange: (p: string) => void
}

const selectStyle = {
  background: 'var(--sq-ctrl-bg)',
  border: '1px solid var(--sq-ctrl-border)',
  color: 'var(--sq-ctrl-text)',
  'border-radius': '4px',
  padding: '5px 8px',
  'font-size': '13px',
  'font-family': 'inherit',
  cursor: 'pointer',
  flex: '1',
  'min-width': '0',
  'text-transform': 'capitalize',
}

const inputStyle = {
  background: 'var(--sq-ctrl-bg)',
  border: '1px solid var(--sq-ctrl-border)',
  color: 'var(--sq-ctrl-text)',
  'border-radius': '4px',
  padding: '5px 8px',
  'font-size': '13px',
  'font-family': 'inherit',
  flex: '1',
  'min-width': '0',
  outline: 'none',
}

const labelStyle = {
  ...inputStyle,
  cursor: 'default',
  opacity: '0.7',
  'text-transform': 'capitalize',
}

export function CharacterSelector(props: CharacterSelectorProps) {
  return (
    <div
      style={{
        background: 'var(--sq-row-2)',
        'border-bottom': '1px solid var(--sq-row-border)',
        padding: '10px 14px',
        display: 'flex',
        gap: '8px',
        'flex-wrap': 'wrap',
      }}
    >
      {props.locked
        ? <span style={labelStyle}>{props.name || '—'}</span>
        : (
          <input
            type="text"
            placeholder="Character name"
            value={props.name}
            onInput={(e) => props.onNameChange(e.currentTarget.value)}
            style={inputStyle}
          />
        )
      }
      {props.locked
        ? <span style={labelStyle}>{props.personality || '—'}</span>
        : (
          <select
            value={props.personality}
            onChange={(e) => props.onPersonalityChange(e.currentTarget.value)}
            style={selectStyle}
          >
            <option value="">Personality</option>
            <For each={props.personalities}>
              {(p) => <option value={p}>{p}</option>}
            </For>
          </select>
        )
      }
      {props.locked
        ? <span style={labelStyle}>{props.charClass || '—'}</span>
        : (
          <select
            value={props.charClass}
            onChange={(e) => props.onClassChange(e.currentTarget.value)}
            style={selectStyle}
          >
            <option value="">Class</option>
            <For each={props.classes}>
              {(c) => <option value={c}>{c}</option>}
            </For>
          </select>
        )
      }
      {props.locked
        ? <span style={labelStyle}>{props.profession || '—'}</span>
        : (
          <select
            value={props.profession}
            onChange={(e) => props.onProfessionChange(e.currentTarget.value)}
            style={selectStyle}
          >
            <option value="">Profession</option>
            <For each={props.professions}>
              {(p) => <option value={p}>{p}</option>}
            </For>
          </select>
        )
      }
    </div>
  )
}
