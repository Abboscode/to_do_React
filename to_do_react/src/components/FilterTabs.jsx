export default function FilterTabs({ filter, setFilter }) {
  return (
    <div className="flex gap-2 mb-6">
      {["all", "active", "completed"].map((tab) => (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            filter === tab
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
