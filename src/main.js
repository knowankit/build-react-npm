import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import gitignore from "gitignore";
import Listr from "listr";
import ncp from "ncp";
import path from "path";
import { projectInstall } from "pkg-install";
import license from "spdx-license-list/licenses/MIT";
import { promisify } from "util";
import boxen from "boxen";

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
}

async function createGitignore(options) {
  const file = fs.createWriteStream(
    path.join(options.targetDirectory, ".gitignore"),
    { flags: "a" }
  );
  return writeGitignore({
    type: "Node",
    file: file
  });
}

async function createLicense(options) {
  const targetPath = path.join(options.targetDirectory, "LICENSE");
  const licenseContent = license.licenseText
    .replace("<year>", new Date().getFullYear())
    .replace("<copyright holders>", `${options.name} (${options.email})`);
  return writeFile(targetPath, licenseContent, "utf8");
}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDirectory
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
    email: "",
    name: "Ankit Kumar"
  };

  const fullPathName = new URL(import.meta.url).pathname;
  const templateDir = path.resolve(
    fullPathName.substr(fullPathName.indexOf("/")),
    "../../templates",
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: "Creating project files",
        task: () => copyTemplateFiles(options)
      },
      {
        title: "Creating gitignore",
        task: () => createGitignore(options)
      },
      {
        title: "Creating License",
        task: () => createLicense(options)
      },
      {
        title: "Initializing git",
        task: () => initGit(options),
        enabled: () => options.git
      },
      {
        title: `Install ${options["packageManager"]} dependencies`,
        task: () =>
          projectInstall({
            cwd: options.targetDirectory,
            prefer: options["packageManager"]
          })
      }
    ],
    {
      exitOnError: false
    }
  );

  await tasks.run();
  console.log("%s File creation is compleled", chalk.green.bold("DONE"));

  const successMessage = "🚀 Your project is ready";
  if (options.packageManager === "npm") {
    console.log(
      boxen("`npm run dev' to start building your component", {
        padding: 1,
        title: successMessage
      })
    );
  } else {
    console.log(
      boxen("`yarn dev' to start building your component", {
        padding: 1,
        title: successMessage
      })
    );
  }
  return true;
}
