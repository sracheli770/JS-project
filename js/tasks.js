"use strict";
const tasksDiv = document.getElementById('tasks');
const taskDescription = document.getElementById('task-description');
const addTaskBtn = document.getElementById('btn-add-task');
class Time {
    static dateString(date) {
        const currentDateString = date.toLocaleDateString("he-IL", {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            fractionalSecondDigits: 3,
        });
        return currentDateString;
    }
    static currentDateString() {
        return this.dateString(new Date());
    }
}
var Status;
(function (Status) {
    Status["Uncompleted"] = "Uncompleted";
    Status["Completed"] = "Completed";
})(Status || (Status = {}));
class Task {
    description;
    status;
    timeStamp = Time.currentDateString();
    constructor(description, status = Status.Uncompleted) {
        this.description = description;
        this.status = status;
    }
}
class TaskManager {
    tasks = [];
    addTask(task) {
        this.tasks.push(task);
    }
    updateTask(task) {
        let index = this.tasks.findIndex(t => t.timeStamp === task.timeStamp);
        this.tasks.splice(index, 1, task);
    }
    deleteTask(task) {
        let index = this.tasks.findIndex(t => t.timeStamp === task.timeStamp);
        this.tasks.splice(index, 1);
    }
}
let tasksArr = new TaskManager();
addTaskBtn.addEventListener('click', () => {
    let text = taskDescription.value;
    let task = new Task(text);
    tasksArr.addTask(task);
    taskDescription.value = '';
    tasksDiv.replaceChildren();
    showTasks();
    localStorage.setItem('Tasks', JSON.stringify(tasksArr));
});
function showTasks() {
    for (let task of tasksArr.tasks) {
        let row = document.createElement('div');
        row.classList.add('row', 'd-flex', 'm-0', 'bg-warning');
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('tasks');
        /* let lastElement = tasksArr.tasks.slice(-1)
        console.log(lastElement);

        for (var i = 0; i < tasksArr.tasks.length; i++) {
            let j = tasksArr.tasks.length - 1;

            if (tasksArr.tasks[i] === tasksArr.tasks[0]) {
                tasksDiv.classList.add('border-0');
            }
        } */
        let descriptionInput = document.createElement('input');
        descriptionInput.innerText = task.description;
        descriptionInput.value = task.description;
        descriptionInput.disabled = true;
        descriptionInput.classList.add('w-75', 'ms-3');
        descriptionInput.addEventListener('input', () => {
            task.description = descriptionInput.value;
            tasksArr.updateTask(task);
        });
        //edit task
        let editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('btn', 'btn-outline-primary', 'myBtn');
        editBtn.addEventListener('click', () => {
            descriptionInput.disabled = !descriptionInput.disabled;
            localStorage.setItem('Tasks', JSON.stringify(tasksArr));
            if (descriptionInput.disabled) {
                editBtn.classList.remove('btn-primary', 'doneBtn');
                editBtn.classList.add('btn-outline-primary', 'myBtn');
            }
            else {
                editBtn.classList.remove('btn-outline-primary', 'myBtn');
                editBtn.classList.add('btn-primary', 'doneBtn');
            }
        });
        //completed task
        let doneBtn = document.createElement('button');
        doneBtn.innerText = 'Done';
        doneBtn.classList.add('btn', 'btn-outline-success', 'myBtn');
        if (task.status == Status.Completed) {
            doneBtn.classList.remove('btn-outline-success', 'myBtn');
            doneBtn.classList.add('btn-success', 'doneBtn');
        }
        doneBtn.addEventListener('click', () => {
            doneBtn.classList.remove('btn-outline-success', 'myBtn');
            doneBtn.classList.add('btn-success', 'doneBtn');
            task.status = Status.Completed;
            localStorage.setItem('Tasks', JSON.stringify(tasksArr));
        });
        //delete task
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-outline-danger', 'myBtn', 'me-3');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasksArr.deleteTask(task);
            tasksDiv.replaceChildren();
            showTasks();
            localStorage.setItem('Tasks', JSON.stringify(tasksArr));
        });
        let spacer = document.createElement('div');
        spacer.classList.add('spacer');
        taskDiv.appendChild(descriptionInput);
        taskDiv.appendChild(spacer);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(doneBtn);
        taskDiv.appendChild(deleteBtn);
        row.appendChild(taskDiv);
        tasksDiv.appendChild(row);
    }
}
function loadTasks() {
    const load = localStorage.getItem('Tasks') ?? "[]";
    const loadedTasks = JSON.parse(load).tasks;
    loadedTasks.forEach(t => {
        const a = new Task(t.description, t.status);
        tasksArr.addTask(a);
    });
    showTasks();
}
loadTasks();
