import chalk from 'chalk'

const loadingAnimation = () => {
  let dots = "";
  const intervalId = setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(chalk.white(dots));
    dots += ".";
    if (dots.length > 40) {
      dots = "  ";
    }
  }, 50);

  return intervalId;
};

export default loadingAnimation;
