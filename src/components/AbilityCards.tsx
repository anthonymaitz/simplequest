import { For, createMemo, Show } from 'solid-js'
import { AbilityCard } from './AbilityCard'
import { DescriptionCard } from './DescriptionCard'
import { DeathCard } from './DeathCard'
import type { AbilityCard as AbilityCardType, CombatState } from '../types'

interface AbilityCardsProps {
  abilities: AbilityCardType[]
  descriptions: Record<string, string>
  deathContent: string
  charClass: string
  profession: string
  personality: string
  combat: CombatState
  hp: number
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
      {/* Death card: shown above all else when HP = 0 */}
      <Show when={props.hp === 0 && props.deathContent}>
        <DeathCard body={props.deathContent} />
      </Show>

      {/* Description cards: collapsed, at top of list */}
      <Show when={props.descriptions[props.personality]}>
        <DescriptionCard
          title={props.personality}
          body={props.descriptions[props.personality]}
        />
      </Show>
      <Show when={props.descriptions[props.charClass]}>
        <DescriptionCard
          title={props.charClass}
          body={props.descriptions[props.charClass]}
        />
      </Show>
      <Show when={props.descriptions[props.profession]}>
        <DescriptionCard
          title={props.profession}
          body={props.descriptions[props.profession]}
        />
      </Show>

      {/* Ability cards */}
      <For each={visible()}>
        {(card) => <AbilityCard card={card} onRoll={props.onRoll} />}
      </For>
    </div>
  )
}
