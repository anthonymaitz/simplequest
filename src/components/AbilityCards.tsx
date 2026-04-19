import { For, createMemo } from 'solid-js'
import { AbilityCard } from './AbilityCard'
import type { AbilityCard as AbilityCardType, CombatState } from '../types'

interface AbilityCardsProps {
  abilities: AbilityCardType[]
  charClass: string
  profession: string
  combat: CombatState
  onRoll: (sides: number) => void
}

export function AbilityCards(props: AbilityCardsProps) {
  const visible = createMemo(() =>
    props.abilities.filter((card) => {
      const sourceMatch =
        card.source === props.charClass ||
        card.source === props.profession ||
        card.source === 'general'
      const contextMatch =
        card.context === 'inGeneral' || card.context === props.combat
      return sourceMatch && contextMatch
    })
  )

  return (
    <div style={{ padding: '12px 14px' }}>
      <For each={visible()}>
        {(card) => <AbilityCard card={card} onRoll={props.onRoll} />}
      </For>
    </div>
  )
}
