import fs from 'fs'

export default function read(path, {splitBy = '\n'} = {}) {
    const data = fs.readFileSync(path, 'utf8').trimEnd()

    return data
        .split(splitBy)
        .filter(val => !!val)
}
