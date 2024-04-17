const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const sqlite3 = require("sqlite3").verbose(); // Import SQLite3
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// SQLite3 Database Connection
const db = new sqlite3.Database(":memory:"); // Using in-memory database for simplicity

// Create users table
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
  );
});

// Create messages table
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT, recipient TEXT, message TEXT, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
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
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.error("Error checking username:", err);
      return res.status(500).send("Internal server error.");
    }
    if (row) {
      return res.status(400).send("Username already exists.");
    }
    // Insert new user into database
    db.run(
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
  });
});

// Login Endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error("Error checking credentials:", err);
        return res.status(500).send("Internal server error.");
      }
      if (!row) {
        return res.status(401).send("Invalid username or password.");
      }
      res.status(200).send("Login successful.");
    }
  );
});

// Send Message Endpoint
app.post("/send-message", (req, res) => {
  const { sender, recipient, message } = req.body;
  db.run(
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
  db.all("SELECT * FROM messages", (err, rows) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).send("Internal server error.");
    }
    res.status(200).json(rows);
  });
});

// Schedule a cron job to clear messages older than 5 minutes every hour
cron.schedule("0 * * * *", () => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60000).toISOString(); // 5 minutes ago in ISO format

  // Delete messages older than 5 minutes
  db.run(
    "DELETE FROM messages WHERE timestamp < ?",
    [fiveMinutesAgo],
    (err) => {
      if (err) {
        console.error("Error deleting messages:", err);
        return;
      }
      console.log("Deleted messages older than 5 minutes");
    }
  );
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
