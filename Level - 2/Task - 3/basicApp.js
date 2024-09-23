const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('task');
const pendingTasksList = document.getElementById('pendingTasksList');
const completedTasksList = document.getElementById('completedTasksList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initial render of tasks from local storage
renderTasks();

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            text: taskText,
            completed: false,
            dateAdded: new Date().toLocaleString(),
        };
        tasks.push(task);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    } else {
        alert("Please enter a task.");
    }
}

function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text} (Added: ${task.dateAdded})</span>
            <div>
                <button class="complete" onclick="completeTask(${index})">Complete</button>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        if (task.completed) {
            completedTasksList.appendChild(li);
        } else {
            pendingTasksList.appendChild(li);
        }
    });
}

function completeTask(index) {
    tasks[index].completed = true;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    taskInput.value = tasks[index].text;
    deleteTask(index); // Remove the task to be edited from the list
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
