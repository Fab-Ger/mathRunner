import { useContext, createContext, useReducer } from 'react'

const PlayerContext = createContext()

const actionTypes = {
  MOVE: 'MOVE',
  MOVE_TO: 'MOVE_TO',
  SET_VAL: 'SET_VAL',
  RESET: 'RESET'
}

const initialState = {
  position: 50,
  val: 1
}

const PlayerReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.MOVE:
      return {
        ...state,
        position: state.position + action.movement
      }
    case actionTypes.MOVE_TO:
      return {
        ...state,
        position: action.position
      }
    case actionTypes.SET_VAL:
      return {
        ...state,
        val: action.val
      }
    case actionTypes.RESET:
      return initialState
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PlayerReducer, initialState)

  const move = (movement) => {
    dispatch({ type: actionTypes.MOVE, movement: movement })
  }

  const moveTo = (position) => {
    dispatch({ type: actionTypes.MOVE_TO, position: position })
  }
  const setVal = (val) => {
    dispatch({ type: actionTypes.SET_VAL, val: val })
  }

  const PlayerContextFn = { move, moveTo, setVal }

  return <PlayerContext.Provider value={{ state, PlayerContextFn }}>{children}</PlayerContext.Provider>
}

const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used inside a PlayerProvider')
  return context
}

export {
  actionTypes,
  PlayerProvider,
  usePlayer
}
