import { createInterface } from "readline";
import { config } from "dotenv";
import api from "./api/api.js";
import changeModel from "./utils/changeModel.js";
import loadingAnimation from "./utils/loadingAnimation.js";
import writeMessageMd from "./utils/writeMessageMd.js";
import welcomeMessage from "./utils/welcomeMessage.js";
import displayHelp from "./utils/displayHelp.js";
import { fileURLToPath } from "url";
import path from "path";
import chalk from "chalk";
import clipboardy from "clipboardy";
import capitalize from './utils/capitalize.js'

// Load the environment variables from .env
// Get the directory name of the current module to be able to
// access .env when app is launched from outside of app directory
const appDir = path.dirname(fileURLToPath(new URL(import.meta.url)));
config({ path: `${appDir}/.env` });
const apiKey = process.env.API_KEY;

// List of available models
const models = ["gpt-4o-mini", "gpt-4o"];

// Set default OpenAI model
let openAiModel = "gpt-4o-mini";

// Get arguments
const args = process.argv.slice(2);

// Create a new userInterface instance
const userInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// Welcome message
welcomeMessage(openAiModel);

// Show the prompt
userInterface.prompt();

let chatHistory = [];
let inputBuffer = [];
let bufferTimeout;

const handleUserPrompt = async (userPrompt) => {
  if (
    userPrompt.trim() === "quit" ||
    userPrompt.trim() === "exit" ||
    userPrompt.trim() === "q"
  ) {
    // Exit the app
    process.exit(0);
  }

  if (userPrompt.trim() === "") {
    console.log(chalk.red("\nWrite something!\n"));
    return;
  }

  // Display help
  if (userPrompt.trim() === "help") {
    displayHelp();
    return;
  }

  // Change model
  if (userPrompt.trim() === "models") {
    openAiModel = await changeModel(userInterface, models);
    console.log(`\n${chalk.green("Model changed.")}\n`);
    console.log(`Current model: ${chalk.yellow(openAiModel)}\n`);
    userInterface.prompt();
    return;
  }

  // Copy message to clipboard
  if (userPrompt.trim() === "copy") {
    if (chatHistory.length > 0) {
      const lastMessage = chatHistory[chatHistory.length - 1].content;
      clipboardy.writeSync(lastMessage);
      console.log(chalk.green("\nLast message copied to clipboard.\n"));
      return;
    } else {
      console.log(chalk.red("\nNo message to copy.\n"));
    }
    return;
  }

  // Copy conversation to clipboard
  if (userPrompt.trim() === "copy-all") {
    if (chatHistory.length > 0) {
      const fullConversation = chatHistory
        .map((msg) => `**${capitalize(msg.role)}:** ${msg.content}`)
        .join("\n\n");
      clipboardy.writeSync(fullConversation);
      console.log(chalk.green("\nEntire conversation copied to clipboard.\n"));
    } else {
      console.log(chalk.red("\nNo conversation to copy.\n"));
    }
    return;
  }

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
    model: openAiModel,
    messages: requestMessages,
    max_tokens: 3000,
  };

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
    writeMessageMd(message, userInterface);

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

// Debounce function to handle input with a delay. Makes it possible to paste text without executing at every new line.
const bufferUserInput = (line) => {
  clearTimeout(bufferTimeout);

  inputBuffer.push(line);

  bufferTimeout = setTimeout(() => {
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
  bufferUserInput(line);
});

// If arguments exists, run prompt
if (args.length > 0) {
  console.log(args.join(" "))
  bufferUserInput(args.join(" "));
}
