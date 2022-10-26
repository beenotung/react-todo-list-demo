import { MaxHoursPerDay, TodoItem, TodoList } from '../TodoList'

export function SchedulePage(props: {
  items: TodoItem[]
  updateItem: (id: string, updater: (item: TodoItem) => TodoItem) => void
  updateList: (updater: (list: TodoItem[]) => TodoItem[]) => void
}) {
  type Day = {
    totalHours: number
    items: TodoItem[]
  }
  const days: Day[] = []
  for (const item of props.items) {
    if (item.done) continue
    let day = days.find(day => day.totalHours + item.hours <= MaxHoursPerDay)
    if (!day) {
      day = { items: [], totalHours: 0 }
      days.push(day)
    }
    day.items.push(item)
    day.totalHours += item.hours
  }

  function moveItems(options: { src: string; dest: string }) {
    console.log('moveItems', options)
    props.updateList(items => {
      const srcIndex = items.findIndex(item => item.id == options.src)
      if (srcIndex == -1) return items
      const destIndex = items.findIndex(item => item.id == options.dest)
      if (destIndex == -1) return items

      if (srcIndex == destIndex) return items

      const src = items[srcIndex]
      const dest = items[destIndex]

      if (srcIndex < destIndex) {
        // move afterward
        const before = items.slice(0, srcIndex)
        const mid = items.slice(srcIndex + 1, destIndex)
        const after = items.slice(destIndex + 1)
        return [...before, ...mid, dest, src, ...after]
      } else {
        // move backward
        const before = items.slice(0, destIndex)
        const mid = items.slice(destIndex + 1, srcIndex)
        const after = items.slice(srcIndex + 1)
        return [...before, src, dest, ...mid, ...after]
      }
    })
  }

  return (
    <>
      {days.map((day, i) => (
        <TodoList
          key={i}
          title={formatDayTitle(i)}
          items={day.items}
          updateItem={props.updateItem}
          moveItems={moveItems}
        ></TodoList>
      ))}
    </>
  )
}

function formatDayTitle(i: number): string {
  if (i === 0) return 'Today'
  if (i === 1) return 'Tomorrow'
  return 'Today + ' + i
}
