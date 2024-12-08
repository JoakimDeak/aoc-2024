const input = await Bun.file('src/8/input.txt').text()

const part1 = () => {
  const grid = input.split('\n')

  const antennas = {} as Record<string, number[][]>
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const frequency = grid[y][x]
      if (frequency !== '.') {
        if (antennas[frequency] === undefined) {
          antennas[frequency] = []
        }
        antennas[frequency].push([y, x])
      }
    }
  }

  const antinodes = new Set<`${number}:${number}`>()
  Object.values(antennas).forEach((positions) => {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [yA, xA] = positions[i]
        const [yB, xB] = positions[j]

        const antinodeAY = yA * 2 - yB
        const antinodeAX = xA * 2 - xB
        if (
          antinodeAY >= 0 &&
          antinodeAY < grid.length &&
          antinodeAX >= 0 &&
          antinodeAX < grid[0].length
        ) {
          antinodes.add(`${antinodeAY}:${antinodeAX}`)
        }
        const antinodeBY = yB * 2 - yA
        const antinodeBX = xB * 2 - xA
        if (
          antinodeBY >= 0 &&
          antinodeBY < grid.length &&
          antinodeBX >= 0 &&
          antinodeBX < grid[0].length
        ) {
          antinodes.add(`${antinodeBY}:${antinodeBX}`)
        }
      }
    }
  })

  return antinodes.size
}

const part2 = () => {
  const grid = input.split('\n')

  const antennas = {} as Record<string, number[][]>
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const frequency = grid[y][x]
      if (frequency !== '.') {
        if (antennas[frequency] === undefined) {
          antennas[frequency] = []
        }
        antennas[frequency].push([y, x])
      }
    }
  }

  const antinodes = new Set<`${number}:${number}`>()
  Object.values(antennas).forEach((positions) => {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [yA, xA] = positions[i]
        const [yB, xB] = positions[j]

        let y = yA
        let x = xA
        while (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
          antinodes.add(`${y}:${x}`)
          y += yA - yB
          x += xA - xB
        }

        y = yB
        x = xB
        while (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
          antinodes.add(`${y}:${x}`)
          y += yB - yA
          x += xB - xA
        }
      }
    }
  })

  return antinodes.size
}

// console.log(part1())
console.log(part2())
