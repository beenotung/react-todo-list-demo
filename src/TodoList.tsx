import './TodoList.css'

export type TodoItem = {
  id: string
  done?: boolean
  title: string
  hours: number
}
export const MaxHoursPerDay = 8

export function TodoList(props: {
  title: string
  items: TodoItem[]
  updateItem: (id: string, updater: (item: TodoItem) => TodoItem) => void
  moveItems?: (options: { src: string; dest: string }) => void
}) {
  const totalHour = props.items.reduce((acc, c) => acc + c.hours, 0)
  return (
    <div className="TodoList">
      <h2 className="list-title">{props.title}</h2>
      {props.items.map(item => (
        <div
          className="item"
          key={item.id}
          data-id={item.id}
          draggable={!!props.moveItems}
          onDragStart={e => {
            e.dataTransfer.setData('text', item.id)
          }}
          onDrop={e => {
            e.preventDefault()
            const dest = item.id
            const src = e.dataTransfer.getData('text')
            props.moveItems?.({ src, dest })
          }}
          onDragOver={e => {
            e.preventDefault()
          }}
        >
          <input
            type="checkbox"
            checked={item.done}
            onChange={e => {
              const done = e.currentTarget.checked
              props.updateItem(item.id, item => ({
                ...item,
                done,
              }))
            }}
          ></input>
          <span className="item-title">{item.title}</span>
          <div className="hours">
            <button
              disabled={item.hours <= 1}
              onClick={() =>
                props.updateItem(item.id, item => ({
                  ...item,
                  hours: Math.max(1, item.hours - 1),
                }))
              }
            >
              -
            </button>
            <span className="hour-text">{item.hours}</span>
            <button
              disabled={item.hours >= MaxHoursPerDay}
              onClick={() =>
                props.updateItem(item.id, item => ({
                  ...item,
                  hours: Math.min(8, item.hours + 1),
                }))
              }
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="total">Total hours you need: {totalHour}</div>
    </div>
  )
}
