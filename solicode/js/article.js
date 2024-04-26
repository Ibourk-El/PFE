import {
  baceURL,
  closeBtnFun,
  openWorkSection,
  setUserName,
  getData,
  sendData,
  closeWorkSection,
  formData,
  textEditor,
  checkIfuserLogin,
  user_id,
  user_img,
  user_name,
} from "./functions.js";

import { articleBody, articleComment } from "./articleElement.js";

const articleURL = baceURL + "solicode/backend/api/article.php";
const commentURL = baceURL + "solicode/backend/api/comment.php";

const addBtn = document.getElementById("add-btn");
const sendArticleBtn = document.getElementById("send");
const filterBtn = document.getElementById("filter-btn");
const sendCommentBtn = document.getElementById("send-comment");

let txtEditor;
window.onloadeddata = () => {
  txtEditor = textEditor("editor");
};

// if user id is not in session

// fun

closeBtnFun();
setUserName(user_name, user_img);
setImgUserNameInCom(user_img, user_name);
checkIfuserLogin(user_id, getAllArticles);

//

addBtn.addEventListener("click", () => {
  openWorkSection();
  const articleContiner = document.getElementById("article-container");
  articleContiner.style.display = "none";
  const articleForm = document.getElementById("article-form");
  articleForm.style.display = "flex";
});

sendArticleBtn.addEventListener("click", async () => {
  const title = document.getElementById("title");
  // const body = document.getElementById("body");
  const body = txtEditor.getSemanticHTML();
  const file = document.getElementById("file").files;

  if (title.value !== "" && body.value !== "") {
    const obj = {
      title: title.value,
      body: body,
      creater_id: user_id,
      creater_name: user_name,
    };
    const res = await sendData(articleURL, "POST", formData(file, obj), "");
    console.log(res);
    closeWorkSection();
    title.value = "";
  } else {
    console.log("same field is empty");
  }
});

filterBtn.addEventListener("click", async () => {
  const res = await getData(articleURL, "?creater_id=" + user_id);
  addArticlesToTheBox(res);
});

async function getAllArticles() {
  const res = await getData(articleURL, "");
  addArticlesToTheBox(res);
}

// send comment
sendCommentBtn.addEventListener("click", async () => {
  const body = document.getElementById("comment-body");
  const comments = document.getElementById("comments");
  if (body.value !== "") {
    const obj = {
      creater_id: user_id,
      creater_name: user_name,
      body: body.value,
      catigory: "article",
      catigory_id: sendCommentBtn.getAttribute("data-id"),
    };
    body.value = "";
    const res = await sendData(commentURL, "POST", obj, "json");
    comments.innerHTML = articleComment(obj) + comments.innerHTML;
  } else {
    console.log("the comment is empty");
  }
});

function addArticlesToTheBox(res) {
  const con = document.getElementById("articles-container");
  con.innerHTML = "";
  res.data.forEach((el) => {
    con.innerHTML += articleBody(el);
  });
  setClickEventToArticleBox();
}

function setClickEventToArticleBox() {
  const articleBox = document.querySelectorAll(".article-box");
  articleBox.forEach((el) => {
    el.addEventListener("click", (e) => {
      openWorkSection();
      const articleContianer = document.getElementById("article-container");
      articleContianer.style.display = "block";
      const articleForm = document.getElementById("article-form");
      articleForm.style.display = "none";
      setArticle(e.target.id);
      setComments(e.target.id);
    });
  });

  async function setComments(id) {
    const res = await getData(
      commentURL,
      `?catigory=article&catigory_id=${id}`
    );
    const comments = document.getElementById("comments");
    comments.innerHTML = "";
    res.data.forEach((el) => {
      comments.innerHTML = articleComment(el) + comments.innerHTML;
    });
  }
}

async function setArticle(id) {
  const res = await getData(articleURL, `?id=${id}`);
  const aBody = document.getElementById("article-text");
  const aTitle = document.getElementById("article-title");
  sendCommentBtn.setAttribute("data-id", id);
  aBody.innerHTML = res.data[0].body;
  aTitle.innerHTML = res.data[0].title;
}

function setImgUserNameInCom(imgSRC, name) {
  document.getElementById("user_img_com").src = imgSRC;
  document.getElementById("user_name_com").innerHTML = name;
}
