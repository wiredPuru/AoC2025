import fs from 'fs'

type DialInstruction = [string, number]

const input: DialInstruction[] = fs
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((line): DialInstruction => [line[0], +line.slice(1)])

const moveLeft = (
    currentDialNum: number,
): { val: number; isWrapping: boolean } => {
    let isWrapping = false
    let tmp = currentDialNum - 1
    if (tmp === 0) isWrapping = true
    if (tmp < 0) tmp = 99
    return { val: tmp, isWrapping }
}

const moveRight = (
    currentDialNum: number,
): { val: number; isWrapping: boolean } => {
    let isWrapping = false
    let tmp = currentDialNum + 1
    if (tmp > 99) {
        tmp = 0
        isWrapping = true
    }
    return { val: tmp, isWrapping }
}

const getNewDial = (
    [dir, dialNum]: DialInstruction,
    currentDialNum: number,
): { newDialNum: number; zeroPasses: number; oldDialNum: number } => {
    let zeroPasses = 0
    let oldDialNum = currentDialNum
    for (let i = 0; i < dialNum; i++) {
        if (dir === 'L') {
            const { val, isWrapping } = moveLeft(currentDialNum)
            currentDialNum = val
            if (isWrapping) zeroPasses++
        }

        if (dir === 'R') {
            const { val, isWrapping } = moveRight(currentDialNum)
            currentDialNum = val
            if (currentDialNum === 0) zeroPasses++
        }
    }

    return { newDialNum: currentDialNum, zeroPasses, oldDialNum }
}

const main = () => {
    const solve1 = (input: DialInstruction[]): number => {
        let curr = 50
        return input.reduce((acc: number, line: DialInstruction): number => {
            const newDial = getNewDial(line, curr)
            curr = newDial.newDialNum
            if (newDial.newDialNum === 0) return acc + 1
            return acc
        }, 0)
    }

    const solve2 = (input: DialInstruction[]): number => {
        let curr = 50
        return input.reduce(
            (passedZeroCount: number, line: DialInstruction): number => {
                const newDial = getNewDial(line, curr)
                curr = newDial.newDialNum
                return passedZeroCount + newDial.zeroPasses
            },
            0,
        )
    }
    console.log(solve1(input))
    console.log(solve2(input))
}

main()
