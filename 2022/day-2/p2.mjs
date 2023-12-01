import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

let score = 0;

const loss = 0, draw = 3, win = 6;
const rock = 1, paper = 2, scissors = 3;

// What do I need to <win condition> to <A/Rock, B/Paper, C/Scissors>
const scoreMap = {
    'A X': loss + scissors,
    'A Y': draw + rock,
    'A Z': win + paper,
    'B X': loss + rock,
    'B Y': draw + paper,
    'B Z': win + scissors,
    'C X': loss + paper,
    'C Y': draw + scissors,
    'C Z': win + rock
};

input.trim().split('\n').forEach(round => score += scoreMap[round]);

console.log(score);
