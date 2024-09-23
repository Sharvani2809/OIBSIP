const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('task');
const pendingTasksList = document.getElementById('pendingTasksList');
const completedTasksList = document.getElementById('completedTasksList');
const notification = document.getElementById('notification');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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
        showNotification("Task added successfully!");
    } else {
        showNotification("Please enter a task.");
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
    showNotification("Task marked as completed!");
}

function editTask(index) {
    taskInput.value = tasks[index].text;
    deleteTask(index); 
}

function deleteTask(index) {
    const taskText = tasks[index].text; 
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    showNotification(`Task "${taskText}" has been deleted!`);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); 
}
