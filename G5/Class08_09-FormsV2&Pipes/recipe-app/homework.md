# 📝 Homework: Todo Edit Functionality

## 🎯 Objective

Extend the Todo application from **Class 07** by implementing comprehensive todo editing capabilities.

## 📋 Requirements

### 1. Edit Todo Component

Create a new component called `EditTodoComponent` that allows users to modify existing todos.

**Component Features:**

- ✅ Edit todo **title**
- ✅ Edit todo **description**
- ✅ Edit todo **status** (completed/pending)
- ✅ Form validation to ensure data integrity

### 2. Navigation & Routing

- 🔗 Add proper routing to navigate to the edit component
- 🔗 Pass the todo ID as a route parameter
- 🔗 On successful edit, redirect to the todos list view

### 3. Data Management

- 💾 Load existing todo data into the edit form
- 💾 Update the todo in your data store/service
- 💾 Ensure the updated todo is reflected in the todos list

## 🎨 UI/UX Considerations

- Use reactive forms for better user experience
- Provide clear visual feedback for form validation
- Include cancel and save buttons
- Show loading states during save operations

## 🚀 Bonus Points

- Add confirmation dialog before saving changes
- Implement dirty form detection (warn before leaving unsaved changes)
