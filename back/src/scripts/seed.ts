// src/scripts/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.specialty.create({
    data: { name: "Pediatría" },
  });

  await prisma.specialty.create({
    data: { name: "Cardiología" },
  });

  console.log("Datos insertados ✅");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
