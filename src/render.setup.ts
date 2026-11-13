import { execFileSync } from 'node:child_process';
import path from 'node:path';

export default function buildPieces() {
  execFileSync(process.execPath, [path.join(import.meta.dirname, '../scripts/build-pieces.mjs')], { stdio: 'inherit' });
}
