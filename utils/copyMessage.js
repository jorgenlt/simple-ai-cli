import chalk from "chalk";
import clipboardy from 'clipboardy'

const copyMessage = (chatHistory) => {
  if (chatHistory.length > 0) {
    const lastMessage = chatHistory[chatHistory.length - 1].content;
    clipboardy.writeSync(lastMessage);
    console.log(chalk.green("\nLast message copied to clipboard.\n"));
    return;
  } else {
    console.log(chalk.red("\nNo message to copy.\n"));
  }
};

export default copyMessage;