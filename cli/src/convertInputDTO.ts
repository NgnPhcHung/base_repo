import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const sourceDir = path.join(__dirname, "../../packages/models/src/input-dto");
const targetDir = path.join(__dirname, "../../schemas/src");
const targetFile = path.join(targetDir, "input-dto.ts");

async function convertInputDTO() {
  try {
    const files = await readdir(sourceDir);
    let combinedInterfaces = "";

    for (const file of files) {
      if (file.endsWith(".ts") && file !== "index.ts") {
        const filePath = path.join(sourceDir, file);
        const content = await readFile(filePath, "utf8");
        const interfaceContent = classToInterface(content);
        combinedInterfaces += interfaceContent + "\n";
      }
    }

    await writeFile(targetFile, combinedInterfaces);
    console.log("Interfaces have been generated and saved to:", targetFile);
  } catch (error) {
    console.error("Error converting classes to interfaces:", error);
  }
}

function classToInterface(classContent: string): string {
  const lines = classContent.split("\n");
  let interfaceContent = "";
  let isInterface = false;

  lines.forEach((line) => {
    if (line.includes("export class")) {
      line = line.replace("export class", "export interface");
      isInterface = true;
    }
    if (line.startsWith("import") && !line.includes("../consts")) {
      return;
    } else if (line.includes("../consts")) {
      line = line.replace("../consts", "./consts");
    }
    if (line.trim().startsWith("@")) {
      return;
    }
    if (line.includes("!")) {
      line = line.replace("!", "");
    } else if (line.trim().endsWith(";") && line.includes(":")) {
      const colonIndex = line.lastIndexOf(":");
      if (line[colonIndex - 1] !== "?" && line[colonIndex - 1] !== " ") {
        line = line.slice(0, colonIndex) + "?" + line.slice(colonIndex);
      }
    }
    interfaceContent += line + "\n";
  });

  return isInterface ? interfaceContent : "";
}

convertInputDTO().catch(console.error);
