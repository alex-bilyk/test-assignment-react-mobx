# 📚 Reaktivate TDD Homework — Book Management App

This project is a technical solution for the Reaktivate TDD challenge.  
It demonstrates a scalable, logic-first architecture for managing books with support for public and private data, using **React 18**, **MobX**, and **Jest**.

---

## ✅ Features

- ⚛️ React 18 + MobX state management
- 📦 Clean separation of concerns (MVC-like: View, Controller, Service)
- 📚 Supports fetching:
  - All books
  - Private books per user
- ➕ Add a new book (with sanitization)
- ♻️ Reset book list
- 🔐 XSS sanitization for `name` and `author`
- 🚦 Error handling and loading indicators
- 🧪 Unit tested logic (`BooksController`) using Jest
- ➕ Utils and constants helpers for shared code

---

## ⚙️ Environment Setup

### Node.js
- Version: `22.x.x` → https://nodejs.org/en/download

### NPM
- Version: `10.x.x`
```bash
npm install -g npm
```

---

## 📦 SSL Notice

The API uses a self-signed certificate.

Open https://tdd.demo.reaktivate.com/api-docs in your browser.

Your browser will warn; click "Proceed / Trust".
After accepting, the React app can call the endpoints locally.

---

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone <repo-url>
cd <project-name>
```

### 2. Install Dependencies
```bash
npm install
```
Installs all dependencies across the app.

### 3. Start Dev Server
```bash
npm run start
```
Runs the app locally. Port details will appear in the terminal.

### 4. Run Tests
```bash
npm run test
```
Runs the tests. Tests details will appear in the terminal.

---

## ✅ Ready to Develop

You're set! Start building the app.
