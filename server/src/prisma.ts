import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  accelerateUrl: databaseUrl,
});

export default prisma;
