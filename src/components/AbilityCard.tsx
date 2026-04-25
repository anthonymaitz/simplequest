import { createSignal } from 'solid-js'
import { marked } from 'marked'
import type { AbilityCard as AbilityCardType } from '../types'

interface AbilityCardProps {
  card: AbilityCardType
  used: boolean
  onActivate?: (card: AbilityCardType) => void
  onUse: () => void
}

function renderCardBody(markdown: string): string {
  const html = marked.parse(markdown) as string
  // Make D[X] references bold but not clickable
  return html.replace(/\bD(\d+)\b/g, '<strong>D$1</strong>')
}

export function AbilityCard(props: AbilityCardProps) {
  const [expanded, setExpanded] = createSignal(false)

  function handleHeaderClick() {
    if (!props.used) {
      props.onUse()
      props.onActivate?.(props.card)
      setExpanded(true)
    } else {
      setExpanded((e) => !e)
    }
  }

  return (
    <div
      style={{
        background: '#ffffff',
        'border-radius': '6px',
        'margin-bottom': '8px',
        'box-shadow': '0px -2px 4px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        opacity: props.used ? 0.55 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      {/* Card header: title button + badges */}
      <div
        onClick={handleHeaderClick}
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          padding: '10px 12px',
          cursor: 'pointer',
          'user-select': 'none',
        }}
      >
        <span
          style={{
            color: props.used ? '#999999' : 'var(--sq-accent)',
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
            <span
              style={{
                background: '#ddd',
                color: '#888',
                'border-radius': '3px',
                padding: '2px 6px',
                'font-size': '9px',
                'font-weight': '700',
                'letter-spacing': '0.5px',
              }}
            >
              USED
            </span>
          ) : (
            props.card.energyCost !== undefined && (
              <span
                style={{
                  background: 'var(--sq-accent)',
                  color: '#ffffff',
                  'border-radius': '3px',
                  padding: '2px 8px',
                  'font-size': '10px',
                  'font-weight': '700',
                  'white-space': 'nowrap',
                }}
              >
                {props.card.energyCost} energy
              </span>
            )
          )}
          <span style={{ color: '#aaaaaa', 'font-size': '12px' }}>
            {expanded() ? '▲' : '▼'}
          </span>
        </div>
      </div>

      {/* Card body: only visible when expanded */}
      {expanded() && (
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
