import { getTasks } from "@/lib/tasks";
import TaskList from "./TaskList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await searchParams;

  // Default sorting if no sort is selected
  const sort = params.sort || "dueDate";

  // Get tasks from SQLite using your existing query
  const tasks = getTasks(sort, 0);

  return (
    <TaskList
      initialTasks={tasks}
      initialSort={sort}
    />
  );
}
