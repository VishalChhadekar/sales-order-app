
---

## Frontend `README.md`

### `frontend/README.md`

```markdown
# My Store – Frontend

This is the frontend client for the **My Store** e-commerce application, built with **Angular** and styled using **Tailwind CSS**.

## Table of Contents
- [Setup](#setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://npmjs.com/)
- Angular CLI:

    ```bash
    npm install -g @angular/cli
    ```

### Installation

1. Clone the repository:

    ```bash
    git clone <frontend-repo-url>
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create `src/environments/environment.ts` for development environment:

    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000/api'
    };
    ```

4. Run the frontend application:

    ```bash
    ng serve
    ```

The frontend should be accessible at `http://localhost:4200`.

---

## Usage

To start the Angular development server:

```bash
ng serve
