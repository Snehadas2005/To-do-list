const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const tableBody = document.getElementById("task-table-body");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

let tasks = [];

document.addEventListener("DOMContentLoaded", function () {
  const saved = localStorage.getItem("tasks");
  tasks = saved ? JSON.parse(saved) : [];
  renderTasks();
  updateCounters();
});

function updateCounters() {
  const completedTasks = tasks.filter(t => t.completed).length;
  const uncompletedTasks = tasks.length - completedTasks;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
  const taskText = inputBox.value.trim();
  if (!taskText) {
    alert("Please write down a task");
    return;
  }

  const newTask = {
    text: taskText,
    completed: false,
    priority: "Low",
    day: "monday",
    details: ""
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  inputBox.value = "";
  updateCounters();
}

function renderTasks() {
  listContainer.innerHTML = "";
  tableBody.innerHTML = "";

  tasks.forEach((task, index) => {
    // List view
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span class="editable" contenteditable="false">${task.text}</span>
      </label>
      <div class="task-actions">
        <span class="edit-button">Edit</span>
        <div class="delete-button">×</div>
      </div>
    `;

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-button");
    const taskSpan = li.querySelector(".editable");
    const deleteBtn = li.querySelector(".delete-button");

    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
      updateCounters();
    });

    editBtn.addEventListener("click", () => {
      taskSpan.setAttribute("contenteditable", "true");
      taskSpan.focus();
    });

    taskSpan.addEventListener("blur", finishEdit);
    taskSpan.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        finishEdit();
      }
    });

    function finishEdit() {
      taskSpan.setAttribute("contenteditable", "false");
      const updatedText = taskSpan.textContent.trim();
      if (updatedText) {
        tasks[index].text = updatedText;
        saveTasks();
        updateCounters();
      }
    }

    deleteBtn.addEventListener("click", () => {
      showDeleteModal(index);
    });

    listContainer.appendChild(li);

    // Table view
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleCompletion(${index})"></td>
      <td>${task.text}</td>
        <td>
            <span class="priority-tag ${task.priority}">${task.priority}</span><br/>
            <select onchange="updatePriority(${index}, this.value)">
                <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
            </select>
        </td>
        <td>
            <span class="day-tag ${task.day}">${task.day}</span><br/>
            <select onchange="updateDay(${index}, this.value)">
                ${["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
                .map(day => `<option value="${day}" ${task.day === day ? "selected" : ""}>
                    ${day.charAt(0).toUpperCase() + day.slice(1)}
                </option>`).join("")}
            </select>
        </td>

      <textarea onchange="updateDetails(${index}, this.value)">${task.details || ""}</textarea>
      <td>
        <button class="done-button" onclick="markDone(${index})">✅ Done</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
  updateCounters();
}

function updatePriority(index, newPriority) {
  tasks[index].priority = newPriority;
  saveTasks();
  renderTasks();
}

function updateDay(index, newDay) {
  tasks[index].day = newDay;
  saveTasks();
  renderTasks();
}

function updateDetails(index, newDetails) {
  tasks[index].details = newDetails;
  saveTasks();
}

function markDone(index) {
  tasks[index].completed = true;
  saveTasks();
  renderTasks();
  updateCounters();
  launchConfetti();
}

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let deleteIndex = null;

function showDeleteModal(index) {
  deleteIndex = index;
  document.getElementById("delete-modal").classList.add("active");
}

document.getElementById("confirm-delete").addEventListener("click", () => {
  if (deleteIndex !== null) {
    tasks.splice(deleteIndex, 1);
    saveTasks();
    renderTasks();
    updateCounters();
    deleteIndex = null;
  }
  document.getElementById("delete-modal").classList.remove("active");
});

document.getElementById("cancel-delete").addEventListener("click", () => {
  deleteIndex = null;
  document.getElementById("delete-modal").classList.remove("active");
});

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
