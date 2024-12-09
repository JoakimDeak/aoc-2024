const input = await Bun.file('src/9/input.txt').text()

const part1 = () => {
  let expanded = []
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < Number(input[i]); j++) {
        expanded.push(i / 2)
      }
    }
    if (i % 2 !== 0) {
      for (let j = 0; j < Number(input[i]); j++) {
        expanded.push(-1)
      }
    }
  }

  let p2 = expanded.length - 1
  for (let i = 0; i < expanded.length; i++) {
    if (expanded[i] === -1) {
      expanded[i] = expanded[p2]
      do {
        p2--
        expanded.pop()
      } while (expanded[p2] === -1)
    }
  }

  return expanded.reduce((checksum, val, i) => checksum + val * i, 0)
}

const findNextSpace = (
  sections: { length: number; id?: number }[],
  length: number,
  limit: number
) => {
  for (let i = 0; i < limit; i++) {
    if (sections[i].id === undefined && sections[i].length >= length) {
      return [sections[i], i] as const
    }
  }
}

const part2 = () => {
  const sections: { length: number; id?: number }[] = []
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      sections.push({ length: Number(input[i]), id: i / 2 })
    }
    if (i % 2 !== 0) {
      sections.push({ length: Number(input[i]) })
    }
  }

  const processed = new Set<number>()
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section.id === undefined) {
      continue
    }
    if (processed.has(section.id)) {
      continue
    }
    processed.add(section.id)
    const canMove = findNextSpace(sections, section.length, i)
    if (!canMove) {
      continue
    }
    const [nextSpace, nextSpaceIndex] = canMove
    sections.splice(i, 1, { length: section.length })
    if (nextSpace.length === section.length) {
      sections.splice(nextSpaceIndex, 1)
    } else {
      nextSpace.length -= section.length
    }
    sections.splice(nextSpaceIndex, 0, section)
  }

  let checksum = 0
  let index = 0
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    if (section.id === undefined) {
      index += section.length
    } else {
      let remainingBlocks = section.length
      while (remainingBlocks > 0) {
        checksum += section.id * index
        index++
        remainingBlocks--
      }
    }
  }

  return checksum
}

console.log(part1())
console.log(part2())
