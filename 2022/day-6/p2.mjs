import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const stream = input.trim();

const bufSize = 14;
const buf = [];

for (let i = 0; i < stream.length; i++) {
    const char = stream[i];
    buf.push(char);
    // Limit buf length to 14
    if (buf.length > bufSize) buf.shift();
    // No duplicate characters allowed in this 14-sequence
    if (new Set(buf).size !== buf.length) buf.shift();
    // First 14-sequence without duplicate characters!
    if (buf.length === bufSize) {
        console.log(i + 1);
        break;
    }
}
