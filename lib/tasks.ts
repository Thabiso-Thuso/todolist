import { Task } from "@/app/TaskList";
import {db} from "./db";

export function getTasks(sort : string) :Task[]
{
    return db.prepare(`SELECT * FROM tasks ORDER BY ${sort}`).all() as Task[];
}

export function createTask(title : string, description : string, dueDate : string, topic: string,status: string){
    const stmt = db.prepare("INSERT INTO tasks (title, description, dueDate, topic,status) VALUES (?, ?, ?, ?)");
    const info = stmt.run(title, description, dueDate, topic,status);
    return info.lastInsertRowid; 
}
export function updateTask(id : number, title : string, description : string, dueDate : string, topic: string, status: string){
    const stmt = db.prepare("UPDATE tasks SET title = ?, description = ?, dueDate = ?, topic = ?, status = ? WHERE id = ?");
    const info = stmt.run(title, description, dueDate, topic, status, id);
    return info.changes; 
}