import { createSignal } from 'solid-js'
import { marked } from 'marked'

interface DescriptionCardProps {
  title: string
  body: string  // markdown
}

export function DescriptionCard(props: DescriptionCardProps) {
  const [expanded, setExpanded] = createSignal(false)

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
      <div
        onClick={() => setExpanded((v) => !v)}
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
            'font-size': '11px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
          }}
        >
          {props.title}
        </span>
        <span style={{ color: '#aaaaaa', 'font-size': '12px' }}>
          {expanded() ? '▲' : '▼'}
        </span>
      </div>
      {expanded() && (
        <div
          innerHTML={marked.parse(props.body) as string}
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
