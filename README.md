This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

#running tests: 

npm install -D vitest
npm test

#install sqlite
npm install better-sqlite3
npm install -D @types/better-sqlite3
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# To-Do App

A simple To-Do web application built with **Next.js**, **React**, **TypeScript**, and **SQLite**.

## Features

* View tasks stored in a SQLite database
* Sort tasks by:

  * Due date
  * Status
  * Title
  * Topic
* Create new tasks
* Edit existing tasks
* Edit:

  * Title
  * Description
  * Due date
  * Topic
  * Status
* Task statuses:

  * Todo
  * In Progress
  * Complete
* Persistent task storage using SQLite

## Technologies

* Next.js
* React
* TypeScript
* SQLite
* Tailwind CSS
* better-sqlite3
* Vitetest


### Database

`lib/db.ts` is responsible for initializing and connecting to the SQLite database.

`lib/tasks.ts` contains the database queries used by the application:

* `getTasks(sort)` — retrieves tasks sorted by the selected field
* `createTask(...)` — creates a new task
* `updateTask(...)` — updates an existing task

### Task Structure

Each task contains:

```text
id
title
description
dueDate
topic
status
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```
running tests:

### 3. Open the application

Open:

http://localhost:3000

## Database

The application uses SQLite for persistent task storage.

The database is initialized when the application starts. If the database already exists, schema changes may need to be applied separately.

For example, the `tasks` table contains a `status` field with the default value:

```text
Todo
```

## Usage

### Creating a Task

Click the **+** button in the bottom-right corner to create a new task.

### Editing a Task

Click the pencil icon on a task to edit its fields.

After making changes, click **Save** to update the task in the database.

### Sorting Tasks

Use the **Sort by** dropdown to change the order in which tasks are displayed.

All AI usage:https://chatgpt.com/share/6a7c44d4-e15c-83ea-8e86-7e6180d0b9d0