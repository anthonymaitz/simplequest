import { createStore } from 'solid-js/store'
import type { CharacterState, CharacterData } from './types'

const STORAGE_KEY = 'simplequest-characters'

const defaultState: CharacterState = {
  name: '',
  personality: '',
  class: '',
  profession: '',
  combat: 'inGeneral',
  energy: Array(10).fill(false) as boolean[],
  hp: 10,
  die: 'd6',
  round: 0,
  usedAbilities: [] as string[],
  selectedAbility: null as string | null,
  gmMode: false,
  savedCharacters: {},
}

export function createCharacterStore() {
  const [state, setState] = createStore<CharacterState>(
    structuredClone(defaultState)
  )

  function setEnergy(index: number) {
    setState('energy', (energy) => energy.map((_, i) => i <= index))
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setState('savedCharacters', JSON.parse(raw))
    } catch {
      // ignore corrupt storage
    }
  }

  function saveCharacter() {
    if (!state.name) return
    const { gmMode, savedCharacters, ...data } = state
    const updated = { ...state.savedCharacters, [state.name]: data as CharacterData }
    setState('savedCharacters', updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // ignore storage errors (e.g. private browsing quota)
    }
  }

  function loadCharacter(name: string) {
    const char = state.savedCharacters[name]
    if (!char) return
    setState({ ...char })
  }

  return { state, setState, setEnergy, loadFromStorage, saveCharacter, loadCharacter }
}

export type CharacterStore = ReturnType<typeof createCharacterStore>
