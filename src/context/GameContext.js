import { useContext, createContext, useReducer } from 'react'

const GameContext = createContext()

const actionTypes = {
  MOVE: 'MOVE',
  MOVE_TO: 'MOVE_TO',
  SET_VAL: 'SET_VAL',
  SET_CHUNK: 'SET_CHUNK',
  RESET: 'RESET'
}

const initialState = {
  position: 50,
  choice: 'left',
  val: 1,
  chunks: []
}

const GameReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.MOVE:
      return {
        ...state,
        position: state.position + action.movement
      }
    case actionTypes.MOVE_TO:
      return {
        ...state,
        position: action.position,
        choice: action.choice
      }
    case actionTypes.SET_VAL:
      return {
        ...state,
        val: action.val
      }
    case actionTypes.SET_CHUNK:
      return {
        ...state,
        chunks: [...state.chunks.slice(0, action.index), action.chunk, ...state.chunks.slice(++action.index)]
      }
    case actionTypes.RESET:
      return initialState
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState)

  const move = (movement) => {
    dispatch({ type: actionTypes.MOVE, movement: movement })
  }

  const moveTo = (position, choice) => {
    dispatch({ type: actionTypes.MOVE_TO, position: position, choice: choice })
  }
  const setVal = (val) => {
    dispatch({ type: actionTypes.SET_VAL, val: val })
  }
  const setChunk = (chunk, index) => {
    dispatch({ type: actionTypes.SET_CHUNK, chunk: chunk, index: index })
  }

  const GameContextFn = { move, moveTo, setVal, setChunk }

  return <GameContext.Provider value={{ state, GameContextFn }}>{children}</GameContext.Provider>
}

const useGame = () => {
  const context = useContext(GameContext)
  if (!context) throw new Error('useGame must be used inside a GameProvider')
  return context
}

export {
  actionTypes,
  GameProvider,
  useGame
}
