import Handlebars from 'handlebars';
import { ParsedSchema } from '../parser';
import { controllerTemplate } from '../templates/controller';
import { serviceTemplate } from '../templates/service';
import { dtoTemplate } from '../templates/dto';
import { moduleTemplate } from '../templates/module';
import { repositoryTemplate } from '../templates/repository';

export interface GeneratedFile {
  path: string;
  content: string;
}

interface RenderOptions {
  dynamodb: boolean;
  cdk: boolean;
}

// Register Handlebars helpers
Handlebars.registerHelper('tsType', (zodType: string) => {
  const map: Record<string, string> = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    date: 'Date',
    array: 'any[]',
    object: 'Record<string, any>',
  };
  return map[zodType] || 'string';
});

Handlebars.registerHelper('eq', (a: any, b: any) => a === b);

export function renderTemplates(schema: ParsedSchema, options: RenderOptions): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const dir = schema.kebabName;

  const ctx = {
    ...schema,
    hasId: schema.fields.some(f => f.name === 'id'),
  };

  files.push({
    path: `${dir}/dto/${schema.kebabName}.dto.ts`,
    content: Handlebars.compile(dtoTemplate)(ctx),
  });

  files.push({
    path: `${dir}/${schema.kebabName}.controller.ts`,
    content: Handlebars.compile(controllerTemplate)(ctx),
  });

  files.push({
    path: `${dir}/${schema.kebabName}.service.ts`,
    content: Handlebars.compile(serviceTemplate)(ctx),
  });

  files.push({
    path: `${dir}/${schema.kebabName}.module.ts`,
    content: Handlebars.compile(moduleTemplate)(ctx),
  });

  if (options.dynamodb) {
    files.push({
      path: `${dir}/${schema.kebabName}.repository.ts`,
      content: Handlebars.compile(repositoryTemplate)(ctx),
    });
  }

  return files;
}
