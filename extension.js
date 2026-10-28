const { spawn } = require("node:child_process");
const path = require("node:path");
const vscode = require("vscode");

function launch(command, args, options = {}) {
  const child = spawn(command, args, {
    detached: true,
    stdio: "ignore",
    ...options,
  });
  child.on("error", (error) => {
    vscode.window.showErrorMessage(`Could not open an external terminal: ${error.message}`);
  });
  child.unref();
}

function openExternalTerminal(folderPath) {
  if (process.platform === "win32") {
    const terminal = spawn("wt.exe", ["-d", folderPath], {
      detached: true,
      stdio: "ignore",
    });
    terminal.on("error", () => {
      launch("cmd.exe", ["/K", `cd /d "${folderPath}"`]);
    });
    terminal.unref();
    return;
  }

  if (process.platform === "darwin") {
    const escapedPath = folderPath.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    launch("osascript", ["-e", `tell application "Terminal" to do script "cd \\\"${escapedPath}\\\""`]);
    return;
  }

  const shell = process.env.SHELL || "/bin/sh";
  const shellCommand = `cd -- "$1" && exec "${shell}"`;
  launch("x-terminal-emulator", ["-e", "sh", "-lc", shellCommand, "sh", folderPath]);
}

function activate(context) {
  const command = vscode.commands.registerCommand(
    "frankgp.openInExternalTerminal",
    (resource) => {
      const folderPath = resource?.fsPath;
      if (!folderPath) {
        vscode.window.showErrorMessage("Select a folder to open an external terminal.");
        return;
      }
      openExternalTerminal(path.resolve(folderPath));
    }
  );
  context.subscriptions.push(command);
}

function deactivate() {}

module.exports = { activate, deactivate };
