import { closeBtnFun, openWorkSection } from "./functions.js";

closeBtnFun();

let data = [];

async function getTask() {
  const req = await fetch(
    "http://localhost/projects/solicode/backend/api/task.php?class_id=2"
  );
  const res = await req.json();
  res.forEach((el) => {
    let s = 0;
    let ind = 0;
    let d = 0;
    const n = JSON.parse(el.student);
    const len = n.length;
    n.forEach((e) => {
      if (e.state === "inDoing") ind++;
      if (e.state === "done") d++;
      if (e.state === "nothing") s++;
    });
    const e = createTaskBox(
      el.title,
      `not start ${s}/${len}`,
      `inDoing ${ind}/${len}`,
      `done ${d}/${len}`,
      el.id
    );
    addTaskToContainer(e);
  });
  data = [...res];
  console.log(res);
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
  let task = { ...choseTask(id) };
  let student = JSON.parse(task.student);

  student.forEach((el) => {
    const text = `<tr>
    <th>${el.student_name}</th>
    <th class="${el.state}">${el.state}</th>
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
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) return data[i];
  }
}
