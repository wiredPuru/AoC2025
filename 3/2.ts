import fs from 'fs'

const input: string[] = fs
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

const getLargestJoltage = (numStr: string): number => {
    let highestNumber: string[] = []
    let digitsRemaining = 12
    let p1 = 0
    let p2 = numStr.length - digitsRemaining + 1
    while (digitsRemaining !== 0) {
        // console.log(numStr.slice(p1, p2 + 1))
        let localHighest = 0
        let localHighestIndex = 0
        for (let i = p1; i < p2; i++) {
            if (+numStr[i] > localHighest) {
                localHighest = +numStr[i]
                localHighestIndex = i
            }
        }
        digitsRemaining -= 1
        p1 = localHighestIndex + 1
        p2 = numStr.length - digitsRemaining + 1
        highestNumber.push(localHighest.toString())
    }
    return Number(highestNumber.join(''))
}

const solve = input.reduce((acc, v) => {
    const answer = getLargestJoltage(v)
    console.log(answer)
    return answer + acc
}, 0)

console.log(solve)
