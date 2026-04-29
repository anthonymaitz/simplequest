import { For, Show } from 'solid-js'
import { ItemCard } from './ItemCard'
import type { ItemCard as ItemCardType } from '../types'

interface ItemCardsProps {
  items: ItemCardType[]
  onActivate?: (item: ItemCardType) => void
}

export function ItemCards(props: ItemCardsProps) {
  return (
    <Show when={props.items.length > 0}>
      <div style={{ padding: '0 14px 12px' }}>
        <div style={{
          'font-size': '10px', 'font-weight': '700', 'letter-spacing': '1.5px',
          color: '#aaaaaa', 'text-transform': 'uppercase', 'margin-bottom': '8px',
        }}>
          Items
        </div>
        <For each={props.items}>
          {(item) => <ItemCard item={item} onActivate={props.onActivate} />}
        </For>
      </div>
    </Show>
  )
}
