# My Store – Backend

This is the backend server for the **My Store** e-commerce application, built with **Express** and **PostgreSQL**.

## Table of Contents
- [Setup](#setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://npmjs.com/)
- PostgreSQL database credentials
- Redis instance for caching

### Installation

1. Clone the repository:

    ```bash
    git clone <backend-repo-url>
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory:

    ```plaintext
    PORT=3000
    DATABASE_URL=your_database_url
    REDIS_URL=your_redis_url
    ```

4. Run migrations and seed data (if any):

    ```bash
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```

5. Start the server:

    ```bash
    npm start
    ```

The backend server should be running at `http://localhost:3000`.

---

## Usage

To run the server:

```bash
npm start
