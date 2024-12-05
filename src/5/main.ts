const input = await Bun.file('src/5/input.txt').text()

const part1 = () => {
  const [rules, updates] = input
    .split('\n\n')
    .map((section) =>
      section.split('\n').map((part) => part.split(/\||,/).map(Number))
    )

  return updates.reduce((sum, update) => {
    const applicableRules = rules.filter(
      ([n1, n2]) => update.includes(n1) && update.includes(n2)
    )

    const printedPages = new Set<number>()
    for (let i = 0; i < update.length; i++) {
      const page = update[i]
      printedPages.add(page)
      // is this working by accident?
      if (
        applicableRules.some(([n1, n2]) => page === n2 && !printedPages.has(n1))
      ) {
        return sum
      }
    }

    return sum + update[Math.floor(update.length / 2)]
  }, 0)
}

const part2 = () => {
  const sort = (update: number[], rules: number[][]) => {
    const newOrder = update.slice()

    rules.forEach(([n1, n2]) => {
      if (newOrder.indexOf(n1) > newOrder.indexOf(n2)) {
        newOrder.splice(
          newOrder.indexOf(n1),
          0,
          newOrder.splice(newOrder.indexOf(n2), 1)[0]
        )
      }
    })

    return newOrder
  }

  const check = (update: number[], rules: number[][]) => {
    for (let i = 0; i < rules.length; i++) {
      const [n1, n2] = rules[i]
      if (update.indexOf(n1) > update.indexOf(n2)) {
        return false
      }
    }
    return true
  }

  const [rules, updates] = input
    .split('\n\n')
    .map((section) =>
      section.split('\n').map((part) => part.split(/\||,/).map(Number))
    )

  return updates.reduce((sum, update) => {
    const applicableRules = rules.filter(
      ([n1, n2]) => update.includes(n1) && update.includes(n2)
    )

    if (check(update, applicableRules)) {
      return sum
    }

    let newOrder = update.slice()
    // bubble bubble
    while (!check(newOrder, applicableRules)) {
      newOrder = sort(newOrder, applicableRules)
    }

    return sum + newOrder[Math.floor(newOrder.length / 2)]
  }, 0)
}

console.log(part1())
console.log(part2())
