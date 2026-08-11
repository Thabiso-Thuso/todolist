import(getTasks, createTask, updateTask) from "../lib/tasks"; 
import TaskList from "./TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  // Start editing a task
  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedTask({ ...task });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditedTask(null);
  };

  // Save edited task
  const handleSave = () => {
    if (!editedTask) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      )
    );

    setEditingId(null);
    setEditedTask(null);
  };

  // Add a new task
  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: "New Task",
      description: "",
      topic: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Todo",
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);

    // Immediately open the new task for editing
    setEditingId(newTask.id);
    setEditedTask(newTask);
  };

  // Update the currently edited task
  const updateEditedTask = (field: keyof Task, value: string) => {
    if (!editedTask) return;

    setEditedTask({
      ...editedTask,
      [field]: value,
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">
            To Do
          </h1>

          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-600">
              Sort by:
            </span>

            <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm outline-none focus:border-blue-500">
              <option>Due Date</option>
              <option>Status</option>
              <option>Title</option>
              <option>Topic</option>
            </select>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks.map((task) => {
            const isEditing = editingId === task.id;

            return (
              <div
                key={task.id}
                className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {isEditing && editedTask ? (
                  /* ================= EDIT MODE ================= */
                  <div className="space-y-5">
                    {/* Title */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Title
                      </label>

                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) =>
                          updateEditedTask("title", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Description
                      </label>

                      <textarea
                        value={editedTask.description}
                        onChange={(e) =>
                          updateEditedTask(
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Topic */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Topic
                      </label>

                      <input
                        type="text"
                        value={editedTask.topic}
                        onChange={(e) =>
                          updateEditedTask("topic", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Due Date + Status */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Due Date */}
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Due Date
                        </label>

                        <input
                          type="date"
                          value={editedTask.dueDate}
                          onChange={(e) =>
                            updateEditedTask(
                              "dueDate",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      {/* Status */}
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Status
                        </label>

                        <select
                          value={editedTask.status}
                          onChange={(e) =>
                            updateEditedTask(
                              "status",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="Todo">Todo</option>
                          <option value="In Progress">
                            In Progress
                          </option>
                          <option value="Complete">
                            Complete
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Save / Cancel */}
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={handleCancel}
                        className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSave}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ================= VIEW MODE ================= */
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0 flex-1">
                      {/* Title */}
                      <h2 className="text-xl font-semibold text-gray-900">
                        {task.title}
                      </h2>

                      {/* Description */}
                      {task.description && (
                        <p className="mt-1 text-gray-600">
                          {task.description}
                        </p>
                      )}

                      {/* Task details */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {/* Topic */}
                        {task.topic && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                            {task.topic}
                          </span>
                        )}

                        {/* Due date */}
                        <span className="text-sm text-gray-500">
                          Due:{" "}
                          {new Date(
                            task.dueDate + "T00:00:00"
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>

                        {/* Status */}
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            task.status === "Complete"
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

                    {/* Edit button */}
                    <button
                      onClick={() => handleEdit(task)}
                      aria-label={`Edit ${task.title}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                      ✎
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAddTask}
        aria-label="Add new task"
        className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl font-light text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
      >
        +
      </button>
    </main>
  );
}

