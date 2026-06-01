let tasks = [];
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    storedTasks.forEach((task) => {
      tasks.push(task);
    });
    updateTaskList();
    updateStates();
  }
});

let newtask = document.querySelector("#newtask");

const savetasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskinput = document.querySelector("#input-task");
  const text = taskinput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    taskinput.value = "";
    updateTaskList();
    updateStates();
    savetasks();
  }
};
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStates();
  savetasks();
};
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStates();
  savetasks();
};
const editTask = (index) => {
  const taskinput = document.querySelector("#input-task");
  taskinput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTaskList();
  updateStates();
  savetasks();
};
const updateStates = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTask = tasks.length;
  const progress = totalTask === 0 ? 0 : (completeTasks / totalTask) * 100;
  const progressBar = document.querySelector("#progress");
  progressBar.style.width = `${progress}%`;
  document.getElementById("number").innerText =
    `${completeTasks}/ ${totalTask}`;
  if (tasks.length && completeTasks == totalTask) {
    blastconfetti();
  }
};

const updateTaskList = () => {
  const taskList = document.querySelector(".tasklist");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="taskItem">

        <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
            <p class="${task.completed ? "completed" : ""}">
    ${task.text}
</p>
        </div>

        <div class="icons">
            <i class="fa-solid fa-pen-to-square" onClick="editTask(${index})" >  </i>
            <i class="fa-solid fa-trash" onClick="deleteTask(${index})" ></i>
        </div>

    </div>
        `;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
};

newtask.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
const blastconfetti = () => {
  const count = 200,
    defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }),
    );
  }
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, { spread: 60 });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
