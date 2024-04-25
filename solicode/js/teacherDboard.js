import { closeBtnFun, openWorkSection, baceURL, getData } from "./functions.js";

const taskUrl = baceURL + "solicode/backend/api/task.php";

closeBtnFun();

let data = [];

let tasks = {};

async function getTask() {
  const res = await getData(taskUrl, "?class_id=2");
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

getTask();

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
  tbody.innerHTML = "";

  console.log(choseTask(id));

  choseTask(id).forEach((el) => {
    const text = `<tr>
    <th>${el.student_name}</th>
    <th class="${el.status}">${el.status}</th>
    <th class="run-btn">Run</th>
    <th>
      <select name="result" id="taskIdResult">
        <option value=""></option>
        <option value="Valid">Valid</option>
        <option value="inValid">Invalid</option>
      </select>
    </th>
  </tr>`;

    tbody.innerHTML += text;
  });
}

function choseTask(id) {
  for (let task in tasks) {
    if (tasks[task].id === id) return tasks[task].student;
  }
}
