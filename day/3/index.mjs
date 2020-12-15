import read from '../read.mjs'
import {fileURLToPath} from 'url'
import * as path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rawData = read(path.join(__dirname, 'input.txt'))

function checkSlope([angleX, angleY]) {
    let trees = 0
    let column = 0

    for (let i = 0; i < rawData.length; i += angleY) {
        const landscape = rawData[i]
        trees += +(landscape[column % landscape.length] === '#')
        column += angleX
    }

    return trees
}

console.log({
    'Part 1': [[3, 1]].map(checkSlope),
    'Part 2': [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ].map(checkSlope).reduce((acc, val) => acc * val, 1),
})
