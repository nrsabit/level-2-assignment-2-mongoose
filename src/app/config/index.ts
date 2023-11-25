import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');
dotenv.config({ path: envPath });

const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};

export default config;
