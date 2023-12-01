import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const lines = input.trim().split('\n');

let nVisible = 0;
nVisible += lines[0].length * 2 - 2;
nVisible += lines.length * 2 - 2;

const scenicScores = [];

/**
 * @param {string} x
 * @param {string[]} dirArr
 */
function getViewDistance(x, dirArr) {
    let dist = 1;
    for (let i = 0; i < dirArr.length; i++) {
        if (x <= dirArr[i]) return dist;
        dist++;
    }
    dist--;
    return dist;
}

for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[0].length - 1; x++) {
        const center = lines[y][x];

        const toLeft = lines[y].split('').slice(0, x);
        const toRight = lines[y].split('').slice(x + 1);
        const toUp = lines.map(v => v[x]).slice(0, y);
        const toDown = lines.map(v => v[x]).slice(y + 1);

        let leftScore = getViewDistance(center, toLeft.slice().reverse());
        let rightScore = getViewDistance(center, toRight);
        let upScore = getViewDistance(center, toUp.slice().reverse());
        let downScore = getViewDistance(center, toDown);

        const combined = upScore * leftScore * downScore * rightScore;

        scenicScores.push(combined);

        const leftVisible = !toLeft.find(n => n >= center);
        const rightVisible = !toRight.find(n => n >= center);
        const upVisible = !toUp.find(n => n >= center);
        const downVisible = !toDown.find(n => n >= center);
        if (leftVisible || rightVisible || upVisible || downVisible) nVisible++;
    }
}

scenicScores.sort((a, b) => b - a);

console.log('Highest scenic score:', scenicScores[0]);
