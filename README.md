# SlidelyBackend
This is the backend code for the application that was created towards the completion of the task "Building a Windows Desktop Application replicating Google Forms"


1. Compile and run the TypeScript server:
   **npx ts-node src/server.ts**
  
2. The server will run on **`http://localhost:3000`**.

## Endpoints

- **`/ping`**: GET request to check if the server is running.
- **`/submit`**: POST request to submit form data. Expects `name`, `email`, `phone`, `github_link`, and `stopwatch_time` in the body.
- **`/read`**: GET request to read a specific submission by index. Expects `index` as a query parameter.

NOTE: Install Node.js and npm if not already installed. Also install dependencies **express** and **typescript**

IMPORTANT: Install and initialise node modules using "npm i" in the same directory as all the other files
