import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENAI_API_KEY && process.env.NODE_ENV !== "test") {
  throw new Error("OPENAI_API_KEY missing");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
