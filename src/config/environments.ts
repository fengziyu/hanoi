import * as dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hanoi';

export const DRONE_BASE_URL = process.env.DRONE_BASE_URL || '';
export const DRONE_TOKEN = process.env.DRONE_TOKEN || '';
