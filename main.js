let myInput = document.querySelector(".input");
let myAddBtn = document.querySelector(".add");
let myTasksDiv = document.querySelector(".tasks");
let myDeleteAll = document.querySelector(".del-all");
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocal();

myAddBtn.onclick = function () {
  if (myInput.value !== "") {
    addTaskToArr(myInput.value);
    myInput.value = "";
  }
};

myTasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    taskToggleWith(e.target.getAttribute("data-id"));

    e.target.classList.toggle("done");
  }
});

function addTaskToArr(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    complete: false,
  };
  arrayOfTasks.push(task);
  console.log(arrayOfTasks);
  addElementToPage(arrayOfTasks);
  addTasksToLocalStorage(arrayOfTasks);
}

function addElementToPage(arrayOfTasks) {
  myTasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let myTask = document.createElement("div");
    myTask.className = "task";

    if (task.complete) {
      myTask.className = "task done";
    }

    myTask.setAttribute("data-id", task.id);
    myTask.appendChild(document.createTextNode(task.title));

    let myDel = document.createElement("button");
    myDel.className = "del";
    myDel.appendChild(document.createTextNode("Delete"));
    myTask.appendChild(myDel);

    myTasksDiv.appendChild(myTask);
  });
}

function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPage(tasks);
  }
}
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}
function taskToggleWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].complete == false
        ? (arrayOfTasks[i].complete = true)
        : (arrayOfTasks[i].complete = false);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}

myDeleteAll.onclick = function () {
  myTasksDiv.innerHTML = "";
  localStorage.clear();
  arrayOfTasks = [];
};
