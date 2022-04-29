import { useContext, createContext, useReducer } from 'react'

const TimerContext = createContext()

const actionTypes = {
  TICK_UP: 'TICK_UP',
  SET_INTERVAL: 'SET_INTERVAL',
  SET_STEP: 'SET_STEP',
  RESET: 'RESET'
}

const initialState = {
  time: 1,
  step: 1
}

const TimerReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TICK_UP:
      return {
        ...state,
        time: state.time + state.step
      }
    case actionTypes.SET_INTERVAL:
      return {
        ...state,
        interval: action.interval
      }
    case actionTypes.SET_STEP:
      return {
        ...state,
        step: action.step
      }
    case actionTypes.RESET:
      return initialState
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TimerReducer, initialState)

  const tick = () => { dispatch({ type: actionTypes.TICK_UP }) }
  const reset = () => {
    TimerContextFn.stop()
    dispatch({ type: actionTypes.RESET })
  }

  const shiftSpeed = (step) => {
    dispatch({ type: actionTypes.SET_STEP, step: (state.step + step) })
  }

  const start = () => {
    if (!state.interval) {
      dispatch({ type: actionTypes.SET_INTERVAL, interval: 'lock' })
      const interval = setInterval(() => { tick() }, 10)
      dispatch({ type: actionTypes.SET_INTERVAL, interval: interval })
    }
  }
  const stop = () => {
    if (state.interval) {
      clearInterval(state.interval)
      dispatch({ type: actionTypes.SET_INTERVAL, interval: undefined })
    }
  }
  const TimerContextFn = { tick, start, stop, shiftSpeed, reset }

  return <TimerContext.Provider value={{ state, TimerContextFn }}>{children}</TimerContext.Provider>
}

const useTimer = () => {
  const context = useContext(TimerContext)
  if (!context) throw new Error('useTimer must be used inside a TimerProvider')
  return context
}

export {
  actionTypes,
  TimerProvider,
  useTimer
}
