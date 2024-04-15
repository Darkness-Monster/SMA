const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; // Declare PORT only once

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sma_db",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Signup Endpoint
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }
  // Check if username already exists
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error checking username:", err);
        return res.status(500).send("Internal server error.");
      }
      if (results.length > 0) {
        return res.status(400).send("Username already exists.");
      }
      // Insert new user into database
      db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        (err) => {
          if (err) {
            console.error("Error creating user:", err);
            return res.status(500).send("Internal server error.");
          }
          res.status(200).send("Signup successful.");
        }
      );
    }
  );
});

// Login Endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Error checking credentials:", err);
        return res.status(500).send("Internal server error.");
      }
      if (results.length === 0) {
        return res.status(401).send("Invalid username or password.");
      }
      res.status(200).send("Login successful.");
    }
  );
});

// Send Message Endpoint
app.post("/send-message", (req, res) => {
  // Implementation for sending a message
  const { sender, recipient, message } = req.body;
  // Assuming you have a 'messages' table in your database
  db.query(
    "INSERT INTO messages (sender, recipient, message) VALUES (?, ?, ?)",
    [sender, recipient, message],
    (err) => {
      if (err) {
        console.error("Error sending message:", err);
        return res.status(500).send("Internal server error.");
      }
      res.status(200).send("Message sent successfully.");
    }
  );
});

// Fetch Messages Endpoint
app.get("/fetch-messages", (req, res) => {
  // Implementation for fetching messages
  // Assuming you have a 'messages' table in your database
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).send("Internal server error.");
    }
    res.status(200).json(results);
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
