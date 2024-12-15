const input = await Bun.file('src/15/mock.txt').text()

const WALL = 1
const EMPTY = 0
const BOX = 2
const ROBOT = 3
type Grid = (typeof WALL | typeof EMPTY | typeof BOX | typeof ROBOT)[][]

const UP = 0
const RIGHT = 1
const DOWN = 2
const LEFT = 3
type Direction = typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT

function findRobot(grid: Grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === ROBOT) {
        return [r, c]
      }
    }
  }
  throw new Error('Could not find robot')
}

function canPush(r: number, c: number, dir: Direction, grid: Grid) {
  switch (dir) {
    case UP:
      if (grid[r - 1][c] === EMPTY) {
        return true
      }
      if (grid[r - 1][c] === WALL) {
        return false
      }
      return canPush(r - 1, c, dir, grid)
    case RIGHT:
      if (grid[r][c + 1] === EMPTY) {
        return true
      }
      if (grid[r][c + 1] === WALL) {
        return false
      }
      return canPush(r, c + 1, dir, grid)

    case DOWN:
      if (grid[r + 1][c] === EMPTY) {
        return true
      }
      if (grid[r + 1][c] === WALL) {
        return false
      }
      return canPush(r + 1, c, dir, grid)

    case LEFT:
      if (grid[r][c - 1] === EMPTY) {
        return true
      }
      if (grid[r][c - 1] === WALL) {
        return false
      }
      return canPush(r, c - 1, dir, grid)
  }
}

function pushBoxes(r: number, c: number, dir: Direction, grid: Grid) {
  if (!canPush(r, c, dir, grid)) {
    return false
  }
  grid[r][c] = EMPTY
  switch (dir) {
    case UP:
      for (let br = r - 1; br >= 0; br--) {
        if (grid[br][c] === EMPTY) {
          grid[br][c] = BOX
          return true
        }
      }
      break
    case RIGHT:
      for (let bc = c + 1; bc < grid[r].length; bc++) {
        if (grid[r][bc] === EMPTY) {
          grid[r][bc] = BOX
          return true
        }
      }
      break
    case DOWN:
      for (let br = r + 1; br < grid.length; br++) {
        if (grid[br][c] === EMPTY) {
          grid[br][c] = BOX
          return true
        }
      }
      break
    case LEFT:
      for (let bc = c - 1; bc >= 0; bc--) {
        if (grid[r][bc] === EMPTY) {
          grid[r][bc] = BOX
          return true
        }
      }
      break
  }
  throw new Error('failed to push boxes')
}

function run() {
  const [gridStrings, moveStrings] = input.split('\n\n')
  const grid = gridStrings
    .split('\n')
    .map((line) =>
      line
        .split('')
        .map((char) =>
          char === '#'
            ? WALL
            : char === '.'
            ? EMPTY
            : char === 'O'
            ? BOX
            : ROBOT
        )
    )
  const moves = moveStrings.replaceAll('\n', '')

  let [rr, rc] = findRobot(grid)
  grid[rr][rc] = EMPTY

  for (let i = 0; i < moves.length; i++) {
    switch (moves[i]) {
      case '^':
        if (
          grid[rr - 1][rc] === EMPTY ||
          (grid[rr - 1][rc] === BOX && pushBoxes(rr - 1, rc, UP, grid))
        ) {
          rr--
        }
        break
      case '>':
        if (
          grid[rr][rc + 1] === EMPTY ||
          (grid[rr][rc + 1] === BOX && pushBoxes(rr, rc + 1, RIGHT, grid))
        ) {
          rc++
        }
        break
      case 'v':
        if (
          grid[rr + 1][rc] === EMPTY ||
          (grid[rr + 1][rc] === BOX && pushBoxes(rr + 1, rc, DOWN, grid))
        ) {
          rr++
        }
        break
      case '<':
        if (
          grid[rr][rc - 1] === EMPTY ||
          (grid[rr][rc - 1] === BOX && pushBoxes(rr, rc - 1, LEFT, grid))
        ) {
          rc--
        }
        break
      default:
        throw new Error('unexpected move')
    }
  }

  let sum = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === BOX) {
        sum += r * 100 + c
      }
    }
  }
  return sum
}

console.log(run())
