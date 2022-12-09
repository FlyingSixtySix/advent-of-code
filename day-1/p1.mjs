import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const mostCal = input
    // Split into groups per elf
    .split('\n\n')
    // Split into calories per elf
    .map(group => group.split('\n'))
    // Parse as number
    .map(group => group.map(str => parseInt(str)))
    // Reduce groups into sum of each
    .map(group => group.reduce((a, b) => a + b))
    // Sort by largest number descending
    .sort((a, b) => b - a)
    // And get the largest!
    [0];

console.log(mostCal);
