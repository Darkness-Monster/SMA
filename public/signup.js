function signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        // Store the username in local storage or session storage
        localStorage.setItem("username", username);
        window.location.href = "messaging.html"; // Redirect to messaging page on successful signup
      } else {
        alert("Username already exists.");
      }
    })
    .catch((error) => console.error("Error:", error));
}
