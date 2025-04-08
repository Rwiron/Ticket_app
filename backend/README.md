# 🎫 Ticket App – Laravel + React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Laravel](https://img.shields.io/badge/Laravel-10.x-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org)
[![PHP](https://img.shields.io/badge/PHP-8.1+-purple.svg)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://mysql.com)

**Ticket App** is a full-stack support and issue tracking system built with **Laravel** (API backend) and **React** (frontend). It is designed to help users register, authenticate securely using OTP, and manage tickets with a clean, responsive user experience.

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Authentication Flow](#-authentication-flow)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🧩 Overview

This project is built to enhance learning and practical understanding of:

- Full-stack development using Laravel and React
- RESTful API architecture
- JWT authentication combined with OTP verification
- Token handling and route protection
- Component-based frontend development
- Clean code structure and separation of concerns

## 🌐 Tech Stack

| Layer      | Technology     |
|------------|----------------|
| **Frontend** | React 18, Axios, React Router, Tailwind CSS |
| **Backend**  | Laravel 10, Sanctum/Passport, Laravel Mail/SMS |
| **Database** | MySQL / PostgreSQL |
| **Auth**     | JWT + OTP (Two-Step Login) |
| **API Testing** | Postman |
| **Dev Tools** | Vite, Composer, NPM/Yarn |

## 🔐 Authentication Flow

1. **Login**  
   User enters email and password.

2. **OTP Verification**  
   Server sends OTP via email/SMS.  
   User enters OTP to verify identity.

3. **Access Token**  
   Upon successful OTP verification, user receives a JWT token.

4. **Protected Routes**  
   Authenticated requests require the token in the `Authorization` header.

## 🚀 Features

- ✅ User registration & login with OTP
- ✅ JWT-based authentication
- ✅ OTP resend and validation endpoints
- ✅ Ticket creation, editing, and tracking
- ✅ Role-based access control (Admin/User)
- ✅ Clean and responsive UI
- ✅ API tested with Postman
- ✅ Scalable structure for future modules

## 🧪 Postman Collection

Use the provided Postman collection in `/postman/` to test all available API endpoints:

- **Auth Folder**  
  - `register`, `login`, `verify-otp`, `resend-otp`, `logout`, `user`

- **Ticket Folder**  
  - `create`, `list`, `update`, `delete`, `view`

Each folder includes detailed descriptions of request/response structure and token usage.

## ⚙️ Getting Started

### Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 16.x or higher
- MySQL 8.0 or higher
- Git

### Backend – Laravel Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/ticket-app.git
cd ticket-app/backend

# Install dependencies
composer install

# Configure environment
cp .env.example .env
php artisan key:generate

# Set up database
php artisan migrate
php artisan db:seed

# Start the server
php artisan serve
```

### Frontend – React Setup

```bash
cd frontend
npm install
npm run dev
```

## 📚 API Documentation

The API documentation is available in the `/postman/` directory. It includes detailed information about:

- Authentication endpoints
- Ticket management endpoints
- Request/response formats
- Error handling
- Authentication headers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Wiron Ruzindana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by Wiron Ruzindana
