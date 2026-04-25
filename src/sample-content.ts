import type { SimpleQuestContent } from './types'

export const sampleContent: SimpleQuestContent = {
  personalities: ['passionate', 'wild', 'calculating', 'righteous', 'selfish'],
  classes: ['wizard', 'sage', 'fighter', 'marksman', 'monk'],
  professions: [
    'animal-trainer', 'criminal', 'diplomat', 'merchant', 'performer',
    'priest', 'scout', 'soldier', 'tinkerer', 'warlock',
  ],
  statuses: [
    { id: 'inGeneral',   label: 'General',      message: 'Standard rules apply.' },
    { id: 'inCombat',    label: 'In Combat',     message: 'Combat is active. Initiative counts.' },
    { id: 'outOfCombat', label: 'Out of Combat', message: 'No enemies nearby.' },
    { id: 'isDead',      label: 'Dead',          message: 'You have 0 HP. Move up to 3 squares per turn. Use your Dying ability or Resuscitate.' },
  ],

  // ─── Descriptions ────────────────────────────────────────────────────────────
  descriptions: {
    passionate: `"My name is Inigo Montoya. You killed my father. Prepare to die."
— Inigo Montoya, The Princess Bride

Passionate characters follow their hearts. They live in the moment and trust their instincts when it comes to making important decisions in life and love. They can be impulsive, quick-tempered, and easily swayed by emotional appeals. But when they join your cause, a Passionate character will stay with you to the bitter end and always give 100 percent.

Passion can also be channeled into dedication. It takes a great deal of passion to dedicate your life to seeking revenge on the criminals who killed your fiancé.`,

    wild: `"It's Showtime."
— Beetlejuice

Wild Characters are unpredictable and will often do things that, to others, seem foolish or short-sighted. They are neither "good" nor "bad" but instead a neutral force of nature.

While role playing a Wild Character, it may be beneficial to flip a coin or roll a D2 to decide a course of action.`,

    calculating: `"Logic clearly dictates that the needs of the many outweigh the needs of the few."
— Spock, Star Trek II

Calculating characters carefully consider the pros and cons of their actions before proceeding. Nothing they do is rash, ill-considered, or impulsive. What they lack in speed and passion, they make up in efficiency and intellectual superiority.

They will often gladly storm the castle with the rest of their party… but only after thoroughly examining every other possible solution first.`,

    righteous: `"A man must have a code."
— The Wire

Righteous characters tend to think of others before themselves and are usually concerned with "doing the right thing" despite what it could mean for their own goals. They are boy scouts, peace officers, and are generally what you think of when you hear the word "hero."`,

    selfish: `"Throw me the idol, I'll throw you the whip!"
— Raiders of the Lost Ark

There is only one true concern in a selfish character's life: themselves. Every action they take will be weighed against their own self-interests. Selfish characters are not always completely evil — it will often be in their best interest to defeat a bad guy bent on destroying the world… mostly because the world is where they currently live.`,

    wizard: `Wizards are smarter than the average human. They possess intelligence on par with your average multi-day Jeopardy Champion. They can identify unknown objects, places, famous people, and monsters. A D20 roll may be required for more difficult subjects.`,

    sage: `Sages channel their mystical abilities through a small personal token or weapon. Keep this on you at all times.

Sages can channel and adjust the powerful unseen forces of nature that control all life in the universe. Wise sages are careful about where, when, and how they use their abilities — playing with forces they can barely understand will often have unintended consequences.

Sages have the deductive reasoning skills of your average socially awkward but brilliant title character of a weekly detective series. You can often determine, at a glance, whether someone or something is harmful or friendly.`,

    fighter: `Fighters are much stronger than the average human. They can lift, push, pull, and throw items with strength comparable to an Olympic athlete. For more difficult tasks, a D20 roll may be requested.`,

    marksman: `Marksmen are very fast and light on their feet. They have the speed and agility of an Olympic runner or gymnast. For more difficult, superhuman efforts, a D20 roll may be required.`,

    monk: `Monks have trained their bodies to be weapons. They are disciplined, precise, and can perform feats of physical strength and agility that border on supernatural.`,

    'animal-trainer': `* You have a pet! It can be any animal you wish, but keep it smaller than a black bear. Keep in mind the animal you choose will limit your ability to stay inside an inn. A scary animal, like a dragon, may perturb NPCs.
* You also travel with 3 empty kennels. One is occupied by your starter pet, but the others are for any new pets you may pick up.`,

    criminal: `* Your actions will determine whether or not society is aware of your criminal tendencies. Anonymity has obvious benefits. However, being a famous criminal will lead to making underworld contacts and lawman enemies. Tread cautiously.
* Burglars carry a small pack of 5 items to help them with their crimes (lock picks, grappling hooks, smoke bombs, etc.).`,

    diplomat: `* You are usually the party spokesman. Authorities you encounter will prefer to deal with you.
* Diplomats are great at passing bribes! Everyone has a price.
* **Optional:** Your character may act as a representative of a foreign power or royalty.`,

    merchant: `* Merchants are in this adventuring game for the money. They will usually ONLY take a job if a fee is involved.
* Merchants travel with a cart of goods (up to 10 items). You start with 5 items of your choosing.
* Your Merchant can sell items in their cart to NPCs they meet — sales must make logical sense.`,

    performer: `* Performers in costume cannot carry conspicuous armor or weapons.
* Performers travel with a costume trunk — 5 costumes chosen before you set off.
* Performers can earn money by singing in bars or busking in town squares.`,

    priest: `* You are a member of the clergy. This affords you a level of respect among godfearing types.
* Design your own religion! You may find various skill rolls get a bonus if the situation fits your backstory.

**Choose one Taboo** (forbidden to your priest):
* No verbal communication or business with non-clergy of opposite gender (allies excluded)
* No lying — ever
* No use of potions, medicines, bandages, or non-holy equipment
* No harming non-humanoid non-evil animals
* No earning Gold Coins — all money is "dispersed to the poor"`,

    scout: `Scouts CANNOT carry or equip items that make noise or create light and still use their scout abilities.`,

    soldier: `* **Orders:** All soldiers have standing orders as part of a military organization.
* **Fellow Soldiers:** You may encounter fellow soldiers who follow the same banner — outrank them to give instructions; be outranked to receive them.
* **Wages:** Soldiers receive a regular wage from their organization.
* **Discharge:** Too many disciplinary actions leads to discharge and Mercenary status.`,

    tinkerer: `* If your party travels in a steampunk contraption, odds are your tinkerer owns or pilots it.
* Tinkerers carry a small toolbox with 5 tools for repairs and building small machines.`,

    warlock: `You commune with dark forces, so most respectable NPCs will not be disposed toward treating you kindly. You will rarely be able to apply for odd jobs. Pets will growl at you.`,
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

  // ─── Death intro (shown as description header when status = Dead) ────────────
  deathContent: `Your character is still alive, but a couple things have happened:

* You can no longer use your combat abilities and have ZERO energy.
* You can move up to 3 squares per turn.
* Use your class's special Dying ability OR attempt to Resuscitate yourself.
* **DEATH PENALTY:** Discard one equippable item or lose 4 Gold.`,

  // ─── Abilities ───────────────────────────────────────────────────────────────
  abilities: [
    // ── General ──────────────────────────────────────────────────────────────
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

    // ── Wizard ────────────────────────────────────────────────────────────────
    {
      title: 'Wand',
      body: `Attack an enemy with a ranged magic blast.

#### Roll a D6

* _1–5_ Do rolled amount of damage to a single enemy.
* _6_ Do 5 damage OR freeze enemy in place for 1 turn.

---

**Wand (passive):** Your magic wand can do small parlor tricks — levitate small objects, conjure food, or manipulate far away objects as if your hands were there.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 3,
    },
    {
      title: 'Morph',
      body: `Turn an enemy into a less harmful creature! Does not work on Elites. Only one target can be morphed at a time.

#### Roll a D20

* _1–2_ Unintended Morph — the enemy turns into a different, more powerful monster.
* _3–19_ Your spell turns the enemy into a harmless woodland creature. They remain that way until damaged. On their turn, they roll D20 — if they match your roll or lower, they're cured.
* _20_ The enemy is turned into a friendly woodland creature. You now have a pet.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 4,
    },
    {
      title: 'Reverse Morph',
      body: `Turn a small barnyard or woodland creature into a humanoid of your choice. The enchantment lasts about an hour.

#### Roll a D20

* _1_ Reversal! You are now transformed into an animal instead for 24 hours!
* _2–19_ You are successful. The higher the roll, the more they are likely to pass for human, the longer the enchantment lasts, and their willingness to follow commands.
* _20_ The Full Fairy Tale — the animal is now human forever.`,
      context: 'outOfCombat',
      source: 'wizard',
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
      title: 'Storm',
      body: `Make it rain! Must be outside.

#### Roll a D20

* _1–8_ Your attempt to alter the weather fails.
* _9–14_ It starts to rain.
* _15–19_ It starts to storm. Everyone should probably get inside.
* _20_ A violent and dangerous storm appears. Bad things happen. You and your party MUST seek shelter.`,
      context: 'outOfCombat',
      source: 'wizard',
    },
    {
      title: 'Teleport',
      body: `Avoid an attack by teleporting yourself or an ally to another location.

#### Roll a D6

* _1_ Not fast enough. Take all damage, but teleport 3 squares in any direction.
* _2–3_ Take half damage (round down), teleport 3 squares.
* _4–5_ Avoid the attack and move the rolled amount of squares.
* _6_ Switch places with any non-elite enemy. That poor jerk gets hit instead.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 3,
    },
    {
      title: 'Teleport (General)',
      body: `Move at will through space and time about 10–20 yards at a time. Bypass walls, crowds, jail cell doors. As long as you can see where you are going or have already been there.

**WARNING:** You must pass through a dimension ruled by some pretty nasty monsters.

#### Roll a D20 in secret when you teleport

* _1_ You accidentally teleport to a random location. The GM will let you know where you land, goof.
* _2–19_ It goes off without a hitch. Nice.
* _20_ You return from the netherrealms with a demon in tow.`,
      context: 'outOfCombat',
      source: 'wizard',
    },
    {
      title: 'Illusion',
      body: `Create an illusory double. You may only have one illusion spell operating at a time. If a friendly spell is cast on your double, you receive the benefit.

#### Roll a D20

* _1–2_ Botch. You accidentally create an illusion of a nearby enemy.
* _3–10_ Create an illusion character. Secretly designate one the "real" you. The illusion must stay within 2 squares or it disappears. Illusion is destroyed if attacked.
* _11–18_ Two illusions are created.
* _19–20_ Three illusions are created.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 3,
    },
    {
      title: 'Illusion (General)',
      body: `Create an illusion. You must concentrate on maintaining it at all times or it will vanish. Can be used to explain, distract, or fool NPCs.

#### D10 to create a small simple illusion
#### D8 to create a person-sized illusion
#### D6 to create an enormous, complicated room-sized illusion

* _1–3_ Failure. You create an image, but it is clearly a magical construct.
* _4–5_ A simple illusion that will on first glance appear real, but won't bear sustained scrutiny.
* _6+_ Your illusion is perfect — sight and sound — and will fool a large group for a while.`,
      context: 'outOfCombat',
      source: 'wizard',
    },
    {
      title: 'Living Flame',
      body: `Create a sentient ball of fire that will do your bidding for a turn.

#### Roll a D6

* _1_ Wild Fireball created adjacent to caster. Does 2 damage to all adjacent enemies and allies.
* _2–5_ Fireball created on target square. Does 3 damage to target. The flame then moves the rolled amount of squares in one direction, doing 2 damage to additional targets.
* _6_ Create a fireball on target square. Does 3 damage to target. You can then move the flame in any direction for 4 additional squares, doing 2 damage to any targets it hits.`,
      context: 'inCombat',
      source: 'wizard',
      energyCost: 4,
    },
    {
      title: 'Flame',
      body: `Create a small flame to light torches or set things on fire. But be careful…

#### Roll a D20

* _1–2_ You create a small flame… on yourself. Hope there's some water nearby.
* _3–15_ You create a small, controllable flame.
* _16–19_ Whoops. Fire goes out of control. Better find a way to put it out quickly.
* _20_ You create a huge fireball. If you are in or near a wooden building or forest, it will be an inferno within minutes. ALSO, one item your group possesses is lost to the fire.`,
      context: 'outOfCombat',
      source: 'wizard',
    },

    // ── Sage ──────────────────────────────────────────────────────────────────
    {
      title: 'Read',
      body: 'Examine a person, creature, or object and gain insight. Roll **D20** — higher results reveal deeper information. Consult the GM.',
      context: 'inGeneral',
      source: 'sage',
    },
    {
      title: 'Hex',
      body: `Blast an enemy with a cloud of hex magic.

#### Roll a D6

* _1–5_ Deal rolled amount of damage to the target.
* _6_ Deal 5 damage to the target. Create a Pain Aura on the target square that does 1 damage to enemies who end their turn on that square.`,
      context: 'inCombat',
      source: 'sage',
      energyCost: 3,
    },
    {
      title: 'Bad Luck',
      body: `Your mystical abilities have a negative impact on nearby small machines and man-made physical objects. You can cause hammerheads to fall off, furnaces to clog, small ropes to snap, and strip gears in clocks.

#### Roll a D8

* _1–2_ Failure. The object withstands your attempt.
* _3–6_ The object breaks. The GM will take your roll amount in consideration to determine severity.
* _7_ The object breaks in a comically obvious way. This will likely draw some suspicion.
* _8_ Haywire. Windows shatter, chairs snap, glasses break in a several-yard radius. This will definitely draw attention to you.`,
      context: 'outOfCombat',
      source: 'sage',
    },
    {
      title: 'Heal',
      body: `Heal self or a player. Any healing done over the target's max HP can be applied as ½ damage to a single enemy adjacent to the target.

#### Roll a D12

* _1_ Botch. Your target is healed for 2 life but loses 2 energy next turn.
* _2–10_ Target is healed for rolled amount.
* _11–12_ Target is healed for rolled amount. Create a magic shield on the target square. Characters inside take 1 less damage from attacks.`,
      context: 'inCombat',
      source: 'sage',
      energyCost: 4,
    },
    {
      title: 'Heal (Out of Combat)',
      body: `Attempt to heal an injured or ailing NPC.

#### Roll a D12 if target is ill enough to call out sick
#### Roll a D10 if target is seriously ill
#### Roll a D6 if target is near death

* _1–2_ They take a turn for the worse. If the people who called for your help are superstitious, you may be accused of witchcraft.
* _3–5_ They are stabilized, but not out of the woods.
* _6–9_ They miraculously recover. Your roll value determines how quickly they do so.
* _10–12_ They instantaneously recover. You can expect gratitude, rewards, etc.`,
      context: 'outOfCombat',
      source: 'sage',
    },
    {
      title: 'Shield',
      body: `Create a persistent magical shield on the board that prevents combat damage to characters standing in it.

#### Roll a D20

* _1–3_ Weak Shield. Prevents 2 damage from a single attack and then disappears.
* _7–13_ Stable Shield. Prevents 1 damage.
* _14–19_ Powerful Shield. Prevents 2 damage.
* _20_ Amazing Shield. Prevents 3 damage.`,
      context: 'inCombat',
      source: 'sage',
      energyCost: 3,
    },
    {
      title: 'Out of Combat Heal',
      body: `Heal your party ONCE when a combat encounter ends. Useful for dungeons or dangerous areas where resting is not an option.

#### Roll a D20

Distribute the rolled amount among your party members as you see fit.`,
      context: 'outOfCombat',
      source: 'sage',
    },
    {
      title: 'Dispel',
      body: `Attempt to remove a persistent magic spell on the board (shields, pain auras).

#### Roll a D8 if you or another hero made the construct
#### Roll a D6 if it is naturally occurring
#### Roll a D4 if an enemy created it

* _1–2_ Violent explosion. Do 3 damage to the nearest enemy AND the nearest ally to the element.
* _3–5_ The element is destroyed. Do the rolled amount of damage to the enemy closest to the element.
* _6–7_ The element is destroyed. Distribute the rolled amount of damage amongst any enemies in range as you see fit.
* _8_ Instantly disintegrate the nearest non-elite enemy.`,
      context: 'inCombat',
      source: 'sage',
      energyCost: 3,
    },
    {
      title: 'Misfortune',
      body: `Afflict an NPC with a brief, minor physical ailment of your choosing. Examples: a bout of sneezing during an important speech, tripping over their own feet, choking at a fancy dinner.

#### Roll a D10 if they are unaware of your presence
#### Roll a D8 if they are aware of your presence
#### Roll a D6 if you have used this ability on them before

* _1_ Haywire. Everyone within several yards, yourself included, suffers from a severe case of the same malady.
* _2–3_ Your hex affects a completely random target.
* _3–5_ It works… possibly a little too well. They will likely be aware they are being messed with.
* _6+_ It works and no one is the wiser.`,
      context: 'outOfCombat',
      source: 'sage',
    },
    {
      title: 'Cleanse',
      body: `Attempt to remove a harmful debuff from yourself or a party member.

#### Roll a D20

* _1_ You infect yourself with the ailment you attempted to remove.
* _2–7_ Improve. The ailment does one final turn of damage and is then removed.
* _8–16_ Success. Debuff removed.
* _17+_ Transfer the debuff to a new target within Range 5.`,
      context: 'inCombat',
      source: 'sage',
      energyCost: 3,
    },
    {
      title: 'Exorcism',
      body: `If someone is possessed by a demon, under the influence of a foul magical agent, or under the effects of mind control, you can restore them.

**WARNING:** Attempting an exorcism on an unaffiliated target may cause brain damage. Also, an extracted demon or spirit will be less than thrilled by your actions…

#### Roll a D8 (gain a roll bonus based on advance knowledge of the affliction)

* _1–3_ The victim is beyond your help.
* _4–7_ The malady is removed. Your roll value determines how injured the victim may be.
* _8_ The victim is cured and totally fine.`,
      context: 'outOfCombat',
      source: 'sage',
    },
    {
      title: 'Fear',
      body: `Attempt to scare enemies in your range into fleeing in terror. NOTE: If the afflicted creature runs into an object or off a ledge, they take 2 damage.

#### Roll a D8

* _1_ Botch. ALL characters (including your party and self) flee 3 squares in the opposite direction of where they are currently facing.
* _2–4_ 1 non-elite enemy of your choice flees 4 squares away from you.
* _5–7_ Up to 3 non-elite enemies (or 1 elite) of your choice flee 4 squares away from you.`,
      context: 'inCombat',
      source: 'sage',
      energyCost: 3,
    },
    {
      title: 'Jedi Mind Trick',
      body: `Attempt to convince a friendly, non-suspicious NPC of a simple but obvious falsehood. Complex concepts will not work.

#### D8 for a highly intelligent person
#### D10 for a person of average intelligence
#### D12 for a fool

* _1–2_ Epic Failure. Not only does it not work, but they are aware you tried to dupe them with magic.
* _3–5_ Regular failure. They are unaware you tried to dupe them.
* _6+_ Success. They believe your statement as if it were absolute truth.`,
      context: 'outOfCombat',
      source: 'sage',
    },

    // ── Fighter ───────────────────────────────────────────────────────────────
    {
      title: 'Strike',
      body: `Attack with your mainhand fighter weapon.

#### Roll a D6

* _1–5_ Do rolled amount of damage to a single enemy.
* _6_ Critical Blow. Do 7 damage and knock enemy back 1 square.

---

**Slice (passive):** Your sword can cut simple ropes, fruit, and thin pieces of wood. No roll required for simple items. For more difficult cuts (like a metal chain), roll a D8: 1–5 Failure, 6–8 Success.`,
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
      title: 'Pin',
      body: `Subdue a regular humanoid — including members of your own team!

#### Roll a D12 for a regular humanoid or a Mage/Marksman PC
#### Roll a D8 for an elite humanoid or a fellow Warrior PC

* _1–4_ They break free.
* _5–8_ You succeed in holding them in place for up to a minute.
* _9–12_ You can put them in a sleeper hold and knock them unconscious. If you want.`,
      context: 'outOfCombat',
      source: 'fighter',
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
      title: 'Upper Hand',
      body: `Your deadly combination of great strength and lightning reflexes allow you to quickly gain the upper hand on an NPC. Turn a simple handshake into a grappling hold. Resist arrest by flipping shackles on your jailor.

#### Roll a D20

* _1–4_ Great failure. You injure yourself in the attempt.
* _5–7_ You are evenly matched. You are now grappling with your opponent.
* _8–19_ Success. Whatever you attempted to describe happened.
* _20+_ Unintended success. Something else happens you didn't expect. Usually positive.`,
      context: 'outOfCombat',
      source: 'fighter',
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
    {
      title: 'Chop',
      body: `Fell small trees, or knock out wooden support beams or lampposts.

#### Roll a D6

* _1–2_ You fail. If not time sensitive, you can attempt again at +1 after 5–10 minutes.
* _3–6_ You succeed at chopping down whatever you're trying to knock down.`,
      context: 'outOfCombat',
      source: 'fighter',
    },
    {
      title: 'Charge',
      body: `Fling yourself across the battlefield and strike an enemy. NOTE: Only works on enemies on the same plane as you. If you have to climb or swim to reach them, you can't charge.

#### Roll a D10

* _1_ Missed! You move 10 squares forward. If you run into an obstacle, take 4 damage.
* _2–5_ Move yourself adjacent to the FURTHEST enemy within 10 squares.
* _6–9_ Move adjacent to the FURTHEST enemy within 10 squares. Do half rolled amount (round down) as damage.
* _10_ Knock into next week. Move adjacent to the FURTHEST enemy within 10 squares. Do the travelled distance amount of damage.`,
      context: 'inCombat',
      source: 'fighter',
      energyCost: 4,
    },
    {
      title: 'Door Bash',
      body: `Locked door in your way? Attempt to knock it down with brute strength. Note: This will create a loud noise.

#### D20 for a standard wooden door
#### D12 for a barred wooden door
#### D10 for a metal door

* _1–6_ The door holds, despite your best efforts.
* _7–9_ The door breaks, allowing entry.
* _10+_ The door explodes, injuring or startling any NPCs that may be inside.`,
      context: 'outOfCombat',
      source: 'fighter',
    },
    {
      title: 'Taunt',
      body: `Attempt to gain the attention of an enemy. Use anytime before an enemy moves. **ENHANCE:** GM can grant a roll bonus if you shout a creative insult.

#### Roll a D20

* _1–3_ Your shout attracts a previously unseen enemy onto the battlefield.
* _5–12_ Target enemy takes D6 damage if they DO NOT attack you this turn.
* _13–18_ Target enemy MUST attack you this turn.
* _19–20_ All enemies within Range 4 will move to attack you for a turn if possible.`,
      context: 'inCombat',
      source: 'fighter',
      energyCost: 2,
    },
    {
      title: 'Distract',
      body: `Gain the attention of NPCs to allow a fellow player to do something unseen (pick a pocket, unlock a door, steal documents from a desk).

#### Roll a D10 to distract a single NPC
#### D8 to distract a small group
#### D6 for a large crowd

* _1–3_ You fail to gain the attention of the target.
* _4–5_ You succeed for about 15 seconds.
* _6+_ You can keep a group enthralled for several minutes.`,
      context: 'outOfCombat',
      source: 'fighter',
    },

    // ── Marksman ──────────────────────────────────────────────────────────────
    {
      title: 'Shoot',
      body: `Fire an arrow in a straight (or diagonal) line.

#### Roll a D6, do X damage to single target
OR
#### Roll a D8

* _1_ Arrow misses target and hits a nearby ally for 3 damage.
* _2–8_ Do rolled amount of damage to a single target.`,
      context: 'inCombat',
      source: 'marksman',
      energyCost: 3,
    },
    {
      title: 'Shoot Arrow',
      body: `Arrows can be shot in a variety of non-combat ways — cut a hanging man from a scaffold, hit simple wooden levers to open gates, hunt small animals, etc.

#### Roll a D12 to hit a STATIONARY target
#### D8 on a moving target

* _1_ Spectacular failure. If there's a noisy pot to shatter or an innocent bystander, you totally hit it.
* _2–3_ Regular failure. If no witnesses and time is not of the essence, you can try again.
* _4–6_ Success, but you give away your shooting position.
* _7+_ Great success. If you were trying to be stealthy, nobody noticed.`,
      context: 'outOfCombat',
      source: 'marksman',
    },
    {
      title: 'Fire Arrows',
      body: `Send a flaming arrow in a straight or diagonal line to damage an enemy or set an object alight.

#### Roll a D20

* _1–3_ Miss. The flaming arrow sets a random square adjacent to your target on fire.
* _4–17_ Set Ablaze. Do 4 damage to target and create a fireball on your target square.
* _18–20_ Wildfire. Do 6 damage to target. Several nearby squares also catch fire.`,
      context: 'inCombat',
      source: 'marksman',
      energyCost: 4,
    },
    {
      title: 'Poison Arrow',
      body: `Send a poisonous arrow to damage an enemy over time.

Poisoned enemies must roll a D4 at the beginning of their next turn. If they match their original damage amount, they are cured. If not, they take the new rolled amount as damage.

#### Roll a D8

* _1_ You accidentally touch the poisoned tip. Both you and the target are poisoned.
* _2–7_ Target takes half rolled amount as damage (rounded up) and is poisoned.
* _8_ Paralyzing Shot. 4 damage and you choose whether it hits the enemy's leg (cannot move), arm (cannot physically attack), or head (cannot cast spells).`,
      context: 'inCombat',
      source: 'marksman',
      energyCost: 4,
    },
    {
      title: 'Poison Resistance',
      body: `You've spent years working with poisons, building up a sort of immunity to them. Most poisons have no effect on you.

Even deadly or powerful poisons require a D20 check to see how effective they are on you.`,
      context: 'inGeneral',
      source: 'marksman',
    },
    {
      title: 'Distracting Shot',
      body: `Take advantage of a distracted enemy as they attack an ally (NOT YOU) to get in some extra damage. You must have line of sight with the enemy.

#### Roll a D10

* _1_ Spectacular failure. You shoot your ally for 2 damage. Sorry.
* _2–8_ Half rolled (round down) range damage to the creature.
* _9–10_ 5 range damage. Its attack is messed up and it only does half damage to your ally.`,
      context: 'inCombat',
      source: 'marksman',
      energyCost: 2,
    },
    {
      title: 'Ask Questions Later',
      body: `Quickly draw your weapon to attack an enemy before they have a chance to react. This will likely throw you into combat.

#### Roll a D20

* _1–2_ You fumble the weapon and it falls to the floor. If this begins combat, you lose 3 energy on your first turn to pick it up again.
* _3–6_ You manage to pull out your weapon and get a shot off. 2 damage and combat begins.
* _7–14_ 4 damage and combat begins.
* _15–19_ 6 damage, combat begins, and you take your turn first.
* _20_ You kill a non-elite enemy instantly. Surviving enemies may surrender. If not, you and your party go first.`,
      context: 'outOfCombat',
      source: 'marksman',
    },
    {
      title: 'Dodge',
      body: `Attempt to avoid an attack.

#### Roll a D20 (NOTE: Roleplaying a dodge using terrain features earns a GM bonus to this roll)

* _1–2_ Botch. You collide with the nearest enemy or adjacent ally. 2 damage to both of you and the intended attack continues.
* _3–12_ Resist 1/3 rolled amount (round down) damage. Move to adjacent square.
* _13–19_ Resist all damage. Move up to 2 squares.
* _20_ Human Shield. Resist all damage, move 2 squares. Enemy instead hits another enemy if in range, or self.`,
      context: 'inCombat',
      source: 'marksman',
      energyCost: 2,
    },

    // ── Monk ──────────────────────────────────────────────────────────────────
    {
      title: 'Kung Fu',
      body: `Assault the enemy with a series of punches and kicks.

#### Roll a D4

* _1_ 1 Damage.
* _2_ 2 Damage.
* _3_ 3 Damage. You may use Martial Arts again for 2 Energy.
* _4_ 3 Damage. You may use Martial Arts again for 1 Energy.`,
      context: 'inCombat',
      source: 'monk',
      energyCost: 3,
    },
    {
      title: 'Judo Throw',
      body: `Grab an enemy and throw them a great distance.

#### Roll a D6

* _1_ Grapple. You are locked in a struggle with the target. To escape, you must perform another Judo Throw. If you lack the energy, both of you are locked in the grapple, unable to act until your next turn. Damage to either of you breaks this effect.
* _2–6_ Target takes X damage and moves Y squares in any direction, where X+Y equals the amount rolled. Monk determines the values.`,
      context: 'inCombat',
      source: 'monk',
      energyCost: 4,
    },
    {
      title: 'Chi Heal',
      body: `Use your own life force to aid an ally.

#### Roll a D10

* _1_ You lack proper concentration. You may reroll for 1 Energy. CONCENTRATE!
* _2–8_ Heal target for rolled amount. You take damage equal to HALF rolled amount (rounded down).
* _9–10_ Heal target for 8 health. Deal 4 damage to nearest enemy.`,
      context: 'inCombat',
      source: 'monk',
      energyCost: 4,
    },
    {
      title: 'Soul Siphon',
      body: `Use a secret martial arts technique to steal the life force from an enemy.

#### Roll a D20

* _1_ You accidentally steal the very essence of your target. For the rest of the encounter, that enemy exerts influence over your actions — they can move you 1–3 squares at the end of your turn OR do a weak attack if you are near allies!
* _2–10_ You do 3 damage to your target and recover 2 health.
* _11–19_ You do 5 damage and recover 4 health.
* _20_ You do 6 damage. You recover all of your spent energy this turn. Party on!`,
      context: 'inCombat',
      source: 'monk',
      energyCost: 5,
    },
    {
      title: 'Flying Scissor Kick',
      body: `Fly through the air and assault a nearby enemy. Before you roll, choose one of the 8 possible directions. NOTE: This attack ends if you encounter a large terrain object.

#### Roll a D8

* _1–7_ Travel rolled amount of spaces in a single direction. If you collide with an enemy or terrain object, you deal 3 damage and stop moving.
* _8_ Travel 6 spaces in a single direction. If you collide with an enemy, you deal 5 damage. You may spend 1 additional energy per square to keep moving, dealing 1 damage per square.`,
      context: 'inCombat',
      source: 'monk',
      energyCost: 4,
    },
    {
      title: 'Earthcall',
      body: `Implore the very earth beneath your feet to create rock barriers. These barriers remain on the board for the remainder of the encounter.

#### Roll a D20

* _1_ Quicksand! Everyone within range must spend 3 energy per square to move for an entire turn. You are stuck and cannot move at all for an entire turn.
* _2–10_ A pillar of earth shoots out of the ground, knocking an enemy into the air for 1/2 rolled damage.
* _11–19_ A pillar of earth knocks an enemy into the air for 5 damage and adjacent enemies for 2 damage each.
* _20_ Earthquake! The earth opens up, consuming a non-elite target, killing them instantly. Elite targets take 8 damage. All ground-based enemies and allies in visible range take 1 damage.`,
      context: 'inCombat',
      source: 'monk',
      energyCost: 5,
    },
    {
      title: 'Dodge',
      body: `Attempt to avoid an attack.

#### Roll a D10 (NOTE: Roleplaying a dodge using terrain features earns a GM bonus to this roll)

* _1_ Botch. You collide with the nearest enemy or adjacent ally. 2 damage to both of you and the intended attack continues.
* _2–8_ Resist 1/2 rolled amount (round down) damage. Move to adjacent square.
* _9–10_ Perfect dodge. Resist all damage and move up to 2 squares.`,
      context: 'inCombat',
      source: 'monk',
      energyCost: 2,
    },

    // ── Animal Trainer ────────────────────────────────────────────────────────
    {
      title: 'Analyze Beast',
      body: `Learn the weaknesses of any non-humanoid beast (wolves, spiders, bears, dragons) enemy. Can only be performed ONCE per enemy type.

#### Roll a D4

* _1_ Learn how much HP the enemy has.
* _2_ Learn the nature of their attacks.
* _3_ Learn the enemy's weaknesses, if any.
* _4_ You do an additional 1 damage to that enemy type for the remainder of the battle.`,
      context: 'inCombat',
      source: 'animal-trainer',
      energyCost: 2,
    },
    {
      title: 'Talk With The Animals',
      body: `You often understand the intentions and motives of friendly, wild animals. In some cases, you can even communicate with them.

#### Roll a D4

* _1_ You can ask an animal a question.
* _2_ You can make a simple request of any friendly animal.
* _3_ Convince an animal to assist you in an upcoming fight. They are not controllable like a pet and their assistance may not be what you expect…
* _4_ Choose any one of the above options.`,
      context: 'outOfCombat',
      source: 'animal-trainer',
    },
    {
      title: 'Summon Pet',
      body: `Summon an animal friend into battle. You can only summon a pet once per battle. You can dismiss your pet on your turn. If your pet dies, it is gone forever.

#### Roll a D20

* _1–4_ Feral. Your pet will ignore your commands and attack friends and foes (but not you).
* _5–12_ Leashed. Your pet can take simple instructions, so long as you stay within Range 3. Otherwise it is uncontrolled.
* _13–19_ Good Boy. Your pet obeys your every command, regardless of distance.
* _20_ Make Friends. Your pet can convince another non-humanoid monster to join your side.`,
      context: 'inCombat',
      source: 'animal-trainer',
      energyCost: 5,
    },
    {
      title: 'Domesticate',
      body: `Attempt to domesticate a non-aggressive wild animal you encounter. Once per day.

Wild animals in training must be kept in a kennel. If the animal is not trained on the last attempt, it is untrainable and must be freed.

#### Roll a D4 on your first day
#### D6 on second day
#### D8 on the last, as necessary

* _1_ YOW! It bit you! One of your items is randomly damaged and cannot be used until repaired.
* _2–3_ The animal does not respond to your attempts at training.
* _4+_ You successfully train the animal. It is now your pet.`,
      context: 'outOfCombat',
      source: 'animal-trainer',
    },

    // ── Criminal ──────────────────────────────────────────────────────────────
    {
      title: 'Mark Target',
      body: `Find the weakest member of the herd and single them out for destruction.

#### Roll a D4

* _1–3_ Identify the creature with the lowest HP in your range. Your attacks do 1 additional damage to that enemy.
* _4_ Identify the creature with the lowest HP in your range. Your ENTIRE PARTY's attacks do 1 additional damage to that enemy.`,
      context: 'inCombat',
      source: 'criminal',
      energyCost: 2,
    },
    {
      title: 'Case',
      body: `Identify the best targets for thievery in the immediate area.

#### Roll a D4

* _1_ Identify the most valuable, thievable item in the immediate area.
* _2_ Identify the best pickpocket target in the immediate area.
* _3_ Get a good sense of the local security measures and whether attempting a theft is a good idea.
* _4_ Choose one of the above.`,
      context: 'outOfCombat',
      source: 'criminal',
    },
    {
      title: 'Pickpocket',
      body: `Attempt to steal something from a humanoid enemy.

#### Roll a D8 if in front of an enemy
#### Roll a D10 if on the side
#### Roll a D12 if directly behind

* _1–2_ You are caught! They counterattack you with their standard attack.
* _3–6_ You find nothing, but you do stab them in the thigh for the rolled amount of damage.
* _7–8_ Success! You find some money!
* _9–10_ Success! You steal the weapon in their hand. They can no longer use it to attack.
* _11+_ Success! You steal a random item! But the added weight means you are encumbered and have -1 energy for the remainder of the encounter.`,
      context: 'inCombat',
      source: 'criminal',
      energyCost: 5,
    },
    {
      title: 'Pick Lock',
      body: `Attempt to open a sealed chest, door, or lock.

#### Roll a D20 for a simple lock
#### Roll a D12 for a normal lock
#### Roll a D10 for a complex lock

* _1–4_ Lockpick breaks in lock. Door/chest cannot be opened.
* _5–7_ Your first attempt fails. You can try again, but if this is time sensitive, be careful.
* _8–11_ Lock opens.
* _12+_ Lock opens. In addition to scripted items, you also find some money.`,
      context: 'outOfCombat',
      source: 'criminal',
    },

    // ── Diplomat ──────────────────────────────────────────────────────────────
    {
      title: 'Analyze Person',
      body: `Learn the weaknesses of any humanoid (human, dwarf, elf, halfling, etc.) enemy. Can only be performed ONCE per enemy type.

#### Roll a D4

* _1_ Learn how much HP the enemy has.
* _2_ Learn the nature of their attacks.
* _3_ Learn the enemy's weaknesses, if any.
* _4_ You do an additional 1 damage to that enemy type for the remainder of the battle.`,
      context: 'inCombat',
      source: 'diplomat',
      energyCost: 2,
    },
    {
      title: 'Detect Motives',
      body: `You are skilled at assessing a situation and understanding what people want. You can often tell just by looking at someone what they're really like — even if they are trying to deceive you.

#### Roll a D4

* _1_ You determine whether or not a person is being honest.
* _2_ You understand their motives.
* _3_ You understand what they desire.
* _4_ If an NPC is harboring a secret, you get at least a clue as to what it may be.`,
      context: 'outOfCombat',
      source: 'diplomat',
    },
    {
      title: 'Persuade',
      body: `ONCE per battle, convince a non-elite minion to fight for you.

#### Roll a D20 (Modifications: convincing RP, actual monetary bribes)

* _1–2_ Failure. That monster is insulted and will only attack you.
* _3–6_ Confuse. The monster is confused by your argument. It will not attack you this turn.
* _7–19_ Success. The monster fights for you. Stay in earshot (6 squares) or it'll ignore you.
* _20_ Congrats. You now have a pet. Give it a name. It will follow any instructions regardless of distance. NOTE: Cannot persuade another minion until your old pet is released or killed.`,
      context: 'inCombat',
      source: 'diplomat',
      energyCost: 5,
    },
    {
      title: 'Bribe',
      body: `Attempt to get your way with a monetary bribe. Roll a die — the result determines how much the bribe will cost you. Feel free to pass the hat around your party.

#### Roll a D2 if they like you
#### Roll a D4 if they are neutral
#### Roll a D6 if they dislike you`,
      context: 'outOfCombat',
      source: 'diplomat',
    },

    // ── Merchant ──────────────────────────────────────────────────────────────
    {
      title: 'Renegotiate',
      body: `After you are attacked, make the GM reroll their damage dice! You must take the new damage amount, even if it is higher…`,
      context: 'inCombat',
      source: 'merchant',
      energyCost: 2,
    },
    {
      title: 'Shopping',
      body: `You are an expert at buying and selling goods. You know where all the best shops are, or if you are already in a shop, whether or not you can get a better deal.

#### Roll a D4

* _1_ Get a discount at this particular shop.
* _2_ Get a better deal when trading in goods.
* _3_ Gain access to items "in the back room" not available to regular customers.
* _4_ Choose one of the above.`,
      context: 'outOfCombat',
      source: 'merchant',
    },
    {
      title: 'Equipment Cart',
      body: `Summon your small 1×2 Merchant Cart onto the battlefield. It has 15 HP and can move 2 squares on your turn. It cannot be healed or traverse difficult terrain. Can only be summoned once per combat encounter.

Up to two players can hide inside the cart. Once inside, players are immune to damage but cannot use offensive or ranged abilities.`,
      context: 'inCombat',
      source: 'merchant',
      energyCost: 0,
    },
    {
      title: 'Identify Sellable Item',
      body: `Find treasure in items most adventurers would overlook.

#### Roll a D20

* _1–6_ It's actual junk. You can take it with you, but it will be difficult to sell.
* _7–17_ You find one or two decent items you can add to your stock. Roll determines value.
* _19–20_ You find a valuable treasure that is actually decent enough to use in your adventures.`,
      context: 'outOfCombat',
      source: 'merchant',
    },

    // ── Performer ─────────────────────────────────────────────────────────────
    {
      title: 'Mimic',
      body: `Attempt to mimic an attack made upon you.

#### Roll a D4

* _1–3_ Copy Attack — on your next attack, in addition to your regular damage, do the amount of damage you just took as well.
* _4_ Nailed It — learn the enemy's attack. You can use this ability yourself for the remainder of the battle.`,
      context: 'inCombat',
      source: 'performer',
      energyCost: 4,
    },
    {
      title: 'Perform',
      body: `All eyes are on you. This better be good.

#### Roll a D4

* _1_ The audience doesn't really pay you much attention.
* _2_ The audience really gets into the performance.
* _3_ The audience is entranced. They will likely throw some money your way.
* _4_ You are the second coming of Elvis.`,
      context: 'outOfCombat',
      source: 'performer',
    },
    {
      title: 'Compose Song',
      body: `Sing a song about the current battle. You will actually be composing this song during combat, so keep a notepad nearby. You MUST add a new line per turn and there should be some kind of proper form or rhyming scheme.

#### Different kinds of lines have different effects (choose one if a line qualifies for multiple):

* Lines that describe **SPECIFIC ENEMY ACTIONS** → that enemy does half damage this turn.
* Lines about **SPECIFIC ALLY ACTIONS** in range → heal them D4+1 HP.
* Lines about **YOURSELF** → refund of energy, but no effect, you egomaniac…
* **Insulting an enemy** → no concrete effect, but they may be more inclined to attack you…`,
      context: 'inCombat',
      source: 'performer',
      energyCost: 1,
    },
    {
      title: 'Disguise',
      body: `Impersonate either a specific NPC (The King, a famous criminal) or a type of NPC (a guard, a courtesan) for purposes of deception.

When your costume is created, the GM will rate it from 1 to 6. A cobbled-together guard uniform may only be a 2 or 3. If you knock out a guard and take his uniform, that will likely be a 5 or 6.

#### Roll a D6 when attempting to fool a person or roomful of persons

* _Lower or Equal_ You fool everyone. You are as you appear to be.
* _Higher_ They see through your costume immediately or become suspicious. Time to find an exit.`,
      context: 'outOfCombat',
      source: 'performer',
    },

    // ── Priest ────────────────────────────────────────────────────────────────
    {
      title: 'Miracle!',
      body: `When an enemy is about to attack you, pray to the heavens to spare your life. NOTE: You can only use this once per turn.

#### Roll a D100

* _1–85_ Like what happens with most prayers, nothing happens.
* _86–99_ The attack misses completely! This is clearly due to divine intervention!
* _100_ You are infused with the spirit of a powerful celestial being for the remainder of the encounter. Your life is healed to full and you can attack with a mighty celestial blade for 2 Energy that does D100 damage.`,
      context: 'inCombat',
      source: 'priest',
      energyCost: 1,
    },
    {
      title: 'Sense the Divine',
      body: `Sense the presence of divine or mystical beings. They will often take the form of mortals, but you know better…

#### Roll a D20

The quality of your roll determines how firm a read you have. A low roll may mean you feel a presence. An extremely high roll can pinpoint exactly where this deity may be hiding.`,
      context: 'outOfCombat',
      source: 'priest',
    },
    {
      title: 'Convert',
      body: `Attempt to convince an enemy to repent their evil ways after they have injured you.

#### Roll a D10 — compare your roll to the TOTAL amount of damage a SINGLE non-elite enemy has inflicted upon you in the current battle

* _Equal or Lower_ The enemy regrets their actions and will now fight on your side.
* _Higher_ No regrets. The enemy resents your attempts. They will DEFINITELY attack you next turn.

You can only successfully convert one enemy per encounter.`,
      context: 'inCombat',
      source: 'priest',
      energyCost: 4,
    },
    {
      title: 'Preach',
      body: `Attempt to convert an NPC or group of NPCs to your religion. Once a day.

#### Roll a D20

* _1–5_ They hate what you have to say and will not speak to you. The locals will give you a hard time.
* _6–14_ The locals appreciate what you have to say. They'll help you out.
* _15–19_ You've gained a follower! They will aid your party in various ways: money, lodging, tips and secrets, maybe even a magic item.
* _20_ You've gained a zealot. They will do whatever you tell them to do — including following you into battle.`,
      context: 'outOfCombat',
      source: 'priest',
    },

    // ── Scout ─────────────────────────────────────────────────────────────────
    {
      title: 'Detect Hidden',
      body: `Attempt to detect hidden traps or monsters.

#### Roll a D20

* _1_ If there's a trap within 3 squares, you detect it… by setting it off.
* _2–9_ Detect invisible/hidden traps or monsters within 3 squares.
* _10–16_ Detect invisible/hidden traps or monsters within 6 squares.
* _17–20_ Detect invisible/hidden traps or monsters within 8 squares.`,
      context: 'inCombat',
      source: 'scout',
      energyCost: 2,
    },
    {
      title: 'Knowledge — Danger',
      body: `Your mastery over the senses of sight and hearing allow you to detect nearby danger. Rustles in nearby bushes from hungry wolves, guards in the next room quietly loading crossbows, kobolds waiting to strike in the trees. You notice details others may not.

#### Roll a D20 — number determines quality of read.`,
      context: 'outOfCombat',
      source: 'scout',
    },
    {
      title: 'Stealth',
      body: `Blend into your surroundings and go invisible to enemies.

#### Roll a D6

* If you roll **EQUAL TO OR LOWER** than the distance between you and the nearest enemy, you succeed in going stealth.
* If you roll **HIGHER**, you fail, but you are harder to see and the next attack on you will deal 1 less damage.

While in stealth, enemies may not attack you. If an enemy walks next to you on their turn, stealth is removed.

Attacking, healing, or performing defensive actions removes stealth. HOWEVER, your first attack out of stealth does ×2 damage as an Ambush.`,
      context: 'inCombat',
      source: 'scout',
      energyCost: 5,
    },
    {
      title: 'Spy',
      body: `Attempt to spy on people unobserved.

#### Roll a D6 VERSUS the subject you're spying on. If you match or exceed their roll, you are unseen.

**Modifiers:** Dress, time of day, and cover can give bonuses. Awareness of subjects or animal presence can give negatives.

NOTE: You may have to make SEVERAL spy checks in a row if you are attempting to sneak into a heavily guarded area.`,
      context: 'outOfCombat',
      source: 'scout',
    },

    // ── Soldier ───────────────────────────────────────────────────────────────
    {
      title: 'Adaptable',
      body: `You are an expert at adapting to changing conditions on a battlefield. Use this ability after you have been PHYSICALLY attacked. This ability can stack with any other class defensive abilities.

#### Roll a D4

* _1–3_ Prevent rolled amount of damage the NEXT TIME this enemy ability is used against you.
* _4_ Prevent 2 damage NEXT and EVERY TIME this ability is used against you in this battle.`,
      context: 'inCombat',
      source: 'soldier',
      energyCost: 2,
    },
    {
      title: 'Battle Strategy',
      body: `Size up a location and assess the best way to utilize your surroundings for advantage.

#### Roll a D4

* _1_ Tell where the enemy will most likely attack from. Or, where hidden bad guys are most likely to be found.
* _2_ Tell where spots of good defensive cover are. Or poor cover — like a wobbly table or a rug under a shaky chandelier.
* _3_ Spy 1 hidden trap. Or confirm there are no traps in the area.
* _4_ Choose any of the above.`,
      context: 'outOfCombat',
      source: 'soldier',
    },
    {
      title: 'Weapon Master',
      body: `There is no weapon in the world you cannot wield. Steal a weapon from an enemy and use it against them! Cannot be used against Elite Enemies or enemies who are not carrying weapons.

#### Roll a D20

* _1_ You yank the weapon out of their hand, but fall over backward and hit yourself with it. Lose D6 life.
* _2–8_ You get into a tug of war match. Both of you roll D6. You exchange damage. The person with the highest roll keeps the weapon.
* _9–18_ You steal their weapon. You can now use any special attacks that weapon may bestow.
* _19–20_ You steal their weapon and immediately kill them with it. Violently.

You may only have one stolen weapon at a time.`,
      context: 'inCombat',
      source: 'soldier',
      energyCost: 5,
    },
    {
      title: 'Marshal Forces',
      body: `Organize a group of local military officials or guards to perform a complex, non-combat related task. Form a posse, a bucket brigade, or an anti-riot squad.

#### Roll a D6

* _1_ Whoops. Your target outranks you. Now YOU are the one taking orders here.
* _2–5_ You gain the rolled amount of redshirt minions, prepared to take your orders.
* _6_ As many people as you need to get the job done appear, within reason.`,
      context: 'outOfCombat',
      source: 'soldier',
    },

    // ── Tinkerer ──────────────────────────────────────────────────────────────
    {
      title: 'Analyze Mechanical Construct',
      body: `Learn the weaknesses of any mechanical (steampunk, robot, golem) enemy. Can only be performed ONCE per enemy type.

#### Roll a D4

* _1_ Learn how much HP the enemy has.
* _2_ Learn the nature of their attacks.
* _3_ Learn the enemy's weaknesses, if any.
* _4_ You do an additional 1 damage to that enemy type for the remainder of the battle.`,
      context: 'inCombat',
      source: 'tinkerer',
      energyCost: 2,
    },
    {
      title: 'Repair Machine',
      body: `If something is broken, your tinkerer knows what is wrong with it and, if possible, how to fix it.

#### Roll a D20 (add a modifier if you have an appropriate tool)

* _~1_ It's reaaaaally broken. Will take several days to repair.
* _~10_ You can probably get this thing up and going in an hour or so. You may need an additional component.
* _~20_ You turn a screw and it's basically good as new.`,
      context: 'outOfCombat',
      source: 'tinkerer',
    },
    {
      title: 'Create Mechanical Trap',
      body: `Create a small mechanical trap in 1 nearby unoccupied square.

#### Roll a D20

* _1–4_ Botch. The trap goes off. All enemies and allies in range roll a D6, including you. Lowest roll takes that much damage.
* _5–11_ You create a trap. Anyone who walks over that square, friend or foe, takes D6 damage. They are immobilized on rolls of 4+; they escape next turn. The trap can be reset by a Marksman for 2 Energy and no roll.
* _12–19_ Your trap is invisible to all enemies, even to the GM.
* _20_ You can set two invisible traps.`,
      context: 'inCombat',
      source: 'tinkerer',
      energyCost: 3,
    },
    {
      title: 'Macguyver',
      body: `Create small, interesting machines or gizmos out of 2–3 simple found objects in the immediate area. A tranq dart gun made out of rolled-up parchment, a nearby toadstool, and a sewing needle? Sounds great. Whatever you imagine, as long as it makes fantasy RPG sense.

Search the immediate area for the components you need. GM assigns a target number based on RP and likelihood of finding the object.

#### Roll a D10

* If you roll **OVER** the number, you find the item.
* If the items can be reasonably found (leaves in a forest, a garbage can in a city street), no roll required.
* You can use any item in your toolbox for no roll.

Your tinkerer can keep up to 2 successfully created machines to use later. Every time you use the machine, roll a D6 — if you roll a 1, it breaks.`,
      context: 'outOfCombat',
      source: 'tinkerer',
    },

    // ── Dying (isDead) ────────────────────────────────────────────────────────
    {
      title: 'Resuscitate',
      body: `Attempt to recover from your wounds and return to the fight. If an ally is adjacent, they can spend 3 Energy to boost your roll by 1 BEFORE you roll.

#### Roll a D6

* _1–5_ You are still clinging to life. If you attempt to Resuscitate next turn, add 1 to your roll.
* _6_ You return to life with 5 HP and 4 energy.`,
      context: 'isDead',
      source: 'general',
    },
    {
      title: 'Dying — Trip',
      body: `**Adjacent**

#### Roll a D20

* _1–4_ You hold on, but they keep moving. If the enemy moves, they drag you with them.
* _5–13_ You trip the enemy. They are unable to physically move on their turn.
* _14–19_ You trip the enemy. They can't move and take 3 damage in the fall.
* _20_ You leap on an enemy's back. They flail about, likely hitting themselves or a fellow enemy.`,
      context: 'isDead',
      source: 'fighter',
    },
    {
      title: 'Dying — Shoot',
      body: `**Defensive**

Every time an enemy passes your line of sight (any square DIRECTLY in front of you), shoot an arrow at them.

#### Roll a D4

Do the rolled amount of damage.`,
      context: 'isDead',
      source: 'marksman',
    },
    {
      title: 'Dying — Possession',
      body: `**Range 5** — NOTE: Previously possessed enemies CANNOT be possessed again.

#### Roll a D20

* _1–5_ Failed possession. The enemy does half damage this turn.
* _6–13_ Possess the enemy for a turn.
* _14–19_ Possess the enemy until it takes damage.
* _20_ Possess an enemy until it dies.`,
      context: 'isDead',
      source: 'sage',
    },
    {
      title: 'Dying — Elemental Storm',
      body: `#### Roll a D6 twice

Drop a burst of flame X squares left/right and Y squares up/down from your location. You choose which roll is X and which is Y.

If the flame lands ON an enemy, they take 4 damage. NEXT TO an enemy: 1 damage. The flame remains for the encounter and damages friend and foe alike.`,
      context: 'isDead',
      source: 'wizard',
    },
    {
      title: 'Dying — Last Stand',
      body: `Even as you fall, your training drives one final strike.

#### Roll a D8

Do the rolled amount of damage to an adjacent enemy.`,
      context: 'isDead',
      source: 'monk',
    },

    // ── Warlock ───────────────────────────────────────────────────────────────
    {
      title: 'Analyze Undead',
      body: `Learn the weaknesses of any undead (skeleton, zombie, vampire, etc.) enemy. Can only be performed ONCE per enemy type.

#### Roll a D4

* _1_ Learn how much HP the enemy has.
* _2_ Learn the nature of their attacks.
* _3_ Learn the enemy's weaknesses, if any.
* _4_ You do an additional 1 damage to that enemy type for the remainder of the battle.`,
      context: 'inCombat',
      source: 'warlock',
      energyCost: 2,
    },
    {
      title: 'Detect Evil',
      body: `You have a vast knowledge of the dark magics. You can identify evil spells, sense when dark magic is occurring, and identify artifacts of darkness.

#### Roll a D4

* _1_ Pinpoint the source of the evil magic.
* _2_ Understand the effects of the evil.
* _3_ Identify the name of the person/entity behind the evil magic.
* _4_ Choose one of the above three options.`,
      context: 'outOfCombat',
      source: 'warlock',
    },
    {
      title: 'Create Zombie',
      body: `Create a zombie from a freshly killed corpse of a humanoid enemy or NPC. Only one zombie can be active at a time.

#### Roll a D20

* _1–2_ Failure. You anger the ghostly spirit of the dead. It returns, seeking vengeance.
* _3–19_ They return as a zombie under your control.
* _20_ The target returns to life, unzombified. Grateful for the miracle resurrection, they join your cause.

**Summoned Zombie Stats:** 10 HP, 4 Movement per turn.
**Standard Attack (Adjacent Bite):** Roll a D6 — _1–2_ Do rolled amount of damage, you lose control of the zombie next turn (it attacks the closest target, friend or foe). _3–6_ Do rolled amount of damage.`,
      context: 'inCombat',
      source: 'warlock',
      energyCost: 4,
    },
    {
      title: 'Commune With the Dead',
      body: `Summon a spirit to gain information. Must be cast near a dead body or a grave. Once per body, or close by group of bodies.

#### Roll a D20 (RP gathering materials and details about the ritual for a bonus to the roll)

* _1_ Poltergeist. You and your party are now haunted by an angry spirit. The only way to get rid of it is to bring it peace…
* _2–5_ You hear a faint whisper of a hint, or clue, as if on the wind.
* _6–12_ An angry, restless, barely useful spirit is reluctantly summoned.
* _13–19_ A helpful spirit will be summoned. It will do all it can to aid you on your quest.
* _20_ Your spirit friend will aid you in an upcoming battle. It is a non-elite NPC that takes verbal instructions on its turn from you.`,
      context: 'outOfCombat',
      source: 'warlock',
    },
  ],
}
