
```
# Real-Time Messaging App

This is a simple real-time messaging app built using **Express.js** for the server-side and **vanilla JavaScript** for the client-side.

## Features

- **User Signup/Login**: Users can sign up with a username and password, and then log in to access the messaging functionality.
- **Real-Time Messaging**: Users can send messages to each other in real-time.
- **Automatic Message Fetching**: The app automatically fetches new messages at regular intervals without requiring manual refresh.

## Technologies Used

- **Express.js**: Backend framework for handling HTTP requests and managing routes.
- **MySQL**: Database management system for storing user information and messages.
- **Vanilla JavaScript**: Frontend scripting language for dynamic interactions and AJAX requests.
- **HTML/CSS**: Frontend markup and styling.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd real-time-messaging-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MySQL database:

   - Create a new MySQL database.
   - Update the database configuration in `server.js` file with your database credentials.

4. Run the server:

   ```bash
   node server.js
   ```

5. Access the app in your browser at `http://localhost:3000`.

## Usage

1. Sign up for a new account with a unique username and password.
2. Log in with your username and password.
3. Start sending messages to other users in real-time.

## Contributing

Contributions are welcome! Please feel free to submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
```
