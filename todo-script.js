// todo-script.js for a to-do list application

// Function to get todos from local storage
function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

// Function to save todos to local storage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to render todos
function renderTodos() {
    const todos = getTodos();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `
            <input type='checkbox' ${todo.completed ? 'checked' : ''} onchange='toggleTodo(${index})'>
            <span>${todo.text}</span>
            <button onclick='deleteTodo(${index})'>X</button>
        `;
        todoList.appendChild(todoItem);
    });

    updateStats();
}

// Function to add a new todo
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText) {
        const todos = getTodos();
        todos.push({ text: todoText, completed: false });
        saveTodos(todos);
        todoInput.value = '';
        renderTodos();
    }
}

// Function to delete a todo
function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

// Function to toggle a todo's completed status
function toggleTodo(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos();
}

// Function to update statistics
function updateStats() {
    const todos = getTodos();
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    document.getElementById('stats').innerText = `Total: ${totalCount} | Completed: ${completedCount}`;
}

// Function to filter todos
function filterTodos(filter) {
    const todos = getTodos();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    let filteredTodos;
    if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else {
        filteredTodos = todos;
    }

    filteredTodos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `
            <input type='checkbox' ${todo.completed ? 'checked' : ''} onchange='toggleTodo(${index})'>
            <span>${todo.text}</span>
            <button onclick='deleteTodo(${index})'>X</button>
        `;
        todoList.appendChild(todoItem);
    });

    updateStats();
}

// Event listeners for adding and filtering todos
document.getElementById('add-todo').addEventListener('click', addTodo);

document.getElementById('filter-all').addEventListener('click', () => filterTodos('all'));
document.getElementById('filter-active').addEventListener('click', () => filterTodos('active'));
document.getElementById('filter-completed').addEventListener('click', () => filterTodos('completed'));

// Initial render
renderTodos();