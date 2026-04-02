# Hostel Management System Portal (AMSD)

The Hostel Management System Portal is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to manage hostel operations such as student records, room allocation, and complaint handling with a simple and efficient interface.

---

## Overview

* Type: Web Application (MERN Stack)
* Frontend: React.js
* Backend: Node.js, Express.js
* Database: MongoDB
* Architecture: REST API with MVC pattern
* Interface: Browser-based Graphical User Interface

---

## Module Features

### Admin Module

* Add, view, and delete student records
* Add and manage rooms
* Track room availability and occupancy
* View dashboard statistics (students, rooms, complaints)
* Manage complaints submitted by students

---

### Student Module

* Register and login securely
* View personal details
* Check allocated room
* Submit complaints
* View complaint status

---

## Key Design Decisions

* Role-Based Access Control:

  * Admin: Full access to system
  * Student: Limited access

* JWT Authentication:

  * Secure login using tokens
  * Middleware-based route protection

* MVC Architecture:

  * Models define database schema
  * Controllers handle business logic
  * Routes manage API endpoints

* MongoDB with Mongoose:

  * Structured schema design
  * Efficient data handling

---

## Project Structure

```id="h1"
backend/
├── controllers/
├── models/
├── routes/
├── middleware/

client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
```

---

## Setup Instructions

### Prerequisites

* Node.js (v14 or higher)
* MongoDB (local or Atlas)
* npm or yarn

---

### Backend Setup

```id="h2"
cd backend
npm install
npm start
```

---

### Frontend Setup

```id="h3"
cd client
npm install
npm start
```

---

## Environment Variables

Create a `.env` file in backend folder and add:

```id="h4"
MONGO_URI=your_mongodb_connection
PORT=5000
JWT_SECRET=your_secret_key
```

---

## Known Limitations

* No online payment integration
* Basic UI design
* No email notification system

---

## Future Scope

* Payment gateway integration
* Email notifications for complaints
* Mobile responsive improvements
* Advanced analytics dashboard
