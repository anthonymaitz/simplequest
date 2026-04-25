import { HPSelector } from './HPSelector'
import { EnergyPool } from './EnergyPool'

interface HeaderProps {
  hp: number
  energy: boolean[]
  name: string
  charClass: string
  profession: string
  personality: string
  onHpChange: (hp: number) => void
  onEnergyClick: (index: number) => void
}

export function Header(props: HeaderProps) {
  const info = () =>
    [props.name, props.charClass, props.profession, props.personality]
      .filter(Boolean)
      .join(' · ')

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
