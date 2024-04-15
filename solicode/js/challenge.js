import { closeBtnFun, openWorkSection, setUserName } from "./functions.js";

const proTitle = document.querySelectorAll(".pro-title");
const textearaIcon = document.querySelectorAll(".icon");

const user_id = sessionStorage.getItem("user_id");
const user_name = sessionStorage.getItem("user_name");
const user_img = sessionStorage.getItem("user_img");

// fun

closeBtnFun();
setUserName(user_name, user_img);

proTitle.forEach((e) => {
  e.addEventListener("click", () => {
    openWorkSection();
    editor();
  });
});

//

textearaIcon.forEach((e) => {
  e.addEventListener("click", (ev) => {
    ev.target.classList.toggle("open");
    let grid = "";
    textearaIcon.forEach((el) => {
      if (el.classList.contains("open")) {
        grid += " 1fr";
      } else {
        grid += " auto";
      }
    });
    document.getElementById("inputsBox").style.gridTemplateRows = grid;
  });
});

function editor() {
  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const jsCode = document.getElementById("js-code");

  htmlCode.addEventListener("input", () => {
    output(htmlCode.value, cssCode.value, jsCode.value);
    htmlCode.style.textDecoration = "none";
  });
  cssCode.addEventListener("input", () => {
    output(htmlCode.value, cssCode.value, jsCode.value);
    cssCode.style.textDecoration = "none";
  });
  jsCode.addEventListener("input", () => {
    output(htmlCode.value, cssCode.value, jsCode.value);
    jsCode.style.textDecoration = "none";
  });
}

function output(html = "", css = "", js = "") {
  const outputCode = document.getElementById("output");
  outputCode.contentDocument.body.innerHTML = `${html}<style>${css}</style>`;
  outputCode.contentWindow.eval(js);

  console.log();
}

// if (user_id !== null) {
// } else {
//   location.href = "http://localhost/projects/solicode/";
// }
