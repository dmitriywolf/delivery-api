import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function clearImage(filePath) {
  const fp = path.join(__dirname, '..', filePath);

  fs.unlink(fp, (err) => console.log(err));
}
