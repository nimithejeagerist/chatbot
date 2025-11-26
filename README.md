# Workshop Documentation

## Overview
This is a simple customer-care chatbot for a fake company called **Sunrise Kitchen**.

It allows users to ask questions about the company's products and services.
## Installations

### All commands are run in the CLI
Majority of this project requires no installations, however Node.js is required.
### Download the Node.js Installer
Open your web browser and navigate to the official [Node.js](https://nodejs.org/en)
#### Run the Installer
- Locate the downloaded installer file and double-click to run it.
- Click "Next" on the welcome screen.
- Follow the instructions and ensure "Add to PATH" is selected.
- Skip any options and click "Install" to complete the installation process.
- Once the installation is complete, click "Finish".
#### Verify the installation
Open your command prompt(Windows) or terminal (macOS/Linux).
Type the following commands and press "Enter":
```bash
node -v
npm -v
```
## The Project
### Building the WebPage
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
✔ Would you like to use React Compiler? … No
✔ Would you like to use Tailwind CSS? … No
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the import alias (`@/*` by default)? … Yes
✔ What import alias would you like configured? … @/*

And check that your program works by running these commands
```bash
cd chatbot
npm run dev
```

Navigate to the project and replace your `globals.css` file with the following code:
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

Inside your `src` folder, create a new folder called `components`. Within the new folder, create two files `assistant_bubble.js` and `user_bubble.js`.

In `assistant_bubble.js`, create a new function
```javascript
function AssistantBubble({ text }) {
	return(
		// some code :)
	);
}

export default AssistantBubble;
```
Inside this function, create a `div` and set it's `className` to be `assistant-row` and within that, another div and its corresponding `className` is `assistant-bubble`. Add a paragraph element and place the text within it. This is the response that is received from the API.

Do the same for `user_bubble.js` changing assistant to user where necessary.

Now that we have set up the messages, navigate from components back to `page.js`. This is the main file in the project and is what will be displayed as the webpage.

Delete everything in the file and include the following lines in your file
```javascript
"use client";

import React, { useState } from "react";
import AssistantBubble from "@/components/assistant_bubble";
import UserBubble from "@/components/user_bubble";

export default function Home() {
	// some code
	
	return (
		// some more code
	);
}
```

`useState` is a hook in React that lets you add state variables to your programs. For this project, we will be using it to manage the messages array and any user input. You can read more on it [here](https://react.dev/reference/react/useState).
```javascript
const [messages, setMessages] = useState([
{ role: "assistant", text: "Welcome to SunriseKitchen support. How can I help?" }
]);
const [input, setInput] = useState("");
```

Next we will create our webpage, in your `return` function, add a `div` and within it. A structure like this
```javascript
<div>
	<div>
	
	</div>
	
	<div>
	
	</div>
</div>
```
The classNames of each div are `page`, `message-list` and `input-bar` respectively. Remember, this is so we can add our styling from `globals.css` to our program.

Add messages from the array to the message list, mapping them to use the AssistantBubble if it's an assistant's message or a UserBubble if it's a user message.

In the input bar, add an input and button element to the div. Set the `onClick` event of the button element to be a function called `sendMessage` that we will create later.

Right below where we made our variables, create a new function `sendMessage` that will allow us to send messages to our API.
```javascript
const sendMessage = async () => {
	// some code
};
```
Inside this function, create a new user message with the input and add it to the messages array, then we will send this function to a placeholder **asynchronous** function `sendToAI` that we will make later. 
Receive the reply from this function and create a new assistant message and add it to the messages array.

This concludes making the webpage, and it's time to make the API functionality.

## Building the API
In this part of the project, we would be creating a function that will allow us interact with the model that will generate a response.

To effectively use an LLM (large language model), it is good practice to include the following two things:
1. A system prompt indicating how the model should behave when it answers queries.
2. The current list of messages.

The second might seem obvious, but people might be tempted to only send the current prompt which is not sufficient as the model does not retain context of the conversation so far.

In the `app` folder, create a new file called `api.js` and include this boilerplate code:
```javascript
const SYSTEM_PROMPT = `
You are Sunrise Kitchen’s friendly customer support assistant, helping with anything related to its food, menu, orders, delivery, subscriptions, or policies, and you may invent reasonable details about Sunrise Kitchen as long as you stay consistent.

If a question is not related to Sunrise Kitchen, briefly say you can only help with Sunrise Kitchen–related questions and gently steer the conversation back.

Also, avoid lengthy answers and any bold words or italics.
`;

export async function sendToAI(chatHistory) {
	const apiKey = "your_api_key";
	
	// some code
}
```

#### Getting your API key
If everyone was able to access the endpoint of a company secretly, then there would be no security and such an organization would crash under any attack. An important way to secure a feature is by requiring users to use a key to connect to the feature.

For this workshop, we will be using **OPENAI's** API to get responses. Open your preferred browser and navigate to [the API platform](https://platform.openai.com/docs/overview). Go to your `Dashboard` and create an API key. Replace the code `your_api_key` with your key. _Note: In a real project, you will never hard code your API key, hard coding here is for the purpose of the workshop_.

Next, use the key, the chatHistory, and the system message to get your response. You will need to use the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#:~:text=This%20feature%20is%20well%20established,of%20the%20Request()%20constructor.) method as well as the API reference for using [chat completions](https://platform.openai.com/docs/api-reference/chat/create?lang=python).

Once that is done, return the response from the function. Now, you can properly import the function into the main page here, and make sure to **await** the call to the API function.
```javascript
"use client";

import React, { useState } from "react";
import AssistantBubble from "@/components/assistant_bubble";
import UserBubble from "@/components/user_bubble";
import { sendToAI } from "./api";

export default function Home() {
	// some code
	
	return (
		// some more code
	);
}
```
Run your program once more and test that your chatbot works, and that concludes this tutorial.