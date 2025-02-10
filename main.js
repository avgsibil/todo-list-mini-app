const tg = window.Telegram.WebApp;

class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        tg.ready();
        this.bindElements();
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
    }

    bindElements() {
        this.welcomeScreen = document.getElementById('welcome');
        this.todoApp = document.getElementById('todoApp');
        this.startButton = document.getElementById('startApp');
        this.newTaskInput = document.getElementById('newTask');
        this.addTaskButton = document.getElementById('addTask');
        this.tasksList = document.getElementById('tasksList');
        this.taskCount = document.getElementById('taskCount');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        this.startButton.addEventListener('click', () => this.startApp());
        this.addTaskButton.addEventListener('click', () => this.addTask());
        this.newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.changeFilter(e));
        });
    }

    startApp() {
        this.welcomeScreen.classList.add('hidden');
        this.todoApp.classList.remove('hidden');
    }

    addTask() {
        const text = this.newTaskInput.value.trim();
        if (text) {
            const task = {
                id: Date.now(),
                text,
                completed: false,
                created: new Date()
            };
            this.tasks.push(task);
            this.newTaskInput.value = '';
            this.saveAndRender();
        }
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveAndRender();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveAndRender();
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveAndRender();
    }

    changeFilter(e) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.renderTasks();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        this.tasksList.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="todoApp.toggleTask(${task.id})">
                <span>${task.text}</span>
                <button onclick="todoApp.deleteTask(${task.id})">❌</button>
            </div>
        `).join('');
    }

    updateStats() {
        this.taskCount.textContent = `Всего задач: ${this.tasks.length}`;
    }

    saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.renderTasks();
        this.updateStats();
    }
}

const todoApp = new TodoApp();
window.todoApp = todoApp; 