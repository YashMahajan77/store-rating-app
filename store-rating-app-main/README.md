# Store Rating Application

A full-stack web application for managing stores, users, and store ratings with role-based access.

## About the Project

The Store Rating Application allows users to view stores and submit ratings, while administrators can manage users and stores. Store owners can view ratings and the average rating of their store.

The application is built with a React frontend, Express.js backend, and PostgreSQL database.



## Features

### Admin

- Admin login
- View dashboard statistics
- View all users
- Search and sort users
- Create users
- Create store owners
- Add stores
- Search and sort stores
- View store ratings
- Change password
- Logout

### Normal User

- User registration
- User login
- View available stores
- Search stores by name or address
- Sort stores
- Submit store ratings
- Update submitted ratings
- Change password
- Logout

### Store Owner

- Store owner login
- View owned store
- View average store rating
- View users who rated the store
- Change password
- Logout

## Technology Stack

### Frontend

- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database

- PostgreSQL

## Environment Variables

Create a `.env` file inside the `backend` folder.

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=store_rating_db
DB_USER=postgres
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret

## Project Structure

```text
store-rating-app/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── README.md

## Screenshots

### Screenshot 1

![Screenshot 1](src/assets/Screenshot%202026-09-10%20170001.png)

### Screenshot 2

![Screenshot 2](src/assets/Screenshot%202026-09-10%20170017.png)

### Screenshot 3

![Screenshot 3](src/assets/Screenshot%202026-09-10%20170037.png)

### Screenshot 4

![Screenshot 4](src/assets/Screenshot%202026-09-10%20170110.png)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
