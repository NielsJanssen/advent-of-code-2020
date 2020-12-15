import read from '../read.mjs'
import {fileURLToPath} from 'url'
import * as path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawData = read(path.join(__dirname, 'input.txt'), {splitBy: '\n\n'})

const rules = {
    byr: (val) => val >= 1920 && val <= 2002,
    iyr: (val) => val >= 2010 && val <= 2020,
    eyr: (val) => val >= 2020 && val <= 2030,
    hgt: (val) => {
        const int = parseInt(val)
        return val[val.length - 1] === 'm'
            ? int >= 150 && int <= 193 // CM
            : int >= 59 && int <= 76 // Inch
    } ,
    hcl: (val) => /^#[0-9a-f]{6}/i.test(val),
    ecl: (val) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
    pid: (val) => val.length === 9 && !isNaN(parseInt(val)),
}

console.log({
    'Passports': rawData.length,
    'Part 1': rawData.map(val => isValid(val, false)).reduce((acc, val) => acc + +val, 0),
    'Part 2': rawData.map(val => isValid(val, true)).reduce((acc, val) => acc + +val, 0),
})

function isValid(input, strict = false) {
    // Extract fields by key:value format from text and convert to object
    const fields = Array.from(input.matchAll(/(?<key>[a-z]+)(?::)(?<value>[^\s]+)/ig))
        .reduce((acc, {groups: {key, value}}) => Object.assign(acc, {[key]: value}), {})

    const keys = Object.keys(fields)

    // Check if all required fields are there
    if (!Object.keys(rules).every(val => keys.includes(val))) {
        return false
    }

    if (strict) {
        for (const key in rules) {
            const rule = rules[key]

            if (!rule(fields[key])) {
                return false
            }
        }
    }

    return true
}
