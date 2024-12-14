const input = await Bun.file('src/13/input.txt').text()

const getMachines = (input: string) => {
  return input.split('\n\n').map((machineString) => {
    const [a, b, price] = machineString.split('\n')
    const ax = Number(a.slice(a.indexOf('+') + 1, a.indexOf(',')))
    const ay = Number(a.slice(a.lastIndexOf('+') + 1))

    const bx = Number(b.slice(b.indexOf('+') + 1, b.indexOf(',')))
    const by = Number(b.slice(b.lastIndexOf('+') + 1))

    const px = Number(price.slice(price.indexOf('=') + 1, price.indexOf(',')))
    const py = Number(price.slice(price.lastIndexOf('=') + 1))
    return [ax, ay, bx, by, px, py]
  })
}

const applyCramer = (machine: number[]) => {
  const [ax, ay, bx, by, px, py] = machine
  const d = ax * by - ay * bx
  const aNum = px * by - bx * py
  const bNum = ax * py - px * ay

  if (aNum % d !== 0 || bNum % d !== 0) {
    return
  }

  const a = aNum / d
  const b = bNum / d

  return [a, b]
}

function part1() {
  const machines = getMachines(input)
  const price = machines.reduce((price, machine) => {
    const result = applyCramer(machine)
    if (result === undefined) {
      return price
    }
    return price + result[0] * 3 + result[1]
  }, 0)
  return price
}

function part2() {
  const machines = getMachines(input)
  const price = machines.reduce((price, machine) => {
    const result = applyCramer(
      machine.toSpliced(
        -2,
        2,
        machine.at(-2)! + 10000000000000,
        machine.at(-1)! + 10000000000000
      )
    )
    if (result === undefined) {
      return price
    }

    return price + result[0] * 3 + result[1]
  }, 0)
  return price
}

console.log(part1())
console.log(part2())
