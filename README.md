Error Todo App

A simple full-stack application to track coding errors — what went wrong, why it happened, and how to fix it.
Built with React, Node.js (Express), and MongoDB.

## Features

Add, edit, and delete error todos

Store error description and fix solution

Upload or attach screenshots (optional)

View all errors in a clean dashboard

RESTful API with Node.js & Express

MongoDB for data persistence

## Installation & Setup

git clone https://github.com/suhaybEromi/todos-error.git
cd error-todo

## Install backend dependencies

cd server
npm install

## Install frontend dependencies

cd ../client
npm install

## Create a .env file in the backend folder

MONGO_URI=your_mongodb_connection_string
PORT=4000

## Run the app

Run backend:
node app.js

Run frontend:
npm run dev
