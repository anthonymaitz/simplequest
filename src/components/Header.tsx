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
