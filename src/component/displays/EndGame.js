import { useEffect, useRef } from 'react'
import { useGame } from '../../context/GameContext'
import { useTimer } from '../../context/TimerContext'

const EndGame = () => {
  const { state: { val, score, level }, GameContextFn } = useGame()
  const { TimerContextFn } = useTimer()
  const ref = useRef(null)
  const styles = {
    full: {
      position: 'absolute',
      top: 0,
      zIndex: 2,
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000000',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    red: {
      color: 'red'
    }
  }
  const reset = () => {
    TimerContextFn.reset()
    setTimeout(() => {
      GameContextFn.reset()
    }, 1000)
  }
  useEffect(() => {
    if (val <= 0) {
      TimerContextFn.stop()
    }
  })

  return (

    <div>
      {val <= 0 &&
        <div ref={ref} id='dead' className='fade-in' style={styles.full} onClick={reset}>
          <h1 style={styles.red}> You DIED at level {level} </h1>
          <div>Score {score}</div>
        </div>}
    </div>
  )
}

export default EndGame
