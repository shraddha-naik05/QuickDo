let currentUser = localStorage.getItem("loggedInUser");
if (!currentUser) {
  window.location.href = "index.html";
}

document.getElementById("userWelcome").textContent = "Logged in as: " + currentUser;

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks_" + currentUser)) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks_" + currentUser, JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;
  const date = new Date();
  const time = date.toLocaleString();
  const tasks = getTasks();
  tasks.push({ text, completed: false, time });
  saveTasks(tasks);
  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", getTasks()[index].text);
  if (newText !== null && newText.trim() !== "") {
    const tasks = getTasks();
    tasks[index].text = newText.trim();
    saveTasks(tasks);
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  getTasks().forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const topDiv = document.createElement("div");
    topDiv.className = "task-top";

    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "5px";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✅";
    completeBtn.onclick = () => toggleTask(index);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    topDiv.appendChild(span);
    topDiv.appendChild(actions);

    const timeP = document.createElement("p");
    timeP.className = "task-time";
    timeP.textContent = task.time;

    li.appendChild(topDiv);
    li.appendChild(timeP);
    taskList.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

renderTasks();
