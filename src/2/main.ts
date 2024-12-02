const input = await Bun.file('src/2/input.txt').text()

const checkIfSafe = (report: number[]) => {
  let isAscending = true
  let isDescending = true
  return report.every((level, i, report) => {
    if (i === 0) {
      return true
    }

    if (level > report[i - 1]) {
      isAscending = false
    }
    if (level < report[i - 1]) {
      isDescending = false
    }

    if (!isAscending && !isDescending) {
      return false
    }

    const diff = Math.abs(level - report[i - 1])
    if (diff < 1) {
      return false
    }
    if (diff > 3) {
      return false
    }

    return true
  })
}

const part1 = () => {
  return input.split('\n').reduce((safeReports, _report) => {
    const report = _report.split(' ').map(Number)
    return checkIfSafe(report) ? safeReports + 1 : safeReports
  }, 0)
}

const part2 = () => {
  return input.split('\n').reduce((safeReports, _report) => {
    const report = _report.split(' ').map(Number)

    if (checkIfSafe(report)) {
      return safeReports + 1
    }

    for (let i = 0; i < report.length; i++) {
      const spliced = report.toSpliced(i, 1)
      if (checkIfSafe(spliced)) {
        return safeReports + 1
      }
    }

    return safeReports
  }, 0)
}

console.log('Part 1', part1())
console.log('Part 2', part2())
