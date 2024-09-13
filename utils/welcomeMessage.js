import chalk from "chalk";

const welcomeMessage = (openAiModel) => {
  // Welcome message
  console.log("\nWelcome to Simple AI CLI.\n");
  console.log(
    `Current model: ${chalk.yellow(openAiModel)}, write "models" to change.\n`
  );
};

export default welcomeMessage;
