# ⚡ zapit

> Zap a Zod schema into a fully typed NestJS CRUD API with DynamoDB and CDK.

One command. Full API. No boilerplate.

```bash
npx zapit generate ./schemas/user.schema.ts
```

## What it generates

From a single Zod schema file, zapit creates:

- ✅ **DTOs** — Create, Update, and Response types
- ✅ **Controller** — Full CRUD endpoints with Zod validation pipe
- ✅ **Service** — Business logic layer with error handling
- ✅ **Repository** — DynamoDB or Prisma integration
- ✅ **Module** — NestJS module wiring everything together
- ✅ **Validation Pipe** — Zod-powered request validation

## Quick Start

### 1. Scaffold a new project

```bash
npx zapit init --name my-api
cd my-api
npm install
```

### 2. Define your schema

```typescript
// schemas/user.schema.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(['admin', 'user', 'moderator']),
  bio: z.string().optional(),
  isActive: z.boolean(),
});
```

### 3. Generate

```bash
npx zapit generate schemas/user.schema.ts
```

### 4. Done

```
src/
  user/
    dto/user.dto.ts
    user.controller.ts
    user.service.ts
    user.repository.ts
    user.module.ts
    validation.pipe.ts
```

Import the module into your app and you have a working API.

## Commands

### `zapit init`

Scaffold a new NestJS + Fastify + CDK project:

```bash
zapit init --name my-api
```

Generates: `package.json`, `tsconfig.json`, `src/main.ts`, `src/app.module.ts`, and a `cdk/` folder with Lambda + API Gateway + DynamoDB stack.

### `zapit generate <schema>`

Generate a CRUD module from a Zod schema:

```bash
zapit generate <schema> [options]

Options:
  -o, --output <dir>   Output directory (default: ./src)
  -d, --dry-run        Preview files without writing
  --no-dynamodb        Skip DynamoDB repository
  --no-cdk             Skip CDK stack generation
  --prisma             Generate Prisma repository instead (Pro ⚡)
```

## Zod Validation Pipe

Every generated controller includes a `ZodValidationPipe` that validates request bodies against your original Zod schema at runtime. Bad requests get clean error responses automatically.

## Prisma Support (Pro ⚡)

Use `--prisma` to generate Prisma-based repositories instead of DynamoDB:

```bash
ZAPIT_LICENSE_KEY=your-key zapit generate schema.ts --prisma
```

This generates:
- A Prisma-based repository using `PrismaClient`
- A Prisma schema model definition

## Free vs Pro

| Feature | Free | Pro |
|---------|------|-----|
| Basic CRUD generation | ✅ | ✅ |
| DynamoDB repository | ✅ | ✅ |
| Zod validation pipe | ✅ | ✅ |
| NestJS module wiring | ✅ | ✅ |
| Project scaffolding (`init`) | ✅ | ✅ |
| Prisma repository | ❌ | ✅ |
| Auth middleware | ❌ | ✅ |
| Pagination & filtering | ❌ | ✅ |
| OpenAPI spec generation | ❌ | ✅ |

Get your Pro license at [https://zapit.dev](https://zapit.dev)

## License

MIT © [Tyson Cung](https://github.com/tysoncung)
