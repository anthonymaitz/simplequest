# SimpleQuest Corrections — Design Spec
_Date: 2026-04-19_

## Overview

The initial SolidJS rewrite is functionally correct but visually wrong — it used a dark navy theme instead of the original personality-color backgrounds. This spec covers seven corrections needed to bring the app to parity with the original design and content requirements.

---

## Correction 1 — Theme Overhaul

### Problem
The current theme uses a dark navy background (`#1a1a2e`) with red accents. The original used the selected personality's color as the full body background with white cards on top.

### Design

**Personality colors (exact from original SCSS):**
| Personality  | Color     | Value     |
|--------------|-----------|-----------|
| passionate   | Rust/Burnt Orange | `#943a11` |
| calculating  | Teal Blue | `#26869d` |
| wild         | Olive Green | `#758d2c` |
| selfish      | Dark Charcoal | `#3f3e4a` |
| righteous    | Pale Lavender | `#daceae` |

**Layout structure:**
- `:host` background = personality color (drives the ambient color)
- Header row (HP, energy, die roller) = `rgba(0,0,0,0.15)` overlay
- Character selector row (name, personality, class) = `rgba(0,0,0,0.10)` overlay
- Cards = white (`#ffffff`), `border-radius: 6px`, `box-shadow: 0px -2px 4px rgba(0,0,0,0.2)`
- Card text = dark charcoal (`#3f3e4a`)
- Card headings/accents = personality color

**`righteous` exception:** The personality color `#daceae` is light, so overlays use `rgba(0,0,0,0.08)` and card headings use `#5a5060` (dark purple) instead of `#daceae` on white (unreadable).

**CSS approach:** `:host([data-personality="X"])` selectors already exist in `tailwind.css` — replace dark theme vars with correct personality-color vars. Remove all navy/dark theme rules.

**Font:** Body font for card content = `'Varela Round', 'Nunito', sans-serif`. The component already loads Nunito; add Varela Round as first preference via `@import` in tailwind.css.

---

## Correction 2 — Energy Costs on Ability Cards

### Problem
The ability cards don't show how much energy each ability costs.

### Design

Add `energyCost?: number` to the `AbilityCard` interface in `types.ts`.

When present, display a small badge in the top-right of the card header, styled as:
- Background = personality color
- Text = white
- Text = `{N} energy`
- Font size = 10px, padding = `2px 8px`, border-radius = 3px

Example: `[3 energy]` badge aligned right, next to the ability title.

**Sample content:** Update `sample-content.ts` abilities to include realistic `energyCost` values matching the original content files (e.g., Fireball = 3, Wand = 3, Morph = 4).

---

## Correction 3 — Roll Results in Ability Bodies

### Problem
The `sample-content.ts` ability bodies are simplified and don't include roll outcome tables. The original ability cards showed outcome ranges (e.g., `1-5: miss`, `6+: hit`).

### Design

This is a **content** correction, not a rendering correction — the markdown renderer already handles roll outcome lists correctly.

Update `sample-content.ts` to include full ability descriptions with roll outcomes, pulled from the original content files in `/content/classes/`. Example format (from wizard.md):

```markdown
Attack an enemy with a ranged magic blast.

#### Roll a D6
* _1–5_ Do rolled amount of damage to a single enemy.
* _6_ Do 5 damage OR freeze enemy in place for 1 turn.
```

The `_text_` italic pattern renders fine with `marked`. No code changes needed — only `sample-content.ts` content updates.

---

## Correction 4 — Dice Notation Styling

### Problem
The rewrite applies no special styling to dice notation in ability cards. The original had two treatments.

### Design

**Two rendering contexts, two treatments:**

**A — Heading-level dice (e.g. `#### Roll a D6`)**
These appear as `<h4>` elements containing die text. Post-process: when an `<h4>` contains only a die notation match (`D\d+`), replace with a styled die display:
- Background image: `radial-gradient(circle, rgba(255,255,255,.75), rgba(255,255,255,0)), url({d20DataUrl})`
- `background-size: 66% 66%, contain`
- `background-repeat: no-repeat`
- `background-position: 50% 50%, 50% 50%`
- `color: #3f3e4a`, `padding: 0.8em 0.6em`, `font-weight: 700`, `font-size: 13px`, `min-width: 50px`, `text-align: center`, `display: inline-block`

**B — Inline dice (e.g. "Deal **D8** fire damage")**
Any `D\d+` match within body text (not an `<h4>`): wrap in `<span class="die-inline">`:
- `color: #26869d` (teal)
- `border-bottom: 1px solid #26869d`
- `font-weight: 700`
- `cursor: pointer`

**d20.png bundling:**
The image at `styles/images/d20.png` must be bundled as a base64 data URL constant exported from `src/assets/d20.ts`:

```ts
export const d20DataUrl = 'data:image/png;base64,<FULL_BASE64_OF_styles/images/d20.png>'
```

Generate this constant by running: `node -e "const fs=require('fs');console.log('export const d20DataUrl = \'data:image/png;base64,'+fs.readFileSync('styles/images/d20.png').toString('base64')+'\'')" > src/assets/d20.ts` from the project root. Since the Shadow DOM can't resolve relative CSS URLs, inline base64 is the only reliable approach.

**AbilityCard.tsx changes:**
- Import `d20DataUrl` from `../assets/d20`
- After `marked()` renders HTML, post-process the DOM string:
  1. Find `<h4>` elements matching die-only pattern → apply d20 background styling inline
  2. Find `D\d+` text nodes outside `<h4>` → wrap in `<span class="die-inline">`
- Style `.die-inline` in tailwind.css (or as inline styles if easier in shadow DOM)

---

## Correction 5 — Description Cards

### Problem
The personality, class, and profession descriptions from the original content files are not visible anywhere in the app. These provide important context for players choosing their character.

### Design

Add `descriptions: Record<string, string>` to `SimpleQuestContent` — a map from personality/class/profession name (lowercase) to its markdown description text.

**New component: `DescriptionCard.tsx`**
- Props: `title: string`, `body: string` (markdown), `accentColor: string`
- Renders as a collapsed card by default (shows title with `▼` toggle)
- On click: expands to show rendered markdown body
- Styled same as ability cards (white, box-shadow, accent color for title)

**Placement:** Render at the top of the ability list in `AbilityCards.tsx` — up to three DescriptionCards: one for the current personality, one for the current class, one for the current profession. Only render if a description exists in the map for that key. All collapsed by default.

**Content:** The host app provides descriptions in the `content` JSON. `sample-content.ts` will include sample descriptions for each personality and class from `/content/attributes.md` and `/content/classes/*.md`.

---

## Correction 6 — Help (?) Button

### Problem
There is no way to access the general rules content (`general.md`) from within the app.

### Design

Add `generalContent: string` (markdown) to `SimpleQuestContent`.

**UI change in `GMMode.tsx`:**
Add a `?` button to the right side of the bottom bar, styled consistently with the GM toggle button (personality-accent color).

**New component: `HelpPanel.tsx`**
- Rendered at the root of `SimpleQuest.tsx`, conditionally shown
- Overlays the entire component (fixed within the shadow host)
- Shows `generalContent` rendered as markdown
- Close button (×) in top-right
- Styled: white background, scrollable, padding, close button in personality accent color

**State:** Local `createSignal<boolean>(false)` in `SimpleQuest.tsx` — ephemeral UI state, not character data. Pass `onHelpOpen` callback prop down to `GMMode`. `GMMode` calls it when ? is clicked. `SimpleQuest` renders `<HelpPanel>` when the signal is true.

---

## Correction 7 — Death Card

### Problem
When HP reaches 0, nothing special happens. The original showed a "Am I Dead?" card with dying rules and class-specific dying abilities.

### Design

Add `deathContent: string` (markdown) to `SimpleQuestContent`.

**New component: `DeathCard.tsx`**
- Props: `body: string` (markdown), `accentColor: string`
- Styled as a white card, same as ability cards
- Top border: `3px solid {accentColor}` (or personality color)
- Renders the full `deathContent` markdown (death rules + resuscitate + all dying abilities)

**Placement in `AbilityCards.tsx`:**
When `hp === 0`, render `<DeathCard>` at the top of the list above all other cards (including description cards). Do not hide other cards — the player still needs to see their dying ability referenced there.

**Trigger:** Read `state.hp` directly from the store inside `AbilityCards.tsx` (already has store access for filtering abilities by source).

---

## Updated Type Definitions

```ts
export interface AbilityCard {
  title: string
  body: string
  context: CombatState
  source: string
  energyCost?: number   // NEW
}

export interface SimpleQuestContent {
  personalities: string[]
  classes: string[]
  professions: string[]
  statuses: CombatStatus[]
  abilities: AbilityCard[]
  descriptions: Record<string, string>   // NEW — keyed by lowercase name
  generalContent: string                 // NEW — general.md text
  deathContent: string                   // NEW — death.md text
}
```

---

## File Map

| File | Change |
|------|--------|
| `src/types.ts` | Add `energyCost`, `descriptions`, `generalContent`, `deathContent` |
| `src/styles/tailwind.css` | Full theme overhaul — personality backgrounds, white cards, remove dark theme |
| `src/assets/d20.ts` | NEW — base64 d20 data URL constant |
| `src/components/AbilityCard.tsx` | Dice post-processing (heading d20 bg + inline teal), energy cost badge |
| `src/components/AbilityCards.tsx` | Add DescriptionCard at top, DeathCard when hp=0 |
| `src/components/DescriptionCard.tsx` | NEW — collapsible description card |
| `src/components/HelpPanel.tsx` | NEW — ? overlay panel |
| `src/components/DeathCard.tsx` | NEW — death rules card shown at hp=0 |
| `src/components/GMMode.tsx` | Add ? button wired to helpOpen signal |
| `src/SimpleQuest.tsx` | Add helpOpen signal, render HelpPanel, pass new content fields down |
| `src/sample-content.ts` | Add descriptions, generalContent, deathContent, energyCost values, full roll outcome bodies |

---

## Out of Scope

- Any visual changes to the dice roller or HP selector beyond theme colors
- Changes to the localStorage persistence format
- Any new ability or content not already present in the original files
- Responsive/mobile layout changes
