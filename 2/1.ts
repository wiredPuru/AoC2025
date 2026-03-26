import fs from 'fs'

const ranges: string[] = fs
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(',')

const idPairs: number[][] = ranges.map((range: string) =>
    range.split('-').map((v) => +v),
)

const getInvalidIds = ([start, end]: number[]): number[] => {
    const invalidIds: number[] = []
    for (let i = start; i <= end; i++) {
        const tmp: string[] = []
        const numToArr: string[] = i.toString().split('')

        for (const [j, num] of numToArr.entries()) {
            tmp.push(num)
            const tmp2: string[] = numToArr.slice(j + 1)
            if (tmp.join('') === tmp2.join('')) invalidIds.push(i)
        }
    }
    return invalidIds
}

const main = (): void => {
    const answer: number[] = []
    idPairs.forEach(([start, end]) => {
        const invalidIds: number[] = getInvalidIds([start, end])
        if (invalidIds.length === 0) return
        answer.push(...invalidIds)
    })
    const sum = answer.reduce((acc, val) => {
        return acc + val
    }, 0)
    console.log(sum)
}

main()
