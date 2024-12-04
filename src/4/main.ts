const input = await Bun.file('src/4/input.txt').text()

const part1 = () => {
  const grid = input.split('\n')

  const countXMASStartsAt = (y: number, x: number, grid: string[]) => {
    let words = 0

    const char = grid[y][x]
    if (!(char === 'X')) {
      return words
    }

    // up
    if (
      grid[y - 1]?.[x] === 'M' &&
      grid[y - 2]?.[x] === 'A' &&
      grid[y - 3]?.[x] === 'S'
    ) {
      words++
    }

    // up right
    if (
      grid[y - 1]?.[x + 1] === 'M' &&
      grid[y - 2]?.[x + 2] === 'A' &&
      grid[y - 3]?.[x + 3] === 'S'
    ) {
      words++
    }

    // right
    if (
      grid[y]?.[x + 1] === 'M' &&
      grid[y]?.[x + 2] === 'A' &&
      grid[y]?.[x + 3] === 'S'
    ) {
      words++
    }

    // down right
    if (
      grid[y + 1]?.[x + 1] === 'M' &&
      grid[y + 2]?.[x + 2] === 'A' &&
      grid[y + 3]?.[x + 3] === 'S'
    ) {
      words++
    }

    // down
    if (
      grid[y + 1]?.[x] === 'M' &&
      grid[y + 2]?.[x] === 'A' &&
      grid[y + 3]?.[x] === 'S'
    ) {
      words++
    }

    // down left
    if (
      grid[y + 1]?.[x - 1] === 'M' &&
      grid[y + 2]?.[x - 2] === 'A' &&
      grid[y + 3]?.[x - 3] === 'S'
    ) {
      words++
    }

    // left
    if (
      grid[y]?.[x - 1] === 'M' &&
      grid[y]?.[x - 2] === 'A' &&
      grid[y]?.[x - 3] === 'S'
    ) {
      words++
    }

    // up left
    if (
      grid[y - 1]?.[x - 1] === 'M' &&
      grid[y - 2]?.[x - 2] === 'A' &&
      grid[y - 3]?.[x - 3] === 'S'
    ) {
      words++
    }

    return words
  }

  let foundWords = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      foundWords += countXMASStartsAt(y, x, grid)
    }
  }

  return foundWords
}

const part2 = () => {
  const grid = input.split('\n')

  const checkIfX = (y: number, x: number, grid: string[]) => {
    const char = grid[y][x]

    if (!(char === 'A')) {
      return false
    }

    // M.M
    // .A.
    // S.S
    if (
      grid[y - 1]?.[x - 1] === 'M' &&
      grid[y - 1]?.[x + 1] === 'M' &&
      grid[y + 1]?.[x + 1] === 'S' &&
      grid[y + 1]?.[x - 1] === 'S'
    ) {
      return true
    }

    // S.M
    // .A.
    // S.M
    if (
      grid[y - 1]?.[x - 1] === 'S' &&
      grid[y - 1]?.[x + 1] === 'M' &&
      grid[y + 1]?.[x + 1] === 'M' &&
      grid[y + 1]?.[x - 1] === 'S'
    ) {
      return true
    }

    // S.S
    // .A.
    // M.M
    if (
      grid[y - 1]?.[x - 1] === 'S' &&
      grid[y - 1]?.[x + 1] === 'S' &&
      grid[y + 1]?.[x + 1] === 'M' &&
      grid[y + 1]?.[x - 1] === 'M'
    ) {
      return true
    }

    // M.S
    // .A.
    // M.S
    if (
      grid[y - 1]?.[x - 1] === 'M' &&
      grid[y - 1]?.[x + 1] === 'S' &&
      grid[y + 1]?.[x + 1] === 'S' &&
      grid[y + 1]?.[x - 1] === 'M'
    ) {
      return true
    }

    return false
  }

  let foundXs = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (checkIfX(y, x, grid)) {
        foundXs++
      }
    }
  }

  return foundXs
}

console.log(part1())
console.log(part2())
