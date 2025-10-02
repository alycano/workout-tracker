import 'dotenv/config'; 
export const apiKey = process.env.API_KEY;// en ESM se importa así

export const port = process.env.PORT || 3000;

export const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};