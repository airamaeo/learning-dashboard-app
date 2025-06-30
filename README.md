# 🧠 Learning Dashboard

A goal-setting and productivity app that helps users create, organize, and track progress on learning goals. Built with React, featuring drag-and-drop support, persistent storage, filtering, and theme toggling.

---

## Features

- **Create and manage multiple goal lists**
- **Add, edit, delete, and reorder goals**
- **Light/Dark mode toggle**
- **Filter goals by status: All, Completed, In Progress**
- **Drag-and-drop reordering (powered by @dnd-kit)**
- **Persistent storage via `localStorage`**
- **Modular React components with Context API**

---

## Tech Stack

- **React** – Frontend framework
- **React Context API** – State management
- **@dnd-kit** – Drag-and-drop support
- **Font Awesome** – Icon library
- **uuid** – Unique IDs
- **localStorage** – Client-side data persistence

---

## Getting Started

- **Create a List**: Use the top input box to name a new list and click **"Create List"**.
- **Add a Goal**: Type in the input field below a list title and press **Enter** or click **"+"** to add.
- **Edit a Goal**: Click a goal’s text to enter edit mode. Press **Enter** to save or **Esc** to cancel.
- **Mark as Complete**: Click the checkbox next to a goal to toggle its completion status.
- **Delete**: Click the trash icon to remove a goal or an entire list.
- **Reorder**: Drag goals up or down using the **grip icon** to change their order.
- **Toggle Theme**: Click the **sun/moon icon** in the header to switch between light and dark mode.
- **Filter**: Use the three-dot menu to filter goals by **All**, **Completed**, or **In Progress**.
