import { taskURL } from "./apiRouter.js";

import {
  closeBtnFun,
  openWorkSection,
  getData,
  sendData,
} from "./functions.js";

let tasks = {};

closeBtnFun();
getTask();

async function getTask() {
  const res = await getData(taskURL, "?class_id=2");
  console.log(res);

  res.forEach((el) => {
    const taskNum = "task " + el.id;
    if (taskNum in tasks) {
      tasks[taskNum].student.push({
        student_id: el.student_id,
        status: el.status,
        student_name: el.full_name,
      });
    } else {
      tasks[taskNum] = {
        id: el.id,
        title: el.title,
        task_body: el.task_body,
        file_path: el.file_path,
        student: [
          {
            student_id: el.student_id,
            status: el.status,
            student_name: el.full_name,
          },
        ],
      };
    }
  });

  console.log(tasks);

  for (let task in tasks) {
    let s = 0;
    let ind = 0;
    let d = 0;
    const len = tasks[task].student.length;
    tasks[task].student.forEach((e) => {
      if (e.status === "inDoing") ind++;
      if (e.status === "done") d++;
      if (e.status === "notStart") s++;
    });
    const e = createTaskBox(
      tasks[task].title,
      `notstart ${s}/${len}`,
      `inDoing ${ind}/${len}`,
      `done ${d}/${len}`,
      tasks[task].id
    );
    addTaskToContainer(e);
  }
}

function addTaskToContainer(task) {
  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(task);
}

function createTaskBox(task_title, s, ind, d, id) {
  const main = document.createElement("main");
  main.className = "task-box";
  main.id = id;
  main.innerHTML += `<h3 class="title">${task_title}</h3>
  <footer>
    <span class="notStart">${s}</span>
    <span class="inDoing">${ind}</span
    ><span class="done">${d}</span>
  </footer>`;
  main.addEventListener("click", () => {
    const titleTask = document.getElementById("taskTitle");
    titleTask.innerHTML = task_title;
    openWorkSection();
    setDataInTable(id);
  });
  return main;
}

function setDataInTable(id) {
  const tbody = document.getElementById("tbody");
  document.getElementById("task_id").value = id;
  tbody.innerHTML = "";

  console.log(choseTask(id));

  choseTask(id).forEach((el) => {
    console.log(el.student_id);
    const text = `<tr>
    <th>${el.student_name}</th>
    <th class="${el.status}">${el.status}</th>
    <th class="btn run-btn">Run</th>
    <th>
      <select name="result" id="studentResult${el.student_id}">
        <option value=""></option>
        <option value="valid">Valid</option>
        <option value="invalid">Invalid</option>
      </select>
    </th>
    <th><input id="studentPoint${el.student_id}" style="width:60px;padding:5px;" type="number" /></th>
    <th class="btn save-btn" data-id="${el.student_id}">Save</th>
  </tr>`;

    tbody.innerHTML += text;
  });
  addEventToRunBtns();
  addEventToSaveBtns();
}

function choseTask(id) {
  for (let task in tasks) {
    if (tasks[task].id === id) return tasks[task].student;
  }
}

function addEventToRunBtns() {
  const runBtns = document.querySelectorAll(".run-btn");
  const taskId = document.getElementById("task_id").value;
  runBtns.forEach((el) => {
    el.addEventListener("click", () => {
      window.open("./../editor.html?task_id=" + taskId);
    });
  });
}

function addEventToSaveBtns() {
  const runBtns = document.querySelectorAll(".save-btn");
  const taskId = document.getElementById("task_id").value;
  runBtns.forEach((el) => {
    el.addEventListener("click", async (e) => {
      const studentId = e.target.getAttribute("data-id");
      const select = document.getElementById(`studentResult${studentId}`).value;
      const point = document.getElementById(`studentPoint${studentId}`).value;
      const obj = {
        student_id: studentId,
        task_id: taskId,
        status: select,
        point: point,
      };
      // console.log(e.target.getAttribute("data-id"));
      await sendData(taskURL, "PUT", obj, "json");
    });
  });
}
