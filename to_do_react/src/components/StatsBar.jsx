export default function StatsBar({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
        <div className="text-sm text-gray-600">Total</div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
        <div className="text-sm text-gray-600">Active</div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
    </div>
  );
}
