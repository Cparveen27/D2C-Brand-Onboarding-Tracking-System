# 🚀 D2C Brand Onboarding & Tracking System

## 📌 Project Overview

A backend system to manage and track D2C brand applications.
Inspired by real-world startup workflows.



## 🧱 Tech Stack

* Node.js
* Express.js
* MySQL


## 📁 Project Structure

brand-tracking-system/
- │
- ├── controllers/
- │ ├── brandController.js 
- ├── routes/
- │ ├── brandRoutes.js
- ├── db.js                 
- ├── sql/
- │ ├── brand_system.sql   
- ├── node_modules/              
- ├── .gitignore                 
- ├── package.json               
- ├── server.js                  
- └── README.md                  

## ✨ Features

### 1. Brand Application API

* Create brand applications
* Default status: SUBMITTED

### 2. Get Brands

* Fetch all brands
* Filter by:

  * Status
  * Category

### 3. Get Single Brand

* Fetch brand details
* Includes notes

### 4. Status Management (Core Feature)

Allowed flow:
SUBMITTED → UNDER_REVIEW → SHORTLISTED → ACCEPTED / REJECTED

Rules:

* Cannot skip steps
* Cannot go backward
* Final states cannot be changed



### 5. Notes System

* Add notes to brands
* Linked with brand ID



### 6. Dashboard Summary

* Total brands
* Status-wise count



## 🗄 Database Schema

### brands table

* id
* brand_name
* founder_name
* category
* monthly_revenue
* website
* status
* created_at
* updated_at

### notes table

* id
* brand_id
* note
* created_at

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/brand-tracking-system.git
cd brand-tracking-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

* Create MySQL database: brand_system
* Import SQL file

### 4. Configure DB Connection

Update `db.js`:

```js
user: "root",
password: "your_password"
```

### 5. Run Server

```bash
node server.js
```

---

## 🔗 API Endpoints

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | /api/brands            | Create brand      |
| GET    | /api/brands            | Get all brands    |
| GET    | /api/brands/:id        | Get single brand  |
| PATCH  | /api/brands/:id/status | Update status     |
| POST   | /api/brands/:id/notes  | Add note          |
| GET    | /api/brands/summary    | Dashboard summary |



## 🧪 Testing

Use Postman to test APIs.






Your Name
