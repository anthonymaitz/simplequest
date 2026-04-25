export type CombatState = 'inGeneral' | 'inCombat' | 'outOfCombat' | 'isDead'

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
  energyCost?: number // Optional energy cost, shown as badge on card header
}

export interface SimpleQuestContent {
  personalities: string[]
  classes: string[]
  professions: string[]
  statuses: CombatStatus[]
  abilities: AbilityCard[]
  descriptions: Record<string, string> // keyed by lowercase personality/class/profession name
  generalContent: string               // rendered in the ? help panel
  deathContent: string                 // rendered as DeathCard when HP = 0
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
  round?: number      // current combat round — used to reset "used" card state
}

export interface CharacterState extends CharacterData {
  gmMode: boolean
  savedCharacters: Record<string, CharacterData>
}
