"use server";

import {
  createTask,
  updateTask,
} from "@/lib/tasks";

export async function createTaskAction(
  title: string,
  description: string,
  dueDate: string,
  topic: string,
  status: string,
  archived:number
) {
  return createTask(
    title,
    description,
    dueDate,
    topic,
    status,
    archived
  );
}

export async function updateTaskAction(
  id: number,
  title: string,
  description: string,
  dueDate: string,
  topic: string,
  status: string,archived:number
) {
  return updateTask(
    id,
    title,
    description,
    dueDate,
    topic,
    status,archived
  );
}