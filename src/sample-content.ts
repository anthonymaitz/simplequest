import type { SimpleQuestContent } from './types'

export const sampleContent: SimpleQuestContent = {
  personalities: ['passionate', 'wild', 'calculating', 'righteous', 'selfish'],
  classes: ['wizard', 'sage', 'fighter', 'marksman'],
  professions: [
    'animal-trainer', 'criminal', 'diplomat', 'merchant', 'performer',
    'priest', 'scout', 'soldier', 'tinkerer', 'warlock',
  ],
  statuses: [
    { id: 'inGeneral',   label: 'General',      message: 'Standard rules apply.' },
    { id: 'inCombat',    label: 'In Combat',     message: 'Combat is active. Initiative counts.' },
    { id: 'outOfCombat', label: 'Out of Combat', message: 'No enemies nearby.' },
  ],
  abilities: [
    // General (always visible)
    {
      title: 'Rest',
      body: 'Spend 10 minutes resting to recover **D6** energy. You may not rest in combat.',
      context: 'inGeneral',
      source: 'general',
    },
    {
      title: 'Assist',
      body: 'Help an ally with their action. They add **D4** to their roll.',
      context: 'inGeneral',
      source: 'general',
    },
    // Wizard class abilities
    {
      title: 'Fireball',
      body: 'Hurl a sphere of flame at a target. Deal **D8** fire damage to all enemies in range.',
      context: 'inCombat',
      source: 'wizard',
    },
    {
      title: 'Arcane Shield',
      body: 'Conjure a magical barrier. Reduce incoming damage by **D6** until your next turn.',
      context: 'inCombat',
      source: 'wizard',
    },
    {
      title: 'Detect Magic',
      body: 'Sense magical auras within 30 feet. Roll **D10** — higher results reveal more detail.',
      context: 'outOfCombat',
      source: 'wizard',
    },
    // Fighter class abilities
    {
      title: 'Power Strike',
      body: 'Deliver a devastating blow. Deal **D10** physical damage. Costs 2 energy.',
      context: 'inCombat',
      source: 'fighter',
    },
    {
      title: 'Shield Bash',
      body: 'Slam your shield into an enemy. Deal **D4** damage and stun them for one turn.',
      context: 'inCombat',
      source: 'fighter',
    },
    // Sage class abilities
    {
      title: 'Lore Check',
      body: 'Recall knowledge about a creature or location. Roll **D12** — consult the GM for results.',
      context: 'inGeneral',
      source: 'sage',
    },
    // Marksman class abilities
    {
      title: 'Aimed Shot',
      body: 'Take a careful aim before firing. Next ranged attack deals **D12** damage.',
      context: 'inCombat',
      source: 'marksman',
    },
    // Criminal profession abilities
    {
      title: 'Pickpocket',
      body: 'Attempt to steal a small item unnoticed. Roll **D20** — succeed on 12 or higher.',
      context: 'outOfCombat',
      source: 'criminal',
    },
    {
      title: 'Backstab',
      body: 'Strike from the shadows. Deal **D8** damage plus **D6** bonus if target is unaware.',
      context: 'inCombat',
      source: 'criminal',
    },
    // Scout profession abilities
    {
      title: 'Track',
      body: 'Follow the trail of a creature. Roll **D10** — higher results give more precise information.',
      context: 'outOfCombat',
      source: 'scout',
    },
  ],
}
