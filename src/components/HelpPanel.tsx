import { marked } from 'marked'

interface HelpPanelProps {
  body: string      // markdown — full content of general.md
  onClose: () => void
}

export function HelpPanel(props: HelpPanelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '0',
        background: '#ffffff',
        'z-index': '500',
        overflow: 'auto',
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          'margin-bottom': '12px',
        }}
      >
        <span
          style={{
            color: 'var(--sq-accent)',
            'font-size': '14px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
          }}
        >
          General Rules
        </span>
        <button
          onClick={props.onClose}
          style={{
            background: 'var(--sq-accent)',
            color: '#ffffff',
            border: 'none',
            'border-radius': '50%',
            width: '28px',
            height: '28px',
            'font-size': '16px',
            'font-weight': '700',
            'font-family': 'inherit',
            cursor: 'pointer',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'flex-shrink': '0',
          }}
        >
          ×
        </button>
      </div>
      <div
        innerHTML={marked.parse(props.body) as string}
        style={{
          color: '#3f3e4a',
          'font-size': '13px',
          'line-height': '1.7',
          'font-family': "'Varela Round', 'Nunito', sans-serif",
        }}
      />
    </div>
  )
}
