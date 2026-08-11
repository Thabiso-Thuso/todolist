"use server";

import {
  createTask,
  updateTask,
} from "@/lib/tasks";

export async function createTaskAction(
  title: string,
  description: string,
  dueDate: string,
  topic: string
) {
  return createTask(
    title,
    description,
    dueDate,
    topic
  );
}

export async function updateTaskAction(
  id: number,
  title: string,
  description: string,
  dueDate: string,
  topic: string,
  status: string
) {
  return updateTask(
    id,
    title,
    description,
    dueDate,
    topic,
    status
  );
}