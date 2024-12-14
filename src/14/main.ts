const input = await Bun.file('src/14/input.txt').text()

function part1() {
  const robots = input
    .split('\n')
    .map((line) =>
      line.split(' ').flatMap((part) => part.slice(2).split(',').map(Number))
    )

  const SIMULATIONS = 100
  const SPACE_WIDTH = 101
  const SPACE_HEIGHT = 103

  const quadrantCounts = robots.reduce(
    (quadrantCounts, [x, y, vx, vy]) => {
      let simX = x
      let simY = y
      for (let i = 0; i < SIMULATIONS; i++) {
        const remainderX = (simX + vx) % SPACE_WIDTH
        simX = remainderX < 0 ? remainderX + SPACE_WIDTH : remainderX

        const remainderY = (simY + vy) % SPACE_HEIGHT
        simY = remainderY < 0 ? remainderY + SPACE_HEIGHT : remainderY
      }

      const horizontalMiddle = Math.floor(SPACE_WIDTH / 2)
      const verticalMiddle = Math.floor(SPACE_HEIGHT / 2)

      switch (true) {
        case simX < horizontalMiddle && simY < verticalMiddle:
          quadrantCounts[0] = quadrantCounts[0] + 1
          break
        case simX > horizontalMiddle && simY < verticalMiddle:
          quadrantCounts[1] = quadrantCounts[1] + 1
          break
        case simX < horizontalMiddle && simY > verticalMiddle:
          quadrantCounts[2] = quadrantCounts[2] + 1
          break
        case simX > horizontalMiddle && simY > verticalMiddle:
          quadrantCounts[3] = quadrantCounts[3] + 1
          break
      }

      return quadrantCounts
    },
    { 0: 0, 1: 0, 2: 0, 3: 0 }
  )

  const result = Object.values(quadrantCounts)
    .filter(Boolean)
    .reduce((product, count) => product * count, 1)

  return result
}

// ctrl+f in terminal :/
function part2() {
  const robots = input
    .split('\n')
    .map((line) =>
      line.split(' ').flatMap((part) => part.slice(2).split(',').map(Number))
    )

  const SPACE_WIDTH = 101
  const SPACE_HEIGHT = 103
  for (let i = 1; i < SPACE_WIDTH * SPACE_HEIGHT; i++) {
    const grid: string[] = []
    for (let y = 0; y < SPACE_HEIGHT; y++) {
      grid[y] = ' '.repeat(SPACE_WIDTH)
    }
    robots.forEach(([x, y, vx, vy], i) => {
      const remainderX = (x + vx) % SPACE_WIDTH
      const remainderY = (y + vy) % SPACE_HEIGHT
      const nextX = remainderX < 0 ? remainderX + SPACE_WIDTH : remainderX
      const nextY = remainderY < 0 ? remainderY + SPACE_HEIGHT : remainderY

      grid[nextY] =
        grid[nextY].slice(0, nextX) + '*' + grid[nextY].slice(nextX + 1)

      robots[i][0] = nextX
      robots[i][1] = nextY
    })
    console.log(i, grid)
  }
}

console.log(part1())
console.log(part2())
