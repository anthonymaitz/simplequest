import { customElement } from 'solid-element'
import { SimpleQuest } from './SimpleQuest'

customElement(
  'simple-quest',
  { content: '', character: '', locked: '' },
  (props, { element }) => (
    <SimpleQuest
      content={props.content}
      character={props.character}
      locked={props.locked === 'true'}
      element={element as HTMLElement}
    />
  ),
  { shadow: true }
)

export { sampleContent } from './sample-content'
export type { SimpleQuestContent, CharacterData } from './types'
