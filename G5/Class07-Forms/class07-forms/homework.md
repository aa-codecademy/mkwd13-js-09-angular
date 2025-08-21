## Homework: Refactor Todo App (Class 05) Using Reactive Forms (Class 07)

### Context

In Class 05 you built a Todo app with routing, a service using `BehaviorSubject`, signals (at least somewhere), and CRUD for todos (`id`, `title`, `description`, `status`). Right now the create flow is likely a simple component with manual property bindings or template-driven inputs.

In Class 07 we explored Template vs Reactive Forms. Your task now is to refactor the create (and optionally parts of the list) to use **Reactive Forms** with proper validation, UX feedback, and a few enhancements.

---

### Core Objectives

1. Migrate the "Create Todo" feature to a Reactive Form (`FormGroup`).
2. Add validations + user feedback (errors only after interaction).
3. Keep existing service / observable state logic working.
4. Preserve routing: create view still its own route; on success navigate back to list.
5. Do not break existing list functionality (status change, delete, styling rules).

---

### Functional Requirements

1. Reactive Form Setup

   - Use `FormBuilder` (prefer `NonNullableFormBuilder` if you want stronger types).
   - Form controls:
     - `title`: string, required, min length 3, max length 50.
     - `description`: string, required, min length 10.
     - `status`: select with options: `pending`, `in-progress`, `completed` (default `pending`).
   - Submit button must be disabled while the form is invalid.

2. Validation Feedback

   - Show inline error messages only after the field is `touched` or the form is submitted once.
   - Apply CSS classes for invalid (`ng-invalid.ng-touched`) and valid (`ng-valid.ng-touched`) states (custom styles encouraged).

3. Keep the original behaviours from the requirement form Class05 (meaning we should be able to create todo, delete todo, update todo's status)

Good luck and have fun building a solid reactive form! 🚀
