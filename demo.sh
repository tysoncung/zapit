#!/bin/bash
# Demo script for zapit README / social media
# Run: bash demo.sh

echo "$ cat examples/user.schema.ts"
echo ""
cat examples/user.schema.ts
echo ""
echo "───────────────────────────────────"
echo ""
echo "$ npx @tysoncung/zapit generate examples/user.schema.ts --dry-run"
echo ""
npx tsx src/cli.ts generate examples/user.schema.ts --dry-run
