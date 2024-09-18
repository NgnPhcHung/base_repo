import fs from "fs";
import path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);

async function listExports(filePath: string) {
    const exports = await import(filePath);
    // console.log(`Exports from ${filePath}:`, Object.keys(exports));
    console.log("---------------",exports)
    console.log("---------------")
}

async function traverseDirectory(dirPath: string) {
    const entries = await readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            await traverseDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.ts')) {
            console.log(`Processing ${fullPath}`);
            await listExports(fullPath);
        }
    }
}

const modelsPath = path.resolve(__dirname, '../../packages/models/src');

console.log("Starting traversal of models directory:", modelsPath);

traverseDirectory(modelsPath).catch(console.error);
