function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = "messaging.html"; // Redirect to messaging page on successful login
            } else {
                alert("Invalid username or password.");
            }
        })
        .catch((error) => console.error("Error:", error));
}
