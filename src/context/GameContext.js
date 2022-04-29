import { useContext, createContext, useReducer } from 'react'
import { rndFormula } from '../component/data/Formulas'

const GameContext = createContext()

const actionTypes = {
  MOVE: 'MOVE',
  MOVE_TO: 'MOVE_TO',
  SET_VAL: 'SET_VAL',
  SET_OP: 'SET_OP',
  SET_CHUNK: 'SET_CHUNK',
  RESET: 'RESET'
}

const initialState = {
  position: 50,
  choice: 'left',
  val: 1,
  opponent: 1,
  chunks: [
    { color: 'red', left: rndFormula(), right: rndFormula() },
    { color: 'green', left: rndFormula(), right: rndFormula() },
    { color: 'blue', left: rndFormula(), right: rndFormula() },
    { color: 'orange', left: rndFormula(), right: rndFormula() }
  ],
  nbChunks: 2
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
    case actionTypes.SET_OP:
      return {
        ...state,
        opponent: action.op
      }
    case actionTypes.SET_CHUNK:
      return {
        ...state,
        chunks: [...state.chunks.slice(0, action.index), { ...state.chunks[action.index], ...action.chunk }, ...state.chunks.slice(action.index + 1)]
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
  const setOpponent = (opponent) => {
    dispatch({ type: actionTypes.SET_OP, op: opponent })
  }
  const setChunk = (chunk, index) => {
    dispatch({ type: actionTypes.SET_CHUNK, chunk: chunk, index: index })
  }
  const applyChoice = (index) => {
    if (state.chunks[index].left && state.chunks[index].right) {
      console.log('computing ' + index)
      const newVal = Math.round((
        ((state.choice === 'left')
          ? state.chunks[index].left.compute(state.val)
          : state.chunks[index].right.compute(state.val)
        ) +
         Number.EPSILON) * 100) / 100
      GameContextFn.setVal(newVal)

      if (index === 0) {
        let v = Math.max(state.chunks[2].left.compute(newVal),
          state.chunks[3].right.compute(newVal))
        v = Math.max(state.chunks[1].left.compute(v),
          state.chunks[2].right.compute(v))
        v = Math.floor(v * 0.9)
        GameContextFn.setOpponent(v)
      }
    } else {
      console.log('not initialized ' + index)
    }
  }
  const fight = () => {
    GameContextFn.setVal(state.val - state.opponent)
  }

  const reset = (chunk, index) => {
    dispatch({ type: actionTypes.RESET })
  }
  const GameContextFn = { move, moveTo, setVal, setChunk, applyChoice, setOpponent, fight, reset }

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
