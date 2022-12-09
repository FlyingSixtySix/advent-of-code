import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const rucksacks = input.trim().split('\n');

const commonChars = rucksacks.map((rucksack, i) => {
    const compartmentSize = rucksack.length / 2;
    const left = rucksack.slice(0, compartmentSize);
    const right = rucksack.slice(compartmentSize, rucksack.length);
    return left.split('').find(v => right.includes(v));
});

const prioritySum = commonChars.map(c => {
    const charCode = c.charCodeAt(0);
    if (charCode >= 97) {
        // Lowercase
        return charCode - 97 + 1;
    } else {
        // Uppercase
        return charCode - 65 + 1 + 26;
    }
}).reduce((a, b) => a + b);

console.log(prioritySum);
