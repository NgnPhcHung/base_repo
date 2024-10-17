import { promises as fs } from "fs";

interface ZodSchema {
  type: string;
  properties?: { [key: string]: ZodSchema };
  items?: ZodSchema;
  values?: Array<string | number>;
  optional?: boolean;
}

async function generateTypeScriptInterfaces() {
  const data = await fs.readFile("./schemas/src/zodSchemas.json", "utf-8");
  const schemas: { [key: string]: ZodSchema } = JSON.parse(data);
  let tsInterfaces = "";

  for (const [key, value] of Object.entries(schemas)) {
    tsInterfaces += generateInterface(key, value);
  }

  await fs.writeFile("./schemas/src/dtos.ts", tsInterfaces);
  console.log("TypeScript interfaces saved to './schemas/src/dtos.ts'");
}

function generateInterface(interfaceName: string, schema: ZodSchema): string {
  let properties = "";
  if (schema.type === "object" && schema.properties) {
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      properties += `${propName}${propSchema.optional ? "?" : ""}: ${mapType(propSchema)};\n  `;
    }
  }

  return `export interface ${interfaceName} {\n  ${properties}}\n\n`;
}

function mapType(schema: ZodSchema): string {
  switch (schema?.type) {
    case "string":
    case "number":
    case "boolean":
      return schema.type;
    case "date":
      return "Date";
    case "enum":
      return schema.values!.map((value) => `'${value}'`).join(" | ");
    case "array":
      return `${mapType(schema.items!)}[]`;
    case "object":
      const properties = Object.entries(schema.properties || {}).reduce((acc, [key, propSchema]) => {
        acc[key] = mapType(propSchema);
        return acc;
      }, {} as Record<string, string>);
      return `{ ${Object.entries(properties).map(([key, type]) => `${key}: ${type}`).join("; ")} }`;
    default:
      return "any";
  }
}

generateTypeScriptInterfaces().catch(console.error);
