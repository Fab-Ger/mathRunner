import { useCallback, useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'
import { useTimer } from '../context/TimerContext'

const TimerConrols = () => {
  const [started, setStarted] = useState(false)
  const [keyTrack, setkeyTrack] = useState(false)

  const { state, TimerContextFn } = useTimer()
  const { state: { reset }, GameContextFn } = useGame()

  const restart = () => { GameContextFn.reset() }

  const switchTimer = () => {
    console.log('switchTimer started: ' + started)
    setStarted(!started)
  }

  useEffect(() => {
    console.log('useEffect ' + started)
    started
      ? TimerContextFn.start()
      : TimerContextFn.stop()
  }, [started])

  useEffect(() => { setStarted(false) }, [reset])

  const HandleKeyUp = useCallback((e) => {
    if (e.keyCode === 32) {
      console.log('KEY switchTimer')
      document.getElementById('startStop').click()
    }
  }, [])

  useEffect(() => {
    if (!keyTrack) {
      document.addEventListener('keyup', HandleKeyUp)
      setkeyTrack(true)
    }
  }, [])

  const speedUp = () => { TimerContextFn.shiftSpeed(5) }
  const speedDown = () => { TimerContextFn.shiftSpeed(-1) }

  return (
    <div>
      <button onClick={restart}>Restart</button>
      <button id='startStop' onClick={switchTimer}>{started ? 'Stop' : 'Start'}</button>
      Timer
      <button onClick={speedUp}>+</button>
      <button onClick={speedDown}>-</button>
      Step : {state && state.step}
      Time {state && state.time}
    </div>

  )
}

export default TimerConrols
