const input = await Bun.file('src/7/input.txt').text()

const part1 = () => {
  const equations = input.split('\n').map((equation) => {
    const [testValue, numString] = equation.split(': ')
    return [Number(testValue), numString.split(' ').map(Number)] as const
  })
  const res = equations.reduce((sum, equation) => {
    const [testValue, numbers] = equation

    const options = Math.pow(2, numbers.length - 1)

    for (let i = 0; i < options; i++) {
      const operators = i.toString(2).padStart(numbers.length - 1, '0')
      let result = numbers[0]
      for (let j = 1; j < numbers.length; j++) {
        if (operators[j - 1] === '0') {
          result *= numbers[j]
        } else {
          result += numbers[j]
        }
      }
      if (result === testValue) {
        return sum + testValue
      }
    }

    return sum
  }, 0)
  return res
}

const part2 = () => {
  const equations = input.split('\n').map((equation) => {
    const [testValue, numString] = equation.split(': ')
    return [Number(testValue), numString.split(' ').map(Number)] as const
  })
  const res = equations.reduce((sum, equation, i) => {
    const [testValue, numbers] = equation

    const options = Math.pow(3, numbers.length - 1)

    for (let i = 0; i < options; i++) {
      const operators = i.toString(3).padStart(numbers.length - 1, '0')
      let result = numbers[0]
      for (let j = 1; j < numbers.length; j++) {
        switch (operators[j - 1]) {
          case '0':
            result *= numbers[j]
            break
          case '1':
            result += numbers[j]
            break
          case '2':
            result = Number([result, numbers[j]].join(''))
            break
        }
      }
      if (result === testValue) {
        return sum + testValue
      }
    }

    return sum
  }, 0)
  return res
}

console.log(part1())
console.log(part2())
