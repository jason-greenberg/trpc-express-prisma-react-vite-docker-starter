# 🚀 tRPC-Express-Prisma-React-Vite-Docker Starter

A turn-key starter skeleton for a full-stack application built with tRPC, Express, Prisma, React, and Vite, containerized with Docker.

![Untitled design (1)](https://github.com/jason-greenberg/trpc-express-prisma-react-vite-docker-starter/assets/12382257/ddae8f21-cfd6-4a54-bc25-ebe90704d206)


## ✨ Features

- User management:
  - Login, logout, and registration with JWT tokens
  - Protected routes on both client-side and server-side
- Containerization:  
  - Dockerfiles for client and server
  - docker-compose.yaml for easy deployment
  - Containerized Postgres database for development
- Example CRUD feature:
  - Simple ToDo list with client-side state management
  - Demonstrates usage of tRPC for client-server interaction and cache-invalidation patterns

## ✅  Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/jason-greenberg/trpc-express-prisma-react-vite-docker-starter.git
   ```

2. Navigate to the project directory:
   ```
   cd trpc-express-prisma-react-vite-docker-starter
   ```

3. Copy the `.env.example` file to `.env` and update the necessary environment variables.

4. Build and start the containers:
   ```
   yarn develop
   ```


https://github.com/jason-greenberg/trpc-express-prisma-react-vite-docker-starter/assets/12382257/60810ae2-e602-40b2-bbf3-33c979691d80


5. Access the application at `http://localhost:5173` or your `VITE_APP_URL` if set differently in your `.env`

## 🛠️ Development

- Run database migrations (this will run automatically when inside Docker. You should only run this if you've updated the prisma schema after you have deployed Docker, and want to reflect those changes immediately):
   ```
   yarn prisma:migrate:dev
   ```

- To run type checks, use:
  ```
  yarn typecheck
  ```

## 📦 Production Build

To build the application for production, run the following. This will output a `dist` folder in the project root:
```
yarn build
```

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 👨‍💻 Author

Jason Greenberg - [GitHub](https://github.com/jason-greenberg)

Feel free to reach out if you have any questions or suggestions!
