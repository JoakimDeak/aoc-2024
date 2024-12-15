const input = await Bun.file('src/15/input.txt').text()

const WALL = 1
const EMPTY = 0
const LEFT_BOX = 2
const RIGHT_BOX = 3
const ROBOT = 4
type Tile =
  | typeof WALL
  | typeof EMPTY
  | typeof LEFT_BOX
  | typeof RIGHT_BOX
  | typeof ROBOT
type Grid = Tile[][]

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

function isBox(tile: Tile) {
  return [LEFT_BOX, RIGHT_BOX].includes(tile)
}

function canPush(r: number, c: number, dir: Direction, grid: Grid): boolean {
  switch (dir) {
    case UP:
      switch (grid[r - 1][c]) {
        case EMPTY:
          return true
        case WALL:
          return false
        case LEFT_BOX:
          return (
            canPush(r - 1, c, dir, grid) && canPush(r - 1, c + 1, dir, grid)
          )
        case RIGHT_BOX:
          return (
            canPush(r - 1, c, dir, grid) && canPush(r - 1, c - 1, dir, grid)
          )
        case ROBOT:
          throw new Error('tried to push robot')
      }
    case RIGHT:
      switch (grid[r][c + 1]) {
        case EMPTY:
          return true
        case WALL:
          return false
        case LEFT_BOX:
        case RIGHT_BOX:
          return canPush(r, c + 1, dir, grid)
        case ROBOT:
          throw new Error('tried to push robot')
      }
    case DOWN:
      switch (grid[r + 1][c]) {
        case EMPTY:
          return true
        case WALL:
          return false
        case LEFT_BOX:
          return (
            canPush(r + 1, c, dir, grid) && canPush(r + 1, c + 1, dir, grid)
          )
        case RIGHT_BOX:
          return (
            canPush(r + 1, c, dir, grid) && canPush(r + 1, c - 1, dir, grid)
          )
        case ROBOT:
          throw new Error('tried to push robot')
      }
    case LEFT:
      switch (grid[r][c - 1]) {
        case EMPTY:
          return true
        case WALL:
          return false
        case LEFT_BOX:
        case RIGHT_BOX:
          return canPush(r, c - 1, dir, grid)
        case ROBOT:
          throw new Error('tried to push robot')
      }
  }
}

function push(
  r: number,
  c: number,
  dir: Direction,
  grid: Grid,
  calledFromSibling = false
) {
  if ([UP, DOWN].includes(dir)) {
    if (
      grid[r][c] === LEFT_BOX &&
      (!canPush(r, c, dir, grid) || !canPush(r, c + 1, dir, grid))
    ) {
      return false
    }
    if (
      grid[r][c] === RIGHT_BOX &&
      (!canPush(r, c, dir, grid) || !canPush(r, c - 1, dir, grid))
    ) {
      return false
    }
  } else if (!canPush(r, c, dir, grid)) {
    return false
  }

  const currentTile = grid[r][c]
  grid[r][c] = EMPTY
  switch (dir) {
    case UP:
      if (isBox(grid[r - 1][c]) && currentTile === LEFT_BOX) {
        push(r - 1, c, dir, grid)
      }
      if (grid[r - 1][c] === LEFT_BOX && currentTile === RIGHT_BOX) {
        push(r - 1, c, dir, grid)
      }
      if (!calledFromSibling) {
        if (currentTile === LEFT_BOX) {
          push(r, c + 1, dir, grid, true)
        } else {
          push(r, c - 1, dir, grid, true)
        }
      }
      if (grid[r - 1][c] === EMPTY) {
        grid[r - 1][c] = currentTile
        return true
      }
      break
    case RIGHT:
      for (let bc = c + 1; bc < grid[r].length; bc++) {
        if (grid[r][bc] === LEFT_BOX) {
          grid[r][bc] = RIGHT_BOX
        } else if (grid[r][bc] === RIGHT_BOX) {
          grid[r][bc] = LEFT_BOX
        } else if (grid[r][bc] === EMPTY) {
          grid[r][bc] = currentTile === LEFT_BOX ? RIGHT_BOX : LEFT_BOX
          return true
        }
      }
      break
    case DOWN:
      if (isBox(grid[r + 1][c]) && currentTile === LEFT_BOX) {
        push(r + 1, c, dir, grid)
      }
      if (grid[r + 1][c] === LEFT_BOX && currentTile === RIGHT_BOX) {
        push(r + 1, c, dir, grid)
      }
      if (!calledFromSibling) {
        if (currentTile === LEFT_BOX) {
          push(r, c + 1, dir, grid, true)
        } else {
          push(r, c - 1, dir, grid, true)
        }
      }
      if (grid[r + 1][c] === EMPTY) {
        grid[r + 1][c] = currentTile
        return true
      }
      break
    case LEFT:
      for (let bc = c - 1; bc > 0; bc--) {
        if (grid[r][bc] === LEFT_BOX) {
          grid[r][bc] = RIGHT_BOX
        } else if (grid[r][bc] === RIGHT_BOX) {
          grid[r][bc] = LEFT_BOX
        } else if (grid[r][bc] === EMPTY) {
          grid[r][bc] = currentTile === LEFT_BOX ? RIGHT_BOX : LEFT_BOX
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
        .flatMap((char) =>
          char === '#'
            ? ([WALL, WALL] as const)
            : char === '.'
            ? ([EMPTY, EMPTY] as const)
            : char === 'O'
            ? ([LEFT_BOX, RIGHT_BOX] as const)
            : ([ROBOT, EMPTY] as const)
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
          (isBox(grid[rr - 1][rc]) && push(rr - 1, rc, 0, grid))
        ) {
          rr--
        }
        break
      case '>':
        if (
          grid[rr][rc + 1] === EMPTY ||
          (isBox(grid[rr][rc + 1]) && push(rr, rc + 1, 1, grid))
        ) {
          rc++
        }
        break
      case 'v':
        if (
          grid[rr + 1][rc] === EMPTY ||
          (isBox(grid[rr + 1][rc]) && push(rr + 1, rc, 2, grid))
        ) {
          rr++
        }
        break
      case '<':
        if (
          grid[rr][rc - 1] === EMPTY ||
          (isBox(grid[rr][rc - 1]) && push(rr, rc - 1, 3, grid))
        ) {
          rc--
        }
        break
    }
  }

  let sum = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === LEFT_BOX) {
        sum += r * 100 + c
      }
    }
  }
  return sum
}

console.log(run())
