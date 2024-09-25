import cliMd from "cli-markdown";

const writeMessageMd = (message, userInterface) => {
  process.stdout.write(cliMd(message));
  process.stdout.write("\n");
  userInterface.prompt();
};

export default writeMessageMd;
