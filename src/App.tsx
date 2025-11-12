import { useEffect, useState } from "react"

type Priority = "Urgente" | "Moyenne" | "Basse"

type Todo = {
  id:number,
  description: String,
  priority : Priority
}

function App() {

  const [input,setInput] = useState("")
  const [priority,setPriority] = useState<Priority>("Moyenne")
  const savedTodos = localStorage.getItem("todos")
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos,setTodos] =  useState<Todo[]>(initialTodos)

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    if (input.trim() == "") {
      return
    }

    const newTodo: Todo = {
      id: Date.now(),
      description: input.trim(),
      priority : priority,

    }
    const newTodos = [newTodo,...todos]

    setTodos(newTodos)
    setInput("")
    setPriority("Moyenne")

    console.log(todos)


  }

  return (

    <div className="flex justify-center rounded-2xl">

      <div className="w-2/3 flex flex-col gap-4 my-15 p-5 rounded-2xl">
        <div className="flex p-10 gap-4 bg-base-300">
          <input  
            type="text"
            className="input w-full"
            placeholder="saisisez votre la tâche..."
            value={input}
            onChange={(e) => {setInput(e.target.value)}}
          />
          <select
            className="select w-ful rounded-4xl justify-center"
            value={priority}
            onChange={(e) => {setPriority(e.target.value as Priority)}}
            >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">
            Ajouter
          </button>
        </div>
      </div>
       
    </div>
  )
}

export default App
