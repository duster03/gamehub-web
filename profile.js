document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("loggedInUser");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const logoutButton = document.getElementById("logoutButton");

    if (username) {
        usernameDisplay.innerText = username;
    } else {
        alert("You are not logged in! Redirecting to login...");
        window.location.href = "login.html";
    }

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        alert("You have logged out!");
        window.location.href = "index.html";
    });
});
