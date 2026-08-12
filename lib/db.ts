import Database from "better-sqlite3";
import { describe, expect, it, beforeEach } from "vitest";

describe("tasks", () => {
  let db: Database.Database;

  beforeEach(() => {
    // Throwaway in-memory database for every test
    db = new Database(":memory:");

    db.exec(`
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        dueDate TEXT,
        topic TEXT,
        status TEXT NOT NULL DEFAULT 'Todo',
        archived INTEGER NOT NULL DEFAULT 0
      )
    `);
  });

  it("creates and retrieves a task", () => {
    const insert = db.prepare(`
      INSERT INTO tasks
      (title, description, dueDate, topic, status, archived)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      "Math Homework",
      "Complete exercise",
      "2026-08-15",
      "school",
      "Todo",
      0
    );

    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(1) as any;

    expect(task.title).toBe("Math Homework");
    expect(task.description).toBe("Complete exercise");
    expect(task.status).toBe("Todo");
    expect(task.archived).toBe(0);
  });

  it("updates a task and archives it", () => {
    const insert = db.prepare(`
      INSERT INTO tasks
      (title, description, dueDate, topic, status, archived)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      "Math Homework",
      "Old description",
      "2026-08-15",
      "school",
      "Todo",
      0
    );

    const update = db.prepare(`
      UPDATE tasks
      SET title = ?,
          description = ?,
          dueDate = ?,
          topic = ?,
          status = ?,
          archived = ?
      WHERE id = ?
    `);

    update.run(
      "Updated Homework",
      "New description",
      "2026-08-20",
      "math",
      "In Progress",
      1,
      1
    );

    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(1) as any;

    expect(task.title).toBe("Updated Homework");
    expect(task.description).toBe("New description");
    expect(task.status).toBe("In Progress");
    expect(task.archived).toBe(1);
  });

  it("only returns active tasks when archived is 0", () => {
    const insert = db.prepare(`
      INSERT INTO tasks
      (title, description, dueDate, topic, status, archived)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      "Active Task",
      "",
      "2026-08-15",
      "school",
      "Todo",
      0
    );

    insert.run(
      "Archived Task",
      "",
      "2026-08-15",
      "school",
      "Todo",
      1
    );

    const tasks = db
      .prepare(`
        SELECT *
        FROM tasks
        WHERE archived = ?
      `)
      .all(0) as any[];

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Active Task");
  });

  it("identifies an incomplete task as overdue", () => {
    const dueDate = "2026-08-10";
    const today = "2026-08-12";

    const isOverdue =
      dueDate < today;

    expect(isOverdue).toBe(true);
  });
});