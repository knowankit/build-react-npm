import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";

async function promptForMissingOptions(options) {
  const defaultTemplate = "JavaScript";
  const defaultPackage = "npm";

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Select a project template",
      choices: ["JavaScript", "TypeScript"],
      default: defaultTemplate
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Do you want a git to be initialised?",
      default: false
    });
  }

  questions.push({
    type: "list",
    name: "packageManager",
    message: "Select a package manager",
    choices: ["yarn", "npm"],
    default: defaultPackage
  });

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    packageManager: options.packageManager || answers.packageManager
  };
}

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes"
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
    packageManager: ""
  };
}

export const cli = async args => {
  const options = parseArgumentsIntoOptions(args);
  const questions = await promptForMissingOptions(options);

  await createProject(questions);
};
