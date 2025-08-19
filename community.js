function addPost() {
  let input = document.getElementById("postInput");
  let text = input.value.trim();

  if (text === "") {
    alert("Please write something before posting!");
    return;
  }

  let postContainer = document.getElementById("postsContainer");

  // Create post div
  let post = document.createElement("div");
  post.classList.add("post");

  // Add post content
  let content = document.createElement("p");
  content.textContent = text;

  // Add timestamp
  let timestamp = document.createElement("div");
  timestamp.classList.add("timestamp");
  let now = new Date();
  timestamp.textContent = "Posted on: " + now.toLocaleString();

  post.appendChild(content);
  post.appendChild(timestamp);

  // Add to top
  postContainer.prepend(post);

  // Clear input
  input.value = "";
}
