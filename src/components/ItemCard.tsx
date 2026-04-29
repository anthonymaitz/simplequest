import { createSignal } from 'solid-js'
import type { ItemCard as ItemCardType } from '../types'

interface ItemCardProps {
  item: ItemCardType
  onActivate?: (item: ItemCardType) => void
}

export function ItemCard(props: ItemCardProps) {
  const [expanded, setExpanded] = createSignal(false)
  const disabled = () => props.item.quantity <= 0

  function handleClick() {
    if (disabled()) return
    props.onActivate?.(props.item)
  }

  return (
    <div
      style={{
        background: '#ffffff',
        'border-radius': '6px',
        'margin-bottom': '8px',
        'box-shadow': '0px -2px 4px rgba(0,0,0,0.2)',
        border: '2px solid transparent',
        overflow: 'hidden',
        opacity: disabled() ? 0.4 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      <div style={{ display: 'flex', 'align-items': 'center', padding: '10px 12px' }}>
        <span
          onClick={handleClick}
          style={{
            flex: '1',
            color: disabled() ? '#bbbbbb' : 'var(--sq-accent)',
            'font-size': '12px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
            cursor: disabled() ? 'default' : 'pointer',
            'user-select': 'none',
          }}
        >
          {props.item.name}
        </span>

        <div style={{ display: 'flex', gap: '6px', 'align-items': 'center', 'margin-right': '8px' }}>
          {props.item.energyCost !== undefined && !disabled() && (
            <span style={{
              background: 'rgba(0,0,0,0.12)', color: 'var(--sq-accent)',
              'border-radius': '3px', padding: '2px 8px',
              'font-size': '10px', 'font-weight': '700', 'white-space': 'nowrap',
            }}>
              {props.item.energyCost} energy
            </span>
          )}
          <span style={{
            background: disabled() ? '#ddd' : 'color-mix(in srgb, var(--sq-accent) 15%, white)',
            color: disabled() ? '#999' : 'var(--sq-accent)',
            'border-radius': '3px', padding: '2px 8px',
            'font-size': '10px', 'font-weight': '700',
          }}>
            ×{props.item.quantity}
          </span>
        </div>

        {!disabled() && (
          <span
            onClick={(e) => { e.stopPropagation(); setExpanded(v => !v) }}
            style={{ color: '#aaaaaa', 'font-size': '12px', cursor: 'pointer', 'user-select': 'none', padding: '0 2px' }}
          >
            {expanded() ? '▲' : '▼'}
          </span>
        )}
      </div>

      {expanded() && !disabled() && (
        <div style={{
          padding: '0 12px 10px',
          color: '#555555',
          'font-size': '13px',
          'line-height': '1.6',
          'font-family': "'Varela Round', 'Nunito', sans-serif",
        }}>
          {props.item.description}
        </div>
      )}
    </div>
  )
}
