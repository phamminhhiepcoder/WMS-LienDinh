# WMS-DinhVang 
---
## Introduction
Welcome to WMS-DinhVang, a Warehouse Management System (WMS) Dashboard built with React, TypeScript, Tailwind CSS, and Chart.js. This project provides an intuitive and responsive interface for monitoring warehouse operations, visualizing inventory data, and tracking key performance indicators, including inbound and outbound goods, stock levels, net stock flow, and defective inventory.


## Dummy User Accounts

| Email (Normal User) | Password | Email (Admin)     | Password  |
| ------------------- | -------- | ----------------- | --------- |
| admin@gmail.com     | admin123 | admin@gmail.com   | admin123 |

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Recharts](https://shields.io?style=for-the-badge&logo=chartdotjs&logoColor=white)


## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/phamminhhiepcoder/WMS-DinhVang.git
    cd WMS-DinhVang
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file inside the project folder and add the following:

    ````bash
    PORT = 5000
    ````

4.  Run the app:

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

| Dependency                  | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| @emotion/react              | Emotion library for writing CSS with JavaScript              |
| @emotion/styled             | Styled components using Emotion                              |
| @material-ui/core           | UI components library for Material Design                    |
| @material-ui/data-grid      | Data grid component for Material-UI                          |
| @material-ui/icons          | Material Design icons for React components                   |
| @material-ui/lab            | Additional components and utilities for Material-UI          |
| @mui/icons-material         | Material-UI icons for MUI components                         |
| @mui/material               | Material-UI components library                               |
| @mui/styles                 | Styling solution for Material-UI components                  |
| @stripe/react-stripe-js     | React components for Stripe's client-side JavaScript library |
| @stripe/stripe-js           | Stripe's client-side JavaScript library                      |
| @testing-library/user-event | Utilities for simulating events with Testing Library         |
| axios                       | Promise-based HTTP client for the browser and Node.js        |
| highcharts                  | Interactive JavaScript charting library                      |
| highcharts-react-official   | React wrapper for Highcharts library                         |
| node-sass                   | Sass compiler for Node.js                                    |
| react                       | JavaScript library for building user interfaces              |
| react-alert                 | React component for customizable alerts                      |
| react-alert-template-basic  | Basic template for react-alert                               |
| react-dom                   | Entry point to the React DOM library                         |
| react-helmet                | Manage document head in React                                |
| react-js-pagination         | Pagination component for React                               |
| react-material-ui-carousel  | Carousel component for Material-UI                           |
| react-redux                 | State management library for React                           |
| react-router-dom            | Routing library for React applications                       |
| react-scripts               | Create React apps with no build configuration                |
| redux                       | Predictable state container for JavaScript apps              |
| redux-devtools-extension    | Redux DevTools integration                                   |
| redux-thunk                 | Thunk middleware for Redux                                   |
| styled-components           | CSS-in-JS library for styling React components               |
| swiper                      | Mobile touch slider library                                  |
| web-vitals                  | Library for measuring web performance metrics                |

## Screenshots

## Hosting Your Complete App on Vercel

This guide will walk you through the process of hosting your complete MERN stack app on Vercel using the `vercel.json` configuration.

### Step 1: Prepare Your Project

- Organize your project with a root directory that contains both frontend and backend folders.
- Ensure both backend and frontend directories have all necessary code and dependencies.
- Create a `vercel.json` file in the root directory.
- Add the following code to `vercel.json`:

  ```json
  {
    "version": 2,
    "builds": [
      {
        "src": "./backend/server.js",
        "use": "@vercel/node"
      },
      {
        "src": "./frotend/build",
        "use": "@vercel/static"
      }
    ],
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/backend/server.js"
      }
    ]
  }
  ```

  - Note :
    - Using this configuration will require you to run npm run build in the WMS-DinhVang directory before deploying to Vercel.
    - Ensure your folder structure looks like this:
      ```json
        WMS-DinhVang
        │   node_modules
        │   package.json
        │   build
        │   └── ...
        node_modules
        package.json
        vercel.json
      ```

### Step 2: Push Code to GitHub

- Push all your code to GitHub, ignoring the `node_modules` folder and `.env` file.

### Step 3: Create a Vercel Account

- Create an account on Vercel if you haven't already.
- Connect your GitHub account to Vercel.

### Step 4: Create a Vercel Project

- Create a new project in Vercel.
- Select your GitHub repository (e.g., WMS-DinhVang).

### Step 5: Configure Project Settings

- Configure the project settings:
  - Keep the settings as they are.
  - Add all your `.env` variables in the Environment Variables section.

### Step 6: Deploy Your App

- Click on "Deploy" and wait for a few minutes for the deployment process to complete.

### Step 7: Visit Your App

- Once the deployment is successful, click on "Visit" to access your live app.

### Step 8: Enjoy Your App

- Congratulations! Your app is now live and accessible.

## Contributions

| Contributor                                           |
| ----------------------------------------------------- |
| [phamminhhiepcoder](https://github.com/phamminhhiepcoder)             |

