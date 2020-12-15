import rawData from './input.mjs'

const multipleOfTwoSummingTo2020 = rawData
    .filter(value => rawData.includes(2020 - value))
    .reduce(Math.imul, 1)

const multipleOfThreeSummingTo2020 = (function () {
    for (const value of rawData) {
        const diff = 2020 - value
        const values = rawData.filter(value => rawData.includes(diff - value))

        if (values.length > 0) {
            values.push(value)
            return values.reduce(Math.imul, 1)
        }
    }
})()

console.log({
    multipleOfTwoSummingTo2020,
    multipleOfThreeSummingTo2020,
})
