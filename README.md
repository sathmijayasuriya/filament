# **Blog Post & Categories Management System**

A full-stack application for managing blog posts and categories, built with React (Vite) and Node.js, using MySQL as the database and shadcn/ui for UI components.

---

## **Features**

- ✅ Manage categories (Add, Edit, Delete,view all,view each)
- ✅ Manage posts (Add, Edit, Delete, view all,view each)
- ✅ Image upload using Firebase Storage
- ✅ MySQL database with migrations
- ✅ Styled using Tailwind CSS and shadcn/ui

---

## **Tech Stack**

### **Frontend:**
- Vite + React
- Tailwind CSS
- shadcn/ui

### **Backend:**
- Node.js
- Express.js
- MySQL

### **Other Tools:**
- Firebase (for image uploads)
- 
##.env file

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
PORT=5000

##tables in mysql
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    visibility BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    category_id INT,
    image_path VARCHAR(255),
    tags TEXT,
    published_at TIMESTAMP NULL,
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

firebase.js file ->
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxx",
    projectId: "xxx",
    storageBucket: "xx",
    messagingSenderId: "xxx",
    appId: "xxx",
    measurementId: "xxx",
};

export const app = initializeApp(firebaseConfig);
