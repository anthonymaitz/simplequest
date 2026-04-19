import { For } from 'solid-js'

interface CharacterSelectorProps {
  name: string
  personality: string
  charClass: string
  profession: string
  personalities: string[]
  classes: string[]
  professions: string[]
  onNameChange: (name: string) => void
  onPersonalityChange: (p: string) => void
  onClassChange: (c: string) => void
  onProfessionChange: (p: string) => void
}

const selectStyle = {
  background: '#0f3460',
  border: '1px solid #444444',
  color: '#aaaaaa',
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
  background: '#0f3460',
  border: '1px solid #444444',
  color: '#ffffff',
  'border-radius': '4px',
  padding: '5px 8px',
  'font-size': '13px',
  'font-family': 'inherit',
  flex: '1',
  'min-width': '0',
  outline: 'none',
}

export function CharacterSelector(props: CharacterSelectorProps) {
  return (
    <div
      style={{
        background: '#16213e',
        'border-bottom': '1px solid #222222',
        padding: '10px 14px',
        display: 'flex',
        gap: '8px',
        'flex-wrap': 'wrap',
      }}
    >
      <input
        type="text"
        placeholder="Character name"
        value={props.name}
        onInput={(e) => props.onNameChange(e.currentTarget.value)}
        style={inputStyle}
      />
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
    </div>
  )
}
