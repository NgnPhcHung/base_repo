import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const sourceDir = path.join(__dirname, "../../packages/models/src/consts");
const targetFile = path.join(__dirname, "../../schemas/src/consts.ts");

async function combineConsts() {
  try {
    const files = await readdir(sourceDir);
    let combinedContent = "";

    for (const file of files) {
      if (file.endsWith(".ts") && file !== "index.ts") {
        const filePath = path.join(sourceDir, file);
        const content = await readFile(filePath, "utf8");
        combinedContent += content + "\n";
      }
    }

    await writeFile(targetFile, combinedContent);
    console.log("Combined const files written to:", targetFile);
  } catch (error) {
    console.error("Error combining files:", error);
  }
}

combineConsts();
