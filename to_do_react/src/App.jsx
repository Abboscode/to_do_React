import { useState } from 'react'
import TodoListApp from './components/TodoListApp'  
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoListApp />
    </>
  )
}

export default App
