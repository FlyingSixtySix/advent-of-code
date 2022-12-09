import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

let pos = 0;
let firstNegative;

let actions = input.trim().split('');

for (let i = 0; actions.length; i++) {
    pos += actions[i] === '(' ? 1 : -1;
    if (pos === -1) {
        firstNegative = i + 1;
        break;
    }
}

console.log(firstNegative);
