import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPath = path.resolve('./api/.env');

if (!fs.existsSync(envPath)) {
  console.error('❌ El archivo .env no existe en la ruta ./api/.env');
  process.exit(1);
}

dotenv.config({ path: envPath });

const requiredVars = [
  'PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASS',
  'DB_HOST',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'MAIL_HOST',
  'MAIL_PORT',
  'MAIL_USER',
  'MAIL_PASS'
];

let hasError = false;

for (const key of requiredVars) {
  if (!process.env[key] || process.env[key].trim() === '') {
    console.error(`❌ La variable ${key} no está definida en .env`);
    hasError = true;
  }
}

if (hasError) {
  console.error('🚫 Corrige las variables faltantes en el archivo .env antes de continuar.');
  process.exit(1);
}

console.log('✅ Todas las variables de entorno están correctamente definidas.');
