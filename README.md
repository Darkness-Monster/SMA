# Messaging App

This is a simple messaging app built with HTML, CSS, JavaScript, and Node.js. It allows users to sign up, log in, send messages to other users, and view received messages.

## Features

- **User Authentication**: Users can sign up for an account with a unique username and password. They can then log in to access the messaging functionality.
  
- **Sending Messages**: Logged-in users can compose and send messages to other users by specifying the recipient and the message content.
  
- **Viewing Messages**: Users can view the messages they have received from other users.

## Installation

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/Darkness-Monster/SMA.git
   ```

2. Navigate to the project directory:
   ```
   cd SMA
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Open your web browser and go to `http://localhost:3000` to access the application.

3. You will see the login page where you can log in with your username and password if you already have an account. Otherwise, you can sign up for a new account.

4. After logging in, you will be redirected to the messaging page where you can compose and send messages.

5. You can also log out by clicking the "Logout" button.

## File Structure

- **public**: Contains the HTML, CSS, and JavaScript files for the client-side application.
  - `index.html`: Login page.
  - `signup.html`: Signup page.
  - `messaging.html`: Messaging page.
  - `login.js`: JavaScript file for handling login functionality.
  - `signup.js`: JavaScript file for handling signup functionality.
  - `messaging.js`: JavaScript file for handling messaging functionality.

- **server.js**: Node.js server file responsible for handling HTTP requests, user authentication, and message management.

## Dependencies

- `express`: Web application framework for Node.js.
- `body-parser`: Middleware for parsing JSON request bodies.
- `node-cron`: Cron-like job scheduler for Node.js.
- `sqlite3`: SQLite database driver for Node.js.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
