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

  function handleTitleClick() {
    if (props.used) return
    props.onActivate?.(props.card)
  }

  function handleExpandClick(e: MouseEvent) {
    e.stopPropagation()
    if (props.used) return
    setExpanded((v) => !v)
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
        border: `2px solid ${props.used ? '#e0e0e0' : props.selected ? 'var(--sq-accent)' : 'transparent'}`,
        overflow: 'hidden',
        opacity: props.used ? 0.45 : 1,
        transition: 'opacity 0.2s, box-shadow 0.15s',
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: 'flex',
          'align-items': 'center',
          padding: '10px 12px',
          background: props.selected ? 'color-mix(in srgb, var(--sq-accent) 8%, white)' : 'transparent',
        }}
      >
        {/* Title — clicking selects the ability for targeting */}
        <span
          onClick={handleTitleClick}
          style={{
            flex: '1',
            color: props.used ? '#bbbbbb' : 'var(--sq-accent)',
            'font-size': '12px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
            'text-decoration': props.used ? 'line-through' : 'none',
            cursor: props.used ? 'default' : 'pointer',
            'user-select': 'none',
          }}
        >
          {props.card.title}
        </span>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '6px', 'align-items': 'center', 'margin-right': '8px' }}>
          {props.used ? (
            <span style={{
              background: '#ddd', color: '#999',
              'border-radius': '3px', padding: '2px 6px',
              'font-size': '9px', 'font-weight': '700', 'letter-spacing': '0.5px',
            }}>
              USED
            </span>
          ) : props.card.energyCost !== undefined && (
            <span style={{
              background: props.selected ? 'var(--sq-accent)' : 'rgba(0,0,0,0.12)',
              color: props.selected ? '#fff' : 'var(--sq-accent)',
              'border-radius': '3px', padding: '2px 8px',
              'font-size': '10px', 'font-weight': '700', 'white-space': 'nowrap',
              transition: 'all 0.15s',
            }}>
              {props.card.energyCost} energy
            </span>
          )}
        </div>

        {/* Expand arrow — only toggles body, never activates */}
        {!props.used && (
          <span
            onClick={handleExpandClick}
            style={{
              color: '#aaaaaa',
              'font-size': '12px',
              cursor: 'pointer',
              'user-select': 'none',
              padding: '0 2px',
            }}
          >
            {expanded() ? '▲' : '▼'}
          </span>
        )}
      </div>

      {/* Card body: only when expanded */}
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
