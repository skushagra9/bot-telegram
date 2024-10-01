import dotenv from 'dotenv';
dotenv.config();

export const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
export const API = process.env.API_URL!;
