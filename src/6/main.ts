const input = await Bun.file('src/6/input.txt').text()

const findStart = (grid: string[]) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (['^', '>', 'v', '<'].includes(grid[y][x])) {
        return { y, x, dir: grid[y][x] }
      }
    }
  }
  throw new Error('could not find start')
}

const part1 = () => {
  const grid = input.split('\n')

  let { y, x, dir } = findStart(grid)

  const visitedSpots = new Set<string>()
  let isInsideMap = true
  while (isInsideMap) {
    visitedSpots.add(`${y}:${x}`)
    switch (dir) {
      case '^':
        if (grid[y - 1]?.[x] === undefined) {
          isInsideMap = false
        } else if (grid[y - 1][x] === '#') {
          dir = '>'
        } else {
          y--
        }
        break
      case '>':
        if (grid[y]?.[x + 1] === undefined) {
          isInsideMap = false
        } else if (grid[y][x + 1] === '#') {
          dir = 'v'
        } else {
          x++
        }
        break
      case 'v':
        if (grid[y + 1]?.[x] === undefined) {
          isInsideMap = false
        } else if (grid[y + 1][x] === '#') {
          dir = '<'
        } else {
          y++
        }
        break
      case '<':
        if (grid[y]?.[x - 1] === undefined) {
          isInsideMap = false
        } else if (grid[y][x - 1] === '#') {
          dir = '^'
        } else {
          x--
        }
        break
    }
  }

  return visitedSpots.size
}

const part2 = () => {
  const grid = input.split('\n')

  const test = (
    yStart: number,
    xStart: number,
    dir: string,
    grid: string[],
    yObs: number,
    xObs: number
  ) => {
    const visitedSpots = new Set<`${number}:${number}:${string}`>()
    let isInsideMap = true
    let y = yStart
    let x = xStart
    while (isInsideMap) {
      if (visitedSpots.has(`${y}:${x}:${dir}`)) {
        return true
      }
      visitedSpots.add(`${y}:${x}:${dir}`)
      switch (dir) {
        case '^':
          if (grid[y - 1]?.[x] === undefined) {
            isInsideMap = false
          } else if (grid[y - 1][x] === '#' || (y - 1 === yObs && x === xObs)) {
            dir = '>'
          } else {
            y--
          }
          break
        case '>':
          if (grid[y]?.[x + 1] === undefined) {
            isInsideMap = false
          } else if (grid[y][x + 1] === '#' || (y === yObs && x + 1 === xObs)) {
            dir = 'v'
          } else {
            x++
          }
          break
        case 'v':
          if (grid[y + 1]?.[x] === undefined) {
            isInsideMap = false
          } else if (grid[y + 1][x] === '#' || (y + 1 === yObs && x === xObs)) {
            dir = '<'
          } else {
            y++
          }
          break
        case '<':
          if (grid[y]?.[x - 1] === undefined) {
            isInsideMap = false
          } else if (grid[y][x - 1] === '#' || (y === yObs && x - 1 === xObs)) {
            dir = '^'
          } else {
            x--
          }
          break
      }
    }
    return false
  }

  const { y: yStart, x: xStart, dir } = findStart(grid)

  console.log('goes to y:', grid.length)
  let workingObstacles = 0
  for (let y = 0; y < grid.length; y++) {
    console.log('y:', y)
    for (let x = 0; x < grid[y].length; x++) {
      if (test(yStart, xStart, dir, grid, y, x)) {
        workingObstacles++
      }
    }
  }
  return workingObstacles
}

console.log(part1())
console.log(part2())
