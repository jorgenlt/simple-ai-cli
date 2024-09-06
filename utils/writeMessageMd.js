import cliMd from 'cli-markdown'

const writeMessageMd = (message, userInterface) => {
  process.stdout.write(cliMd(message));
  userInterface.prompt();
};

export default writeMessageMd;
