import React, { useState } from 'react'
import './App.css'
import { partitionArrayBy } from '@beenotung/tslib/array'
import { TodoItem, TodoList } from './TodoList'
import { Navigate, Route, Router, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { StatusListPage } from './pages/StatusListPage'
import { SchedulePage } from './pages/SchedulePage'

function App() {
  const [items, setItems] = useState<TodoItem[]>([
    { id: '1', title: 'Item 1', hours: 1, done: false },
    { id: '2', title: 'Item 2', hours: 2, done: false },
    { id: '3', title: 'Item 3', hours: 3, done: false },
    { id: '4', title: 'Item 4', hours: 1, done: false },
    { id: '5', title: 'Item 5', hours: 5, done: true },
    { id: '6', title: 'Item 6', hours: 6, done: true },
    { id: '7', title: 'Item 7', hours: 7, done: true },
    { id: '8', title: 'Item 8', hours: 8, done: true },
  ])

  function updateItem(id: string, updater: (item: TodoItem) => TodoItem) {
    setItems(items => items.map(item => (item.id == id ? updater(item) : item)))
  }

  return (
    <BrowserRouter>
      <div className="App">
        <h1>To-do List</h1>
        <nav>
          <Link to="/status">Status</Link>
          <Link to="/schedule">Schedule</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/status"></Navigate>}></Route>
          <Route
            path="/status"
            element={
              <StatusListPage
                items={items}
                updateItem={updateItem}
              ></StatusListPage>
            }
          ></Route>
          <Route
            path="/schedule"
            element={
              <SchedulePage
                items={items}
                updateItem={updateItem}
                updateList={setItems}
              ></SchedulePage>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
