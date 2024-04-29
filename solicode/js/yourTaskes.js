import {
  baceURL,
  closeBtnFun,
  openWorkSection,
  setUserName,
  getData,
  sendData,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
  class_id,
} from "./functions.js";

const taskURL = baceURL + "solicode/backend/api/task.php";

// fun

closeBtnFun();
setUserName(user_name, user_img);
closeBtnFun();
checkIfuserLogin(user_id, getUserTaskes);

function btnsEvent() {
  const showBtn = document.querySelectorAll(".task-btn");
  showBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      openWorkSection();
      const task_id = e.target.parentElement.parentElement.id;
      getTaskDetailes(task_id);
    });
  });

  const goBtn = document.querySelectorAll(".task-go");
  goBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      const task_id = e.target.parentElement.parentElement.id;
      window.open("./../editor.html?task_id=" + task_id);
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
    const taskBox = document.getElementById(data.id);
    e.target.append(taskBox);
    // btnsEvent();
    document.getElementById("btnGo" + data.id).style.display = "inline-block";

    const obj = {
      student_id: user_id,
      status: e.target.id,
      task_id: data.id,
      github_url: "",
    };

    if (e.target.id === "done") {
      // to add github url
      document.getElementById("btnGo" + data.id).style.display = "none";
      const github_box = document.getElementById("github-box");
      github_box.classList.add("active");
      const sendURLBtn = document.getElementById("send-url-btn");

      sendURLBtn.addEventListener("click", () => {
        const github_url = document.getElementById("github-url").value;
        if (github_url !== "") {
          obj.github_url = github_url;
          updateTaskStatus(obj);
        }
        github_box.classList.remove("active");
        return;
      });
    }
    updateTaskStatus(obj);
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

async function updateTaskStatus(obj) {
  await sendData(taskURL, "PATCH", obj, "json");
}

// get task
async function getTaskDetailes(task_id) {
  const res = await getData(taskURL, "?id=" + task_id);
  console.log(res);
  setTaskDetailes(res[0]);
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
    taskURL,
    "?student_id=" + user_id + "&class_id=" + class_id
  );
  console.log(res);
  res.forEach((e) => {
    switch (e.status) {
      case "done":
        doneContainer.innerHTML += createTaskBox(e.id, e.title);
        // document.getElementById("btnBoxTask" + e.id).style.display = "none";
        document.getElementById("btnGo" + e.id).style.display = "none";

        break;
      case "inDoing":
        indoingContainer.innerHTML += createTaskBox(e.id, e.title);
        break;
      case "notStart":
        taskContainer.innerHTML += createTaskBox(e.id, e.title);
        document.getElementById("btnGo" + e.id).style.display = "none";
        break;
    }
  });
  addDragstart();
  btnsEvent();
}

// function createTask(id, title) {
//   const taskBox = taskContainer(id);
//   const task = document.createElement("div");
//   task.className = "task";
//   task.id = id;
//   const t = document.createElement("p");
//   t.innerHTML = title;
//   const btnDiv = document.createElement("p");
//   const showBtn = btn("Show Detailes", "task-btn", "inline-block");
//   const starCodingBtn = btn("Start Coding", "start-code", "none");

//   btnDiv.appendChild(showBtn);
//   btnDiv.appendChild(starCodingBtn);
//   task.appendChild(t);
//   task.appendChild(btnDiv);
//   taskBox.appendChild(task);

//   return taskBox;
// }

function createTaskBox(id, title) {
  return `<div class="taskes-box" id="${id}">
    <div class="task" id="${id}">
      <p>${title}</p>
      <div id="btnBoxTask${id}" style="background-color:transparent;">
        <button class="task-btn">Show Detailes</button>
        <button id="btnGo${id}" class="task-go">Go</button>
      </div>
    </div>
  </div>`;
}

function addDragstart() {
  const tasksBox = document.querySelectorAll(".taskes-box");
  tasksBox.forEach((el) => {
    el.setAttribute("draggable", "true");
    el.addEventListener("dragstart", (e) => dragStart(e));
  });
  // console.log(tasksBox);
}

// function taskContainer(id) {
//   const taskesBox = document.createElement("div");
//   taskesBox.className = "taskes-box";
//   taskesBox.id = id;

//   return taskesBox;
// }

function btn(name, className, d) {
  const btn = document.createElement("button");
  btn.className = className;
  btn.innerHTML = name;
  btn.style.display = d;

  return btn;
}

function setTaskDetailes(data) {
  document.getElementById("task-title").innerHTML = data.title;
  document.getElementById("task-text").innerHTML = data.task_body;
}
