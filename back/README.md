# back

To install dependencies:

```bash
bun install
bunx prisma generate
```

To run db:
```
bunx prisma migrate dev          //             bunx prisma db push

bunx prisma db push                 //               bunx prisma db seed
bunx prisma db push --force-reset   //               bunx prisma db seed

```

To run:

```bash

bun run src.index.ts


This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
