import { For, createMemo, Show } from 'solid-js'
import { AbilityCard } from './AbilityCard'
import { DescriptionCard } from './DescriptionCard'
import type { AbilityCard as AbilityCardType, CombatState } from '../types'

interface AbilityCardsProps {
  abilities: AbilityCardType[]
  descriptions: Record<string, string>
  deathContent: string
  charClass: string
  profession: string
  personality: string
  combat: CombatState
  usedCards: Set<string>
  onUseCard: (title: string) => void
  onActivate?: (card: AbilityCardType) => void
}

export function AbilityCards(props: AbilityCardsProps) {
  const visible = createMemo(() =>
    props.abilities.filter((card) => {
      const sourceMatch =
        card.source === props.charClass ||
        card.source === props.profession ||
        card.source === 'general'
      // inGeneral cards only show in general mode; context must match exactly
      const contextMatch = card.context === props.combat
      return sourceMatch && contextMatch
    })
  )

  return (
    <div style={{ padding: '12px 14px' }}>
      {/* Dead mode intro: rules summary shown above dying ability cards */}
      <Show when={props.combat === 'isDead' && props.deathContent}>
        <DescriptionCard title="Dead" body={props.deathContent} />
      </Show>

      {/* Description cards: only in general mode */}
      <Show when={props.combat === 'inGeneral' && !!props.descriptions[props.personality]}>
        <DescriptionCard
          title={props.personality}
          body={props.descriptions[props.personality]}
        />
      </Show>
      <Show when={props.combat === 'inGeneral' && !!props.descriptions[props.charClass]}>
        <DescriptionCard
          title={props.charClass}
          body={props.descriptions[props.charClass]}
        />
      </Show>
      <Show when={props.combat === 'inGeneral' && !!props.descriptions[props.profession]}>
        <DescriptionCard
          title={props.profession}
          body={props.descriptions[props.profession]}
        />
      </Show>

      {/* Ability cards */}
      <For each={visible()}>
        {(card) => (
          <AbilityCard
            card={card}
            used={props.usedCards.has(card.title)}
            onUse={() => props.onUseCard(card.title)}
            onActivate={props.onActivate}
          />
        )}
      </For>
    </div>
  )
}
