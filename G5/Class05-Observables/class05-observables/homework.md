# Homework: Angular Todo App with Signals, Services, Routing & Status Management

## Task Overview

Create a Todo app in Angular that demonstrates:

- Routing
- Service with observable state
- Multiple components
- Signals for reactive UI
- Entity creation, update, and deletion
- Dynamic styling based on status

---

## Requirements

### 1. Routing

- Implement at least **two routes**:
  - Todo list view (shows all todos)
  - Todo create view (form to add a new todo)
- Use Angular Router for navigation.

### 2. Service & State Management

- Create a **service** to manage todos.
- The service should:
  - Store todos in a **BehaviorSubject**.
  - Expose methods to **add**, **update status**, **delete**, and **readTodos** todos.

### 3. Components

- Implement at least **two components**:
  - Todo list component (shows all todos as cards)
  - Todo create component (form to add a new todo)

### 4. Signals

- Use Angular **signals** for reactive state in at least one component.
- Demonstrate signal usage for updating UI when todo state changes.

### 5. Todo Entity & Status

- Each todo should have:
  - `id`, `title`, `description`, `status` ("pending", "in-progress", "completed")
- Allow users to **create** a new todo.
- Allow users to **change the status** of a todo **directly from the todo card** (no separate update component).
- Allow users to **delete** a todo **directly from the todo card**.

### 6. Dynamic Styling

- In the todo list:
  - If status is **completed**:
    - Title should be **strikethrough**.
    - Border should be **green**.
  - If status is **in-progress**:
    - Border should be **orange**.
  - If status is **pending**:
    - Border should be **light-blue**.

### 7. Bonus (Optional)

- Add basic input validation.
- Add filter/search functionality. (in the todo list view add input, and when we type should filter todos by name)

## Tips

- Keep the app simple and focus on demonstrating the required Angular concepts.
- Use the ticket app from class as reference for service and observable patterns.
- Ask questions if you get stuck!
