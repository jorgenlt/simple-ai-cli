import chalk from "chalk";

// Function to prompt the user for model selection
const changeModel = (userInterface, models) => {
  return new Promise((resolve) => {
    console.log(
      chalk.yellow("\nChoose an OpenAI model by typing the number:\n")
    );
    models.forEach((model, index) => {
      console.log(`${index + 1}: ${model}`);
    });
    console.log("");

    userInterface.question("", (answer) => {
      const modelIndex = parseInt(answer, 10) - 1;
      if (modelIndex >= 0 && modelIndex < models.length) {
        resolve(models[modelIndex]);
      } else {
        console.log(chalk.red("\nInvalid selection. Try again."));
        resolve(changeModel(userInterface, models)); // Recursively prompt until valid
      }
    });
  });
};

export default changeModel;
