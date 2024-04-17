import {
  baceURL,
  closeBtnFun,
  openWorkSection,
  setUserName,
} from "./functions.js";

const user_id = sessionStorage.getItem("user_id");
const user_name = sessionStorage.getItem("user_name");
const user_img = sessionStorage.getItem("user_img");
const lang = document.getElementById("lang");
const runBtn = document.getElementById("run-editor-btn");
const problemTitle = document.querySelectorAll("pro-title");

// editor
let editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setFontSize("16px");
editor.session.setMode("ace/mode/" + lang.value);

lang.addEventListener("change", () => {
  editor.session.setMode("ace/mode/" + lang.value);
  console.log(lang.value);
});
// ***************************
// editor.getSession().on("change", () => {
//   editIfrim();
// });

// to set editor value in ifrim
function editIframe() {
  const outputCode = document.getElementById("output").contentWindow.document;
  outputCode.open();
  outputCode.write(editor.getValue());
  outputCode.close();
}

// run code
runBtn.addEventListener("click", () => {
  editIframe();
});

problemTitle.forEach((e) => {
  e.addEventListener("click", () => {
    openWorkSection();
    editor();
  });
});

//
closeBtnFun();
setUserName(user_name, user_img);

if (user_id !== null) {
} else {
  location.href = baceURL + "solicode/";
}
