import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });
//C:\Next level web development batch-4\Mission-2\module-8\mongose-odm\.env

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};
