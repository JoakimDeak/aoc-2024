const input = await Bun.file('src/10/input.txt').text()

const getReachablePeaks = (
  y: number,
  x: number,
  elevation: number,
  map: string[],
  peaks: number = 0,
  visitedSpots: Set<`${number}:${number}`> = new Set()
) => {
  if (visitedSpots.has(`${y}:${x}`)) {
    return 0
  } else {
    visitedSpots.add(`${y}:${x}`)
  }
  if (elevation === 9) {
    peaks++
  }

  if (Number(map[y - 1]?.[x]) === elevation + 1) {
    const res = getReachablePeaks(
      y - 1,
      x,
      elevation + 1,
      map,
      peaks,
      visitedSpots
    )
    if (res > peaks) {
      peaks = res
    }
  }
  if (Number(map[y]?.[x + 1]) === elevation + 1) {
    const res = getReachablePeaks(
      y,
      x + 1,
      elevation + 1,
      map,
      peaks,
      visitedSpots
    )
    if (res > peaks) {
      peaks = res
    }
  }
  if (Number(map[y + 1]?.[x]) === elevation + 1) {
    const res = getReachablePeaks(
      y + 1,
      x,
      elevation + 1,
      map,
      peaks,
      visitedSpots
    )
    if (res > peaks) {
      peaks = res
    }
  }
  if (Number(map[y]?.[x - 1]) === elevation + 1) {
    const res = getReachablePeaks(
      y,
      x - 1,
      elevation + 1,
      map,
      peaks,
      visitedSpots
    )
    if (res > peaks) {
      peaks = res
    }
  }
  return peaks
}

const part1 = () => {
  const map = input.split('\n')
  const trailHeads = map.reduce((startingPositions, line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '0') {
        startingPositions.push([y, x])
      }
    }

    return startingPositions
  }, [] as [number, number][])

  return trailHeads.reduce(
    (peaks, [y, x]) => peaks + getReachablePeaks(y, x, Number(map[y][x]), map),
    0
  )
}

const getPaths = (
  y: number,
  x: number,
  elevation: number,
  map: string[],
  peaks: number = 0
) => {
  if (elevation === 9) {
    peaks++
  }

  if (Number(map[y - 1]?.[x]) === elevation + 1) {
    const res = getPaths(y - 1, x, elevation + 1, map, peaks)
    if (res > peaks) {
      peaks = res
    }
  }
  if (Number(map[y]?.[x + 1]) === elevation + 1) {
    const res = getPaths(y, x + 1, elevation + 1, map, peaks)
    if (res > peaks) {
      peaks = res
    }
  }
  if (Number(map[y + 1]?.[x]) === elevation + 1) {
    const res = getPaths(y + 1, x, elevation + 1, map, peaks)
    if (res > peaks) {
      peaks = res
    }
  }
  if (Number(map[y]?.[x - 1]) === elevation + 1) {
    const res = getPaths(y, x - 1, elevation + 1, map, peaks)
    if (res > peaks) {
      peaks = res
    }
  }
  return peaks
}

const part2 = () => {
  const map = input.split('\n')
  const trailHeads = map.reduce((startingPositions, line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '0') {
        startingPositions.push([y, x])
      }
    }

    return startingPositions
  }, [] as [number, number][])

  return trailHeads.reduce(
    (peaks, [y, x]) => peaks + getPaths(y, x, Number(map[y][x]), map),
    0
  )
}

console.log(part1())
console.log(part2())
