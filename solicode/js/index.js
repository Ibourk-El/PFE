import { loginURL, signupURL } from "./constURLs.js";

import { sendData, resetImagePath } from "./functions.js";

// const loginURL = baceURL + "solicode/backend/api/login.php";
// const signupURL = baceURL + "solicode/backend/api/signup.php";

if (sessionStorage.getItem("user_id")) {
  window.location.href = "./student/yourTaskes.html";
}

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

loginBtn.addEventListener("click", () => {
  active("flex", "none");
  if (loginBtn.innerHTML === "Send") {
    login();
  }
  loginBtn.innerHTML = "Send";
  signupBtn.innerHTML = "Signup";
});

signupBtn.addEventListener("click", () => {
  active("none", "flex");
  if (signupBtn.innerHTML === "Send") {
    signup();
  }
  signupBtn.innerHTML = "Send";
  loginBtn.innerHTML = "Login";
});

function active(activeLogin, activeSignup) {
  document.getElementById("signup").style.display = activeSignup;
  document.getElementById("login").style.display = activeLogin;
}

async function login() {
  const email = document.getElementById("login_email");
  const pwd = document.getElementById("login_pwd");
  const msg = document.getElementById("msg");
  if (email.value !== "" && pwd.value !== "") {
    const obj = {
      email: email.value,
      pwd: pwd.value,
    };
    const res = await sendData(loginURL, "POST", obj, "json");
    if (res.status === 200) {
      console.log(obj);
      sessionStorage.setItem("user_id", res.id);
      sessionStorage.setItem("user_name", res.full_name);
      sessionStorage.setItem("class_id", res.class_id);
      sessionStorage.setItem("_tk", res._tk);
      sessionStorage.setItem("user_img", resetImagePath(res.photo_path));
      window.location.href = "./student/yourTaskes.html";
    } else msg.innerHTML = res.msg;
  } else {
    msg.innerHTML = "Some Fieldes Are Empty";
  }
}

async function signup() {
  const email = document.getElementById("email");
  const fullName = document.getElementById("full_name");
  const classId = document.getElementById("class_id");
  const pwd = document.getElementById("pwd");
  const msg = document.getElementById("msg");
  if (
    email.value !== "" &&
    pwd.value !== "" &&
    fullName.value !== "" &&
    classId.value !== ""
  ) {
    const obj = {
      full_name: fullName.value,
      class_id: classId.value,
      email: email.value,
      pwd: pwd.value,
    };
    const res = await sendData(signupURL, "POST", obj, "json");
    if (res["msg"] !== "email is allready exist") {
      active("flex", "none");
      loginBtn.innerHTML = "Send";
      signupBtn.innerHTML = "Signup";
    } else {
      msg.innerHTML = res["msg"];
    }
  } else {
    msg.innerHTML = "Some Fieldes Are Empty";
  }
}

document.querySelectorAll("input").forEach((el) => {
  el.addEventListener("input", () => {
    const msg = document.getElementById("msg");
    msg.innerHTML = "";
  });
});
