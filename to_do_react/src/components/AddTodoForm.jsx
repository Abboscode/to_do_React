export default function AddTodoForm({ newTodo, setNewTodo, onAdd, onCancel }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">New Task</h3>

      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Enter task title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            placeholder="Task description (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onAdd}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
          >
            Add Task
          </button>

          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
