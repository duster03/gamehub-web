// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Select buttons
    const playNowButton = document.querySelector(".play-now");
    const learnMoreButton = document.querySelector(".learn-more");

    // Event listener for "Play Now" button
    playNowButton.addEventListener("click", () => {
        alert("Get ready to start your adventure!");
        // Add your redirection or functionality here
        window.location.href = "#featured"; // Example: Scroll to the Featured Games section
    });

    // Event listener for "Learn More" button
    learnMoreButton.addEventListener("click", () => {
        alert("Learn more about our amazing games!");
        // Add your redirection or functionality here
        window.location.href = "#about"; // Example: Redirect to an About section or page
    });
});

