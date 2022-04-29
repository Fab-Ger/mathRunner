
const opterators = [
  { label: ' x ', compute: (val, val2) => { return val * val2 } },
  { label: ' / ', compute: (val, val2) => { return val / val2 } },
  { label: ' + ', compute: (val, val2) => { return val + val2 } },
  { label: ' - ', compute: (val, val2) => { return val - val2 } },
  { label: ' ^ ', compute: (val, val2) => { return Math.pow(val, val2) } },
  { label: ' = ', compute: (val, val2) => { return val2 } }
]

const getFormulas = () => {
  const forms = []
  for (let i = 1; i < 5; i++) {
    for (let index = 0; index < opterators.length; index++) {
      const ope = opterators[index]
      forms.push({ label: `${ope.label}${i}`, compute: (val) => { console.log(`${ope.label}${i}`); console.log(ope.compute); console.log(`val : ${val}, i  ${i}`); return ope.compute(val, i) } })
    }
  }
  forms.push({ label: ' = 0', compute: (val) => { return (0) } })

  return forms
}

const rndFormula = () => {
  return getFormulas()[Math.floor(Math.random() * (getFormulas().length - 1))]
}
export {
  rndFormula
}
