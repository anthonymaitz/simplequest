import { createEffect, createMemo, createSignal, onMount, Show, on } from 'solid-js'
import { createCharacterStore } from './store'
import { Header } from './components/Header'
import { CharacterSelector } from './components/CharacterSelector'
import { CombatStateSelector } from './components/CombatStateSelector'
import { AbilityCards } from './components/AbilityCards'
import { GMMode } from './components/GMMode'
import { HelpPanel } from './components/HelpPanel'
import type { SimpleQuestContent, CombatState, CharacterData, AbilityCard as AbilityCardType } from './types'
import cssString from './styles/tailwind.css?inline'

interface SimpleQuestProps {
  content: string
  character?: string
  element: HTMLElement
}

export function SimpleQuest(props: SimpleQuestProps) {
  const { state, setState, setEnergy, loadFromStorage, saveCharacter, loadCharacter } =
    createCharacterStore()

  const [helpOpen, setHelpOpen] = createSignal(false)
  const [usedCards, setUsedCards] = createSignal(new Set<string>())

  const content = createMemo<SimpleQuestContent | null>(() => {
    if (!props.content) return null
    try {
      return JSON.parse(props.content) as SimpleQuestContent
    } catch {
      return null
    }
  })

  onMount(() => {
    loadFromStorage()
  })

  createEffect(() => {
    if (!props.character) return
    try {
      const data = JSON.parse(props.character) as CharacterData
      setState({ ...data })
    } catch {
      // ignore malformed character JSON
    }
  })

  // Reset used-card state each time the round increments
  createEffect(on(() => state.round, () => { setUsedCards(new Set()) }, { defer: true }))

  function handleAbilityActivate(card: AbilityCardType) {
    if (card.energyCost === undefined) return
    props.element.dispatchEvent(new CustomEvent('abilityactivate', {
      detail: { title: card.title, energyCost: card.energyCost },
      bubbles: true,
      composed: true,
    }))
  }

  // Sync personality to data-personality on the host element for CSS theming
  createEffect(() => {
    if (state.personality) {
      props.element.setAttribute('data-personality', state.personality)
    } else {
      props.element.removeAttribute('data-personality')
    }
  })

  // Emit characterchange whenever the character identity fields change
  createEffect(() => {
    props.element.dispatchEvent(new CustomEvent('characterchange', {
      detail: {
        name: state.name,
        class: state.class,
        profession: state.profession,
        personality: state.personality,
        die: state.die,
      },
      bubbles: true,
      composed: true,
    }))
  })

  return (
    <>
      <style>{cssString}</style>
      <div style={{ height: '100%', display: 'flex', 'flex-direction': 'column', overflow: 'hidden', position: 'relative' }}>
        <Header
          hp={state.hp}
          energy={state.energy}
          name={state.name}
          charClass={state.class}
          profession={state.profession}
          personality={state.personality}
          onHpChange={(hp) => setState('hp', hp)}
          onEnergyClick={setEnergy}
        />
        <CharacterSelector
          name={state.name}
          personality={state.personality}
          charClass={state.class}
          profession={state.profession}
          personalities={content()?.personalities ?? []}
          classes={content()?.classes ?? []}
          professions={content()?.professions ?? []}
          onNameChange={(name) => setState('name', name)}
          onPersonalityChange={(p) => setState('personality', p)}
          onClassChange={(c) => setState('class', c)}
          onProfessionChange={(p) => setState('profession', p)}
        />
        <CombatStateSelector
          combat={state.combat}
          statuses={content()?.statuses ?? []}
          onChange={(combat) => setState('combat', combat as CombatState)}
        />
        <div style={{ flex: '1', 'overflow-y': 'auto', 'min-height': '0' }}>
          <AbilityCards
            abilities={content()?.abilities ?? []}
            descriptions={content()?.descriptions ?? {}}
            deathContent={content()?.deathContent ?? ''}
            charClass={state.class}
            profession={state.profession}
            personality={state.personality}
            combat={state.combat}
            hp={state.hp}
            usedCards={usedCards()}
            onUseCard={(title) => setUsedCards((prev) => new Set([...prev, title]))}
            onActivate={handleAbilityActivate}
          />
          <GMMode
            enabled={state.gmMode}
            characterName={state.name}
            savedCharacters={state.savedCharacters}
            onToggle={(enabled) => setState('gmMode', enabled)}
            onSave={saveCharacter}
            onLoad={loadCharacter}
            onHelpOpen={() => setHelpOpen(true)}
          />
        </div>
        <Show when={helpOpen()}>
          <HelpPanel
            body={content()?.generalContent ?? ''}
            onClose={() => setHelpOpen(false)}
          />
        </Show>
      </div>
    </>
  )
}
