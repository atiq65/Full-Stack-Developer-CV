document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("commentForm");
  const commentNameInput = document.getElementById("commenterName");
  const commentTextInput = document.getElementById("commentText");
  const commentsContainer = document.getElementById("commentsContainer");

  // Load saved comments from localStorage on page load
  loadComments();

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = commentNameInput.value.trim();
    const text = commentTextInput.value.trim();

    if (name && text) {
      const newComment = {
        name: name,
        text: text,
        date: new Date().toLocaleDateString(),
      };

      saveComment(newComment);
      appendCommentToDOM(newComment);

      // Reset form fields
      commentNameInput.value = "";
      commentTextInput.value = "";
    }
  });

  function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem("cvComments")) || [];
    comments.push(comment);
    localStorage.setItem("cvComments", JSON.stringify(comments));
  }

  function loadComments() {
    let comments = JSON.parse(localStorage.getItem("cvComments")) || [];
    comments.forEach((comment) => {
      appendCommentToDOM(comment);
    });
  }

  function appendCommentToDOM(comment) {
    const commentCard = document.createElement("div");
    commentCard.className = "comment-card";
    commentCard.innerHTML = `
            <div class="comment-user">${escapeHTML(comment.name)} <span style="font-size: 11px; color: #6b7280; font-weight: normal; float: right;">${comment.date}</span></div>
            <div class="comment-body">${escapeHTML(comment.text)}</div>
        `;
    commentsContainer.prepend(commentCard);
  }

  // Security helper to prevent XSS injection
  function escapeHTML(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[tag] || tag,
    );
  }
});
