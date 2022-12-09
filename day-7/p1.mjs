import fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const flatMap = {};
let curPath = [];

for (const line of input.trim().split('\n')) {
    if (line.startsWith('$')) {
        // User command
        const args = line.split(' ').slice(1);
        if (args[0] === 'cd') {
            if (args[1] === '/') {
                curPath = [];
                continue;
            } else if (args[1] === '..') {
                curPath.pop();
                continue;
            }
            curPath.push(args[1]);
        }
    } else {
        // Command response - only ls gives a response!
        if (line.startsWith('dir')) {
            const name = line.replace('dir ', '');
            const path = '/' + curPath.join('/') + (curPath.length ? '/' : '') + name;
            if (flatMap[path] == null) flatMap[path] = 0;
        } else {
            const [size, name] = line.split(' ');
            const path = '/' + curPath.join('/') + (curPath.length ? '/' : '') + name;
            if (flatMap[path] == null) flatMap[path] = parseInt(size);
        }
    }
}

// console.log(flatMap);

// Start at deepest path and work way up until the sum of all the files in the path crosses 100,000

const map = {};

for (const [path, size] of Object.entries(flatMap)) {
    let pathArr = path.split('/').slice(1);
    const index = pathArr.join("']['");
    const evalStr = `map['${index}']`;
    const access = eval(evalStr);

    // Assign totals!
    for (let i = -1; i > -pathArr.length-1; i--) {
        const parentIndex = pathArr.slice(0, i).join("']['");
        let parentEvalStr;
        if (parentIndex === '') {
            // Already at top level
            parentEvalStr = 'map.__total';
        } else {
            parentEvalStr = `map['${parentIndex}'].__total`;
        }
        const parentAccess = eval(parentEvalStr);
        if (parentAccess == null) {
            eval(`${parentEvalStr} = 0`);
        }

        if (size !== 0) {
            eval(`${parentEvalStr} += ${size}`);
        }
    }


    if (size === 0) {
        if (access == null) {
            eval(`${evalStr} = {}`);
        }
    } else {
        eval(`${evalStr} = ${size}`);
    }
}

// console.log(map);

/// STOLEN
function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x) || !x.endsWith('__total')) continue;

                toReturn[i + '/' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
/// ...

const flatMap2 = flattenObject(map);

const totalSpace = 70_000_000;
const minSpace = 30_000_000;

let total = Object.values(flatMap2)[0];
let sum = 0;
const deletionCandidates = [];
for (const value of Object.values(flatMap2)) {
    if (value < 100_000) sum += value;
    if (total - value < totalSpace - minSpace) deletionCandidates.push(value);
}

deletionCandidates.sort();

console.log('[Part One] Sum:', sum);

console.log('[Part Two] Deletion candidates:', deletionCandidates.join(', '));
console.log('[Part Two] Deleting', deletionCandidates[0], 'would leave us with', total - deletionCandidates[0], 'bytes of free space');
