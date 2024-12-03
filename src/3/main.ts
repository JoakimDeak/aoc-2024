const input = await Bun.file('src/3/input.txt').text()

const part1 = () => {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g
  return input.matchAll(regex).reduce((sum, multiplication) => {
    const [n1, n2] = multiplication[0]
      .matchAll(/\d+/g)
      .map((match) => Number(match[0]))

    return sum + n1 * n2
  }, 0)
}

const part2 = () => {
  const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g
  let enabled = true
  return input.matchAll(regex).reduce((sum, match) => {
    const instruction = match[0]
    switch (instruction) {
      case 'do()': {
        enabled = true
        break
      }
      case "don't()": {
        enabled = false
        break
      }
      default: {
        if (!enabled) {
          break
        }
        const [n1, n2] = instruction
          .matchAll(/\d+/g)
          .map((match) => Number(match[0]))
        return sum + n1 * n2
      }
    }

    return sum
  }, 0)
}

console.log(part1())
console.log(part2())
