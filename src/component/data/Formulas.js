import { useCallback } from 'react'

const formulas = [
  { label: ' x3', compute: (val) => { return (val * 3) } },
  { label: ' /3', compute: (val) => { return (val / 3) } },
  { label: ' +3', compute: (val) => { return (val + 3) } },
  { label: ' -3', compute: (val) => { return (val - 3) } }
]

const opterators = [
  { label: ' x ', compute: (val, val2) => { return val * val2 } },
  { label: ' / ', compute: (val, val2) => { return val / val2 } },
  { label: ' + ', compute: (val, val2) => { return val + val2 } },
  { label: ' - ', compute: (val, val2) => { return val - val2 } },
  { label: ' = ', compute: (val, val2) => { return val2 } }
]

const getFormulas = () => {
  const forms = []
  for (let i = 1; i < 5; i++) {
    for (let index = 0; index < opterators.length; index++) {
      const ope = opterators[index]
        forms.push({ label: `${ope.label}${i}`, compute: (val) => { return ope.compute(val, i) } })
    }
  }
  forms.push({ label: ' = 0', compute: (val) => { return (0) } })

  return forms
}

const rndFormula = () => {
  return getFormulas()[Math.floor(Math.random() * (getFormulas().length - 1))]
}
export {
  formulas,
  rndFormula
}
