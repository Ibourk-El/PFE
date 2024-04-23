import {
  baceURL,
  closeBtnFun,
  openWorkSection,
  setUserName,
  sendData,
  getData,
} from "./functions.js";

const URL = baceURL + "solicode/backend/api/problem.php";

const user_id = sessionStorage.getItem("user_id");
const user_name = sessionStorage.getItem("user_name");
const user_img = sessionStorage.getItem("user_img");
const lang = document.getElementById("lang");
const runBtn = document.getElementById("run-editor-btn");
let code = null;
let pTitle = "";

// editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setFontSize("16px");
editor.session.setMode("ace/mode/" + lang.value);

lang.addEventListener("change", () => {
  editor.session.setMode("ace/mode/" + lang.value);
  editor.setValue(code[lang.value].fun);
});

// run code
runBtn.addEventListener("click", async () => {
  const problemId = document.getElementById("problemId").value;
  const output = document.getElementById("output");
  let result = "";
  let obj = {
    userId: user_id,
    problemId: problemId,
    code: editor.getValue(),
    extantion: lang.value,
    problemTitle: pTitle,
  };
  const res = await sendData(URL, "POST", obj, "json");
  console.log(res);
  let data = { ...res.result };
  for (let el in data) {
    result += `<p><span class='${data[el].state}'>${el}</span> Result => <span>${data[el].result}</span></p>`;
  }
  output.innerHTML = result;
});

//
closeBtnFun();
setUserName(user_name, user_img);
getALLProblems();

function setEventToTitle() {
  const problemTitle = document.querySelectorAll(".pro-title");
  problemTitle.forEach((el) => {
    el.addEventListener("click", (e) => {
      openWorkSection();
      pTitle = e.target.innerHTML;
      getProblem(e.target.getAttribute("data-pro"));
    });
  });
}

async function getProblem(id) {
  const res = await getData(URL, "?id=" + id);
  document.getElementById("problemId").innerHTML = res.id;
  document.getElementById("challenge-title").innerHTML = res.title;
  document.getElementById("challenge-body").innerHTML = res.body;
  if (lang.value === "javascript") editor.setValue(res.js_fun);
  else editor.setValue(res.php_fun);
}

async function getALLProblems() {
  const res = await getData(URL, "");
  const tBody = document.getElementById("tbody");
  tBody.innerHTML = "";
  res.forEach((el) => {
    tBody.innerHTML += `
    <tr>
      <th>${el.id}</th>
      <th class="pro-title" data-pro="${el.id}">${el.title}</th>
      <th class="JS">JS</th>
      <th class="solved">58%</th>
    </tr>
    `;
  });
  setEventToTitle();
}

if (user_id !== null) {
} else {
  location.href = baceURL + "solicode/";
}
