import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const baseDir = path.join(__dirname, "../../packages/models/src");
const sourceDirs = [path.join(baseDir, "input-dto"), path.join(baseDir, "dto")];
const targetDir = path.join(__dirname, "../../schemas/src");
const targetFile = path.join(targetDir, "input-dto.ts");

async function convertInputDTO() {
  let combinedInterfaces = "";
  let importsSet = new Set();

  try {
    for (const sourceDir of sourceDirs) {
      const files = await readdir(sourceDir);
      for (const file of files) {
        if (file.endsWith(".ts") && file !== "index.ts") {
          const filePath = path.join(sourceDir, file);
          const content = await readFile(filePath, "utf8");
          const { interfaceContent, imports } = classToInterface(content);
          combinedInterfaces += interfaceContent + "\n";
          imports.forEach((imp) => importsSet.add(imp));
        }
      }
    }

    const combinedImports = Array.from(importsSet).join("\n") + "\n\n";
    await writeFile(targetFile, combinedImports + combinedInterfaces);
    console.log("Interfaces have been generated and saved to:", targetFile);
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}

function classToInterface(classContent: string): {
  interfaceContent: string;
  imports: string[];
} {
  const lines = classContent.split("\n");
  let interfaceContent = "";
  let imports: string[] = [];
  let isInterface = false;

  lines.forEach((line) => {
    if (line.trim().startsWith("import")) {
      if (!imports.includes(line)) {
        // Check if import is already added to prevent duplicates
        imports.push(line);
      }
      return;
    }
    if (line.includes("export class")) {
      line = line.replace("export class", "export interface");
      isInterface = true;
    }
    if (
      line.trim().startsWith("@") ||
      line.includes("constructor(") ||
      line.trim().startsWith("get ") ||
      line.trim().startsWith("set ") ||
      line.includes("{") ||
      line.includes("}")
    ) {
      return; // Skip lines with annotations, constructors, getters/setters, and braces
    }
    if (line.includes("implements")) {
      line = line.split(" implements ")[0] + " {"; // Remove implements clause and add opening brace
    }
    interfaceContent += line + "\n";
  });

  return {
    interfaceContent: isInterface ? interfaceContent.trim() : "",
    imports,
  };
}

convertInputDTO().catch(console.error);
