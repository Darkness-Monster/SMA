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
        return response.json(); // Parse response JSON
      } else {
        alert("Username already exists.");
      }
    })
    .then((data) => {
      // Store the sender ID in local storage or session storage
      localStorage.setItem("userId", data.userId);
      window.location.href = "messaging.html"; // Redirect to messaging page on successful signup
    })
    .catch((error) => console.error("Error:", error));
}
