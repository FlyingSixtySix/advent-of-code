import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const lines = input.trim().split('\n');

let total = 0;

for (const line of lines) {
    let [ _, length, width, height ] = /(\d+)x(\d+)x(\d+)/.exec(line);
    length = parseInt(length);
    width = parseInt(width);
    height = parseInt(height);
    const calcs = [
        length * width,
        width * height,
        height * length
    ];
    const reduced = calcs.map(n => 2 * n).reduce((a, b) => a + b);
    total += reduced;
    const smallest = calcs.sort((a, b) => a - b)[0];
    total += smallest;
}

console.log(total);
