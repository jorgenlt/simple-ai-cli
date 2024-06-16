import wrap from "word-wrap";
import chalk from "chalk";

const writeMessage = (message, userInterface) => {
  const formattedMessage = chalk.green(
    wrap(message, { width: 50, indent: "  " })
  );

  process.stdout.write(`${formattedMessage}\n\n`);

  // Show the prompt
  userInterface.prompt();
};

export default writeMessage;
