import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data","app.db");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    dueDate TEXT,
    topic TEXT,
    status TEXT NOT NULL DEFAULT 'Todo',
archived INTEGER NOT NULL DEFAULT 0
  )
`);
// db.exec(`
//   ALTER TABLE tasks ADD COLUMN status TEXT NOT NULL DEFAULT 'Todo'
// `);
db.exec(`
  ALTER TABLE tasks
  ADD COLUMN archived INTEGER NOT NULL DEFAULT 0
`);
