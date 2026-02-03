import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.resolve(__dirname, 'docs/stats.html');
const destDir = path.resolve(__dirname, 'build-stats');
const destPath = path.resolve(destDir, 'stats.html');

console.log('Post-build: checking for bundle analysis report...');

if (fs.existsSync(sourcePath)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.renameSync(sourcePath, destPath);
  console.log(`✅ successfully moved report to: ${destPath}`);
} else {
  console.log('⚠️ stats.html not found in docs/. skipping move.');
}
