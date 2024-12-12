const input = await Bun.file('src/12/input.txt').text()

type PositionString = `${number}:${number}`
type Region = {
  area: number
  perimeter: number
  plots: PositionString[]
}

const flood = (
  y: number,
  x: number,
  grid: String[],
  region: Region,
  neighbourPlots = new Set<PositionString>(),
  visitedPlots = new Set<PositionString>()
) => {
  const type = grid[y]?.[x]
  const plotId = `${y}:${x}` as const
  visitedPlots.add(plotId)
  neighbourPlots.delete(plotId)
  region.plots.push(plotId)
  if (type === undefined) {
    return
  }

  const upId = `${y - 1}:${x}` as const
  if (grid[y - 1]?.[x] !== type) {
    region.perimeter++

    if (!visitedPlots.has(upId) && y > 0) {
      neighbourPlots.add(upId)
    }
  } else if (!visitedPlots.has(upId) && y > 0) {
    region.area++
    flood(y - 1, x, grid, region, neighbourPlots, visitedPlots)
  }

  const rightId = `${y}:${x + 1}` as const
  if (grid[y]?.[x + 1] !== type) {
    region.perimeter++
    if (!visitedPlots.has(rightId) && x < grid[0].length - 1) {
      neighbourPlots.add(rightId)
    }
  } else if (!visitedPlots.has(rightId) && x < grid[0].length - 1) {
    region.area++
    flood(y, x + 1, grid, region, neighbourPlots, visitedPlots)
  }

  const downId = `${y + 1}:${x}` as const
  if (grid[y + 1]?.[x] !== type) {
    region.perimeter++
    if (!visitedPlots.has(downId) && y < grid.length - 1) {
      neighbourPlots.add(downId)
    }
  } else if (!visitedPlots.has(downId) && y < grid.length - 1) {
    region.area++
    flood(y + 1, x, grid, region, neighbourPlots, visitedPlots)
  }

  const leftId = `${y}:${x - 1}` as const
  if (grid[y]?.[x - 1] !== type) {
    region.perimeter++
    if (!visitedPlots.has(leftId) && x > 0) {
      neighbourPlots.add(leftId)
    }
  } else if (!visitedPlots.has(leftId) && x > 0) {
    region.area++
    flood(y, x - 1, grid, region, neighbourPlots, visitedPlots)
  }
}

const getRegions = (grid: string[]) => {
  const regions: Region[] = []
  const visitedPlots = new Set<PositionString>()
  const plotsToVisit = new Set<PositionString>()
  plotsToVisit.add(`${0}:${0}`)

  do {
    const region = {
      area: 1,
      perimeter: 0,
      plots: [],
    }
    regions.push(region)
    const [y, x] = plotsToVisit.values().next().value?.split(':').map(Number)!

    flood(y, x, grid, region, plotsToVisit, visitedPlots)
  } while (plotsToVisit.size > 0)
  return regions
}

const part1 = () => {
  const grid = input.split('\n')
  const regions = getRegions(grid)
  return regions.reduce(
    (fencePrice, { area, perimeter }) => fencePrice + area * perimeter,
    0
  )
}

const countCorners = (plot: PositionString, plots: PositionString[]) => {
  const [y, x] = plot.split(':').map(Number)
  let neighbours = 0

  if (plots.includes(`${y - 1}:${x}`)) {
    neighbours++
  }
  if (plots.includes(`${y}:${x + 1}`)) {
    neighbours++
  }
  if (plots.includes(`${y + 1}:${x}`)) {
    neighbours++
  }
  if (plots.includes(`${y}:${x - 1}`)) {
    neighbours++
  }

  switch (neighbours) {
    case 0:
      return 4
    case 1:
      return 2
    case 2:
      if (
        (plots.includes(`${y}:${x - 1}`) && plots.includes(`${y}:${x + 1}`)) ||
        (plots.includes(`${y - 1}:${x}`) && plots.includes(`${y + 1}:${x}`))
      ) {
        return 0
      }

      if (plots.includes(`${y - 1}:${x}`)) {
        if (plots.includes(`${y}:${x + 1}`)) {
          if (plots.includes(`${y - 1}:${x + 1}`)) {
            return 1
          } else {
            return 2
          }
        }
        if (plots.includes(`${y}:${x - 1}`)) {
          if (plots.includes(`${y - 1}:${x - 1}`)) {
            return 1
          } else {
            return 2
          }
        }
      }

      if (plots.includes(`${y + 1}:${x}`)) {
        if (plots.includes(`${y}:${x + 1}`)) {
          if (plots.includes(`${y + 1}:${x + 1}`)) {
            return 1
          } else {
            return 2
          }
        }
        if (plots.includes(`${y}:${x - 1}`)) {
          if (plots.includes(`${y + 1}:${x - 1}`)) {
            return 1
          } else {
            return 2
          }
        }
      }
      throw new Error('case 2 didnt return from any if')
    case 3:
      if (!plots.includes(`${y - 1}:${x}`)) {
        let extendedNeighbours = 0
        if (plots.includes(`${y + 1}:${x - 1}`)) {
          extendedNeighbours++
        }
        if (plots.includes(`${y + 1}:${x + 1}`)) {
          extendedNeighbours++
        }
        return 2 - extendedNeighbours
      }
      if (!plots.includes(`${y}:${x + 1}`)) {
        let extendedNeighbours = 0
        if (plots.includes(`${y - 1}:${x - 1}`)) {
          extendedNeighbours++
        }
        if (plots.includes(`${y + 1}:${x - 1}`)) {
          extendedNeighbours++
        }
        return 2 - extendedNeighbours
      }
      if (!plots.includes(`${y + 1}:${x}`)) {
        let extendedNeighbours = 0
        if (plots.includes(`${y - 1}:${x - 1}`)) {
          extendedNeighbours++
        }
        if (plots.includes(`${y - 1}:${x + 1}`)) {
          extendedNeighbours++
        }
        return 2 - extendedNeighbours
      }
      if (!plots.includes(`${y}:${x - 1}`)) {
        let extendedNeighbours = 0
        if (plots.includes(`${y - 1}:${x + 1}`)) {
          extendedNeighbours++
        }
        if (plots.includes(`${y + 1}:${x + 1}`)) {
          extendedNeighbours++
        }
        return 2 - extendedNeighbours
      }
      throw new Error('case 3 didnt match any if')
    case 4:
      let extendedNeighbours = 0
      if (plots.includes(`${y - 1}:${x - 1}`)) {
        extendedNeighbours++
      }
      if (plots.includes(`${y - 1}:${x + 1}`)) {
        extendedNeighbours++
      }
      if (plots.includes(`${y + 1}:${x + 1}`)) {
        extendedNeighbours++
      }
      if (plots.includes(`${y + 1}:${x - 1}`)) {
        extendedNeighbours++
      }
      return 4 - extendedNeighbours
    default:
      throw new Error('Unexpected number of neighbors')
  }
}

const part2 = () => {
  const grid = input.split('\n')
  const regions = getRegions(grid)

  return regions.reduce(
    (fencePrice, { plots, area }) =>
      fencePrice +
      area *
        plots.reduce((sides, plot) => sides + countCorners(plot, plots), 0),
    0
  )
}

console.log(part1())
console.log(part2())
