# Todo CLI


# Project URL - https://roadmap.sh/projects/task-tracker

A simple and efficient command-line todo application built with Node.js. Manage your tasks directly from the terminal with persistent JSON storage.

## Features
- ✅ Add new todos
- 📝 Update existing todos
- 🗑️ Delete todos
- 📋 List todos (all or filtered by status)
- 🔄 Update todo status (done, not-done, in-progress)
- 💾 Persistent storage with JSON file
- 🆔 Auto-incrementing unique IDs
- 📅 Timestamps for task creation

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-cli
```

2. Make sure you have Node.js installed (version 14+ recommended)

3. Make the script executable (optional):
```bash
chmod +x todo.js
```

## Usage

Run the application using Node.js:

```bash
node todo.js <command> [arguments]
```

### Commands

#### Add a Todo
```bash
node todo.js add "Your task description"
```
**Example:**
```bash
node todo.js add "Buy groceries"
node todo.js add "Complete project documentation"
```

#### List Todos
```bash
# List all todos
node todo.js list

# List todos by status
node todo.js list done
node todo.js list not-done
node todo.js list in-progress
```

#### Update a Todo
```bash
node todo.js update <id> "New task description"
```
**Example:**
```bash
node todo.js update 1 "Buy groceries and cook dinner"
```

#### Delete a Todo
```bash
node todo.js delete <id>
```
**Example:**
```bash
node todo.js delete 1
```

#### Update Todo Status
```bash
# Mark as done
node todo.js mark-done <id>

# Mark as in progress
node todo.js mark-in-progress <id>

# Mark as not done
node todo.js mark-not-done <id>
```
**Examples:**
```bash
node todo.js mark-done 1
node todo.js mark-in-progress 2
node todo.js mark-not-done 3
```

## Todo Structure

Each todo item contains:
- `id`: Unique identifier (auto-incremented)
- `task`: Task description
- `status`: Current status (`done`, `not-done`, `in-progress`)
- `createdAt`: ISO timestamp of creation

**Example todo object:**
```json
{
  "id": 1,
  "task": "Buy groceries",
  "status": "not-done",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Data Storage

Todos are stored in a `newTasks.json` file in the same directory as the script. The file is automatically created if it doesn't exist.

## Examples

```bash
# Add some todos
node todo.js add "Learn Node.js"
node todo.js add "Build a CLI app"
node todo.js add "Write documentation"

# List all todos
node todo.js list

# Mark first todo as in progress
node todo.js mark-in-progress 1

# Mark second todo as done
node todo.js mark-done 2

# List only completed todos
node todo.js list done

# Update a todo description
node todo.js update 3 "Write comprehensive documentation"

# Delete a todo
node todo.js delete 1
```

## Error Handling

The application includes comprehensive error handling for:
- File system operations
- Invalid todo IDs
- Invalid status values
- Missing arguments
- JSON parsing errors

## Requirements

- Node.js (version 14 or higher)
- File system write permissions in the project directory

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] Add due dates for todos
- [ ] Priority levels
- [ ] Search functionality
- [ ] Export/import features
- [ ] Configuration file support
- [ ] Color-coded output
- [ ] Interactive mode
