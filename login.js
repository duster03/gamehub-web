document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (response.ok && result.token) {
    // Save token in localStorage
    localStorage.setItem("authToken", result.token);

    alert("Login successful!");
    window.location.href = "index.html"; // redirect after login
  } else {
    alert(result.error || "Login failed");
  }
});
