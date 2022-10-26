import { partitionArrayBy } from '@beenotung/tslib/array'
import { TodoItem, TodoList } from '../TodoList'

export function StatusListPage(props: {
  items: TodoItem[]
  updateItem: (id: string, updater: (item: TodoItem) => TodoItem) => void
}) {
  const [doneItems, newItems] = partitionArrayBy(
    props.items,
    item => !!item.done,
  )

  return (
    <>
      <TodoList
        title="Incompleted"
        items={newItems}
        updateItem={props.updateItem}
      />
      <TodoList
        title="Completed"
        items={doneItems}
        updateItem={props.updateItem}
      />
    </>
  )
}
