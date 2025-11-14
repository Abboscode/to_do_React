import { useState ,useEffect} from "react";
import { Plus } from "lucide-react";

import StatsBar from "./StatsBar";
import AddTodoForm from "./AddTodoForm";
import FilterTabs from "./FilterTabs";
import TodoItem from "./TodoItem";

export default function TodoListApp() {
  
 
  
  const [todos, setTodos] = useState([{}
  ]);
 useEffect(() => {
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchTodos();
}, []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  const [filter, setFilter] = useState("all");

  const handleAddTodo = () => {
    if (newTodo.title.trim()) {
      const todo = {
        id: Date.now(),
        title: newTodo.title,
        description: newTodo.description,
        dateAdded: new Date().toISOString().split("T")[0],
        completed: false,
      };
      setTodos([todo, ...todos]);
      setNewTodo({ title: "", description: "" });
      setShowAddForm(false);
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        <StatsBar stats={stats} />

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200 flex items-center justify-center gap-2 mb-6"
          >
            <Plus size={20} /> Add New Task
          </button>
        )}

        {showAddForm && (
          <AddTodoForm
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            onAdd={handleAddTodo}
            onCancel={() => {
              setShowAddForm(false);
              setNewTodo({ title: "", description: "" });
            }}
          />
        )}

        <FilterTabs filter={filter} setFilter={setFilter} />

        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">
                No tasks found. Add your first task to get started!
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleComplete}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
