const input = await Bun.file('src/1/input.txt').text()

const part1 = () => {
  const l1: number[] = []
  const l2: number[] = []
  input.split('\n').forEach((line) => {
    const [n1, n2] = line.split('   ')
    l1.push(Number(n1))
    l2.push(Number(n2))
  })
  l1.sort()
  l2.sort()
  const res = l1.reduce((sum, curr, i) => {
    return sum + Math.abs(curr - l2[i])
  }, 0)

  return res
}

const part2 = () => {
  const l1: number[] = []
  const rr = new Map<number, number>()
  input.split('\n').forEach((line) => {
    const [n1, _n2] = line.split('   ')
    l1.push(Number(n1))
    const n2 = Number(_n2)
    const curr = rr.get(n2)
    if (curr !== undefined) {
      rr.set(n2, curr + 1)
    } else {
      rr.set(n2, 1)
    }
  })
  const res = l1.reduce((sum, curr) => {
    return sum + curr * (rr.get(curr) ?? 0)
  }, 0)

  return res
}

console.log('Part 1', part1())
console.log('Part 2', part2())
