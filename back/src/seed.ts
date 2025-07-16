import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.rol.createMany({
    data: [
      { rol_name: "admin" },
      { rol_name: "usuario" },
      { rol_name: "especialista" }
    ],
    skipDuplicates: true,
  });

  console.log("✅ Roles base insertados");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
