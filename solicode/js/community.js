import {
  baceURL,
  closeBtnFun,
  openWorkSection,
  closeWorkSection,
  setUserName,
  getData,
  sendData,
} from "./functions.js";
import { post, setAllComment } from "./postElement.js";

const sendPostBtn = document.getElementById("send-btn");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");

const user_id = sessionStorage.getItem("user_id");
const user_name = sessionStorage.getItem("user_name");
const user_img = sessionStorage.getItem("user_img");

const communityURL =
  baceURL+"solicode/backend/api/community.php";
const commentURL = baceURL+"solicode/backend/api/comment.php";

if (user_id !== null) {
} else {
  location.href = baceURL+"solicode/";
}

closeBtnFun();
setUserName(user_name, user_img);
getAllPosts();

async function getAllPosts() {
  const res = await getData(communityURL, "");
  setPosts(res.data, "");
}

function setPosts(data, activeMenu) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";
  data.forEach((el) => {
    let color = "";
    let likes = JSON.parse(el.likes);
    likes.students_IDs.forEach((el) => {
      if (el == user_id) color = "add-like";
    });

    postsContainer.innerHTML += post(
      el.id,
      "",
      el.creater_name,
      el.post_body,
      el.file_path,
      el.create_at,
      { num: likes.likes, color: color },
      activeMenu
    );
  });

  addClickTOcommentBtn();

  addLikeEvent();

  iconMenuEvent();
}

//

addBtn.addEventListener("click", openWorkSection);

sendPostBtn.addEventListener("click", async () => {
  const body = document.getElementById("body");
  const file = document.getElementById("file");

  if (body.value !== "") {
    if (sendPostBtn.innerHTML === "Send") {
      // to create the post
      const obj = {
        post_body: body.value,
        file_path: file.value,
        creater_id: user_id,
        creater_name: user_name,
        likes: {
          likes: 0,
          students_IDs: [],
        },
      };
      const res = await sendData(communityURL, "POST", obj);
    } else {
      // to update the post
      const obj = {
        id: document.getElementById("post_id_input").value,
        post_body: body.value,
        file_path: file.value,
      };
      const res = await sendData(communityURL, "PUT", obj);
      console.log(res);
    }
    sendPostBtn.innerHTML = "Send";
    body.value = "";
    file.value = "";
    closeWorkSection();
  } else {
    console.log("same field is empty");
  }
});

filterBtn.addEventListener("click", async () => {
  const res = await getData(
    communityURL,
    "?creater_id=" + user_id + "&key=creater_id"
  );
  setPosts(res.data, "active");
});

function sendComment(parent) {
  const sendCommentBtn = parent.querySelector("#send-comment");
  sendCommentBtn.addEventListener("click", async () => {
    const body = parent.querySelector("#comment-body").value;
    if (body !== "") {
      const obj = {
        creater_id: user_id,
        creater_name: user_name,
        body: body,
        catigory: "post",
        catigory_id: parent.id,
      };
      // add comment before send it to backend
      setAllComment(
        [obj],
        parent.children[1].querySelector("#all-comment-box")
      );
      parent.querySelector("#comment-body").value = "";
      // send req
      await sendData(commentURL, "POST", obj);
    } else {
      console.log("the comment is empty");
    }
  });
}

function addClickTOcommentBtn() {
  const commentBtn = document.querySelectorAll(".comment-btn");
  commentBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
      const parent = e.target.parentElement.parentElement.parentElement;

      sendComment(parent);
      parent.children[1].classList.toggle("open");
      getComments(
        parent.id,
        parent.children[1].querySelector("#all-comment-box")
      );
    });
  });
}

// get all comment
async function getComments(id, con) {
  const res = await getData(
    commentURL,
    "?catigory_id=" + id + "&catigory=post"
  );
  // add comment to the post
  setAllComment(res.data, con);
}

function addLikeEvent() {
  const likeBtn = document.querySelectorAll(".likes");
  likeBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      const parent = e.target.parentElement.parentElement.parentElement;
      // change style and add number of likes
      const numOflikes = +e.target.children[0].innerHTML;
      e.target.children[0].innerHTML = numOflikes + 1;
      e.target.classList.add("add-like");
      updatePostLikes(parent.id, numOflikes);
    });
  });
}

async function updatePostLikes(pId, pLikes) {
  let obj = {
    id: pId,
    user_id: user_id,
    likes: ++pLikes,
  };
  await sendData(communityURL, "PATCH", obj);
}

function iconMenuEvent() {
  const iconMenuBtn = document.querySelectorAll(".menu-icon");
  iconMenuBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      parent.children[1].classList.toggle("active");
      editPostEvent(parent);
      deletePostEvent(parent);
    });
  });
}

function editPostEvent(parent) {
  let editBtn = parent.querySelector(".edit-post");
  editBtn.addEventListener("click", async (e) => {
    const postId = parent.parentElement.parentElement.parentElement.id;
    openWorkSection();
    const res = await getData(communityURL, "?id=" + postId + "&key=id");
    sendPostBtn.innerHTML = "Edit";
    setDataInEditBox(res.data[0]);
    parent.children[1].classList.toggle("active");
  });
}

function deletePostEvent(parent, id) {
  let deleteBtn = parent.querySelector(".delete-post");
  deleteBtn.addEventListener("click", async () => {
    const postId = parent.parentElement.parentElement.parentElement.id;
    const res = await sendData(communityURL, "DELETE", { id: postId });
    console.log(res);
    parent.children[1].classList.toggle("active");  });
}

function setDataInEditBox(data) {
  const body = document.getElementById("body");
  const postId = document.getElementById("post_id_input");
  body.innerHTML = data.post_body;
  postId.value = data.id;
}
