type Priority = "urgent" | "moyenne" | "Basse"

type Todo = {
  id:number,
  description: String,
  priority : Priority
}

function App() {

  return (

    <div className="flex justify-center">

      <div className="w-2/3 flex flex-col gap-4 bg-base-300 my-15 p-5 rounded-2xl">
        <div className="flex p-3 gap-4">
          <input  
            type="text"
            className="input w-full"
            placeholder="saisisez la tâche"
          />
        </div>
      </div>
       
    </div>
  )
}

export default App
