const baceURL = "http://localhost/projects/PFE/";
const user_id = sessionStorage.getItem("user_id");
const user_name = sessionStorage.getItem("user_name");
const user_img = sessionStorage.getItem("user_img");
const class_id = sessionStorage.getItem("class_id");

function setUserName(userName, imgURL) {
  document.getElementById("user-name").innerHTML = userName;
  document.getElementById("user-img").src = imgURL;
}

function closeBtnFun() {
  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", () => {
    closeWorkSection();
  });
}

function openWorkSection() {
  const work = document.getElementById("work");
  work.classList.add("open");
}

function closeWorkSection() {
  const work = document.getElementById("work");
  work.classList.remove("open");
}

async function getData(url, query) {
  const token = sessionStorage.getItem("_tk");
  const req = await fetch(url + query, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      "x-access-token": token,
      ID: user_id,
    },
  });
  return await req.json();
}

async function sendData(url, method, data, format) {
  let reqElemment;
  const token = sessionStorage.getItem("_tk");
  if (format === "json") {
    reqElemment = {
      method: method,
      headers: {
        "Content-type": "Application/json",
        "x-access-token": token,
        ID: user_id,
      },
      body: JSON.stringify(data),
    };
  } else {
    reqElemment = {
      method: method,
      body: data,
    };
  }

  const req = await fetch(url, reqElemment);
  if (req.ok) return await req.json();
  else return "connect faild";
}

function formData(files, data) {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("file[]", files[i]);
  }

  formData.append("data", JSON.stringify(data));

  return formData;
}

function textEditor(id) {
  const quill = new Quill(`#${id}`, {
    theme: "snow",
  });
  return quill;
}

function resetImagePath(imgUrl) {
  return imgUrl.replaceAll("\\", "/");
}

function checkIfuserLogin(user_id, fun) {
  if (user_id !== null) fun();
  else location.href = baceURL + "solicode/";
}

export {
  closeBtnFun,
  closeWorkSection,
  openWorkSection,
  setUserName,
  getData,
  sendData,
  formData,
  baceURL,
  textEditor,
  resetImagePath,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
  class_id,
};
