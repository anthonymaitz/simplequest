import { marked } from 'marked'

interface DeathCardProps {
  body: string  // markdown — full content of death.md
}

export function DeathCard(props: DeathCardProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        'border-radius': '6px',
        'margin-bottom': '8px',
        'box-shadow': '0px -2px 4px rgba(0,0,0,0.2)',
        'border-top': '3px solid var(--sq-accent)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 12px 4px',
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
          Am I Dead?
        </span>
      </div>
      <div
        innerHTML={marked.parse(props.body) as string}
        style={{
          padding: '0 12px 12px',
          color: '#555555',
          'font-size': '13px',
          'line-height': '1.6',
          'font-family': "'Varela Round', 'Nunito', sans-serif",
        }}
      />
    </div>
  )
}
