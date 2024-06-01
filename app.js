let tasks = [];

function updateCounters() {
    document.getElementById('total-count').innerText = tasks.length;
    document.getElementById('pending-count').innerText = tasks.filter(task => !task.completed).length;
    document.getElementById('completed-count').innerText = tasks.filter(task => task.completed).length;
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
            <span>${task.text}</span>
            <button class="btn" onclick="deleteTask(${index})">Delete</button>
            <button class="btn" onclick="editTask(${index})">Edit</button>
        `;
        taskList.appendChild(li);
    });
    updateCounters();
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

document.getElementById('add-task-button').addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', renderTasks);
