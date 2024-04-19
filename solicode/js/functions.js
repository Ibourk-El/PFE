const baceURL = "http://localhost/projects/PFE/";

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
  const req = await fetch(url + query);
  return await req.json();
}

async function sendData(url, method, data, format) {
  let reqElemment;
  if (format === "json") {
    reqElemment = {
      method: method,
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(data),
    };
  } else {
    reqElemment = {
      method: method,
      body: data,
    };
  }

  const req = await fetch(url, reqElemment);
  return await req.json();
}

function formData(files, data) {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("file[]", files[i]);
  }

  formData.append("data", JSON.stringify(data));

  return formData;
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
};
