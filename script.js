const taskInput = document.getElementById("taskInput");
const dateTimeInput = document.getElementById("dateTimeInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask() {
  if (taskInput.value.trim() === "") return;

  const task = {
    text: taskInput.value,
    dateTime: dateTimeInput.value,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  dateTimeInput.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    saveAndRender();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-header">
        <span onclick="toggleTask(${index})">${task.text}</span>
        <div class="actions">
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      </div>
      <div class="task-time">${task.dateTime ? "⏰ " + task.dateTime : ""}</div>
    `;

    taskList.appendChild(li);
  });
}
