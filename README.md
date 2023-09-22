# University Session Booking System

The University Session Booking System is a backend API project that allows students to book sessions with deans at specified time slots. This README provides an overview of the project, instructions for setup, and information on available APIs.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Students can authenticate and book sessions with deans.
- Deans can view pending sessions and authenticate.
- Sessions are scheduled for Thursdays and Fridays at 10 AM.
- Token-based authentication is used for security.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 18.X.X)
- MongoDB installed and running
- Postman for testing the APIs

## Installation

To install and run the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/vedanshk/university-session-booking.git




The server should now be running on http://localhost:5000.

Configuration
Before running the server, make sure to configure the following:

Database connection settings in config/database.js.
JWT secret key in config/jwt.js.
Usage
To use the University Session Booking System, follow these steps:


Authenticate students and deans to obtain tokens.
Use the provided APIs to book and view sessions.
API Documentation
The project provides the following APIs:


POST /api/students/login: Student login and token generation.
GET /api/sessions/free: List free dean sessions.
POST /api/sessions/book: Book a dean session.
POST /api/deans/login: Dean login and token generation.
GET /api/sessions/pending: List pending dean sessions.
GET /api/sessions/dean-pending-after-time-change: List dean sessions after time change.


Contributing
Contributions to this project are welcome! To contribute:






