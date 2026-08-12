
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArchiveRestore,
  Pencil,
} from "lucide-react";

import {
  createTaskAction,
  updateTaskAction,
} from "@/app/actions/tasks";

export type Task = {  
  id: number;
  title: string;
  description: string;
  dueDate: string;
  topic: string;
  status: string;
  archived: number;
};

type Props = {
  initialTasks: Task[];
  initialSort: string;
  initialView: string;
};

export default function TaskList({
  initialTasks,
  initialSort,
  initialView,
}: Props) {
  const router = useRouter();

  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  const [sort, setSort] =
    useState(initialSort);

  const [view, setView] =
    useState(initialView);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editedTask, setEditedTask] =
    useState<Task | null>(null);

  // -----------------------------
  // SORT
  // -----------------------------

  const handleSortChange = (
    value: string
  ) => {
    setSort(value);

    router.push(
      `?sort=${value}&view=${view}`
    );
  };

  // -----------------------------
  // ACTIVE / ARCHIVED VIEW
  // -----------------------------

  const handleViewChange = (
    value: string
  ) => {
    setView(value);

    router.push(
      `?sort=${sort}&view=${value}`
    );
  };

  // -----------------------------
  // EDIT
  // -----------------------------

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedTask({ ...task });
  };

  // -----------------------------
  // CANCEL
  // -----------------------------

  const handleCancel = () => {
    setEditingId(null);
    setEditedTask(null);
  };

  // -----------------------------
  // FIELD CHANGE
  // -----------------------------

  const handleFieldChange = (
    field: keyof Task,
    value: string
  ) => {
    if (!editedTask) return;

    setEditedTask({
      ...editedTask,
      [field]: value,
    });
  };

  // -----------------------------
  // SAVE EDIT
  // -----------------------------

  const handleSave = async () => {
    if (!editedTask) return;

    await updateTaskAction(
      editedTask.id,
      editedTask.title,
      editedTask.description,
      editedTask.dueDate,
      editedTask.topic,
      editedTask.status,
      editedTask.archived
    );

    setEditingId(null);
    setEditedTask(null);

    router.refresh();
  };

  // -----------------------------
  // ARCHIVE / RESTORE
  // -----------------------------

  const handleArchive = async (
    task: Task
  ) => {
    const newArchivedValue =
      task.archived === 1 ? 0 : 1;

    await updateTaskAction(
      task.id,
      task.title,
      task.description,
      task.dueDate,
      task.topic,
      task.status,
      newArchivedValue
    );

    // Remove the task from the current view
    setTasks((currentTasks) =>
      currentTasks.filter(
        (currentTask) =>
          currentTask.id !== task.id
      )
    );

    router.refresh();
  };

  // -----------------------------
  // CREATE
  // -----------------------------

  const handleAddTask = async () => {
    const title = "New Task";
    const description = "";
    const dueDate = new Date()
      .toISOString()
      .split("T")[0];
    const topic = "";

    const id = await createTaskAction(
      title,
      description,
      dueDate,
      topic,
      "Todo",
      0
    );

    const newTask: Task = {
      id: Number(id),
      title,
      description,
      dueDate,
      topic,
      status: "Todo",
      archived: 0,
    };

    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);

    setEditingId(newTask.id);
    setEditedTask(newTask);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-8">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-4xl font-bold text-gray-900">
            To Do
          </h1>

          <div className="flex items-center gap-4">

            {/* ACTIVE / ARCHIVED */}

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">
                View:
              </span>

              <select
                value={view}
                onChange={(e) =>
                  handleViewChange(
                    e.target.value
                  )
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-2"
              >
                <option value="active">
                  Active
                </option>

                <option value="archived">
                  Archived
                </option>
              </select>
            </div>

            {/* SORT */}

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">
                Sort by:
              </span>

              <select
                value={sort}
                onChange={(e) =>
                  handleSortChange(
                    e.target.value
                  )
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-2"
              >
                <option value="dueDate">
                  Due Date
                </option>

                <option value="status">
                  Status
                </option>

                <option value="title">
                  Title
                </option>

                <option value="topic">
                  Topic
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* TASKS */}

        <div className="space-y-4">

          {tasks.map((task) => {
            const isEditing =
              editingId === task.id;
              const isOverdue =
    task.archived === 0 &&
    task.status !== "Complete" &&
    new Date(task.dueDate) < new Date();


            return (
              <div
                key={task.id}
                  className={`rounded-xl p-6 shadow-sm ${
        isOverdue
          ? "border border-red-200 bg-red-50"
          : "bg-white"
      }`}
              >

                {isEditing && editedTask ? (

                  /* EDIT MODE */
ss
                  <div className="space-y-5">

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Title
                      </label>

                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) =>
                          handleFieldChange(
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Description
                      </label>

                      <textarea
                        value={
                          editedTask.description
                        }
                        onChange={(e) =>
                          handleFieldChange(
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Topic
                      </label>

                      <input
                        type="text"
                        value={editedTask.topic}
                        onChange={(e) =>
                          handleFieldChange(
                            "topic",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Due Date
                        </label>

                        <input
                          type="date"
                          value={editedTask.dueDate}
                          onChange={(e) =>
                            handleFieldChange(
                              "dueDate",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Status
                        </label>

                        <select
                          value={editedTask.status}
                          onChange={(e) =>
                            handleFieldChange(
                              "status",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                        >
                          <option value="Todo">
                            Todo
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Complete">
                            Complete
                          </option>
                        </select>
                      </div>

                    </div>

                    <div className="flex justify-end gap-3">

                      <button
                        onClick={handleCancel}
                        className="rounded-lg border border-gray-300 px-5 py-2"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSave}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                      >
                        Save
                      </button>

                    </div>

                  </div>

                ) : (

                  /* NORMAL MODE */

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex-1">

                      <h2 className="text-xl font-semibold text-gray-900">
                        {task.title}
                      </h2>

                      {task.description && (
                        <p className="mt-1 text-gray-600">
                          {task.description}
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-3">

                        {task.topic && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                            {task.topic}
                          </span>
                        )}

                        <span className="text-sm text-gray-500">
                          Due: {task.dueDate}
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                          {task.status}
                        </span>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center gap-1">

                      {/* EDIT */}

                      <button
                        onClick={() =>
                          handleEdit(task)
                        }
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        aria-label="Edit task"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* ARCHIVE / RESTORE */}

                      <button
                        onClick={() =>
                          handleArchive(task)
                        }
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        aria-label={
                          task.archived === 1
                            ? "Restore task"
                            : "Archive task"
                        }
                      >
                        {task.archived === 1 ? (
                          <ArchiveRestore
                            size={18}
                          />
                        ) : (
                          <Archive size={18} />
                        )}
                      </button>

                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

      {/* ADD TASK */}

      {view === "active" && (
        <button
          onClick={handleAddTask}
          className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl text-white shadow-lg hover:bg-blue-700"
          aria-label="Add task"
        >
          +
        </button>
      )}

    </main>
  );
}
