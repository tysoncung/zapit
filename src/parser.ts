import path from 'path';
import fs from 'fs-extra';

export interface SchemaField {
  name: string;
  type: string;       // 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object'
  zodType: string;    // original zod chain e.g. 'z.string().email()'
  optional: boolean;
  description?: string;
}

export interface ParsedSchema {
  name: string;           // PascalCase resource name
  camelName: string;      // camelCase
  kebabName: string;      // kebab-case
  fields: SchemaField[];
  rawSource: string;
}

/**
 * Parse a Zod schema file and extract field information.
 * 
 * Expected format:
 *   import { z } from 'zod';
 *   export const UserSchema = z.object({ ... });
 * 
 * We do lightweight regex parsing — no need for a full TS compiler for v0.1.
 */
export async function parseSchema(filePath: string): Promise<ParsedSchema> {
  const source = await fs.readFile(filePath, 'utf-8');

  // Extract schema name: export const XxxSchema = z.object(
  const nameMatch = source.match(/export\s+const\s+(\w+)Schema\s*=\s*z\.object/);
  if (!nameMatch) {
    throw new Error(
      `Could not find "export const XxxSchema = z.object({...})" in ${filePath}\n` +
      `Make sure your schema follows the naming convention.`
    );
  }

  const rawName = nameMatch[1]; // e.g. 'User', 'BlogPost'
  const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const camelName = rawName.charAt(0).toLowerCase() + rawName.slice(1);
  const kebabName = rawName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  // Extract fields from z.object({ ... })
  const objectMatch = source.match(/z\.object\(\{([\s\S]*?)\}\)/);
  if (!objectMatch) {
    throw new Error(`Could not parse z.object body in ${filePath}`);
  }

  const body = objectMatch[1];
  const fields: SchemaField[] = [];

  // Match: fieldName: z.string().optional(), or z.enum(['a', 'b'])
  const fieldRegex = /(\w+)\s*:\s*(z\.\w+\([^)]*\)[^,\n]*)/g;
  let match;

  while ((match = fieldRegex.exec(body)) !== null) {
    const fieldName = match[1];
    const zodChain = match[2].trim().replace(/,\s*$/, '');
    const optional = zodChain.includes('.optional()');
    const type = inferType(zodChain);

    fields.push({
      name: fieldName,
      type,
      zodType: zodChain,
      optional,
    });
  }

  if (fields.length === 0) {
    throw new Error(`No fields found in schema. Check your Zod object syntax.`);
  }

  return { name, camelName, kebabName, fields, rawSource: source };
}

function inferType(zodChain: string): string {
  if (zodChain.startsWith('z.string')) return 'string';
  if (zodChain.startsWith('z.number')) return 'number';
  if (zodChain.startsWith('z.boolean')) return 'boolean';
  if (zodChain.startsWith('z.date')) return 'date';
  if (zodChain.startsWith('z.array')) return 'array';
  if (zodChain.startsWith('z.object')) return 'object';
  if (zodChain.startsWith('z.enum')) return 'string';
  return 'string'; // fallback
}
