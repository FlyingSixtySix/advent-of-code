import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const lines = input.trim().split('\n');

let nVisible = 0;
nVisible += lines[0].length * 2 - 2;
nVisible += lines.length * 2 - 2;

for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[0].length - 1; x++) {
        const center = lines[y][x];

        const toLeft = lines[y].split('').slice(0, x);
        const toRight = lines[y].split('').slice(x + 1);
        const toUp = lines.map(v => v[x]).slice(0, y);
        const toDown = lines.map(v => v[x]).slice(y + 1);

        const leftVisible = !toLeft.find(n => n >= center);
        const rightVisible = !toRight.find(n => n >= center);
        const upVisible = !toUp.find(n => n >= center);
        const downVisible = !toDown.find(n => n >= center);
        if (leftVisible || rightVisible || upVisible || downVisible) nVisible++;
    }
}

console.log('Number of visible:', nVisible);
