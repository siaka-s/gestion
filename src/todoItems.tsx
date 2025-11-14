import { Trash } from "lucide-react"

type Priority = "Urgente" | "Moyenne" | "Basse"

type Todo = {
  id: number,
  description: String, 
  priority: Priority
}

type Props = {
    todo: Todo,
    onDelete: () => void
    isSelected : boolean 
}



const TodoItems = ({todo,onDelete,isSelected}: Props) => {

    return ( 
        <li className="p-3 ">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <input 
                    type="checkbox"  
                    className="checkbox checkbox-primary checkbox-sm"
                    checked= {isSelected} 
                    />
                    <span className="text-md font-bold">
                        <span>{todo.description}</span>
                    </span>
                    {/* utiliser du JS pour le couleur de priorité */}
                    <span className=
                    {`badge badge-sm badge-soft 
                        ${todo.priority === "Urgente" ? "badge-error" 
                        : todo.priority === "Basse" ? "badge-warning" 
                        : todo.priority === "Moyenne" ? "badge-success" 
                        : ""} 
                    `}> 
                        <span>{todo.priority}</span>
                    </span>
                </div>
                <button
                onClick={onDelete}
                className="btn btn-sm btn-error btn-soft">
                    <Trash className="w-4 h-4"/>
                </button>
            </div>
        </li>
    )
}

export default TodoItems