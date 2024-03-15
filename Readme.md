# Twitter Backend

## Overview

This project is a Twitter backend built with Prisma, Node.js, and TypeScript. It provides the necessary APIs to support basic Twitter functionalities such as posting tweets, following users, and retrieving user timelines.

## Features

- **User Authentication**: Implement user authentication using JWT (JSON Web Tokens) for secure access to APIs.
- **Tweet Management**: Allow users to post, delete, and retrieve tweets.
- **User Interaction**: Enable users to follow/unfollow other users and view their timelines.
- **Data Persistence**: Utilize Prisma ORM for efficient database operations and data management.
- **Scalability**: Designed with scalability in mind to accommodate potential future growth.

## Technologies Used

- **Prisma**: ORM (Object-Relational Mapping) for database interactions.
- **Node.js**: JavaScript runtime environment for server-side development.
- **TypeScript**: Typed superset of JavaScript for enhanced code maintainability and reliability.
- **Express**: Web application framework for Node.js to handle HTTP requests.
- **JWT**: JSON Web Tokens for secure authentication and authorization.
- **PostgreSQL**: Relational database management system for data storage.

## Setup

1. **Clone the Repository**: git clone https://github.com/MrKhay/TwitterBackend.git


markdown
Copy code

2. **Install Dependencies**:
cd twitter-backend
npm install

markdown
Copy code

3. **Set Environment Variables**:
- Create a `.env` file in the root directory.
- Add environment variables such as database connection string, JWT secret, etc.

4. **Database Setup**:
- Ensure PostgreSQL is installed and running.
- Update `schema.prisma` file with your database connection details.
- Run Prisma migrations to create database tables:
  ```
  npx prisma migrate dev --name init
  ```

5. **Start the Server**:
npm start

arduino
Copy code

6. **Access APIs**:
- The server will start running at `http://localhost:3000`.
- Explore the available APIs using tools like Postman or cURL.

