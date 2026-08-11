"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
};

export type Props = {
  initialTasks: Task[];
  initialSort: string;
};

export default function TaskList({
  initialTasks,
  initialSort,
}: Props) {
  const router = useRouter();

  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  const [sort, setSort] =
    useState(initialSort);

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

    router.push(`?sort=${value}`);
  };

  // -----------------------------
  // EDIT
  // -----------------------------

  const handleEdit = (task: Task) => {
    setEditingId(task.id);

    setEditedTask({
      ...task,
    });
  };

  // -----------------------------
  // CANCEL
  // -----------------------------

  const handleCancel = () => {
    setEditingId(null);
    setEditedTask(null);
  };

  // -----------------------------
  // CHANGE FIELD
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
  // SAVE
  // -----------------------------

  const handleSave = async () => {
    if (!editedTask) return;

    await updateTaskAction(
      editedTask.id,
      editedTask.title,
      editedTask.description,
      editedTask.dueDate,
      editedTask.topic,
      editedTask.status
    );

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editedTask.id
          ? editedTask
          : task
      )
    );

    setEditingId(null);
    setEditedTask(null);

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
      status  
    );

    const newTask: Task = {
      id: Number(id),
      title,
      description,
      dueDate,
      topic,
      status: "Todo",
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

          <div className="flex items-center gap-3">

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

        {/* TASKS */}

        <div className="space-y-4">

          {tasks.map((task) => {

            const isEditing =
              editingId === task.id;

            return (
              <div
                key={task.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >

                {isEditing && editedTask ? (

                  /* ==========================
                     EDIT MODE
                  ========================== */

                  <div className="space-y-5">

                    {/* TITLE */}

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* DESCRIPTION */}

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
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
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* TOPIC */}

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* DATE + STATUS */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* DATE */}

                      <div>

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Due Date
                        </label>

                        <input
                          type="date"
                          value={
                            editedTask.dueDate
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              "dueDate",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
                        />

                      </div>

                      {/* STATUS */}

                      <div>

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Status
                        </label>

                        <select
                          value={
                            editedTask.status
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              "status",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
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

                    {/* BUTTONS */}

                    <div className="flex justify-end gap-3 pt-2">

                      <button
                        onClick={handleCancel}
                        className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSave}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                      >
                        Save
                      </button>

                    </div>

                  </div>

                ) : (

                  /* ==========================
                     NORMAL MODE
                  ========================== */

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex-1">

                      {/* TITLE */}

                      <h2 className="text-xl font-semibold text-gray-900">
                        {task.title}
                      </h2>

                      {/* DESCRIPTION */}

                      {task.description && (
                        <p className="mt-1 text-gray-600">
                          {task.description}
                        </p>
                      )}

                      {/* DETAILS */}

                      <div className="mt-4 flex flex-wrap items-center gap-3">

                        {/* TOPIC */}

                        {task.topic && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                            {task.topic}
                          </span>
                        )}

                        {/* DATE */}

                        <span className="text-sm text-gray-500">
                          Due: {task.dueDate}
                        </span>

                        {/* STATUS */}

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            task.status ===
                            "Complete"
                              ? "bg-green-100 text-green-700"
                              : task.status ===
                                "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.status}
                        </span>

                      </div>

                    </div>

                    {/* EDIT BUTTON */}

                    <button
                      onClick={() =>
                        handleEdit(task)
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      aria-label={`Edit ${task.title}`}
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

      {/* FLOATING ADD BUTTON */}

      <button
        onClick={handleAddTask}
        className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
        aria-label="Add task"
      >
        +
      </button>

    </main>
  );
}

