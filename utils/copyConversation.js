import clipboardy from "clipboardy";
import chalk from "chalk";
import capitalize from "./capitalize.js";

const copyConversation = (chatHistory) => {
  if (chatHistory.length > 0) {
    const fullConversation = chatHistory
      .map((msg) => `**${capitalize(msg.role)}:** ${msg.content}`)
      .join("\n\n");
    clipboardy.writeSync(fullConversation);
    console.log(chalk.green("\nEntire conversation copied to clipboard.\n"));
  } else {
    console.log(chalk.red("\nNo conversation to copy.\n"));
  }
};

export default copyConversation;
