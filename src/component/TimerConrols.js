import { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'
import { useTimer } from '../context/TimerContext'

const TimerConrols = () => {
  const [started, setStarted] = useState()

  const { state, TimerContextFn } = useTimer()
  const { state: { reset } } = useGame()

  const switchTimer = () => {
    started
      ? TimerContextFn.stop()
      : TimerContextFn.start()
    setStarted(!started)
  }

  useEffect(() => {
    setStarted(false)
  }, [reset])

  const speedUp = () => { TimerContextFn.shiftSpeed(5) }
  const speedDown = () => { TimerContextFn.shiftSpeed(-1) }

  return (
    <div>
      <button onClick={switchTimer}>{started ? 'Stop' : 'Start'}</button>
      Timer
      <button onClick={speedUp}>+</button>
      <button onClick={speedDown}>-</button>
      Step : {state && state.step}
      Time {state && state.time}
    </div>

  )
}

export default TimerConrols
