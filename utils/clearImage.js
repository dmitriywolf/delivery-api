import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_COMPANY_LOGO, DEFAULT_USER_AVATAR } from '#root/common/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function clearImage(filePath) {
  if (filePath === DEFAULT_COMPANY_LOGO || filePath === DEFAULT_USER_AVATAR) {
    return;
  }
  const fp = path.join(__dirname, '..', filePath);

  fs.unlink(fp, (err) => console.log(err));
}
