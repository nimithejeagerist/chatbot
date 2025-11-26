# Workshop Documentation

## Overview
This is a simple customer-care chatbot for a fake company called **SunriseKitchen**.
It allows users to ask questions about the company's products and services.

## Installations 
### All commands are run in the CLI
Majority of this project requires no installations, however Node.js is required.

### Download the Node.js Installer
Open your web browser and navigate to the official [Node.js](https://nodejs.org/en)

#### Run the Installer
Locate the downloaded installer file and double-click to run it.
Click "Next" on the welcome screen.
Follow the instructions and ensure "Add to PATH" is selected.
Skip any options and click "Install" to complete the installation process.
Once the installation is complete, click "Finish".

#### Verify the installation
Open your command prompt(Windows) or terminal (macOS/Linux).
Type the following commands and press "Enter":
```bash
node -v
npm -v
```

## Building the project
We will be creating a Next.js project. Next.js is a React framework that extends the capabilities of traditional React applications, primarly by offering advanced rendering features like server-side rendering (SSR) and static site generation (SSG). Another important featuyre that Next.js offers are API routes, allowing you to create API endpoints within your project, enabling you to build full-stack applications without needing a separate backend server.

Navigate to your terminal and follow these steps:
Initialize the project
```bash
npx create-next-app@latest chatbot
```

Choose to customize your own settings and select these options
✔ Would you like to use the recommended Next.js defaults? › No, customize settings
✔ Would you like to use TypeScript? … No
✔ Which linter would you like to use? › ESLint
✔ Would you like to use React Compiler? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the import alias (`@/*` by default)? … Yes
✔ What import alias would you like configured? … @/*

Navigate to the project and replace your `global.css` file with the following code
```css
body {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
}

/* Chat page layout */
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: white;
}

/* Messages area */
.message-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

/* Input bar at the bottom */
.input-bar {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #ccc;
}

/* Input and button */
.input-bar input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.input-bar button {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Message bubbles */
.assistant-bubble,
.user-bubble {
  max-width: 400px;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  margin: 0.25rem 0;
  font-size: 0.95rem;
  word-wrap: break-word;
}

/* Assistant on the left */
.assistant-row {
  display: flex;
  justify-content: flex-start;
}

.assistant-bubble {
  background: #e5e7eb;
  color: #111827;
}

/* User on the right */
.user-row {
  display: flex;
  justify-content: flex-end;
}

.user-bubble {
  background: #d1d5db;
  color: #111827;
}
```

This file contains the styling used to make our webpage look like a user interface for messaging. The next we will be doing is creating the components for our user and assistant message bubbles. It is good practice to make components in any project, this introduces the notion of **separation of concerns** and allows you to debug cleanly and reduce code in the main modules.

Inside your `src` folder, create a new folder called `components`. Within the new folder, create two files `assistant_bubble.js` and `