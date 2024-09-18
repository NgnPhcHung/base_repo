import { promises as fs } from "fs";
import * as z from "zod";
import * as swaggerDocument from "../../schemas/src/swagger-schema.json";

function convertSchemaToZod(schema) {
  switch (schema.type) {
    case "string":
      if (schema.format === "date-time") {
        return z.date();
      }
      return z.string();
    case "integer":
      return z.number().int();
    case "number":
      return z.number();
    case "boolean":
      return z.boolean();
    case "object":
      const properties = schema.properties || {};
      const zodObject = {};
      Object.entries(properties).forEach(([key, value]) => {
        zodObject[key] = convertSchemaToZod(value);
        if (!(schema.required && schema.required.includes(key))) {
          zodObject[key] = zodObject[key].optional();
        }
      });
      return z.object(zodObject);
    case "array":
      return z.array(convertSchemaToZod(schema.items));
    default:
      return z.any();
  }
}

function serializeZodSchema(schema: z.ZodType<any, any>): any {
  if (schema instanceof z.ZodString) {
    return { type: "string" };
  } else if (schema instanceof z.ZodNumber) {
    let details: any = { type: "number" };
    if (schema._def.checks.some((check) => check.kind === "int")) {
      details.subtype = "integer";
    }
    return details;
  } else if (schema instanceof z.ZodBoolean) {
    return { type: "boolean" };
  } else if (schema instanceof z.ZodDate) {
    return { type: "date" };
  } else if (schema instanceof z.ZodEnum) {
    return { type: "enum", values: schema._def.values };
  } else if (schema instanceof z.ZodObject) {
    const properties = {};
    for (const key in schema.shape) {
      properties[key] = serializeZodSchema(schema.shape[key]);
    }
    return { type: "object", properties };
  } else if (schema instanceof z.ZodArray) {
    return { type: "array", items: serializeZodSchema(schema.element) };
  } else if (schema instanceof z.ZodOptional) {
    const innerType = serializeZodSchema(schema.unwrap());
    return {
      type: innerType.type,
      optional: true,
      details: innerType,
    };
  } else {
    return { type: "unknown" };
  }
}

async function convertSwaggerToZodAndSave(swaggerDoc: any) {
  const schemas = swaggerDoc.components?.schemas || {};
  const zodSchemas = Object.keys(schemas).reduce(
    (acc, schemaName) => {
      const zodSchema = convertSchemaToZod(schemas[schemaName]);

      acc[schemaName] = serializeZodSchema(zodSchema);
      return acc;
    },
    {} as Record<string, any>
  );

  await fs.writeFile(
    "./schemas/src/zodSchemas.json",
    JSON.stringify(zodSchemas, null, 2)
  );
  console.log("Zod schemas saved to 'zodSchemas.json'");
}

convertSwaggerToZodAndSave(swaggerDocument).catch(console.error);
