import chalk from "chalk";

const displayHelp = () => {
  console.log("");
  console.log(`${chalk.yellow("copy")}            Copy the last message to clipboard`);
  console.log(`${chalk.yellow("copy-all")}        Copy the whole conversation to clipboard`);
  console.log(`${chalk.yellow("exit/quit/q")}     Exit the application`);
  console.log(`${chalk.yellow("models")}          Change OpenAI model`);
  console.log("");
};

export default displayHelp;
