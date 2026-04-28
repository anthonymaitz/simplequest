import { HPSelector } from './HPSelector'
import { EnergyPool } from './EnergyPool'

interface HeaderProps {
  hp: number
  energy: boolean[]
  name: string
  charClass: string
  profession: string
  personality: string
  starRating?: number
  gear?: { weapon?: string | null; weaponBonus?: number }
  onHpChange: (hp: number) => void
  onEnergyClick: (index: number) => void
}

const STAR_LABELS = ['', '★', '★★', '★★★', '★★★★', '★★★★★']

export function Header(props: HeaderProps) {
  const info = () =>
    [props.name, props.charClass, props.profession, props.personality]
      .filter(Boolean)
      .join(' · ')

  const starLabel = () => {
    const r = props.starRating ?? 0
    return r > 0 ? STAR_LABELS[r] ?? '' : ''
  }

  const weaponLabel = () => {
    const w = props.gear?.weapon
    if (!w) return ''
    const bonus = props.gear?.weaponBonus
    return bonus ? `⚔ ${w} (+${bonus})` : `⚔ ${w}`
  }

  return (
    <div
      style={{
        background: 'var(--sq-row-1)',
        'border-bottom': '1px solid var(--sq-row-border)',
        position: 'sticky',
        top: '0',
        'z-index': '100',
      }}
    >
      {/* Character identity — read-only, not selectable */}
      <div
        style={{
          padding: '8px 14px 2px',
          'font-size': '13px',
          color: 'var(--sq-ctrl-text)',
          'text-transform': 'capitalize',
          'user-select': 'none',
          '-webkit-user-select': 'none',
          'white-space': 'nowrap',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        }}
      >
        {info()}
        {starLabel() && (
          <span style={{ color: '#f0c040', 'margin-left': '6px', 'font-size': '12px' }}>
            {starLabel()}
          </span>
        )}
        {weaponLabel() && (
          <span style={{ color: '#88aaff', 'margin-left': '8px', 'font-size': '11px', 'text-transform': 'none' }}>
            {weaponLabel()}
          </span>
        )}
      </div>
      {/* HP + energy row */}
      <div
        style={{
          padding: '4px 14px 10px',
          display: 'flex',
          'align-items': 'center',
          gap: '12px',
          'flex-wrap': 'wrap',
        }}
      >
        <HPSelector hp={props.hp} onHpChange={props.onHpChange} />
        <EnergyPool energy={props.energy} onEnergyClick={props.onEnergyClick} />
      </div>
    </div>
  )
}
