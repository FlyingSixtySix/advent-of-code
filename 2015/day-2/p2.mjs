import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const lines = input.trim().split('\n');

let total = 0;

for (const line of lines) {
    let [ _, length, width, height ] = /(\d+)x(\d+)x(\d+)/.exec(line);
    length = parseInt(length);
    width = parseInt(width);
    height = parseInt(height);
    const sorted = [length, width, height].sort((a, b) => a - b);
    total += (sorted[0] + sorted[1]) * 2;
    total += length * width * height;
}

console.log(total);
