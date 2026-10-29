# WMS-LienDinh 
---
## Introduction
Welcome to WMS-LienDinh, a Warehouse Management System (WMS) Dashboard built with React, TypeScript, Tailwind CSS, and Chart.js. This project provides an intuitive and responsive interface for monitoring warehouse operations, visualizing inventory data, and tracking key performance indicators, including inbound and outbound goods, stock levels, net stock flow, and defective inventory.


## Dummy User Accounts

| Email (Normal User) | Password |
| ------------------- | -------- |
| admin@gmail.com     | admin123 |

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Recharts](https://recharts.org)


## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/phamminhhiepcoder/WMS-LienDinh.git
    cd WMS-LienDinh
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the app:

    ```bash
    npm run dev
    ```

## Features

| Feature                          | Description                                                                  |
|----------------------------------|------------------------------------------------------------------------------|
| Warehouse Dashboard              | Monitor key warehouse performance indicators and inventory statistics        |
| Inbound Management               | Track goods received into the warehouse                                     |
| Outbound Management              | Monitor goods dispatched from the warehouse                                  |
| Inventory Monitoring             | View current stock levels and inventory availability                         |
| Monthly Inbound/Outbound Analytics | Visualize monthly warehouse receiving and dispatch activities              |
| Net Stock Flow                   | Analyze the difference between inbound and outbound quantities               |
| Defective Inventory Tracking     | Monitor defective stock and identify inventory quality issues               |
| Inventory Turnover               | Display inventory turnover indicators to support warehouse performance      |
| Responsive Interface             | Provide an optimized experience across desktop, tablet, and mobile devices   |
| Interactive Charts               | Visualize warehouse data using Chart.js and mock datasets                   |


## Dependencies and Libraries

### Production Dependencies

| Dependency | Description |
| :--- | :--- |
| **@tailwindcss/vite** | Official Vite plugin for Tailwind CSS v4 |
| **i18next** | Internationalization framework for JavaScript |
| **lucide-react** | Clean and lightweight Lucide icon set for React components |
| **react** | JavaScript library for building user interfaces |
| **react-dom** | Entry point to the React DOM library |
| **react-i18next** | React bindings and hooks for i18next internationalization |
| **react-router-dom** | Declarative routing library for React web applications |
| **recharts** | Redefined chart library built with React and D3 |
| **tailwindcss** | Utility-first CSS framework for rapid UI development |

---

### Development Dependencies (devDependencies)

| Dependency | Description |
| :--- | :--- |
| **@types/node** | TypeScript definitions for Node.js |
| **@types/react** | TypeScript definitions for React |
| **@types/react-dom** | TypeScript definitions for React DOM |
| **@vitejs/plugin-react** | Official Vite plugin providing React support |
| **oxlint** | High-performance JavaScript/TypeScript linter |
| **typescript** | Strongly typed programming language that builds on JavaScript |
| **vite** | Next-generation frontend tooling and development server |

## Screenshots
<img width="1875" height="899" alt="image" src="https://github.com/user-attachments/assets/b61928c9-7ef2-4fbd-80c5-a9c52aa1a9cd" />
<img width="1609" height="831" alt="image" src="https://github.com/user-attachments/assets/653ddcc1-c2c0-44c9-857d-0c2a31c2a7f6" />
<img width="1587" height="490" alt="image" src="https://github.com/user-attachments/assets/95ebf09f-50cd-4875-9ca0-36985faacf2d" />
<img width="1859" height="906" alt="image" src="https://github.com/user-attachments/assets/3a96a9bc-0600-41b5-adb0-7b7b34d31667" />
<img width="544" height="837" alt="image" src="https://github.com/user-attachments/assets/3efd3ad3-0e61-44ff-bc0c-f83f2afb9fe0" />

## Hosting Your Complete App on Vercel

This guide explains how to deploy the WMS-LienDinh React application to Vercel. Since the project only contains a frontend and does not require a backend, Vercel can host the entire application as a static website.

### Step 1: Prepare Your Project

- Ensure the React project contains all necessary source code, dependencies, and configuration files.
- Verify that the project includes a package.json file with the required scripts.
- Ensure the application runs correctly in your local environment.

Run the following commands in the project directory to install dependencies and build the application:

```bash
npm install
npm run build
```

After the build completes, the production files will be generated in the build directory for Create React App or the dist directory for Vite.

### Step 2: Push Code to GitHub

- Push the React project code to a GitHub repository.
- Ensure that the node_modules directory and unnecessary generated files are excluded using .gitignore.
- Do not upload sensitive environment files or credentials to GitHub.
- Verify that all required source code and configuration files are included in the repository.

### Step 3: Create a Vercel Account

- Create an account on Vercel if you haven't already.
- Connect your GitHub account to Vercel.

### Step 4: Create a Vercel Project

- Create a new project in Vercel.
- Select your GitHub repository (e.g., WMS-LienDinh).

### Step 5: Configure Project Settings

Configure the project settings according to the React build tool:

- Framework Preset: Select React or Vite, depending on the project setup.
- Build Command: npm run build.
- Output Directory: build for Create React App or dist for Vite.
- Install Command: npm install.

### Step 6: Deploy Your App

- Click Deploy to start the deployment process.
- Vercel will install the dependencies, build the React application, and publish the generated static files.
- Wait for the deployment to finish.
- If the build fails, review the deployment logs and check the build command, output directory, and dependencies.

### Step 7: Visit Your App

- Once deployment is successful, click Visit to open the website.
- Test the main pages, navigation, buttons, and interactive components.
- Verify that images, stylesheets, and JavaScript files load correctly.
- Check that the website displays properly on different screen sizes and browsers.

### Step 8: Enjoy Your App

- Congratulations! Your app is now live and accessible.


