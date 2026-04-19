# SimpleQuest Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 7 visual/content regressions: restore original personality-color theme, add energy costs, proper dice styling (d20 bg on headings, teal inline), description cards, help panel, and death card.

**Architecture:** All changes are within the existing SolidJS shadow-DOM component. Theme is driven by CSS custom properties (`--sq-bg`, `--sq-accent`, `--sq-overlay-*`) defined per personality in `tailwind.css`, referenced via `var()` in inline styles. Three new leaf components (`DescriptionCard`, `DeathCard`, `HelpPanel`) are composed into existing containers. A base64 d20 data URL is generated once as a TypeScript constant.

**Tech Stack:** SolidJS 1.9, Tailwind CSS v4 (injected as shadow DOM `<style>`), TypeScript 5, Vite 6, `marked` for markdown rendering.

---

## File Map

| File | Action |
|------|--------|
| `src/assets/d20.ts` | **CREATE** — base64 d20 data URL exported as `d20DataUrl` |
| `src/types.ts` | **MODIFY** — add `energyCost`, `descriptions`, `generalContent`, `deathContent` |
| `src/styles/tailwind.css` | **MODIFY** — full theme overhaul with personality CSS vars |
| `src/SimpleQuest.tsx` | **MODIFY** — remove hardcoded bg (Task 4), add helpOpen + HelpPanel + new content props (Task 13) |
| `src/components/Header.tsx` | **MODIFY** — rgba overlay, white-on-color controls |
| `src/components/HPSelector.tsx` | **MODIFY** — rgba controls |
| `src/components/EnergyPool.tsx` | **MODIFY** — rgba empty-dot colors |
| `src/components/DiceRoller.tsx` | **MODIFY** — rgba controls |
| `src/components/CharacterSelector.tsx` | **MODIFY** — rgba overlay + controls |
| `src/components/CombatStateSelector.tsx` | **MODIFY** — rgba overlay + controls |
| `src/components/AbilityCard.tsx` | **MODIFY** — white card, energy badge, d20 heading dice, teal inline dice |
| `src/components/GMMode.tsx` | **MODIFY** — rgba overlay, ? button |
| `src/components/Toast.tsx` | **MODIFY** — dark overlay bg (works on any bg) |
| `src/components/DescriptionCard.tsx` | **CREATE** — collapsible personality/class/profession description card |
| `src/components/DeathCard.tsx` | **CREATE** — death rules card shown when HP = 0 |
| `src/components/HelpPanel.tsx` | **CREATE** — overlay panel with general rules |
| `src/components/AbilityCards.tsx` | **MODIFY** — wire DescriptionCards, DeathCard, new props |
| `src/sample-content.ts` | **MODIFY** — descriptions, generalContent, deathContent, energyCosts, full roll outcomes |

---

## Task 1: Generate d20 Base64 Asset

**Files:**
- Create: `src/assets/d20.ts`

The d20.png at `styles/images/d20.png` must be inlined as a base64 data URL. CSS `url()` in a Shadow DOM `<style>` string cannot resolve relative paths, so the image must be embedded.

- [ ] **Step 1: Generate the base64 constant file**

From the project root (`/Users/anthonymaitz/Repositories/simplequest`), run:

```bash
node -e "
const fs = require('fs');
const b64 = fs.readFileSync('styles/images/d20.png').toString('base64');
const content = 'export const d20DataUrl = \`data:image/png;base64,\${b64}\`\n';
fs.writeFileSync('src/assets/d20.ts', content);
console.log('wrote src/assets/d20.ts, size:', content.length, 'bytes');
"
```

Expected: prints `wrote src/assets/d20.ts, size: XXXXX bytes` (typically 40–80KB for the base64 string).

- [ ] **Step 2: Verify the file**

```bash
head -c 60 src/assets/d20.ts
```

Expected output starts with: `export const d20DataUrl = \`data:image/png;base64,iVBOR`

- [ ] **Step 3: Commit**

```bash
git add src/assets/d20.ts
git commit -m "feat: bundle d20.png as base64 asset for shadow DOM"
```

---

## Task 2: Update types.ts

**Files:**
- Modify: `src/types.ts`

- [ ] **Step 1: Open `src/types.ts` and replace the entire file with:**

```ts
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
}

export interface CharacterState extends CharacterData {
  gmMode: boolean
  savedCharacters: Record<string, CharacterData>
}
```

- [ ] **Step 2: Verify TypeScript still compiles**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors (or only pre-existing ones unrelated to this change).

- [ ] **Step 3: Commit**

```bash
git add src/types.ts
git commit -m "feat: add energyCost, descriptions, generalContent, deathContent to types"
```

---

## Task 3: CSS Theme Overhaul (tailwind.css)

**Files:**
- Modify: `src/styles/tailwind.css`

Replace the entire file. This establishes the CSS custom property system that all components will reference via `var()`.

**Key variables:**
- `--sq-bg` — the personality's background color (set on `:host`)
- `--sq-accent` — color used for card headings, badges, roll button (same as bg for dark personalities; `#5a5060` for righteous since `#daceae` is unreadable on white cards)
- `--sq-overlay-text` / `--sq-overlay-text-muted` — text color in header/selector/GM rows
- `--sq-ctrl-bg` / `--sq-ctrl-border` / `--sq-ctrl-text` — semi-transparent control styles
- `--sq-row-1` / `--sq-row-2` / `--sq-row-3` — overlay row backgrounds
- `--sq-row-border` — divider between rows
- `--sq-dot-empty-bg` / `--sq-dot-empty-border` — empty energy dot style

- [ ] **Step 1: Replace `src/styles/tailwind.css` with:**

```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Varela+Round&family=Nunito:wght@400;600;700&display=swap');

/* === Shadow DOM host defaults (no personality selected) === */
:host {
  display: block;
  font-family: var(--sq-font-family, 'Varela Round', 'Nunito', sans-serif);

  /* Personality background */
  --sq-bg: #888888;
  /* Accent: card headings, badges, roll button, die-inline color */
  --sq-accent: #888888;

  /* Text in overlay rows (header, selectors, GM bar) */
  --sq-overlay-text: rgba(255, 255, 255, 0.95);
  --sq-overlay-text-muted: rgba(255, 255, 255, 0.55);

  /* Control elements (select, input) inside overlay rows */
  --sq-ctrl-bg: rgba(255, 255, 255, 0.15);
  --sq-ctrl-border: rgba(255, 255, 255, 0.3);
  --sq-ctrl-text: rgba(255, 255, 255, 0.95);

  /* Row overlay backgrounds */
  --sq-row-1: rgba(0, 0, 0, 0.15);
  --sq-row-2: rgba(0, 0, 0, 0.10);
  --sq-row-3: rgba(0, 0, 0, 0.20);
  --sq-row-border: rgba(0, 0, 0, 0.12);

  /* Empty energy dot */
  --sq-dot-empty-bg: rgba(255, 255, 255, 0.2);
  --sq-dot-empty-border: rgba(255, 255, 255, 0.4);

  background-color: var(--sq-bg);
  color: #3f3e4a;
}

/* === Personality themes === */
:host([data-personality="passionate"]) {
  --sq-bg: #943a11;
  --sq-accent: #943a11;
}

:host([data-personality="calculating"]) {
  --sq-bg: #26869d;
  --sq-accent: #26869d;
}

:host([data-personality="wild"]) {
  --sq-bg: #758d2c;
  --sq-accent: #758d2c;
}

:host([data-personality="selfish"]) {
  --sq-bg: #3f3e4a;
  --sq-accent: #3f3e4a;
}

/* Righteous has a LIGHT background — all vars must work on #daceae */
:host([data-personality="righteous"]) {
  --sq-bg: #daceae;
  --sq-accent: #5a5060;
  --sq-overlay-text: #5a5060;
  --sq-overlay-text-muted: rgba(90, 80, 96, 0.5);
  --sq-ctrl-bg: rgba(0, 0, 0, 0.06);
  --sq-ctrl-border: rgba(90, 80, 96, 0.25);
  --sq-ctrl-text: #5a5060;
  --sq-row-1: rgba(0, 0, 0, 0.06);
  --sq-row-2: rgba(0, 0, 0, 0.04);
  --sq-row-3: rgba(0, 0, 0, 0.08);
  --sq-row-border: rgba(90, 80, 96, 0.15);
  --sq-dot-empty-bg: rgba(90, 80, 96, 0.12);
  --sq-dot-empty-border: rgba(90, 80, 96, 0.25);
}

/* === Inline dice notation (body text) === */
.die-inline {
  color: #26869d;
  border-bottom: 1px solid #26869d;
  font-weight: 700;
  cursor: pointer;
}
```

- [ ] **Step 2: Verify dev server loads without CSS errors**

```bash
npm run dev 2>&1 | head -20
```

Expected: server starts on `http://localhost:5173` with no CSS parse errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/tailwind.css
git commit -m "feat: replace dark theme with personality-color CSS variable system"
```

---

## Task 4: SimpleQuest.tsx — Remove Hardcoded Background

**Files:**
- Modify: `src/SimpleQuest.tsx:66`

The wrapping `<div>` has `background: '#1a1a2e'` hardcoded. The host's `background-color: var(--sq-bg)` in tailwind.css already handles the background. Remove the override.

- [ ] **Step 1: In `src/SimpleQuest.tsx`, find and change line 66:**

Old:
```tsx
      <div style={{ 'min-height': '100%', background: '#1a1a2e', position: 'relative' }}>
```

New:
```tsx
      <div style={{ 'min-height': '100%', position: 'relative' }}>
```

- [ ] **Step 2: Open http://localhost:5173 in a browser, select "passionate" personality**

Expected: app background turns rust/orange (`#943a11`). If still dark, check that `createEffect` sets `data-personality` on the host element.

- [ ] **Step 3: Commit**

```bash
git add src/SimpleQuest.tsx
git commit -m "fix: remove hardcoded dark background from root div"
```

---

## Task 5: Theme — Header Row Components

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/HPSelector.tsx`
- Modify: `src/components/EnergyPool.tsx`
- Modify: `src/components/DiceRoller.tsx`

Replace all hardcoded dark colors with CSS variable references.

- [ ] **Step 1: Replace `src/components/Header.tsx` with:**

```tsx
import { HPSelector } from './HPSelector'
import { EnergyPool } from './EnergyPool'
import { DiceRoller } from './DiceRoller'

interface HeaderProps {
  hp: number
  energy: boolean[]
  die: string
  onHpChange: (hp: number) => void
  onEnergyClick: (index: number) => void
  onDieChange: (die: string) => void
  onRoll: (sides: number) => void
}

export function Header(props: HeaderProps) {
  return (
    <div
      style={{
        background: 'var(--sq-row-1)',
        'border-bottom': '1px solid var(--sq-row-border)',
        padding: '10px 14px',
        display: 'flex',
        'align-items': 'center',
        gap: '12px',
        'flex-wrap': 'wrap',
        position: 'sticky',
        top: '0',
        'z-index': '100',
      }}
    >
      <HPSelector hp={props.hp} onHpChange={props.onHpChange} />
      <EnergyPool energy={props.energy} onEnergyClick={props.onEnergyClick} />
      <div style={{ 'margin-left': 'auto' }}>
        <DiceRoller die={props.die} onDieChange={props.onDieChange} onRoll={props.onRoll} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Replace `src/components/HPSelector.tsx` with:**

```tsx
interface HPSelectorProps {
  hp: number
  onHpChange: (hp: number) => void
}

export function HPSelector(props: HPSelectorProps) {
  const options = Array.from({ length: 31 }, (_, i) => i)

  return (
    <div style={{ display: 'flex', 'align-items': 'center', gap: '6px' }}>
      <label
        style={{
          color: 'var(--sq-overlay-text-muted)',
          'font-size': '12px',
          'text-transform': 'uppercase',
          'letter-spacing': '1px',
        }}
      >
        HP
      </label>
      <select
        value={props.hp}
        onChange={(e) => props.onHpChange(parseInt(e.currentTarget.value, 10))}
        style={{
          background: 'var(--sq-ctrl-bg)',
          border: '1px solid var(--sq-ctrl-border)',
          color: 'var(--sq-ctrl-text)',
          'border-radius': '4px',
          padding: '4px 8px',
          'font-size': '13px',
          'font-family': 'inherit',
          cursor: 'pointer',
        }}
      >
        {options.map((n) => (
          <option value={n}>{n}</option>
        ))}
      </select>
    </div>
  )
}
```

- [ ] **Step 3: Replace `src/components/EnergyPool.tsx` with:**

```tsx
import { For } from 'solid-js'

interface EnergyPoolProps {
  energy: boolean[]
  onEnergyClick: (index: number) => void
}

export function EnergyPool(props: EnergyPoolProps) {
  return (
    <div style={{ display: 'flex', gap: '5px', 'align-items': 'center' }}>
      <For each={props.energy}>
        {(filled, i) => (
          <div
            onClick={() => props.onEnergyClick(i())}
            style={{
              width: '14px',
              height: '14px',
              'border-radius': '50%',
              background: filled ? 'var(--sq-overlay-text)' : 'var(--sq-dot-empty-bg)',
              border: `2px solid ${filled ? 'var(--sq-overlay-text)' : 'var(--sq-dot-empty-border)'}`,
              cursor: 'pointer',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          />
        )}
      </For>
    </div>
  )
}
```

- [ ] **Step 4: Replace `src/components/DiceRoller.tsx` with:**

```tsx
const DICE = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']

interface DiceRollerProps {
  die: string
  onDieChange: (die: string) => void
  onRoll: (sides: number) => void
}

export function DiceRoller(props: DiceRollerProps) {
  function handleRoll() {
    const sides = parseInt(props.die.slice(1))
    props.onRoll(sides)
  }

  return (
    <div style={{ display: 'flex', gap: '6px', 'align-items': 'center' }}>
      <select
        value={props.die}
        onChange={(e) => props.onDieChange(e.currentTarget.value)}
        style={{
          background: 'var(--sq-ctrl-bg)',
          border: '1px solid var(--sq-ctrl-border)',
          color: 'var(--sq-ctrl-text)',
          'border-radius': '4px',
          padding: '4px 6px',
          'font-size': '12px',
          'font-family': 'inherit',
          cursor: 'pointer',
        }}
      >
        {DICE.map((d) => (
          <option value={d}>{d}</option>
        ))}
      </select>
      <button
        onClick={handleRoll}
        style={{
          background: 'var(--sq-accent)',
          color: '#ffffff',
          border: 'none',
          'border-radius': '4px',
          padding: '4px 12px',
          'font-size': '12px',
          'font-weight': '700',
          'font-family': 'inherit',
          cursor: 'pointer',
          'text-transform': 'uppercase',
          'letter-spacing': '1px',
        }}
      >
        Roll
      </button>
    </div>
  )
}
```

- [ ] **Step 5: Verify in browser with passionate personality**

Open http://localhost:5173, set personality to "passionate". Expected: header row shows semi-transparent dark overlay over rust background, HP/Die controls have semi-transparent white borders, energy dots visible.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx src/components/HPSelector.tsx src/components/EnergyPool.tsx src/components/DiceRoller.tsx
git commit -m "fix: update header row components to personality-color theme"
```

---

## Task 6: Theme — Selector Row Components

**Files:**
- Modify: `src/components/CharacterSelector.tsx`
- Modify: `src/components/CombatStateSelector.tsx`

- [ ] **Step 1: Replace `src/components/CharacterSelector.tsx` with:**

```tsx
import { For } from 'solid-js'

interface CharacterSelectorProps {
  name: string
  personality: string
  charClass: string
  profession: string
  personalities: string[]
  classes: string[]
  professions: string[]
  onNameChange: (name: string) => void
  onPersonalityChange: (p: string) => void
  onClassChange: (c: string) => void
  onProfessionChange: (p: string) => void
}

const selectStyle = {
  background: 'var(--sq-ctrl-bg)',
  border: '1px solid var(--sq-ctrl-border)',
  color: 'var(--sq-ctrl-text)',
  'border-radius': '4px',
  padding: '5px 8px',
  'font-size': '13px',
  'font-family': 'inherit',
  cursor: 'pointer',
  flex: '1',
  'min-width': '0',
  'text-transform': 'capitalize',
}

const inputStyle = {
  background: 'var(--sq-ctrl-bg)',
  border: '1px solid var(--sq-ctrl-border)',
  color: 'var(--sq-ctrl-text)',
  'border-radius': '4px',
  padding: '5px 8px',
  'font-size': '13px',
  'font-family': 'inherit',
  flex: '1',
  'min-width': '0',
  outline: 'none',
}

export function CharacterSelector(props: CharacterSelectorProps) {
  return (
    <div
      style={{
        background: 'var(--sq-row-2)',
        'border-bottom': '1px solid var(--sq-row-border)',
        padding: '10px 14px',
        display: 'flex',
        gap: '8px',
        'flex-wrap': 'wrap',
      }}
    >
      <input
        type="text"
        placeholder="Character name"
        value={props.name}
        onInput={(e) => props.onNameChange(e.currentTarget.value)}
        style={inputStyle}
      />
      <select
        value={props.personality}
        onChange={(e) => props.onPersonalityChange(e.currentTarget.value)}
        style={selectStyle}
      >
        <option value="">Personality</option>
        <For each={props.personalities}>
          {(p) => <option value={p}>{p}</option>}
        </For>
      </select>
      <select
        value={props.charClass}
        onChange={(e) => props.onClassChange(e.currentTarget.value)}
        style={selectStyle}
      >
        <option value="">Class</option>
        <For each={props.classes}>
          {(c) => <option value={c}>{c}</option>}
        </For>
      </select>
      <select
        value={props.profession}
        onChange={(e) => props.onProfessionChange(e.currentTarget.value)}
        style={selectStyle}
      >
        <option value="">Profession</option>
        <For each={props.professions}>
          {(p) => <option value={p}>{p}</option>}
        </For>
      </select>
    </div>
  )
}
```

- [ ] **Step 2: Replace `src/components/CombatStateSelector.tsx` with:**

```tsx
import { For, createMemo } from 'solid-js'
import type { CombatState, CombatStatus } from '../types'

interface CombatStateSelectorProps {
  combat: CombatState
  statuses: CombatStatus[]
  onChange: (combat: CombatState) => void
}

export function CombatStateSelector(props: CombatStateSelectorProps) {
  const currentStatus = createMemo(
    () => props.statuses.find((s) => s.id === props.combat)
  )

  return (
    <div
      style={{
        background: 'var(--sq-row-2)',
        'border-bottom': '1px solid var(--sq-row-border)',
        padding: '8px 14px',
        display: 'flex',
        gap: '10px',
        'align-items': 'center',
      }}
    >
      <select
        value={props.combat}
        onChange={(e) => props.onChange(e.currentTarget.value as CombatState)}
        style={{
          background: 'var(--sq-ctrl-bg)',
          border: '1px solid var(--sq-ctrl-border)',
          color: 'var(--sq-ctrl-text)',
          'border-radius': '4px',
          padding: '4px 8px',
          'font-size': '13px',
          'font-family': 'inherit',
          cursor: 'pointer',
        }}
      >
        <For each={props.statuses}>
          {(s) => <option value={s.id}>{s.label}</option>}
        </For>
      </select>
      <span
        style={{
          color: 'var(--sq-overlay-text)',
          'font-size': '12px',
          flex: '1',
          opacity: '0.8',
        }}
      >
        {currentStatus()?.message ?? ''}
      </span>
    </div>
  )
}
```

- [ ] **Step 3: Verify selector rows in browser**

With "passionate" personality, the character selector row should show semi-transparent overlay, name input and dropdowns with white-ish semi-transparent styling.

- [ ] **Step 4: Commit**

```bash
git add src/components/CharacterSelector.tsx src/components/CombatStateSelector.tsx
git commit -m "fix: update selector row components to personality-color theme"
```

---

## Task 7: AbilityCard.tsx — White Cards, Energy Badge, Dice Styling

**Files:**
- Modify: `src/components/AbilityCard.tsx`

This is the most complex single-component change. Three sub-concerns:
1. White card background, dark text, personality-color heading
2. Energy cost badge (right side of heading row)
3. Dice rendering: `<h4>` containing D[X] gets d20 background inline style; D[X] in body text gets `.die-inline` class

**How the dice regex works:**
- First pass: find all `<h4>...</h4>` blocks, replace any D[X] inside with a styled `<span>` carrying the d20 background image as an inline style
- Second pass: replace remaining D[X] (outside h4) with `<span class="die-inline" data-sides="X">DX</span>`
- Click handler listens for `die-inline` OR `die-heading` class (both carry `data-sides`)

- [ ] **Step 1: Replace `src/components/AbilityCard.tsx` with:**

```tsx
import { createSignal } from 'solid-js'
import { marked } from 'marked'
import { d20DataUrl } from '../assets/d20'
import type { AbilityCard as AbilityCardType } from '../types'

interface AbilityCardProps {
  card: AbilityCardType
  onRoll: (sides: number) => void
}

const dieHeadingStyle = [
  'display:inline-block',
  `background-image:radial-gradient(circle, rgba(255,255,255,.75), rgba(255,255,255,0)), url(${d20DataUrl})`,
  'background-size:66% 66%,contain',
  'background-repeat:no-repeat',
  'background-position:50% 50%,50% 50%',
  'color:#3f3e4a',
  'padding:0.8em 0.6em',
  'line-height:2em',
  'font-weight:700',
  'font-size:13px',
  'min-width:50px',
  'text-align:center',
  'cursor:pointer',
].join(';')

function renderCardBody(markdown: string): string {
  const html = marked.parse(markdown) as string
  // Pass 1: style D[X] inside <h4> tags with d20 background
  const pass1 = html.replace(/<h4>([\s\S]*?)<\/h4>/g, (_, content: string) => {
    const styled = content.replace(
      /\bD(\d+)\b/g,
      `<span class="die-heading" data-sides="$1" style="${dieHeadingStyle}">D$1</span>`
    )
    return `<h4>${styled}</h4>`
  })
  // Pass 2: style remaining D[X] (in body text) with teal underline
  return pass1.replace(/\bD(\d+)\b/g, '<span class="die-inline" data-sides="$1">D$1</span>')
}

export function AbilityCard(props: AbilityCardProps) {
  const [collapsed, setCollapsed] = createSignal(false)

  function handleContentClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (
      target.classList.contains('die-inline') ||
      target.classList.contains('die-heading')
    ) {
      const sides = parseInt(target.dataset.sides ?? '6', 10)
      props.onRoll(sides)
    }
  }

  return (
    <div
      style={{
        background: '#ffffff',
        'border-radius': '6px',
        'margin-bottom': '8px',
        'box-shadow': '0px -2px 4px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}
    >
      {/* Card header row: title + optional energy badge */}
      <div
        onClick={() => setCollapsed((c) => !c)}
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          padding: '10px 12px',
          cursor: 'pointer',
          'user-select': 'none',
        }}
      >
        <span
          style={{
            color: 'var(--sq-accent)',
            'font-size': '12px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
          }}
        >
          {props.card.title}
        </span>
        <div style={{ display: 'flex', gap: '8px', 'align-items': 'center' }}>
          {props.card.energyCost !== undefined && (
            <span
              style={{
                background: 'var(--sq-accent)',
                color: '#ffffff',
                'border-radius': '3px',
                padding: '2px 8px',
                'font-size': '10px',
                'font-weight': '700',
                'white-space': 'nowrap',
              }}
            >
              {props.card.energyCost} energy
            </span>
          )}
          <span
            style={{
              color: '#aaaaaa',
              'font-size': '12px',
            }}
          >
            {collapsed() ? '▼' : '▲'}
          </span>
        </div>
      </div>
      {/* Card body: rendered markdown */}
      {!collapsed() && (
        <div
          innerHTML={renderCardBody(props.card.body)}
          onClick={handleContentClick}
          style={{
            padding: '0 12px 10px',
            color: '#555555',
            'font-size': '13px',
            'line-height': '1.6',
            'font-family': "'Varela Round', 'Nunito', sans-serif",
          }}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Run dev server and check an ability card**

Open http://localhost:5173. Select "passionate" and "wizard". Expected:
- Ability cards are white with box-shadow, dark charcoal text
- Card title is rust-red (var(--sq-accent))
- `D8`, `D6` etc. in body text appear teal with underline
- No energy badge yet (will show after sample-content.ts is updated in Task 14)

- [ ] **Step 3: Commit**

```bash
git add src/components/AbilityCard.tsx
git commit -m "feat: white card theme, energy badge, d20 heading dice, teal inline dice"
```

---

## Task 8: GMMode.tsx + Toast.tsx Theme

**Files:**
- Modify: `src/components/GMMode.tsx`
- Modify: `src/components/Toast.tsx`

GMMode also gains the `?` button (always visible, not inside the GM-only section). Toast uses a dark overlay bg that works on any personality color.

- [ ] **Step 1: Replace `src/components/GMMode.tsx` with:**

```tsx
import { For } from 'solid-js'
import type { CharacterData } from '../types'

interface GMModeProps {
  enabled: boolean
  characterName: string
  savedCharacters: Record<string, CharacterData>
  onToggle: (enabled: boolean) => void
  onSave: () => void
  onLoad: (name: string) => void
  onHelpOpen: () => void
}

export function GMMode(props: GMModeProps) {
  const savedNames = () => Object.keys(props.savedCharacters)

  return (
    <div
      style={{
        background: 'var(--sq-row-3)',
        'border-top': '1px solid var(--sq-row-border)',
        padding: '8px 14px',
        display: 'flex',
        gap: '10px',
        'align-items': 'center',
        'flex-wrap': 'wrap',
      }}
    >
      <span
        style={{
          color: 'var(--sq-overlay-text-muted)',
          'font-size': '12px',
          'text-transform': 'uppercase',
          'letter-spacing': '1px',
        }}
      >
        GM
      </span>
      {/* Toggle switch */}
      <div
        onClick={() => props.onToggle(!props.enabled)}
        style={{
          width: '36px',
          height: '18px',
          background: props.enabled ? 'var(--sq-accent)' : 'var(--sq-ctrl-bg)',
          border: `1px solid ${props.enabled ? 'var(--sq-accent)' : 'var(--sq-ctrl-border)'}`,
          'border-radius': '9px',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          'flex-shrink': '0',
        }}
      >
        <div
          style={{
            width: '14px',
            height: '14px',
            background: '#ffffff',
            'border-radius': '50%',
            position: 'absolute',
            top: '1px',
            left: props.enabled ? '19px' : '1px',
            transition: 'left 0.2s',
          }}
        />
      </div>
      {props.enabled && (
        <>
          <button
            onClick={props.onSave}
            disabled={!props.characterName}
            style={{
              background: 'var(--sq-ctrl-bg)',
              border: '1px solid var(--sq-accent)',
              color: 'var(--sq-accent)',
              'border-radius': '4px',
              padding: '3px 10px',
              'font-size': '12px',
              'font-family': 'inherit',
              cursor: props.characterName ? 'pointer' : 'not-allowed',
              opacity: props.characterName ? '1' : '0.4',
            }}
          >
            Save
          </button>
          <select
            onChange={(e) => {
              if (e.currentTarget.value) props.onLoad(e.currentTarget.value)
              e.currentTarget.value = ''
            }}
            style={{
              background: 'var(--sq-ctrl-bg)',
              border: '1px solid var(--sq-ctrl-border)',
              color: 'var(--sq-ctrl-text)',
              'border-radius': '4px',
              padding: '3px 8px',
              'font-size': '12px',
              'font-family': 'inherit',
              cursor: 'pointer',
            }}
          >
            <option value="">Load character...</option>
            <For each={savedNames()}>
              {(name) => <option value={name}>{name}</option>}
            </For>
          </select>
        </>
      )}
      {/* Help button — always visible */}
      <button
        onClick={props.onHelpOpen}
        style={{
          'margin-left': 'auto',
          background: 'var(--sq-ctrl-bg)',
          border: '1px solid var(--sq-ctrl-border)',
          color: 'var(--sq-overlay-text)',
          'border-radius': '50%',
          width: '24px',
          height: '24px',
          'font-size': '13px',
          'font-weight': '700',
          'font-family': 'inherit',
          cursor: 'pointer',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'flex-shrink': '0',
        }}
      >
        ?
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Replace `src/components/Toast.tsx` with:**

```tsx
import { Show } from 'solid-js'

interface ToastProps {
  message: string
  visible: boolean
}

export function Toast(props: ToastProps) {
  return (
    <Show when={props.visible}>
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid var(--sq-accent)',
          color: '#ffffff',
          padding: '10px 20px',
          'border-radius': '6px',
          'font-size': '16px',
          'font-weight': '700',
          'z-index': '9999',
          'white-space': 'nowrap',
          'box-shadow': '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        {props.message}
      </div>
    </Show>
  )
}
```

- [ ] **Step 3: TypeScript will now error on GMMode usage in SimpleQuest.tsx**

`SimpleQuest.tsx` passes props to `<GMMode>` but `onHelpOpen` is not yet wired. The build will fail at this point — that's expected. Fix it by temporarily adding a no-op until Task 13:

In `src/SimpleQuest.tsx`, find the `<GMMode>` usage (around line 101) and add:
```tsx
          onHelpOpen={() => {}}
```

So the GMMode call becomes:
```tsx
        <GMMode
          enabled={state.gmMode}
          characterName={state.name}
          savedCharacters={state.savedCharacters}
          onToggle={(enabled) => setState('gmMode', enabled)}
          onSave={saveCharacter}
          onLoad={loadCharacter}
          onHelpOpen={() => {}}
        />
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 5: Verify ? button in browser**

Open http://localhost:5173. The GM bar at the bottom should show a circular `?` button on the right side. Clicking it does nothing (no-op) for now.

- [ ] **Step 6: Commit**

```bash
git add src/components/GMMode.tsx src/components/Toast.tsx src/SimpleQuest.tsx
git commit -m "feat: update GMMode/Toast theme, add ? button placeholder"
```

---

## Task 9: Create DescriptionCard.tsx

**Files:**
- Create: `src/components/DescriptionCard.tsx`

A collapsible card that shows personality/class/profession descriptions. Collapsed by default. Uses the same white-card style as AbilityCard but with a simpler header (no energy badge, no dice).

- [ ] **Step 1: Create `src/components/DescriptionCard.tsx`:**

```tsx
import { createSignal } from 'solid-js'
import { marked } from 'marked'

interface DescriptionCardProps {
  title: string
  body: string  // markdown
}

export function DescriptionCard(props: DescriptionCardProps) {
  const [expanded, setExpanded] = createSignal(false)

  return (
    <div
      style={{
        background: '#ffffff',
        'border-radius': '6px',
        'margin-bottom': '8px',
        'box-shadow': '0px -2px 4px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          padding: '10px 12px',
          cursor: 'pointer',
          'user-select': 'none',
        }}
      >
        <span
          style={{
            color: 'var(--sq-accent)',
            'font-size': '11px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
          }}
        >
          {props.title}
        </span>
        <span style={{ color: '#aaaaaa', 'font-size': '12px' }}>
          {expanded() ? '▲' : '▼'}
        </span>
      </div>
      {expanded() && (
        <div
          innerHTML={marked.parse(props.body) as string}
          style={{
            padding: '0 12px 10px',
            color: '#555555',
            'font-size': '13px',
            'line-height': '1.6',
            'font-family': "'Varela Round', 'Nunito', sans-serif",
          }}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles (no imports yet)**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/DescriptionCard.tsx
git commit -m "feat: add DescriptionCard collapsible component"
```

---

## Task 10: Create DeathCard.tsx

**Files:**
- Create: `src/components/DeathCard.tsx`

A special card shown when HP = 0. White card with a colored top border (personality accent). Renders the `deathContent` markdown from the content prop.

- [ ] **Step 1: Create `src/components/DeathCard.tsx`:**

```tsx
import { marked } from 'marked'

interface DeathCardProps {
  body: string  // markdown — full content of death.md
}

export function DeathCard(props: DeathCardProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        'border-radius': '6px',
        'margin-bottom': '8px',
        'box-shadow': '0px -2px 4px rgba(0,0,0,0.2)',
        'border-top': '3px solid var(--sq-accent)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 12px 4px',
        }}
      >
        <span
          style={{
            color: 'var(--sq-accent)',
            'font-size': '12px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
          }}
        >
          Am I Dead?
        </span>
      </div>
      <div
        innerHTML={marked.parse(props.body) as string}
        style={{
          padding: '0 12px 12px',
          color: '#555555',
          'font-size': '13px',
          'line-height': '1.6',
          'font-family': "'Varela Round', 'Nunito', sans-serif",
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/DeathCard.tsx
git commit -m "feat: add DeathCard component shown when HP = 0"
```

---

## Task 11: Create HelpPanel.tsx

**Files:**
- Create: `src/components/HelpPanel.tsx`

An overlay panel that covers the entire component, showing the general rules. Has a close button in the top-right. Scrollable.

- [ ] **Step 1: Create `src/components/HelpPanel.tsx`:**

```tsx
import { marked } from 'marked'

interface HelpPanelProps {
  body: string      // markdown — full content of general.md
  onClose: () => void
}

export function HelpPanel(props: HelpPanelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '0',
        background: '#ffffff',
        'z-index': '500',
        overflow: 'auto',
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          'margin-bottom': '12px',
        }}
      >
        <span
          style={{
            color: 'var(--sq-accent)',
            'font-size': '14px',
            'font-weight': '700',
            'text-transform': 'uppercase',
            'letter-spacing': '1px',
          }}
        >
          General Rules
        </span>
        <button
          onClick={props.onClose}
          style={{
            background: 'var(--sq-accent)',
            color: '#ffffff',
            border: 'none',
            'border-radius': '50%',
            width: '28px',
            height: '28px',
            'font-size': '16px',
            'font-weight': '700',
            'font-family': 'inherit',
            cursor: 'pointer',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'flex-shrink': '0',
          }}
        >
          ×
        </button>
      </div>
      <div
        innerHTML={marked.parse(props.body) as string}
        style={{
          color: '#3f3e4a',
          'font-size': '13px',
          'line-height': '1.7',
          'font-family': "'Varela Round', 'Nunito', sans-serif",
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -10
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/HelpPanel.tsx
git commit -m "feat: add HelpPanel overlay component"
```

---

## Task 12: Wire AbilityCards.tsx

**Files:**
- Modify: `src/components/AbilityCards.tsx`

Add `DescriptionCard` at the top (for personality, class, profession), `DeathCard` above everything when hp = 0. New props: `descriptions`, `deathContent`, `personality`, `hp`.

- [ ] **Step 1: Replace `src/components/AbilityCards.tsx` with:**

```tsx
import { For, createMemo, Show } from 'solid-js'
import { AbilityCard } from './AbilityCard'
import { DescriptionCard } from './DescriptionCard'
import { DeathCard } from './DeathCard'
import type { AbilityCard as AbilityCardType, CombatState } from '../types'

interface AbilityCardsProps {
  abilities: AbilityCardType[]
  descriptions: Record<string, string>
  deathContent: string
  charClass: string
  profession: string
  personality: string
  combat: CombatState
  hp: number
  onRoll: (sides: number) => void
}

export function AbilityCards(props: AbilityCardsProps) {
  const visible = createMemo(() =>
    props.abilities.filter((card) => {
      const sourceMatch =
        card.source === props.charClass ||
        card.source === props.profession ||
        card.source === 'general'
      const contextMatch =
        card.context === 'inGeneral' || card.context === props.combat
      return sourceMatch && contextMatch
    })
  )

  return (
    <div style={{ padding: '12px 14px' }}>
      {/* Death card: shown above all else when HP = 0 */}
      <Show when={props.hp === 0 && props.deathContent}>
        <DeathCard body={props.deathContent} />
      </Show>

      {/* Description cards: collapsed, at top of list */}
      <Show when={props.descriptions[props.personality]}>
        <DescriptionCard
          title={props.personality}
          body={props.descriptions[props.personality]}
        />
      </Show>
      <Show when={props.descriptions[props.charClass]}>
        <DescriptionCard
          title={props.charClass}
          body={props.descriptions[props.charClass]}
        />
      </Show>
      <Show when={props.descriptions[props.profession]}>
        <DescriptionCard
          title={props.profession}
          body={props.descriptions[props.profession]}
        />
      </Show>

      {/* Ability cards */}
      <For each={visible()}>
        {(card) => <AbilityCard card={card} onRoll={props.onRoll} />}
      </For>
    </div>
  )
}
```

- [ ] **Step 2: TypeScript will now error in SimpleQuest.tsx**

`AbilityCards` now requires `descriptions`, `deathContent`, `personality`, and `hp` props. `SimpleQuest.tsx` will fail to compile. Leave it broken — Task 13 fixes it.

Verify the error is only in SimpleQuest.tsx:

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: errors about missing props on `<AbilityCards>` in `SimpleQuest.tsx` — nothing else.

- [ ] **Step 3: Commit**

```bash
git add src/components/AbilityCards.tsx
git commit -m "feat: wire DescriptionCards and DeathCard into AbilityCards"
```

---

## Task 13: Wire SimpleQuest.tsx — HelpPanel + New Content Props

**Files:**
- Modify: `src/SimpleQuest.tsx`

Three changes:
1. Add `helpOpen` signal, wire ? button, render HelpPanel
2. Pass `descriptions`, `deathContent`, `personality`, `hp` to `<AbilityCards>`
3. Replace the temporary `onHelpOpen={() => {}}` no-op with the real handler

- [ ] **Step 1: Replace `src/SimpleQuest.tsx` with:**

```tsx
import { createEffect, createMemo, createSignal, onMount, onCleanup } from 'solid-js'
import { Show } from 'solid-js'
import { createCharacterStore } from './store'
import { Header } from './components/Header'
import { CharacterSelector } from './components/CharacterSelector'
import { CombatStateSelector } from './components/CombatStateSelector'
import { AbilityCards } from './components/AbilityCards'
import { GMMode } from './components/GMMode'
import { HelpPanel } from './components/HelpPanel'
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
  const [helpOpen, setHelpOpen] = createSignal(false)
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
          descriptions={content()?.descriptions ?? {}}
          deathContent={content()?.deathContent ?? ''}
          charClass={state.class}
          profession={state.profession}
          personality={state.personality}
          combat={state.combat}
          hp={state.hp}
          onRoll={handleRoll}
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
        <Toast message={toastMessage()} visible={toastVisible()} />
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Verify ? button opens/closes help panel in browser**

Open http://localhost:5173, click `?` in the GM bar. Expected: white overlay panel appears with "General Rules" heading and a × close button. Click × to dismiss.

- [ ] **Step 4: Commit**

```bash
git add src/SimpleQuest.tsx
git commit -m "feat: wire HelpPanel, helpOpen signal, and new AbilityCards props"
```

---

## Task 14: Update sample-content.ts

**Files:**
- Modify: `src/sample-content.ts`

Add `descriptions`, `generalContent`, `deathContent`, `energyCost` values, and full roll outcome bodies for abilities. Content is taken directly from the original markdown files in `/content/`.

- [ ] **Step 1: Replace `src/sample-content.ts` with the following complete file:**

```ts
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Verify in browser**

Open http://localhost:5173. Set personality to "passionate", class to "wizard", combat to "In Combat". Expected:
- Passionate description card visible (collapsed) at top of list
- Wizard description card visible (collapsed) below it
- Wizard ability cards show: "Wand" with "3 energy" badge, "Morph" with "4 energy" badge, etc.
- Click on `D6` in Wand body — toast appears ("d6 → N")
- D[X] in card heading (`#### Roll a D6`) shows d20 die background image
- Set HP to 0 — "Am I Dead?" card appears at the very top

- [ ] **Step 4: Commit**

```bash
git add src/sample-content.ts
git commit -m "feat: update sample content with full descriptions, roll outcomes, energy costs, death/general content"
```

---

## Task 15: Production Build Verification

**Files:** None (read-only verification)

- [ ] **Step 1: Run the production build**

```bash
npm run build 2>&1
```

Expected: output ends with something like:
```
dist/simple-quest.js   XX.XX kB │ gzip: XX.XX kB
✓ built in X.XXs
```
No errors. The bundle will be larger than before due to the d20 base64 string — this is expected.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview
```

Open http://localhost:4173. Verify the full flow:
1. Set personality to "calculating" → background turns teal
2. Set personality to "righteous" → background turns pale lavender, all text readable
3. Select a class and profession → description cards appear (collapsed)
4. Click a description card → it expands with markdown content
5. Set HP to 0 → Am I Dead? card appears
6. Click `?` → help panel opens, close with ×
7. Set HP back to > 0 → Am I Dead? card disappears
8. Ability card with energyCost → badge shows correctly

- [ ] **Step 3: Commit build artifacts (optional, if dist is tracked)**

```bash
git status
# If dist/ is tracked:
git add dist/
git commit -m "build: production bundle with corrections"
```

If `dist/` is in `.gitignore`, skip this step.

---

## Self-Review Checklist

After writing this plan, checking spec coverage:

- ✅ Correction 1 (theme): Tasks 3–8 (CSS vars + all component theme updates)
- ✅ Correction 2 (energy costs): Task 7 (energy badge in AbilityCard) + Task 14 (energyCost in sample data)
- ✅ Correction 3 (roll results): Task 14 (full ability bodies with outcome tables)
- ✅ Correction 4 (dice styling): Task 1 (d20.ts) + Task 7 (AbilityCard dice post-processing)
- ✅ Correction 5 (description cards): Task 9 + Task 12 + Task 14
- ✅ Correction 6 (help button): Task 8 (? button) + Task 11 (HelpPanel) + Task 13 (wire) + Task 14 (generalContent)
- ✅ Correction 7 (death card): Task 10 (DeathCard) + Task 12 (wire) + Task 14 (deathContent)
