document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        localStorage.setItem("loggedInUser", username);
        alert("Login successful! Redirecting to your profile...");
        window.location.href = "profile.html";
    });
});
