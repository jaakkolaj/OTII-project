
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg"; 
import "dotenv/config";

const isTest = process.env.NODE_ENV === "test";
const url = isTest ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

if (!url) throw new Error("DATABASE_URL missing");

export const pool = isTest ? new pg.Pool({ connectionString: url }) : null;

let prisma: PrismaClient;

if (isTest && pool) {
  // TESTISSÄ: Käytetään adapteria (Postgres Docker)
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} 
else {
  // KEHITYKSESSÄ: Käytetään Acceleratea suoraan (ilman adapteria)
  prisma = new PrismaClient({
    accelerateUrl: url,
  });
}

if (isTest) {
  console.log("JEST: Yhteys Docker-tietokantaan adapterin kautta");
}

if (!isTest) {
  console.log("Kehitys: Yhteys Accelerateen suoraan");
}

export default prisma;