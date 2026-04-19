import { customElement } from 'solid-element'
import { SimpleQuest } from './SimpleQuest'

customElement(
  'simple-quest',
  { content: '' },
  (props, { element }) => (
    <SimpleQuest content={props.content} element={element as HTMLElement} />
  ),
  { shadow: true }
)
