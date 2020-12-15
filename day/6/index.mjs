import read from '../read.mjs'
import {fileURLToPath} from 'url'
import * as path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rawData = read(path.join(__dirname, 'input.txt'), {splitBy: '\n\n'})

function getUniqueAnswerCount(answers) {
    return Array.from(new Set(answers.split(''))).filter(val => val !== '\n').length
}

function getAnsweredByAllCount(answers) {
    answers = answers.split('\n').map(row => [...new Set(row.split(''))])

    if (answers.length === 0) {
        return 0
    } else if (answers.length === 1) {
       return answers[0].length
    }

    let intersection = answers[0]
        console.log(answers.length)

    for (let i = 1; i < answers.length; i += 1) {
        console.log('loop')
        intersection = intersection.filter(val => answers[i].includes(val))
    }

    return intersection.length
}

console.log({
    uniqueAnswers: rawData.map(getUniqueAnswerCount).reduce((acc, val) => acc + val, 0),
    answeredByAll: rawData.map(getAnsweredByAllCount).reduce((acc, val) => acc + val, 0)
})

// console.log({x: rawData[0], y: getAnsweredByAllCount(rawData[0])})
