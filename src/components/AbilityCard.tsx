import { createSignal } from 'solid-js'
import { marked } from 'marked'
import { d20DataUrl } from '../assets/d20'
import type { AbilityCard as AbilityCardType } from '../types'

interface AbilityCardProps {
  card: AbilityCardType
  onRoll: (sides: number) => void
  onActivate?: (card: AbilityCardType) => void
}

const dieHeadingStyle = [
  'display:inline-block',
  `background-image:radial-gradient(circle, rgba(255,255,255,.75), rgba(255,255,255,0)), url(${d20DataUrl})`,
  'background-size:66% 66%,contain',
  'background-repeat:no-repeat',
  'background-position:50% 50%,50% 50%',
  'color:#3f3e4a',
  'padding:0.8em 0.6em',
  'line-height:2em',
  'font-weight:700',
  'font-size:13px',
  'min-width:50px',
  'text-align:center',
  'cursor:pointer',
].join(';')

function renderCardBody(markdown: string): string {
  const html = marked.parse(markdown) as string
  // Split HTML on h4 blocks so we can process them separately
  const parts = html.split(/(<h4>[\s\S]*?<\/h4>)/g)
  return parts
    .map((part) => {
      if (part.startsWith('<h4>')) {
        // Style D[X] inside h4 with d20 background
        return part.replace(/<h4>([\s\S]*?)<\/h4>/g, (_, content: string) => {
          const styled = content.replace(
            /\bD(\d+)\b/g,
            `<span class="die-heading" data-sides="$1" style="${dieHeadingStyle}">D$1</span>`
          )
          return `<h4>${styled}</h4>`
        })
      }
      // Style remaining D[X] (body text) with teal underline
      return part.replace(/\bD(\d+)\b/g, '<span class="die-inline" data-sides="$1">D$1</span>')
    })
    .join('')
}

export function AbilityCard(props: AbilityCardProps) {
  const [collapsed, setCollapsed] = createSignal(false)

  function handleContentClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (
      target.classList.contains('die-inline') ||
      target.classList.contains('die-heading')
    ) {
      const sides = parseInt(target.dataset.sides ?? '6', 10)
      props.onRoll(sides)
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
      }}
    >
      {/* Card header row: title + optional energy badge */}
      <div
        onClick={() => { setCollapsed((c) => !c); props.onActivate?.(props.card) }}
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
        <div style={{ display: 'flex', gap: '8px', 'align-items': 'center' }}>
          {props.card.energyCost !== undefined && (
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
          )}
          <span
            style={{
              color: '#aaaaaa',
              'font-size': '12px',
            }}
          >
            {collapsed() ? '▼' : '▲'}
          </span>
        </div>
      </div>
      {/* Card body: rendered markdown */}
      {!collapsed() && (
        <div
          innerHTML={renderCardBody(props.card.body)}
          onClick={handleContentClick}
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
