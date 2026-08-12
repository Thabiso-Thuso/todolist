import { Task } from "@/app/TaskList";
import {db} from "./db";

export function getTasks(sort : string,archived:number) :Task[]
{
    return db.prepare(`SELECT * FROM tasks WHERE archived = ${archived} ORDER BY ${sort}`).all() as Task[];
}

export function createTask(title : string, description : string, dueDate : string, topic: string,status: string,archived:number){
    const stmt = db.prepare("INSERT INTO tasks (title, description, dueDate, topic,status,archived) VALUES (?, ?, ?, ?,?,?)");
    const info = stmt.run(title, description, dueDate, topic,status,archived);
    
    return info.lastInsertRowid; 
}
export function updateTask(id : number, title : string, description : string, dueDate : string, topic: string, status: string, archived: number){
    const stmt = db.prepare("UPDATE tasks SET title = ?, description = ?, dueDate = ?, topic = ?, status = ?, archived = ? WHERE id = ?");
    const info = stmt.run(title, description, dueDate, topic, status, archived, id);
    return info.changes; 
}