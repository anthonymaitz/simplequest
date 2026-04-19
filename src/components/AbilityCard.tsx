import { createSignal } from 'solid-js'
import { marked } from 'marked'
import type { AbilityCard as AbilityCardType } from '../types'

interface AbilityCardProps {
  card: AbilityCardType
  onRoll: (sides: number) => void
}

function renderCardBody(markdown: string): string {
  const html = marked.parse(markdown) as string
  // Wrap D[X] notation in clickable spans; avoids matching inside HTML tags
  return html.replace(/\bD(\d+)\b/g, '<span class="dice-notation" data-sides="$1">D$1</span>')
}

export function AbilityCard(props: AbilityCardProps) {
  const [collapsed, setCollapsed] = createSignal(false)

  function handleContentClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (target.classList.contains('dice-notation')) {
      const sides = parseInt(target.dataset.sides ?? '6', 10)
      props.onRoll(sides)
    }
  }

  return (
    <div
      style={{
        background: '#16213e',
        'border-radius': '6px',
        'margin-bottom': '8px',
        'border-left': '3px solid var(--sq-accent)',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setCollapsed((c) => !c)}
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
            color: 'var(--sq-accent)',
            'font-size': '12px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
          }}
        >
          {props.card.title}
        </span>
        <span style={{ color: '#555555', 'font-size': '12px' }}>
          {collapsed() ? '▼' : '▲'}
        </span>
      </div>
      {!collapsed() && (
        <div
          innerHTML={renderCardBody(props.card.body)}
          onClick={handleContentClick}
          style={{
            padding: '0 12px 10px',
            color: '#aaaaaa',
            'font-size': '13px',
            'line-height': '1.5',
          }}
        />
      )}
    </div>
  )
}
