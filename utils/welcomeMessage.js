import chalk from "chalk";

const welcomeMessage = (openAiModel) => {
  // Welcome message
  console.log("\nWelcome to Simple AI CLI.\n");
  console.log(`Current model: ${chalk.yellow(openAiModel)}\n`);
  console.log(`Type "models" to switch models or "help" to get more information.\n`)
};

export default welcomeMessage;
