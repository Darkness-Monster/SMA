function sendMessage() {
    const recipient = document.getElementById("recipient").value;
    const message = document.getElementById("message").value;
    const sender = localStorage.getItem("username"); // Retrieve the username from local storage

    // Make a fetch request to send the message to the server
    fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender, recipient, message }),
    })
    .then((response) => {
        if (response.ok) {
            // Clear the input fields after sending the message
            document.getElementById("recipient").value = "";
            document.getElementById("message").value = "";
            // Optionally, update the UI to indicate that the message was sent
        } else {
            // Handle errors if any
            console.error("Failed to send message:", response.statusText);
        }
    })
    .catch((error) => {
        console.error("Error sending message:", error);
    });
}


// Function to fetch and display messages
function fetchMessages() {
  // Make a fetch request to get messages from the server
  fetch("/fetch-messages")
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse response JSON
      } else {
        // Handle errors if any
        console.error("Failed to fetch messages:", response.statusText);
        throw new Error("Failed to fetch messages");
      }
    })
    .then((data) => {
      // Display messages in the UI
      const messageContainer = document.getElementById("messageContainer");
      messageContainer.innerHTML = ""; // Clear previous messages
      data.forEach((message) => {
        // Create HTML elements for each message and append to message container
        const messageElement = document.createElement("div");
        messageElement.textContent = `${message.sender}: ${message.text}`;
        messageContainer.appendChild(messageElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
    });
}

// Fetch messages when the page loads
window.addEventListener("load", fetchMessages);

// Set up a timer to periodically fetch messages (e.g., every 5 seconds)
setInterval(fetchMessages, 5000);
