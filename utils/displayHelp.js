import chalk from "chalk";

const displayHelp = () => {
  console.log("");
  console.log(`${chalk.yellow("exit/quit/q")}     Exit the application`);
  console.log(`${chalk.yellow("models")}          Change OpenAI model`);
  console.log("");
};

export default displayHelp;
