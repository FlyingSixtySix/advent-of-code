import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

let score = 0;

// +0 if loss
// +3 if draw
// +6 if win
const winMap = {
    'A X': 3,
    'A Y': 6,
    'A Z': 0,
    'B X': 0,
    'B Y': 3,
    'B Z': 6,
    'C X': 6,
    'C Y': 0,
    'C Z': 3
};

input
    .trim()
    .split('\n')
    .map(round => round.split(' '))
    .forEach(([ opponent, player ]) => {
        // +1 if X (Rock)
        // +2 if Y (Paper)
        // +3 if Z (Scissors)
        score += { X: 1, Y: 2, Z: 3 }[player];
        score += winMap[opponent + ' ' + player];
    });

console.log(score);
