import { sendData, getData } from "./functions.js";

const sendBtn = document.getElementById("send-btn");

// const creater_id=sessionStorage.getItem("creater_id")

const taskURL = "http://localhost/projects/solicode/backend/api/task.php";

sendBtn.addEventListener("click", async () => {
  const inputs = document.querySelectorAll("input");
  const msg = document.getElementById("msg");
  const task_body = document.getElementById("task_body");
  if (task_body.value === "") {
    msg.innerHTML = "some fieldes is empty";
    return;
  }
  let obj = {
    creater_id: 1,
    task_body: task_body.value,
  };

  setDataInObj(inputs, obj);
  const res = await sendData(taskURL, "POST", obj);
  console.log(res);
});

function setDataInObj(inputs, obj) {
  inputs.forEach((el) => {
    if (el.value === "") {
      msg.innerHTML = "some fieldes is empty";
      return;
    } else {
      obj[el.name] = el.value;
    }
  });
}
