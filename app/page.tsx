// app/page.tsx
import { Pencil, Plus } from "lucide-react";

const tasks = [
  {
    name: "Complete project proposal",
    dueDate: "Aug 8, 2026",
    status: "In Progress",
  },
  {
    name: "Study for exam",
    dueDate: "Aug 10, 2026",
    status: "Pending",
  },
  {
    name: "Buy groceries",
    dueDate: "Aug 5, 2026",
    status: "Completed",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">To Do</h1>

        <div className="flex items-center gap-3">
          <span className="text-gray-600 font-medium">Sort by:</span>

          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Topic</option>
            <option>Status</option>
            <option>Due Date</option>
          </select>
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition"
          >
            <div className="grid grid-cols-3 w-full">
              <div>
                <p className="text-sm text-gray-500">Task</p>
                <h2 className="font-semibold">{task.name}</h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p>{task.dueDate}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button className="ml-4 rounded-full p-2 hover:bg-gray-100 transition">
              <Pencil className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition">
        <Plus className="h-8 w-8" />
      </button>
    </main>
  );
}