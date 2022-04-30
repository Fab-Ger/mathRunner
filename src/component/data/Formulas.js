
const opterators = [
  { weight: 6, label: ' x ', compute: (val, val2) => { return val * val2 } },
  { weight: 7, label: ' / ', compute: (val, val2) => { return val / val2 } },
  { weight: 11, label: ' + ', compute: (val, val2) => { return val + val2 } },
  { weight: 9, label: ' - ', compute: (val, val2) => { return val - val2 } },
  { weight: 0, label: ' ^ ', compute: (val, val2) => { return Math.pow(val, val2) } },
  { weight: 4, label: ' = ', compute: (val, val2) => { return val2 } }
]

const getFormulas = () => {
  const forms = []
  for (let i = 1; i < 5; i++) {
    for (let index = 0; index < opterators.length; index++) {
      const ope = opterators[index]
      forms.push({
        label: `${ope.label}${i}`,
        compute: (val) => { return ope.compute(val, i) },
        weight: ope.weight
      })
    }
  }
  forms.push({ label: ' = 0', compute: (val) => { return (0) } })

  return forms
}

const getIndexes = (forms) => {
  const indexes = []
  for (let index = 0; index < forms.length; index++) {
    const f = forms[index]
    for (let t = 0; t < f.weight; t++) {
      indexes.push(index)
    }
  }
  return indexes
}

const mulberry32 = (a) => {
  return function () {
    let t = a += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}
const rndd = mulberry32(Date.now())

const rndFormula = () => {
  const forms = getFormulas()
  const indexes = getIndexes(forms)
  const rnd = Math.floor(rndd() * (indexes.length - 1))
  const index = indexes[rnd]
  return forms[index]
}
export {
  rndFormula
}
