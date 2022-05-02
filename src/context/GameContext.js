import { useContext, createContext, useReducer } from 'react'
import { rndFormula } from '../data/Formulas'

const GameContext = createContext()

const actionTypes = {
  MOVE: 'MOVE',
  MOVE_TO: 'MOVE_TO',
  SET_VAL: 'SET_VAL',
  SET_SCORE: 'SET_SCORE',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_OP: 'SET_OP',
  SET_CHUNK: 'SET_CHUNK',
  RESET: 'RESET'
}

const initialState = {
  message: { title: 'mess', content: '', display: false },
  score: 0,
  level: 1,
  fightingChunk: 0,
  reset: 0,
  position: '50%',
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
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.message
      }
    case actionTypes.SET_SCORE:
      return {
        ...state,
        score: action.score,
        level: state.level + 1
      }
    case actionTypes.SET_CHUNK:
      return {
        ...state,
        chunks: [...state.chunks.slice(0, action.index), { ...state.chunks[action.index], ...action.chunk }, ...state.chunks.slice(action.index + 1)]
      }
    case actionTypes.RESET:
      return {
        ...initialState,
        reset: state.reset + 1
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState)

  const move = (movement) => {
    dispatch({ type: actionTypes.MOVE, movement: movement })
  }

  const moveTo = (position, choice) => { dispatch({ type: actionTypes.MOVE_TO, position: position, choice: choice }) }
  const setVal = (val) => { dispatch({ type: actionTypes.SET_VAL, val: val }) }
  const setScore = (score) => { dispatch({ type: actionTypes.SET_SCORE, score: score }) }
  const setMessage = (message) => { dispatch({ type: actionTypes.SET_MESSAGE, message: message }) }
  const setOpponent = (opponent) => { dispatch({ type: actionTypes.SET_OP, op: opponent }) }
  const setChunk = (chunk, index) => { dispatch({ type: actionTypes.SET_CHUNK, chunk: chunk, index: index }) }

  const applyChoice = (index) => {
    if (state.chunks[index].left && state.chunks[index].right) {
      console.log('computing ' + index)
      const chosenCh = (state.choice === 'left') ? state.chunks[index].left : state.chunks[index].right

      const newVal = Number((Math.round(chosenCh.compute(state.val) * 100) / 100).toFixed(2))

      GameContextFn.setMessage({ title: chosenCh.label, content: '', display: true })
      GameContextFn.setVal(newVal)

      if (index === 3) {
        let v = Math.max(state.chunks[2].left.compute(newVal),
          state.chunks[2].right.compute(newVal))
        v = Math.max(state.chunks[1].left.compute(v),
          state.chunks[1].right.compute(v))
        v = Math.floor(v * 0.9)
        GameContextFn.setOpponent(v)
      }
    } else {
      console.log('not initialized ' + index)
    }
  }

  const fight = (timerStep) => {
    if (state.val - state.opponent > 0) { GameContextFn.setScore(state.score + (state.val - state.opponent) * (state.level / 2)) }
    GameContextFn.setMessage({ title: 'Figth', content: `${state.val} VS ${state.val}`, display: true })
    GameContextFn.setVal(state.val - state.opponent)
  }

  const reset = (chunk, index) => {
    dispatch({ type: actionTypes.RESET })
  }
  const GameContextFn = { move, moveTo, setVal, setChunk, applyChoice, setOpponent, fight, reset, setScore, setMessage }

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
