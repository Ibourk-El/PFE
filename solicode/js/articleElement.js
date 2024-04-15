function articleBody(articleEl) {
  return `<main class="article-box" id="${articleEl.id}">
  <div class="img-box">
    <img src="${articleEl.file_path}" alt="" />
  </div>
  <h4 class="title">${articleEl.title}</h4>
  <footer class="article-footer">
    <span>${articleEl.creater_name}</span>
    <span>${articleEl.create_at}</span>
  </footer>
</main>`;
}

function articleComment(comment) {
  return `<div class="comment">
    <div class="user-box">
      <div class="img-box">
        <img src="{comment.img}" alt="poster img" />
      </div>
      <span>${comment.creater_name}</span>
    </div>
    <p class="comment-content">
      ${comment.body}
    </p>
  </div>`;
}

export { articleBody, articleComment };
