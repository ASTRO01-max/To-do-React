import { useState } from 'react'
import './App.css'
import { MdDelete, MdDoneOutline, MdCancel } from "react-icons/md";
import { TbEdit } from 'react-icons/tb';

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

  function handleEdit(e, id) {
    const editedTitle = e.currentTarget.textContent.replace(/\s+/g, " ").trim()

    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editedTitle } : todo
      )
    )
  }

  function handleEditKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      e.currentTarget.blur()
    }
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
              <li key={el.id} className={`item ${el.isComplete ? "toggle" : ""}`}>
                <div className="left">
                  <span>{index + 1}</span>
                  <p 
                    onBlur={(e) => handleEdit(e, el.id)} 
                    onKeyDown={handleEditKeyDown}
                    contentEditable
                    suppressContentEditableWarning 
                    className={el.isComplete ? "toggle" : ""}
                    >{el.title}</p>
                </div>
                <div className='icons'>
                  {el.isComplete ? (
                    <MdCancel 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleComplete(el.id)
                      }}
                    />
                  ) : (
                    <MdDoneOutline 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleComplete(el.id)
                      }}
                    />
                  )}

                  <TbEdit onClick={(e) => e.stopPropagation()} />

                  <MdDelete 
                    className='delete' 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(el.id)
                    }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
