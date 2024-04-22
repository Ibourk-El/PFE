const baceURL="http://localhost/projects/PFE/"

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
async function sendData(url, method, data) {
  const req = await fetch(url, {
    method: method,
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify(data),
  });
  return await req.json();
}

export {
  closeBtnFun,
  closeWorkSection,
  openWorkSection,
  setUserName,
  getData,
  sendData,
  baceURL
};
   