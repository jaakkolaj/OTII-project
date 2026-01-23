import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL puuttuu .env-tiedostosta.");
}

const prisma = new PrismaClient({
  accelerateUrl: databaseUrl,
});

async function main() {
  const candidate = await prisma.candidate.create({
    data: {
      name: "Test Candidate",
      email: "test@example.com",
    },
  });

  console.log("Luotu kandidaatti:", candidate);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
