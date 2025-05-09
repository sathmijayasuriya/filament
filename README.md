# Blog Post & Categories Management System

A full-stack application for managing blog posts and categories.

---

## Features

- **Category Management:**
    - Add, Edit, Delete, View all, and View individual categories.
- **Post Management:**
    - Add, Edit, Delete, View all, and View individual posts.
- **Image Upload:**
    - Integrated image upload using Firebase Storage.
- **Database:**
    - MySQL database with migrations.
- **Styling:**
    - Styled using Tailwind CSS and shadcn/ui for a modern user interface.

---

## Tech Stack

### Frontend

- **React + vite:** 
- **Tailwind CSS:** 
- **shadcn/ui:** 

### Backend

- **Node.js:** For server-side logic and API development.
- **Express.js:** For building the RESTful API.
- **MySQL:** As the relational database for storing application data.

### Other Tools

- **Firebase:** For image storage and handling uploads.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- MySQL Server
- Firebase Project with Storage enabled
- Basic understanding of React, Node.js, and MySQL.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Backend Setup:**

    -   Navigate to the backend directory:

        ```bash
        cd backend
        ```

    -   Install dependencies:

        ```bash
        npm install
        ```

    -   Create a `.env` file in the backend directory and populate it with your MySQL and port configurations:

        ```dotenv
        DB_HOST=localhost
        DB_USER=your_mysql_username
        DB_PASSWORD=your_mysql_password
        DB_NAME=your_database_name
        PORT=5000
        ```

    -   Create the MySQL database and tables:

        ```sql
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
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        );
        ```

    -   Start the backend server:

        ```bash
        node index.js    
        ```

3.  **Frontend Setup:**

    -   Navigate to the frontend directory:

        ```bash
        cd ../frontend
        ```

    -   Install dependencies:

        ```bash
        npm install
        ```

    -   Create a `firebase.js` file in the `src` directory with your Firebase configuration:

        ```javascript
        import { initializeApp } from "firebase/app";

        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID",
            measurementId: "YOUR_MEASUREMENT_ID",
        };

        export const app = initializeApp(firebaseConfig);
        ```

    -   Start the frontend development server:

        ```bash
        npm run dev
        ```

4.  **Access the Application:**

    -   Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

---
