import fs from 'fs'
// const ranges = ['1188511880-1188511890']
const ranges: string[] = fs
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(',')

const idPairs: number[][] = ranges.map((range: string) =>
    range.split('-').map((v) => +v),
)

const splitUpGroup =
    (size: number) =>
    (arr: string[]): string[] => {
        return arr.reduce<string[]>((acc, _, i) => {
            if (i % size === 0) {
                acc.push(arr.slice(i, i + size).join(''))
            }
            return acc
        }, [])
    }

const isInvalid = (seq: string, arr: string[]): boolean => {
    // console.log(seq, arr)
    return arr.every((num) => num === seq)
}

const getInvalidIds = ([start, end]: number[]): number[] => {
    const invalidIds: number[] = []

    for (let i = start; i <= end; i++) {
        // console.log(`\n\nINDEX: ${i} -----`)
        if (i<10) {continue}
        const tmp: string[] = []
        const numToArr: string[] = i.toString().split('')
        for (let j = 0; j < numToArr.length; j++) {
            if (tmp.length >= Math.ceil(numToArr.length / 2)) {
                continue
            }
            tmp.push(numToArr[j])
            const arr: string[] = splitUpGroup(tmp.length)(numToArr)
            // console.log(`${tmp} -> ${arr}`)
            if (isInvalid(tmp.join(''), arr)) {
                invalidIds.push(i)
                break
            }
        }
    }
    return invalidIds
}

const solve = (): number => {
    const answer: number[] = []
    idPairs.forEach(([start, end]) => {
        const invalidIds: number[] = getInvalidIds([start, end])
        if (invalidIds.length === 0) return
        answer.push(...invalidIds)
    })
    console.table(answer)
    const sum = answer.reduce((acc, val) => {
        return acc + val
    }, 0)
    return sum
}

const main = (): void => {
    console.log(solve())
}

main()
