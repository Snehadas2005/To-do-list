# To-Do List Application

A clean, intuitive web-based task management application that helps you organize and track your daily tasks with priority levels, day assignments, and detailed notes.

## Features

- ✅ Add, edit, and delete tasks
- 📊 Mark tasks as complete/incomplete
- 🚩 Set priority levels (Low, Medium, High)
- 📅 Assign tasks to specific days of the week
- 📝 Add detailed notes to each task
- 🔄 Persistent storage using localStorage
- 🎉 Celebration animation when completing tasks
- 📊 Track completed and uncompleted task counts
- 🖥️ Both list and table view for your tasks
- 🔐 Confirmation modal for task deletion

## Demo



## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side requirements - runs entirely in the browser

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-list-app.git
   ```

2. Navigate to the project directory:
   ```
   cd todo-list-app
   ```

3. Open `index.html` in your web browser:
   ```
   # On macOS
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

## Usage

1. **Adding Tasks**:
   - Type your task in the input field and click "Add" or press Enter
   - Your task will appear in both list and table views

2. **Managing Tasks**:
   - **Complete a task**: Check the checkbox or click the "Done" button
   - **Edit task text**: Click "Edit" next to any task in the list view
   - **Delete a task**: Click the "×" button (confirms with a modal)

3. **Setting Task Properties**:
   - **Priority**: Select Low, Medium, or High from the dropdown in the table
   - **Day**: Assign a day of the week from the dropdown menu
   - **Details**: Add notes or details in the textarea

4. **Task Statistics**:
   - View counts of completed and uncompleted tasks at the bottom of the app

## How It Works

- Tasks are stored in the browser's localStorage
- When tasks are completed, a confetti animation celebrates your achievement
- All changes are immediately saved and persist between browser sessions

## Project Structure

```
todo-list-app/
├── index.html      # Main HTML structure
├── style.css       # CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This documentation
```

## Customization

### Changing Colors

Edit the CSS variables in `style.css` to customize the look and feel:

- Priority colors are defined in the `.Low`, `.Medium`, and `.High` classes
- Day tag colors are defined in day-specific classes (`.Monday`, `.Tuesday`, etc.)
- Button colors can be modified in their respective CSS selectors

### Adding New Features

The modular structure makes it easy to extend functionality:

1. Add new UI elements in `index.html`
2. Style them in `style.css`
3. Implement functionality in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Canvas Confetti](https://github.com/catdad/canvas-confetti) - For the celebration animation
- Icons and gradients inspired by modern UI design principles
