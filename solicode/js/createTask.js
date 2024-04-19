import { sendData, getData, baceURL, formData } from "./functions.js";

const sendBtn = document.getElementById("send-btn");

// const creater_id=sessionStorage.getItem("creater_id")

const taskURL = baceURL + "solicode/backend/api/task.php";

sendBtn.addEventListener("click", async () => {
  const msg = document.getElementById("msg");
  const task_body = document.getElementById("task_body");
  const class_id = document.getElementById("class_id");
  const title = document.getElementById("title");
  const files = document.getElementById("files").files;
  if (task_body.value !== "" && title.value !== "" && class_id.value !== "") {
    let obj = {
      creater_id: 1,
      task_body: task_body.value,
      class_id: class_id.value,
      title: title.value,
    };

    const res = await sendData(taskURL, "POST", formData(files, obj), "");
    console.log(res);
  } else {
    msg.innerHTML = "some fieldes is empty";
  }
});
