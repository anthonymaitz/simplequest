import { createSignal } from 'solid-js'
import { marked } from 'marked'
import type { AbilityCard as AbilityCardType } from '../types'

interface AbilityCardProps {
  card: AbilityCardType
  used: boolean
  selected: boolean
  onActivate?: (card: AbilityCardType) => void
}

function renderCardBody(markdown: string): string {
  const html = marked.parse(markdown) as string
  return html.replace(/\bD(\d+)\b/g, '<strong>D$1</strong>')
}

export function AbilityCard(props: AbilityCardProps) {
  const [expanded, setExpanded] = createSignal(false)

  function handleHeaderClick() {
    if (props.used) return  // used cards are inert
    props.onActivate?.(props.card)
    setExpanded((e) => !e)
  }

  const borderColor = () => {
    if (props.used) return '#e0e0e0'
    if (props.selected) return 'var(--sq-accent)'
    return 'transparent'
  }

  return (
    <div
      style={{
        background: '#ffffff',
        'border-radius': '6px',
        'margin-bottom': '8px',
        'box-shadow': props.selected
          ? '0 0 0 2px var(--sq-accent), 0px -2px 4px rgba(0,0,0,0.15)'
          : '0px -2px 4px rgba(0,0,0,0.2)',
        border: `2px solid ${borderColor()}`,
        overflow: 'hidden',
        opacity: props.used ? 0.45 : 1,
        transition: 'opacity 0.2s, box-shadow 0.15s',
      }}
    >
      {/* Card header: title + badges */}
      <div
        onClick={handleHeaderClick}
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          padding: '10px 12px',
          cursor: props.used ? 'default' : 'pointer',
          'user-select': 'none',
          background: props.selected ? 'color-mix(in srgb, var(--sq-accent) 8%, white)' : 'transparent',
        }}
      >
        <span
          style={{
            color: props.used ? '#bbbbbb' : props.selected ? 'var(--sq-accent)' : 'var(--sq-accent)',
            'font-size': '12px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
            'text-decoration': props.used ? 'line-through' : 'none',
          }}
        >
          {props.card.title}
        </span>
        <div style={{ display: 'flex', gap: '6px', 'align-items': 'center' }}>
          {props.used ? (
            <span style={{
              background: '#ddd', color: '#999',
              'border-radius': '3px', padding: '2px 6px',
              'font-size': '9px', 'font-weight': '700', 'letter-spacing': '0.5px',
            }}>
              USED
            </span>
          ) : props.selected ? (
            <span style={{
              background: 'var(--sq-accent)', color: '#fff',
              'border-radius': '3px', padding: '2px 8px',
              'font-size': '9px', 'font-weight': '700', 'letter-spacing': '0.5px',
            }}>
              SELECT TARGET
            </span>
          ) : (
            props.card.energyCost !== undefined && (
              <span style={{
                background: 'var(--sq-accent)', color: '#ffffff',
                'border-radius': '3px', padding: '2px 8px',
                'font-size': '10px', 'font-weight': '700', 'white-space': 'nowrap',
              }}>
                {props.card.energyCost} energy
              </span>
            )
          )}
          {!props.used && (
            <span style={{ color: '#aaaaaa', 'font-size': '12px' }}>
              {expanded() ? '▲' : '▼'}
            </span>
          )}
        </div>
      </div>

      {/* Card body: visible when expanded */}
      {expanded() && !props.used && (
        <div
          innerHTML={renderCardBody(props.card.body)}
          style={{
            padding: '0 12px 10px',
            color: '#555555',
            'font-size': '13px',
            'line-height': '1.6',
            'font-family': "'Varela Round', 'Nunito', sans-serif",
          }}
        />
      )}
    </div>
  )
}
