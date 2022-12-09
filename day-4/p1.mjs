import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const lines = input.trim().split('\n');

let nFullyContains = 0;

for (const line of lines) {
    const spread = line.split(',').map(s => {
        const [start, end] = s.split('-').map(e => parseInt(e));
        let ret = [];
        for (let i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    })
    // Sort by length descending
    const sorted = spread.sort((a, b) => b.length - a.length);
    let containsCount = 0;
    for (let i = 0; i < sorted[0].length; i++) {
        if (sorted[1].includes(sorted[0][i])) containsCount++;
        if (containsCount === sorted[1].length) {
            nFullyContains++;
            break;
        }
    }
}

console.log(nFullyContains);
