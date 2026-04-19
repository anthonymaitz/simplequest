export type CombatState = 'inGeneral' | 'inCombat' | 'outOfCombat'

export interface CombatStatus {
  id: CombatState
  label: string
  message: string
}

export interface AbilityCard {
  title: string
  body: string        // Markdown; D[X] patterns become clickable dice rolls
  context: CombatState
  source: string      // 'wizard' | 'criminal' | 'general' | etc.
}

export interface SimpleQuestContent {
  personalities: string[]
  classes: string[]
  professions: string[]
  statuses: CombatStatus[]
  abilities: AbilityCard[]
}

export interface CharacterData {
  name: string
  personality: string
  class: string
  profession: string
  combat: CombatState
  energy: boolean[]   // length 10
  hp: number          // 0–30
  die: string         // 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100'
}

export interface CharacterState extends CharacterData {
  gmMode: boolean
  savedCharacters: Record<string, CharacterData>
}
