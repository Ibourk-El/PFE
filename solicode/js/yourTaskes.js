import {
  baceURL,
  closeBtnFun,
  openWorkSection,
  setUserName,
  getData,
  sendData,
} from "./functions.js";

const user_id = sessionStorage.getItem("user_id");
const user_name = sessionStorage.getItem("user_name");
const user_img = sessionStorage.getItem("user_img");
const class_id = sessionStorage.getItem("class_id");

const usertaskURL = baceURL + "solicode/backend/api/userTask.php";
const taskURL = baceURL + "solicode/backend/api/task.php";

// fun

closeBtnFun();
setUserName(user_name, user_img);
closeBtnFun();
getUserTaskes();

//
if (user_id === null) {
  location.href = "./../index.html";
}

function resetShowBtnEvent() {
  const taskBtn = document.querySelectorAll(".task-btn");
  taskBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      openWorkSection();
      const task_id = e.target.parentElement.parentElement.id;
      getTaskDetailes(task_id);
    });
  });
}

// drag and drop

function dragStart(e) {
  e.dataTransfer.setData("taskID", e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();

  let data = document.getElementById(e.dataTransfer.getData("taskID"));
  if (
    addTaskState(data.id, e.target.id) &&
    (e.target.id === "inDoing" || e.target.id === "done")
  ) {
    const taskBox = taskContainer(data.id);
    taskBox.innerHTML += data.innerHTML;
    e.target.appendChild(taskBox);
    data.remove();
    resetShowBtnEvent();

    const obj = {
      student_id: user_id,
      status: e.target.id,
      task_id: data.id,
      github_url: "",
    };

    if (e.target.id === "done") {
      // to add github url
      const github_box = document.getElementById("github-box");
      github_box.classList.add("active");
      const sendURLBtn = document.getElementById("send-url-btn");

      sendURLBtn.addEventListener("click", () => {
        const github_url = document.getElementById("github-url").value;
        if (github_url !== "") {
          obj.github_url = github_url;
          fetchData(obj);
        }
        github_box.classList.remove("active");
        return;
      });
    }
    fetchData(obj);
  }
}

// function part

function addTaskState(boxId, taskId) {
  let task = document.getElementById(taskId);
  if (task.classList.contains(boxId)) return false;
  else {
    task.classList.add(boxId);
    return true;
  }
}

// fetch data

async function fetchData(obj) {
  await sendData(taskURL, "PATCH", obj, "json");
}

// get task
async function getTaskDetailes(task_id) {
  const res = await getData(taskURL, "?id=" + task_id);
}

// add dragOver and drop to taskes containers
function addEvent(el) {
  el.addEventListener("dragover", (e) => dragOver(e));
  el.addEventListener("drop", (e) => drop(e));
}

// get user task
async function getUserTaskes() {
  const taskContainer = document.getElementById("task");
  const indoingContainer = document.getElementById("inDoing");
  const doneContainer = document.getElementById("done");
  addEvent(indoingContainer);
  addEvent(doneContainer);
  const res = await getData(
    usertaskURL,
    "?student_id=" + user_id + "&class_id=" + class_id
  );
  console.log(res);
  res.forEach((e) => {
    switch (e.status) {
      case "done":
        doneContainer.appendChild(createTask(e.id, e.title));
        break;
      case "inDoing":
        indoingContainer.appendChild(createTask(e.id, e.title));
        break;
      case "notStart":
        taskContainer.appendChild(createTask(e.id, e.title));
        break;
    }
  });
  resetShowBtnEvent();
}

function createTask(id, title) {
  const taskBox = taskContainer(id);
  const task = document.createElement("div");
  task.className = "task";
  task.id = id;
  const t = document.createElement("p");
  t.innerHTML = title;
  const btn = document.createElement("button");
  btn.innerHTML = title;
  btn.className = "task-btn";
  btn.innerHTML = "Show Detailes";

  task.appendChild(t);
  task.appendChild(btn);
  taskBox.appendChild(task);

  return taskBox;
}

function taskContainer(id) {
  const taskesBox = document.createElement("div");
  taskesBox.className = "taskes-box";
  taskesBox.id = id;
  taskesBox.setAttribute("draggable", "true");
  taskesBox.addEventListener("dragstart", (e) => dragStart(e));

  return taskesBox;
}
