import input from './input.mjs'

const parsedPasswords = input.map(string => {
    const {
        password,
        char,
        lower,
        upper,
    } = string.match(/(?<lower>[0-9]+)-(?<upper>[0-9]+) (?<char>[a-z]): (?<password>[a-z]+)/i).groups

    return {
        password, char, lower: parseInt(lower), upper: parseInt(upper)
    }
})

console.log({
    validByCharUsageInRange: parsedPasswords.reduce((total, {password, char, lower, upper}) => {
        const charCount = [...password.matchAll(new RegExp(char, 'ig'))].length
        const isValid = lower <= charCount && charCount <= upper

        return total + +isValid
    }, 0),

    validByXorCharPosition: parsedPasswords.reduce((total, {password, char, lower, upper}) => {
        const [lowerResult, upperResult] = [lower, upper].map(index => password[index - 1] === char)
        const isValid = lowerResult !== upperResult

        return total + +isValid
    }, 0)
})
