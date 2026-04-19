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

  // ─── Descriptions ────────────────────────────────────────────────────────────
  descriptions: {
    passionate: `"My name is Inigo Montoya. You killed my father. Prepare to die." — Inigo Montoya

Passionate characters follow their hearts. They live in the moment and trust their instincts when it comes to making important decisions. They can be impulsive, quick-tempered, and easily swayed by emotional appeals. But when they join your cause, a Passionate character will stay with you to the bitter end and always give 100 percent.`,

    wild: `"It's Showtime." — Beetlejuice

Wild Characters are unpredictable and will often do things that, to others, seem foolish or short-sighted. They are neither "good" nor "bad" but instead a neutral force of nature. While role playing a Wild Character, it may be beneficial to flip a coin or roll a D2 to decide a course of action.`,

    calculating: `"Logic clearly dictates that the needs of the many outweigh the needs of the few." — Spock

Calculating characters carefully consider the pros and cons of their actions before proceeding. Nothing they do is rash, ill-considered, or impulsive. What they lack in speed and passion, they make up in efficiency and intellectual superiority.`,

    righteous: `"A man must have a code." — The Wire

Righteous characters tend to think of others before themselves and are usually concerned with "doing the right thing" despite what it could mean for their own goals. They are boy scouts, peace officers, and are generally what you think of when you hear the word "hero."`,

    selfish: `"Throw me the idol, I'll throw you the whip!" — Raiders of the Lost Ark

There is only one true concern in a selfish character's life: themselves. Every action they take will be weighed against their own self-interests. Selfish characters are not always completely evil — it will often be in their best interest to defeat a bad guy bent on destroying the world… mostly because the world is where they currently live.`,

    wizard: `Wizards are smarter than the average human. They possess intelligence on par with your average multi-day Jeopardy Champion. They can identify unknown objects, places, famous people, and monsters. A D20 roll may be required for more difficult subjects.`,

    sage: `Sages channel their mystical abilities through a small personal token or weapon. Keep this on you at all times.

Sages can channel and adjust the powerful unseen forces of nature that control all life in the universe. They have the deductive reasoning skills (and social graces) of your average socially awkward but brilliant title character of a weekly detective series. You can often determine, at a glance, whether someone or something is harmful or friendly.`,

    fighter: `Fighters are much stronger than the average human. They can lift, push, pull, and throw items with strength comparable to an Olympic athlete. For more difficult tasks, a D20 roll may be requested.`,

    marksman: `Marksmen are very fast and light on their feet. They have the speed and agility of an Olympic runner or gymnast. For more difficult, superhuman efforts, a D20 roll may be required.`,

    criminal: `Your actions will determine whether or not society is aware of your criminal tendencies. Anonymity has obvious benefits. However, being a famous criminal will lead to making underworld contacts and lawman enemies. Tread cautiously.

Burglars carry a small pack of 5 items to help them with their crimes (lock picks, grappling hooks, smoke bombs, etc.).`,

    scout: `Scouts CANNOT carry or equip items that make noise or create light and still use their scout abilities.`,

    diplomat: `You are usually the party spokesman. Authorities you encounter will prefer to deal with you.

Diplomats are great at passing bribes! Everyone has a price. Your character may optionally act as a representative of a foreign power or royalty.`,

    soldier: `All soldiers have standing orders as part of a military organization. You may encounter fellow soldiers who follow the same banner — outrank them to give instructions; be outranked to receive them.

Soldiers receive a regular wage. Too many disciplinary actions lead to discharge and Mercenary status.`,
  },

  // ─── General Rules (shown in ? panel) ────────────────────────────────────────
  generalContent: `# Skill Checks

There are no skill checks. Anything an athletic adult can do, your players can do. Complicated actions are covered in character/job descriptions.

# Energy

Each player has 10 energy. Energy can be used for attacks, movement, or general actions.

Energy is always refunded at the START of that player's turn.

# Combat Actions

Regular Combat Actions can only be performed ONCE per turn.
Defensive Combat Actions can be performed as many times as you wish.

# General Actions

* Drink a potion: 1 energy
* Pick an item up: 1 energy
* Push a button/pull a lever: 1 energy
* Throw an item: 2 energy per 3 squares

# Movement Actions

* Standard Move: 1 energy per square
* Climbing a wall: 1 energy per 5 feet
* Horizontal Leap: 3 energy per square
* Swimming: 2 energy per square (calm), 3 in a current
* Carrying a heavy item: 3 energy per square

# Entering Combat

When combat begins, players roll a D20 against the GM's combat preparedness level. If ANY player rolls highest, the players ALL go first. If the GM wins, the monsters go first and players have HALF energy for defensive abilities.

# Knocked Out

When a player reaches 0 HP, see the "Am I Dead?" rules.

# Death

There is no permanent death in Simplequest. Dead players are returned to life at the end of combat.

# Fire

Fire in combat does 2 damage to adjacent enemies or players if they END their turn adjacent to it. Standing in fire does 3 damage. Fire can spread in flammable areas.`,

  // ─── Death Rules (shown when HP = 0) ──────────────────────────────────────────
  deathContent: `Not really. Your character is still alive, but a couple things have happened:

* You can no longer use your combat abilities and have ZERO energy.
* You can move up to 3 squares per turn.
* You can use your class's special Dying ability OR attempt to Resuscitate yourself.
* **DEATH PENALTY:** Discard one equippable item or lose 4 Gold.

# Resuscitate

Attempt to recover from your wounds and return to the fight. If an ally is adjacent, they can spend 3 Energy to boost your roll by 1 BEFORE you roll.

#### Roll a D6

* _1–5_ You are still clinging to life. If you attempt to Resuscitate next turn, add 1 to your roll.
* _6_ You return to life with 5 HP and 4 energy.

# Dying Warrior — Trip
**Adjacent**

#### Roll a D20

* _1–4_ You hold on, but they keep moving. If the enemy moves, they drag you with them.
* _5–13_ You trip the enemy. They are unable to physically move on their turn.
* _14–19_ You trip the enemy. They can't move and take 3 damage in the fall.
* _20_ You leap on an enemy's back. They flail about, likely hitting themselves or a fellow enemy.

# Dying Marksman — Shoot
**Defensive**

Every time an enemy passes your line of sight (any square DIRECTLY in front of you), shoot an arrow at them.

#### Roll a D4

Do the rolled amount of damage.

# Dying Sage — Possession
**Range 5** — NOTE: Previously possessed enemies CANNOT be possessed again.

#### Roll a D20

* _1–5_ Failed possession. The enemy does half damage this turn.
* _6–13_ Possess the enemy for a turn.
* _14–19_ Possess the enemy until it takes damage.
* _20_ Possess an enemy until it dies.

# Dying Wizard — Elemental Storm

#### Roll a D6 twice

Drop a burst of flame X squares left/right and Y squares up/down from the Wizard's location. You choose which roll is X and which is Y.

If the flame lands ON an enemy, they take 4 damage. NEXT TO an enemy: 1 damage. The flame remains for the encounter and damages friend and foe alike.`,

  // ─── Abilities ────────────────────────────────────────────────────────────────
  abilities: [
    // General
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

    // Wizard
    {
      title: 'Wand',
      body: `Attack an enemy with a ranged magic blast.

#### Roll a D6

* _1–5_ Do rolled amount of damage to a single enemy.
* _6_ Do 5 damage OR freeze enemy in place for 1 turn.

---

**Wand (passive):** Your magic wand can do small parlor tricks — levitate small objects, conjure food, or manipulate far away objects.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 3,
    },
    {
      title: 'Morph',
      body: `Turn an enemy into a less harmful creature! Does not work on Elites. Only one target can be morphed at a time.

#### Roll a D20

* _1–2_ Unintended Morph. The enemy turns into a different, more powerful monster.
* _3–19_ Your spell turns the enemy into a harmless woodland creature. They remain that way until damaged. On their turn, they roll D20 — if they match your roll or lower, they're cured.
* _20_ The enemy is turned into a friendly woodland creature. You now have a pet.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 4,
    },
    {
      title: 'Chain Lightning',
      body: `Attack nearby enemies with a volley of forked lightning.

#### Roll a D4 (no ally damage)
#### Roll a D6 (will hit allies)

* _1–3_ Deal rolled amount of damage to rolled amount of enemies in range.
* _4+_ Uncontrollable Storm. All valid targets in range take 4 lightning damage.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 5,
    },
    {
      title: 'Teleport',
      body: `Avoid an attack by teleporting yourself or an ally.

#### Roll a D6

* _1_ Not fast enough. Take all damage, but teleport 3 squares.
* _2–3_ Take half damage (round down), teleport 3 squares.
* _4–5_ Avoid the attack and move the rolled amount of squares.
* _6_ Switch places with any non-elite enemy. That poor jerk gets hit instead.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 3,
    },

    // Fighter
    {
      title: 'Strike',
      body: `Attack with your mainhand fighter weapon.

#### Roll a D6

* _1–5_ Do rolled amount of damage to a single enemy.
* _6_ Critical Blow. Do 7 damage and knock enemy back 1 square.`,
      context: 'inCombat',
      source: 'fighter',
      energyCost: 3,
    },
    {
      title: 'Shield Block',
      body: `Use your shield to prevent damage to self OR an adjacent ally.

#### Roll a D6

* _1_ Prevent 1 damage, but drop your shield. Lose 2 energy next turn to pick it back up.
* _2–5_ Prevent rolled amount of damage.
* _6_ Shield Bash — prevent 5 damage and do 3 damage to adjacent enemy.`,
      context: 'inCombat',
      source: 'fighter',
      energyCost: 2,
    },
    {
      title: 'Reckless Assault',
      body: `Assault the enemy with a flurry of deadly blows.

#### Roll 4× D4

* Even number rolls are done to the enemy.
* Odd number rolls are done to yourself OR an adjacent ally (GM choice).
* If ALL rolls are odd, do the damage to the enemy instead.
* If ALL rolls are even, do an additional D8 damage to the enemy.`,
      context: 'inCombat',
      source: 'fighter',
      energyCost: 5,
    },
    {
      title: 'Cleave',
      body: `A mighty swing that hits all nearby enemies.

#### Roll a D8

* _1_ Do 1 damage to adjacent characters, including yourself and allies.
* _2–7_ Do half rolled amount (round down) to all adjacent enemies.
* _8_ Tornado of Death — if you have energy remaining, you can move while spinning, hitting adjacent enemies for 4 damage.`,
      context: 'inCombat',
      source: 'fighter',
      energyCost: 4,
    },

    // Sage
    {
      title: 'Read',
      body: 'Examine a person, creature, or object and gain insight. Roll **D12** — higher results reveal deeper information. Consult the GM.',
      context: 'inGeneral',
      source: 'sage',
    },

    // Marksman
    {
      title: 'Aimed Shot',
      body: 'Take careful aim before firing. Next ranged attack deals **D12** damage. You may not move this turn.',
      context: 'inCombat',
      source: 'marksman',
      energyCost: 2,
    },

    // Criminal
    {
      title: 'Pickpocket',
      body: `Attempt to steal a small item unnoticed.

#### Roll a D20

* _1–4_ Caught! The target notices and reacts.
* _5–11_ You fail but are not detected.
* _12–19_ You lift the item cleanly.
* _20_ You lift the item and plant something on them too.`,
      context: 'outOfCombat',
      source: 'criminal',
    },
    {
      title: 'Backstab',
      body: `Strike from the shadows. Must attack a target unaware of you.

#### Roll a D8

* _1–2_ Your attack is too slow — they notice you in time.
* _3–6_ Do rolled amount of damage. You remain hidden.
* _7–8_ Do rolled amount + D6 bonus damage. You remain hidden.`,
      context: 'inCombat',
      source: 'criminal',
      energyCost: 2,
    },

    // Scout
    {
      title: 'Track',
      body: 'Follow the trail of a creature. Roll **D10** — higher results give more precise information and estimated time since passage.',
      context: 'outOfCombat',
      source: 'scout',
    },
  ],
}
