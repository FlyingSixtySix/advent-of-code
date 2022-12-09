import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const groups = [];

const rucksacks = input.trim().split('\n');

for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push([
        rucksacks[i],
        rucksacks[i + 1],
        rucksacks[i + 2]
    ]);
}

const commonChars = groups.map(group => {
    return group[0].split('').find(v => group[1].includes(v) && group[2].includes(v));
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


