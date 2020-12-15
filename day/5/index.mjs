import read from '../read.mjs'
import {fileURLToPath} from 'url'
import * as path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rawData = read(path.join(__dirname, 'input.txt'))

function getSeatId(input) {
    const row = convertBinaryCode(input.substr(0, 7), 'B')
    const seat = convertBinaryCode(input.substr(7, 3), 'R')

    return row * 8 + seat
}

function convertBinaryCode(code, charUp) {
    let number = 0

    for (let i = 0; i < code.length; i += 1) {
        number += charUp === code[i] ? 2 ** (code.length - i - 1) : 0
    }

    return number
}

const seatIds = rawData.map(getSeatId).sort((a, b) => a - b)

const minId = seatIds[0]
const maxId = seatIds[seatIds.length - 1]
let myId

for (let i = 0; i < seatIds.length - 1; i += 1) {
    if (seatIds[i] + 1 !== seatIds[i + 1]) {
        myId = seatIds[i] + 1
        break;
    }
}

console.log({maxId, minId, myId})

