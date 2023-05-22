import dotenv from 'dotenv';

dotenv.config();

export default {
    persistence: process.env.MONGO_URL
}