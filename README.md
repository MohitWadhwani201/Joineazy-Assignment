# 📝 Joineazy Assignment Management System

**[Node.js v18+] [React v18+] [PostgreSQL v15] **

A full-stack assignment management platform for admins and students, featuring group-wise submissions, OneDrive integration, and detailed reporting.  

---

## 🌟 Features

- **Admin Dashboard**
  - Create, update, delete assignments
  - Assign assignments to specific groups or all students
  - View group-wise submission status
  - Detailed assignment reports

- **Student Dashboard**
  - View assignments (group-specific or general)
  - Submit assignments and track status

- **Group Management**
  - Create groups with a leader
  - Add members to groups
  - Track submissions at both group and individual levels

- **Submission Management**
  - View which members of a group submitted or not
  - Admin reports for overall submission tracking

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access: admin and student

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express, Sequelize ORM, PostgreSQL  
- **Frontend:** React, Axios, React Router DOM  
- **Authentication:** JWT, bcrypt  
- **Styling:** Tailwind CSS  
- **Other:** OneDrive integration for assignments  

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v18+
- npm or yarn
- PostgreSQL
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/joineazy.git
cd joineazy/joineazy-backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=joineazy
JWT_SECRET=your_jwt_secret
```

```bash
# Create the database in PostgreSQL
CREATE DATABASE joineazy;

# Start the backend server
npm start
```

### Frontend Setup

```bash
cd ../joineazy-frontend

# Install dependencies
npm install

# Start the frontend
npm start
```

Frontend will run on `http://localhost:5173`  

Backend will run on `http://localhost:3000`  

---

## 🔗 API Endpoints

**Assignment Routes**

| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| POST   | /api/assignments | Create a new assignment | Admin |
| GET    | /api/assignments/admin | Get all assignments with group status | Admin |
| GET    | /api/assignments/student | Get assignments for student | Student |
| PUT    | /api/assignments/:id | Update an assignment | Admin |
| DELETE | /api/assignments/:id | Delete an assignment | Admin |
| GET    | /api/assignments/:assignmentId/group-status | Get group-wise submission status | Admin |

**Authentication Routes**

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | /api/auth/login | Login for admin/student |
| POST   | /api/auth/register | Register a student (admin registers groups) |

---

## 📂 Project Structure

```
joineazy/
│
├── joineazy-backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── assignmentController.js
│   │   └── groupController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Group.js
│   │   ├── Assignment.js
│   │   └── Submission.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── assignmentRoutes.js
│   │   └── groupRoutes.js
│   │
│   └── server.js
│
├── joineazy-frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## 💻 Usage

1. Login as **admin**  
2. Create assignments and assign them to groups  
3. Students log in to view assignments  
4. Admin checks group-wise submissions and individual student status  

---

## 🔐 Roles & Permissions

- **Admin:** Can manage assignments, groups, and view detailed reports  
- **Student:** Can view assignments, submit work, and track status  

---

## ⚡ Future Enhancements

- Email notifications for new assignments  
- Direct file upload instead of OneDrive links  
- Advanced analytics: submission trends and delays  
- Expanded role management (teachers, assistants, etc.)  

