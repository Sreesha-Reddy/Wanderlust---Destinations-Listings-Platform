# Wanderlust — Destination Listings App

[**Check it here → https://wanderlust-4exa.onrender.com/listings**](https://wanderlust-4exa.onrender.com/listings)

Wanderlust is a full-stack web application where users can browse, create, edit, and delete listings of beautiful travel destinations.  
It follows the **MVC (Model–View–Controller)** architectural pattern and includes advanced features like **filtering** and **user authentication**.

---

## Features

- User Authentication (register/login/logout)  
- Secure password hashing & session management  
- Browse all destination listings  
- Add a new destination listing  
- Edit and delete your own listings  
- View detailed page for each listing  
- Filter listings by category  
- Responsive, mobile-friendly UI  
- Connected to MongoDB Atlas for persistent storage  

---

## Architecture — MVC

The project is organized using the **Model–View–Controller** pattern.

### Models

Defines the data schema (e.g., `Listing`, `User`) using **Mongoose**.

### Views

EJS templates render dynamic HTML pages styled with **Bootstrap**.

### Controllers/Routes

Express route handlers process requests, interact with models, and render views.

---

## Filters

The application includes robust **filtering** on the listings page to sort by **category**.

---

## Tech Stack

### Frontend

- HTML5, CSS3, Bootstrap  
- JavaScript  
- EJS templates (server-side rendering)  

### Backend

- Node.js  
- Express.js  
- Mongoose (MongoDB ODM)  

### Database

- MongoDB Atlas (cloud-hosted database)

### Cloud Setup

- Cloudinary

### Deployment

- Render
