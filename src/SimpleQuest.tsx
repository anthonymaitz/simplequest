import { createEffect, createMemo, createSignal, onMount, onCleanup } from 'solid-js'
import { createCharacterStore } from './store'
import { Header } from './components/Header'
import { CharacterSelector } from './components/CharacterSelector'
import { CombatStateSelector } from './components/CombatStateSelector'
import { AbilityCards } from './components/AbilityCards'
import { GMMode } from './components/GMMode'
import { Toast } from './components/Toast'
import type { SimpleQuestContent, CombatState } from './types'
import cssString from './styles/tailwind.css?inline'

interface SimpleQuestProps {
  content: string
  element: HTMLElement
}

export function SimpleQuest(props: SimpleQuestProps) {
  const { state, setState, setEnergy, loadFromStorage, saveCharacter, loadCharacter } =
    createCharacterStore()

  const [toastMessage, setToastMessage] = createSignal('')
  const [toastVisible, setToastVisible] = createSignal(false)
  let toastTimer: ReturnType<typeof setTimeout> | undefined

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

  onCleanup(() => {
    if (toastTimer !== undefined) clearTimeout(toastTimer)
  })

  function showToast(message: string) {
    if (toastTimer !== undefined) clearTimeout(toastTimer)
    setToastMessage(message)
    setToastVisible(true)
    toastTimer = setTimeout(() => setToastVisible(false), 2500)
  }

  function handleRoll(sides: number) {
    const result = Math.floor(Math.random() * sides) + 1
    showToast(`d${sides} → ${result}`)
  }

  // Sync personality to data-personality on the host element for CSS theming
  createEffect(() => {
    if (state.personality) {
      props.element.setAttribute('data-personality', state.personality)
    } else {
      props.element.removeAttribute('data-personality')
    }
  })

  return (
    <>
      <style>{cssString}</style>
      <div style={{ 'min-height': '100%', position: 'relative' }}>
        <Header
          hp={state.hp}
          energy={state.energy}
          die={state.die}
          onHpChange={(hp) => setState('hp', hp)}
          onEnergyClick={setEnergy}
          onDieChange={(die) => setState('die', die)}
          onRoll={handleRoll}
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
        <AbilityCards
          abilities={content()?.abilities ?? []}
          charClass={state.class}
          profession={state.profession}
          combat={state.combat}
          onRoll={handleRoll}
        />
        <GMMode
          enabled={state.gmMode}
          characterName={state.name}
          savedCharacters={state.savedCharacters}
          onToggle={(enabled) => setState('gmMode', enabled)}
          onSave={saveCharacter}
          onLoad={loadCharacter}
          onHelpOpen={() => {}}
        />
        <Toast message={toastMessage()} visible={toastVisible()} />
      </div>
    </>
  )
}
