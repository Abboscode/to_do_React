import { Check, Trash2, Calendar } from "lucide-react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-4">

        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            todo.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-300 hover:border-indigo-500"
          }`}
        >
          {todo.completed && <Check size={16} className="text-white" />}
        </button>

        <div className="flex-1">
          <h3
            className={`text-lg font-semibold mb-1 ${
              todo.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p
              className={`text-sm mb-2 ${
                todo.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            <span>Added on {todo.dateAdded}</span>
          </div>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>

      </div>
    </div>
  );
}
