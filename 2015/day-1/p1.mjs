import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

let pos = 0;

input.trim().split('').forEach(v => pos += (v == '(' ? 1 : -1));

console.log(pos);
