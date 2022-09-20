import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.DB_HOST + "/" + process.env.DB_NAME;

export const PORT = process.env.PORT || 3000;

export const HOST = process.env.HOST;
