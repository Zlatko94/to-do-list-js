let ulTasks = document.querySelector("ul");
let inputTask = document.getElementById("task");
let btnDodajP = document.getElementById("dodajP");
let btnDodajK = document.getElementById("dodajK");

function dodajTaskLokalPocetak(task) {
  let tasks = localStorage.getItem("tasks");

  if (tasks === null) {
    let tasksArr = [];
    tasksArr.unshift(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  } else {
    let tasksArr = JSON.parse(tasks);
    tasksArr.unshift(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  }
}

function dodajTaskLokalKraj(task) {
  let tasks = localStorage.getItem("tasks");

  if (tasks === null) {
    let tasksArr = [];
    tasksArr.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  } else {
    let tasksArr = JSON.parse(tasks);
    tasksArr.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  }
}

function uzmiTaskLokal() {
  let tasks = localStorage.getItem("tasks");
  if (tasks === null) {
    return null;
  } else {
    return JSON.parse(tasks);
  }
}

function obrisiTask(task) {
  let tasks = uzmiTaskLokal();
  if (tasks !== null) {
    let updatedTasks = tasks.filter(function (value) {
      return value !== task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
}

window.onload = function () {
  let tasks = uzmiTaskLokal();
  if (tasks !== null) {
    tasks.forEach(function (task) {
      let liNewTask = document.createElement("li");
      liNewTask.textContent += task;
      ulTasks.appendChild(liNewTask);
    });
  }
};

inputTask.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    let inputTaskValue = inputTask.value;

    if (inputTaskValue != "") {
      let liNewTask = document.createElement("li");
      liNewTask.textContent += inputTaskValue;

      if (btnDodajK.checked) {
        ulTasks.appendChild(liNewTask);
        dodajTaskLokalKraj(inputTaskValue);
        inputTask.value = "";
      } else if (btnDodajP.checked) {
        ulTasks.prepend(liNewTask);
        dodajTaskLokalPocetak(inputTaskValue);
        inputTask.value = "";
      }
    }
  }
});

ulTasks.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    obrisiTask(e.target.textContent);
    e.target.remove();
  }
});
