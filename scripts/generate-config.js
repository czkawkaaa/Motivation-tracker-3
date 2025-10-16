// Prosty skrypt Node.js generujący firebase-config.local.js z pliku .env
// Użycie: node scripts/generate-config.js

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env not found. Skopiuj .env.example do .env i uzupełnij wartości.');
  process.exit(1);
}

dotenv.config({ path: envPath });

const config = {
  apiKey: process.env.FIREBASE_API_KEY || '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.FIREBASE_APP_ID || ''
};

const out = `// Generated local firebase config - do not commit\nexport default ${JSON.stringify(config, null, 2)};\n`;

fs.writeFileSync(path.resolve(process.cwd(), 'firebase-config.local.js'), out, { encoding: 'utf8' });
console.log('Wygenerowano firebase-config.local.js');
