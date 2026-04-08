import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputVal, setInputVal] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    const obj = {
      id: Date.now(),
      title: inputVal,
      isComplete: false,
    }

    setTodos((prev) => [...prev, obj])
    setInputVal("")
  }

  function handleDelete(id) {
    setTodos((todos) => todos.filter(todos => todos.id !== id))
  }

  function handleEdit(id) {

  }

  function handleComplete(id) {
    setTodos((todos) => 
      todos.map((todo) => {
        return todo.id === id
        ? {...todo, isComplete: !todo.isComplete}
        : todo;
      }
      
    )) 
  }

  return (
    <div className='app'>
      <div className="card">
        <h2>Todo list</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder='Add todo...'
          />
          <button type='submit'>Add</button>
        </form>

        <ul className="list">
          {todos.map((el, index) => {
            return (
              <li onClick={() => handleComplete(el.id)} key={el.id} className='item'>
                <div className="left">
                  <span>{index + 1}</span>
                  <p className={el.isComplete ? "toggle" : ""}>{el.title}</p>
                </div>

                <button onClick={() => handleDelete(el.id)}>Delete</button>
                <button onClick={() => handleEdit(el.id)}>Edit</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
