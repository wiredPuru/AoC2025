import fs from 'fs'

const input: string[] = fs
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

const getLargestJoltage = (numStr: string): number => {
    let highestNum = 0
    for (let i = 0; i < numStr.length - 1; i++) {
        for (let j = i + 1; j < numStr.length; j++) {
            const candidate = Number(numStr[i] + numStr[j])
            if (candidate > highestNum) highestNum = candidate
        }
    }
    return highestNum
}

// console.log(getLargestJoltage('818181911112111'))

const solve = input.reduce((acc, v) => {
    const answer = getLargestJoltage(v)
    console.log(answer)
    return answer + acc
}, 0)

console.log(solve)
