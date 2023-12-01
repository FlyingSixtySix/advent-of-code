import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const lines = input.trim().split('\n');

let stackLines = [];

let i = 0;
while (lines[i].trim() !== '') {
    const line = lines[i];
    stackLines.push(line);
    i++;
}

let [ numStacks ] = /\d+$/.exec(stackLines[stackLines.length - 1].trim());
numStacks = parseInt(numStacks);

const stacks = {};
stackLines.pop();
stackLines.reverse();

for (const line of stackLines) {
    for (let i = 0; i < numStacks; i++) {
        if (typeof stacks[i] === 'undefined') {
            stacks[i] = [];
        }
        const char = line[1 + (4 * i)].trim();
        if (char === '') continue;
        stacks[i].push(char);
    }
}

const moveLines = lines.slice(i + 1);

for (const moveLine of moveLines) {
    let [ _, amount, from, to ] = /move (\d+) from (\d+) to (\d+)/.exec(moveLine);
    amount = parseInt(amount);
    const fromIndex = from - 1;
    const toIndex = to - 1;
    // move 3 from 9 to 4
    const toMove = stacks[fromIndex].slice(stacks[fromIndex].length - amount);
    // Reverse order
    toMove.reverse();
    // Remove from stack
    stacks[fromIndex] = stacks[fromIndex].slice(0, stacks[fromIndex].length - amount);
    // Put on new stack
    stacks[toIndex].push(...toMove);
}

const top = Object.values(stacks).map(stack => {
    stack.reverse();
    return stack[0];
});

console.log(top.join(''));
