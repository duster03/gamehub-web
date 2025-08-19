document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("https://your-app.vercel.app/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful! Redirecting to your profile...");
        window.location.href = "profile.html";
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Server error, please try again later.");
    }
  });
});
