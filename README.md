# My Express.js Application - For User Authentication with JWT and Bcrypt

This is a basic Express.js application that demonstrates user registration and authentication using bcrypt for password hashing and JWT for token-based authentication. The application renders views using EJS and serves static files from a public directory.

## Folder Structure

```
my-app
│   app.js
│   package.json
│   package-lock.json
│
├───models
│       user.js
│
├───node_modules
│
├───public
│   ├───images
│   ├───javascript
│   └───stylesheets
│
└───views
        index.ejs
        login.ejs
```

### `models/user.js`

This file contains the user model for MongoDB.

### `public`

This directory contains static assets such as images, JavaScript files, and stylesheets.

### `views`

This directory contains EJS templates for rendering the views. Currently, it includes:
- `index.ejs`: The home page.
- `login.ejs`: The login page.

### `app.js`

This is the main file of the application that sets up the Express server, handles routes, and implements user authentication.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Ahad-dev/Authentication_JWT_Bcrypt.git
   cd my-app
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the MongoDB server.

4. Run the application:
   ```sh
   node app.js
   ```

### Project Setup

1. **Express Server Setup:**
   - The Express server is set up and configured in `app.js`.
   - The application uses EJS as the view engine and serves static files from the `public` directory.

2. **User Registration and Authentication:**
   - Users can register by providing a username, name, email, and password.
   - Passwords are hashed using bcrypt before being stored in the database.
   - JWT tokens are used for authentication, and cookies are used to store the tokens.

3. **Routes:**
   - `/`: Home route that renders the `index.ejs` view.
   - `/create`: POST route for user registration. Hashes the password and stores user details in the database.
   - `/login`: GET route that renders the `login.ejs` view.
   - `/login`: POST route for user login. Verifies user credentials and sets a JWT token in cookies.
   - `/logout`: GET route that clears the JWT token cookie and redirects to the home page.
   - `/profile`: GET route that displays the user's profile if authenticated.

4. **Middleware:**
   - `isLoggedIn`: Middleware function that checks if the user is authenticated by verifying the JWT token in cookies.


## License

This project is licensed under the SIC License.
