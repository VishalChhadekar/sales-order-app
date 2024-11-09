# My Store – Backend

This is the backend server for the **My Store** e-commerce application, built with **Express** and **PostgreSQL**.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Server](#running-the-server)
7. [Deployment](#deployment)
8. [API Endpoints](#api-endpoints)
9. [Technologies Used](#technologies-used)
10. [Contact](#contact)

---

## Project Overview

The backend of the My Store platform is built with **Express.js** and connects to a **PostgreSQL** database to handle product management, order management, and more. This server also includes **Redis** for caching frequently accessed data.

---

## Features

- **Product Management**: CRUD operations for products.
- **Order Management**: Create, read, and filter sales orders.
- **Search and Filtering**: Search products and orders with query parameters.
- **Caching**: Uses Redis for caching to enhance performance.

---

## Prerequisites

Before setting up the backend application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://npmjs.com/)
- PostgreSQL database (with credentials for connection)
- Redis instance (for caching, optional but recommended)

---

## Installation

1. **Clone the Repository**:

    ```bash
    git clone <backend-repo-url>
    cd backend
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

---

## Configuration

1. **Create a `.env` file** in the root directory and add the following environment variables:

    ```plaintext
    PORT=3000
    DATABASE_URL=your_postgresql_database_url
    REDIS_URL=your_redis_url
    ```

2. **Run Migrations** to set up the database schema:

    ```bash
    npx sequelize-cli db:migrate
    ```

3. (Optional) **Seed Database** with sample data:

    ```bash
    npx sequelize-cli db:seed:all
    ```

---

## Running the Server

1. **Start the server**:

    ```bash
    npm start
    ```

2. The backend server should now be running at `http://localhost:3000`.

---

## Deployment

To deploy the backend on **Render**, **Heroku**, or similar platforms:

1. **Push your code** to a Git repository.
2. **Deploy to Render/Heroku** and set up environment variables:
   - `DATABASE_URL`: Connection string for PostgreSQL
   - `REDIS_URL`: Connection string for Redis (optional)

3. **Set Up Database and Redis** as external resources on the deployment platform.

---

## API Endpoints

### Products API

| Endpoint                   | Method | Description                              |
|----------------------------|--------|------------------------------------------|
| `/api/products`            | GET    | Retrieve all products                    |
| `/api/products?search=...` | GET    | Search products by name or other filters |
| `/api/products/:id`        | GET    | Retrieve a product by ID                 |
| `/api/products`            | POST   | Create a new product                     |
| `/api/products/:id`        | PUT    | Update an existing product               |
| `/api/products/:id`        | DELETE | Delete a product                         |

### Sales Orders API

| Endpoint                   | Method | Description                              |
|----------------------------|--------|------------------------------------------|
| `/api/sales-orders`        | POST   | Create a new sales order                 |
| `/api/sales-orders/:id`    | GET    | Retrieve a sales order by ID             |
| `/api/sales-orders`        | GET    | Retrieve all sales orders with filters   |

### Example `curl` Commands

**Get All Products**

```bash
curl -X GET "https://orderease-sll9.onrender.com/api/products"
