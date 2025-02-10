document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('startScreen');
  const mainInterface = document.getElementById('mainInterface');
  const startBtn = document.getElementById('startBtn');
  const addBtn = document.getElementById('addBtn');
  const taskInput = document.getElementById('taskInput');
  const tasksList = document.getElementById('tasksList');

  // Переход между экранами
  startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    mainInterface.classList.remove('hidden');
  });

  // Добавление задач
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      const task = document.createElement('div');
      task.className = 'task-item';
      task.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">×</button>
      `;
      
      task.querySelector('.delete-btn').addEventListener('click', () => {
        task.remove();
      });
      
      tasksList.appendChild(task);
      taskInput.value = '';
    }
  }
});
