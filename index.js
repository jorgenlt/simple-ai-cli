import { createInterface } from "readline";
import { config } from "dotenv";
import loadingAnimation from "./utils/loadingAnimation.js";
import api from "./api/api.js";
import writeMessage from "./utils/writeMessage.js";
import { fileURLToPath } from "url";
import path from "path";

// Load the environment variables from .env
// Get the directory name of the current module to be able to
// access .env when app is launched from outside of app directory
const appDir = path.dirname(fileURLToPath(new URL(import.meta.url)));
config({ path: `${appDir}/.env` });
const apiKey = process.env.API_KEY;

// Create a new userInterface instance
const userInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

userInterface.prompt();

let chatHistory = [];
let inputBuffer = [];
let debounceTimeout;

const handleUserPrompt = async (userPrompt) => {
  // Add the user's input to the chat history
  const requestMessages = [
    ...chatHistory,
    {
      role: "user",
      content: userPrompt,
    },
  ];

  // Set up options for the API call
  const options = {
    model: "gpt-4o-mini",
    messages: requestMessages,
    max_tokens: 3000,
  };

  console.log("");

  // Start the loading animation while waiting for the API response
  const loadingInterval = loadingAnimation();

  try {
    // Make the API call
    const response = await api(options, apiKey);

    process.stdout.cursorTo(0);
    process.stdout.clearLine();

    // Clear the loading animation
    clearInterval(loadingInterval);

    // Extract the response message
    const responseMessage = response.choices[0].message;
    const message = responseMessage.content;

    // Display the response message
    writeMessage(message, userInterface);

    // Update the chat history with the response
    const newMessages = [
      ...requestMessages,
      {
        role: responseMessage.role,
        content: responseMessage.content,
      },
    ];
    chatHistory = newMessages;
  } catch (error) {
    console.error(error);
  }
};

// Debounce function to handle input with a delay
const debounceInput = (line) => {
  clearTimeout(debounceTimeout);

  inputBuffer.push(line);

  debounceTimeout = setTimeout(() => {
    let userPrompt = inputBuffer.join("\n");
    inputBuffer = []; // Clear the buffer

    // Remove all trailing newlines
    userPrompt = userPrompt.replace(/\n+$/, "");

    handleUserPrompt(userPrompt);
    userInterface.prompt(); // Prompt for the next input
  }, 50);
};

// Listen to the user's input
userInterface.on("line", (line) => {
  debounceInput(line);
});
