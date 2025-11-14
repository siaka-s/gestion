import { useEffect, useState } from "react"
import TodoItems from "./todoItems"
import { Construction } from "lucide-react"

type Priority = "Urgente" | "Moyenne" | "Basse"

type Todo = {
  id: number,
  description: String,
  priority: Priority
}

function App() {

  const [input, setInput] = useState("")
  const [priority, setPriority] = useState<Priority>("Moyenne")
  const savedTodos = localStorage.getItem("todos")
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, SetFilter] = useState<Priority | "Tous">("Tous")


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    if (input.trim() == "") {
      return
    }

    const newTodo: Todo = {
      id: Date.now(),
      description: input.trim(),
      priority: priority,

    }
    const newTodos = [newTodo, ...todos]

    setTodos(newTodos)
    setInput("")
    setPriority("Moyenne")

    console.log(todos)


  }

  let filterTodo: Todo[] = []

  if (filter == "Tous") {
    filterTodo = todos
  } else {
    filterTodo = todos.filter((todo) => todo.priority === filter) // la priorite est egale au filtre on a choisi
  }

  const urgentCount = todos.filter((t) => (t.priority === "Urgente")).length
  const mediumCount = todos.filter((t) => (t.priority === "Moyenne")).length
  const lowCount = todos.filter((t) => (t.priority === "Basse")).length
  const allCount = todos.length

  function deleteTodo(id: number) {

    const newTodo = todos.filter((todo) => todo.id !== id)
    setTodos(newTodo)
  }

  const [selectedTodos, setSelectTodos] = useState<Set<number>>(new Set())

  function toggleSelectedTodo(id: number) {
    const newSelected = new Set(selectedTodos)

    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectTodos(newSelected)
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => {
      if (selectedTodos.has(todo.id)) {
        return false 
      }else {
        return true 
      }
    })

    setTodos(newTodos)
    setSelectTodos(new Set  )
  }

  return (

    <div className="flex justify-center rounded-2xl">

      <div className="w-2/3 flex flex-col gap-4 my-15 p-5 rounded-2xl bg-base-300">
        <div className="flex p-10 gap-4 ">
          <input
            type="text"
            className="input w-full"
            placeholder="saisisez votre la tâche..."
            value={input}
            onChange={(e) => { setInput(e.target.value) }}
          />
          <select
            className="select w-ful rounded-4xl justify-center"
            value={priority}
            onChange={(e) => { setPriority(e.target.value as Priority) }}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">
            Ajouter
          </button>
        </div>
        <div className="w-full space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">

              <button
                className={`btn btn-succes ${filter === "Tous" ? "Btn btn-primary btn-soft" : ""}`}
                onClick={() => {
                  SetFilter("Tous")
                }}
              >
                Tous ({allCount})
              </button>
              <button
                className={`btn btn-succes ${filter === "Urgente" ? "Btn btn-error btn-soft" : ""}`}
                onClick={() => {
                  SetFilter("Urgente")
                }}
              >
                Urgente ({urgentCount})
              </button>
              <button
                className={`btn btn-succes ${filter === "Moyenne" ? "Btn btn-success btn-soft" : ""}`}
                onClick={() => {
                  SetFilter("Moyenne")
                }}
              >
                Moyenne ({mediumCount})
              </button>
              <button
                className={`btn btn-succes ${filter === "Basse" ? "Btn btn-warning btn-soft" : ""}`}
                onClick={() => {
                  SetFilter("Basse")
                }}
              >
                Basse ({lowCount})
              </button>
            </div>
            <button
            onClick={finishSelected}
            className="flex flex-row-reverse btn btn-info"
            disabled= {selectedTodos.size == 0}>
            Terminer la tâche ({selectedTodos.size})
            </button>
          </div>
          <div>
            {filterTodo.length > 0 ? (
              <ul className="divide-y divide-primary/20 ">
                {filterTodo.map((todo) => (
                  <li key={todo.id}>
                    <TodoItems
                      todo={todo}
                      onDelete={() => deleteTodo(todo.id)}
                      isSelected={selectedTodos.has(todo.id)}
                      onToggleSelected={toggleSelectedTodo} />
 
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center p-5 flex-col">
                <Construction strokeWidth={1} className="w-40 h-40 text-primary" />
                <p className="text-sm">Aucune tache est disponoble </p>
              </div>
            )
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default App
