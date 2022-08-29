import { config } from "dotenv";
config();

export const MONGODB_URI =
  "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME;
export const PORT = process.env.PORT || 3000;
