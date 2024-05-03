import { profileURL } from "./apiRouter.js";
import {
  checkIfuserLogin,
  setUserName,
  user_id,
  user_img,
  user_name,
  getData,
  sendData,
} from "./functions.js";

// const profileURL = baceURL + "solicode/backend/api/profile.php";
const userImageP = document.getElementById("user-img-p");

userImageP.src = user_img;
checkIfuserLogin(user_id, getStatistic);
setUserName(user_name, user_img);
setUserData();

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
});

function getStatistic() {}

async function setUserData() {
  const res = await getData(profileURL, "?id=" + user_id);
  const inputs = document.querySelectorAll(".inp");
  inputs.forEach((el) => {
    el.value = res[el.name];
  });
}

const editBtn = document.querySelectorAll(".edit");

editBtn.forEach((el) => {
  el.addEventListener("click", async (e) => {
    const inp = e.target.parentElement.children[0];
    inp.style.backgroundColor = "white";
    if (e.target.innerHTML === "Save") {
      e.target.innerHTML = "Edit";
      inp.style.backgroundColor = "var(--gray-light)";
      inp.setAttribute("readonly", "");

      const obj = { id: user_id, inp_name: inp.name, inp_value: inp.value };
      // send to update
      sessionStorage.setItem("user_name", inp.value);
      const res = await sendData(profileURL, "PUT", obj, "json");
    } else {
      e.target.innerHTML = "Save";
      inp.removeAttribute("readonly");
      inp.setAttribute("autofocus", "");
    }
    // autofocus.autofocus;
  });
});
