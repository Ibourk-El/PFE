import {baceURL} from "./functions.js";

const loginURL=baceURL+"/solicode/backend/api/login.php"
const signupURL=baceURL+"/solicode/backend/api/signup.php"

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
  const signupBox = document.getElementById("signup");
  const loginBox = document.getElementById("login");
  loginBox.style.display = activeLogin;
  signupBox.style.display = activeSignup;
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
    const req = await fetch(loginURL, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(obj),
    });
    const res = await req.json();
    if (res.status === 200) {
      sessionStorage.setItem("user_id", res.data[0].id);
      sessionStorage.setItem("user_name", res.data[0].full_name);
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
    const req = await fetch(signupURL, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(obj),
    });
    const res = await req.json();
    console.log(res);
  } else {
    msg.innerHTML = "Some Fieldes Are Empty";
  }
}
