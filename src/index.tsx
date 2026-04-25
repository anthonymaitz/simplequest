import { customElement } from 'solid-element'
import { SimpleQuest } from './SimpleQuest'

customElement(
  'simple-quest',
  { content: '', character: '' },
  (props, { element }) => (
    <SimpleQuest content={props.content} character={props.character} element={element as HTMLElement} />
  ),
  { shadow: true }
)

export { sampleContent } from './sample-content'
export type { SimpleQuestContent, CharacterData } from './types'
