// Store todo objects in localStorage
const todos = JSON.parse(localStorage.getItem('todos')) || [];

function syncTodosToDOM(){
    const taskList = document.querySelector('.task-list');

    // Clear all existing child data, this is the better implementation
    while (taskList.hasChildNodes()){
        taskList.firstChild.remove();
    }
    // taskList.innerHTML = "";

    todos.forEach((todo, index) => {

        // Add filtering criteria here
        // If Priority filter is selected, no need to display Non-Priority todos
        if (filterPriority.checked && todo.isPriority === false) return;
        // If Non-Priority filter is selected, no need to display Priority todos
        if (filterNonPriority.checked && todo.isPriority === true) return;
        // If Completed filter is selected, no need to display todos that are NOT completed.
        if (filterCompleted.checked && todo.isCompleted === false) return;

        const todoItem = document.createElement('div')
        todoItem.classList.add('task-item')

        // Apply completed / priority stylings depending on value read.
        if (todo.isCompleted) {
            todoItem.classList.add('completed');
        }
        if (todo.isPriority) {
            todoItem.classList.add('priority');
        }

        // Use of ternary operator to evaluate todo.isCompleted value, if true, output "checked"
        todoItem.innerHTML = `
            <input type="checkbox" 
                onchange="toggleTodo(${index})" 
                ${todo.isCompleted ? "checked" : ""}
            /> 
            <p>${todo.title}</p>
            <button class="prioritize-btn" 
                onclick="togglePriority(${index})"
            >Prioritize</button>
            <button class="delete-btn" 
                onclick="removeTodo(${index})"
            >Delete</button>
        `;

        // Append the completed todoItem object as a child to the taskList parent DOM.
        taskList.appendChild(todoItem);

        // Save the To-Do list data into localStorage
        localStorage.setItem('todos',JSON.stringify(todos));
    })
}

function addTodo(){
    const input = document.querySelector('.add-todo-form input')
    const value = input.value;

    // Validation to prevent empty todo
    if (value === ""){
        alert("No empty To-Do's allowed!")
        return;
    }

    const newTodo = {
        title: value,
        isCompleted: false,
        isPriority: false
    }
    todos.push(newTodo);
    syncTodosToDOM();

    // Clear input after submit
    input.value = "";
}

function removeTodo(index){
    todos.splice(index,1);
    syncTodosToDOM();
}

function toggleTodo(index){
    todos[index].isCompleted = !todos[index].isCompleted;
    syncTodosToDOM();
}

function togglePriority(index){
    todos[index].isPriority = !todos[index].isPriority;
    syncTodosToDOM();
}

// Prevent form refresh
const todoForm = document.querySelector('.add-todo-form');
todoForm.addEventListener('submit', (e) => e.preventDefault()); // e.preventDefault will prevent the default behavior of a form submit button when clicked, it wont refresh.

// Setup event listeners for Filters
const filterAll = document.querySelector("#filter-all");
const filterPriority = document.querySelector("#filter-priority");
const filterNonPriority = document.querySelector("#filter-non-priority");
const filterCompleted = document.querySelector("#filter-completed");

filterAll.addEventListener('change', () => syncTodosToDOM());
filterPriority.addEventListener('change', () => syncTodosToDOM());
filterNonPriority.addEventListener('change', () => syncTodosToDOM());
filterCompleted.addEventListener('change', () => syncTodosToDOM());

// Dark Mode
const darkmodeEl = document.querySelector('#darkmode-btn');
darkmodeEl.addEventListener('click', () => toggleDarkMode());
function toggleDarkMode(){
    const bodyEl = document.body;
    bodyEl.classList.toggle("dark-mode");
}

// Create Todos on Page Load
syncTodosToDOM();