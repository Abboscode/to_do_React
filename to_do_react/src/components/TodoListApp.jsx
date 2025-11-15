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
      const response = await fetch("http://localhost:8000/todos/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
// fetch todos on component mount
  fetchTodos();
}, []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  const [filter, setFilter] = useState("all");

  const handleAddTodo = async () => { // ⬅️ 1. Must be an async function
    if (!newTodo.title.trim()) {
        return; // Don't proceed if title is empty
    }

    // 💡 Data object for the server (remove client-side ID)
    const todoPayload = {
        title: newTodo.title,
        description: newTodo.description,
        // TODO: Let the server handle dateAdded/completed status if possible
        completed: false, 
        //TODO: dateAdded: new Date().toISOString().split("T")[0], // Let server handle this, too
    };

    try {
        // ⬅️ 2. Use await to get the actual HTTP Response object
        const response = await fetch("http://localhost:8000/todos/add", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(todoPayload), 
        });

        // 3. Check if the request succeeded
        if (response.ok) {
            // ⬅️ 4. Use await to parse the JSON body
            // This 'addedTodo' should contain the server-generated ID and final fields
            const addedTodo = await response.json(); 
            
            // Assuming your server returns the new, complete todo object
            // e.g., { id: 123, title: "...", dateAdded: "...", completed: false }

            // 5. Update local state with the server's data
            setTodos([ ...todos,addedTodo]); 
            setNewTodo({ title: "", description: "" });
            setShowAddForm(false);

        } else {
            // Handle HTTP errors (e.g., 400 Bad Request, 422 Validation Error)
            const errorData = await response.json();
            console.error("API Error:", errorData);
            alert(`Failed to add todo: ${errorData.detail || response.statusText}`);
        }
    } catch (error) {
        // Handle network errors (e.g., server offline)
        console.error("Network Error adding todo:", error);
        alert("Could not connect to the server.");
    }
};

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = async(id) => {
try{
const response = await fetch(`http://localhost:8000/todos/delete/${id}`, { method: "DELETE" });
if (response.ok) {

    setTodos(todos.filter((t) => t.id !== id));
    console.log(`Todo deleted successfully id:${id}`);
  }else {
            // 4. Handle HTTP errors (e.g., 404 Not Found, 500 Server Error)
            // Read the JSON body to get the error details from FastAPI
            const errorData = await response.json(); 
            console.error("API Error:", errorData);
            alert(`Failed to delete todo: ${errorData.detail || response.statusText}`);
        }

}catch(error){
console.error("Error deleting todo:", error);

}
    
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
