const input = await Bun.file('src/11/input.txt').text()

const blink = (stone: number) => {
  if (stone === 0) {
    return [1]
  }
  const length = Math.floor(Math.log10(stone) + 1)
  if (length >= 2 && length % 2 === 0) {
    return [
      Math.floor(stone / Math.pow(10, length / 2)),
      stone % Math.pow(10, length / 2),
    ]
  }
  return [stone * 2024]
}

const part1 = () => {
  const stones = input.split(' ').map(Number)

  const numberOfStones = stones.reduce((numberOfStones, stone) => {
    let res = [stone]
    for (let i = 0; i < 25; i++) {
      res = res.flatMap((stone) => blink(stone))
    }
    return numberOfStones + res.length
  }, 0)

  return numberOfStones
}

const getNumberOfStones = (
  stone: number,
  blink = 0,
  results = new Map<string, number>()
): number => {
  if (blink === 75) {
    return 1
  }
  const memoKey = `${stone},${blink}`

  const memoedResult = results.get(memoKey)
  if (memoedResult !== undefined) {
    return memoedResult
  }

  if (stone === 0) {
    const result = getNumberOfStones(1, blink + 1, results)
    results.set(memoKey, result)
    return result
  }

  const length = Math.floor(Math.log10(stone) + 1)
  if (length % 2 === 0) {
    const left = Math.floor(stone / Math.pow(10, length / 2))
    const right = stone % Math.pow(10, length / 2)
    const result =
      getNumberOfStones(left, blink + 1, results) +
      getNumberOfStones(right, blink + 1, results)
    results.set(memoKey, result)
    return result
  }

  const result = getNumberOfStones(stone * 2024, blink + 1, results)
  results.set(memoKey, result)
  return result
}

const part2 = () => {
  const stones = input.split(' ').map(Number)
  const numberOfStones = stones.reduce(
    (numberOfStones, stone) => numberOfStones + getNumberOfStones(stone),
    0
  )
  return numberOfStones
}

console.log(part1())
console.log(part2())
