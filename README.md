# Contact Manager - Full Stack Application

A full-stack contact management application built with Node.js, Express, MongoDB, and React. This application allows users to register, login, and manage their personal contacts with full CRUD operations.

##  Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Contact Management**: Create, read, update, and delete contacts
- **Protected Routes**: Authentication required for contact operations
- **Responsive UI**: Clean and intuitive user interface
- **RESTful API**: Well-structured backend API endpoints
- **Data Validation**: Input validation and error handling
- **Secure**: Password hashing and token-based authentication

##  Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - Frontend library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

##  Project Structure

```
ContactManager/
├── config/
│   └── dbConnection.js
├── controllers/
│   ├── contactControllers.js
│   └── userControllers.js
├── middlewares/
│   ├── errorHandler.js
│   └── validateTokenHandler.js
│── models/
│   ├── contactDataModel.js
│   └── userDataModel.js
├── routes/
│   ├── contactRoutes.js
│   └── userRoutes.js
├── .env
├── constants.js
├── package.json
├── server.js
frontend/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Contacts.jsx
│   ├── services/
│   │   └── api.js
│   └── App.js
├── package.json
└── public/
```

##  Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ContactManager
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   CONNECTION_STRING=mongodb://localhost:27017/contactmanager
   ACCESS_TOKEN_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

##  API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/user/register`
- **Body**: `{ "userName": "string", "email": "string", "password": "string" }`
- **Response**: User registration confirmation

#### Login User
- **POST** `/user/login`
- **Body**: `{ "email": "string", "password": "string" }`
- **Response**: `{ "accessToken": "jwt_token", "user": {...} }`

#### Get Current User
- **GET** `/user/current`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Current user information

### Contact Endpoints

All contact endpoints require authentication (Bearer token).

#### Get All Contacts
- **GET** `/contact`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of user's contacts

#### Get Single Contact
- **GET** `/contact/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Single contact object

#### Create Contact
- **POST** `/contact`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name": "string", "contactNo": "string", "email": "string" }`
- **Response**: Created contact object

#### Update Contact
- **PUT** `/contact/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name": "string", "contactNo": "string", "email": "string" }`
- **Response**: Updated contact object

#### Delete Contact
- **DELETE** `/contact/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Deletion confirmation

##  Database Schema

### User Model
```javascript
{
  userName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Contact Model
```javascript
{
  user_id: ObjectId (required, ref: User),
  name: String (required),
  contactNo: String (required),
  email: String (required),
  timestamps: true
}
```

##  Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Contact operations require valid authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup

##  Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials to receive an authentication token
3. **Manage Contacts**: 
   - View all your contacts on the dashboard
   - Add new contacts with name, phone, and email
   - Edit existing contact information
   - Delete contacts you no longer need
4. **Logout**: Securely log out to clear your session


##  Author

**Antony Fidel Castro A**
- GitHub: [@fidelcastropro](https://github.com/fidelcastropro)
- Email: fidelcastropro6@gmail.com

##  Acknowledgments

- Express.js community for the excellent web framework
- MongoDB team for the robust database solution
- React team for the powerful frontend library
- JWT.io for authentication standards

---

**Note**: Make sure to replace placeholder values in the `.env` file with your actual MongoDB connection string and JWT secret before running the application.