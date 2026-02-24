# ⚡ zapit

> Zap a Zod schema into a fully typed NestJS CRUD API with DynamoDB and CDK.

One command. Full API. No boilerplate.

```bash
npx zapit generate ./schemas/user.schema.ts
```

## What it generates

From a single Zod schema file, zapit creates:

- ✅ **DTOs** — Create, Update, and Response types
- ✅ **Controller** — Full CRUD endpoints with proper decorators
- ✅ **Service** — Business logic layer with error handling
- ✅ **Repository** — DynamoDB integration with aws-sdk v3
- ✅ **Module** — NestJS module wiring everything together

## Quick Start

### 1. Define your schema

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

### 2. Generate

```bash
npx zapit generate schemas/user.schema.ts
```

### 3. Done

```
src/
  user/
    dto/user.dto.ts
    user.controller.ts
    user.service.ts
    user.repository.ts
    user.module.ts
```

Import the module into your app and you have a working API.

## Options

```bash
zapit generate <schema> [options]

Options:
  -o, --output <dir>   Output directory (default: ./src)
  -d, --dry-run        Preview files without writing
  --no-dynamodb        Skip DynamoDB repository
  --no-cdk             Skip CDK stack generation
```

## Free vs Pro

| Feature | Free | Pro |
|---------|------|-----|
| Basic CRUD generation | ✅ | ✅ |
| DynamoDB repository | ✅ | ✅ |
| NestJS module wiring | ✅ | ✅ |
| Auth middleware | ❌ | ✅ |
| Pagination & filtering | ❌ | ✅ |
| Audit logging | ❌ | ✅ |
| Multi-tenant support | ❌ | ✅ |
| OpenAPI spec generation | ❌ | ✅ |
| CDK deployment stack | ❌ | ✅ |

## Why zapit?

You've written the same CRUD API fifty times. Controller, service, repository, DTOs — it's always the same shape. Define your data once in Zod (which you're already using for validation), and let zapit handle the rest.

## License

MIT © [Tyson Cung](https://github.com/tysoncung)
