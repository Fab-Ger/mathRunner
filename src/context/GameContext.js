import { useContext, createContext, useReducer } from 'react'
import { mulberry32, rndFormula } from '../data/Formulas'

const GameContext = createContext()

const actionTypes = {
  MOVE: 'MOVE',
  MOVE_TO: 'MOVE_TO',
  SET_VAL: 'SET_VAL',
  SET_SCORE: 'SET_SCORE',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_OP: 'SET_OP',
  SET_CHUNK: 'SET_CHUNK',
  UPDATE_CHUNK: 'UPDATE_CHUNK',
  SET_CHUNKS: 'SET_CHUNKS',
  SET: 'SET',
  RESET: 'RESET'
}

const initialState = {
  message: { title: 'Pour démarrer', content: 'Appuyer sur "Barre Espace"', delay: 10000, display: true },
  score: 0,
  level: 1,
  fightingChunk: { color: 'black'},
  reset: 0,
  position: '50%',
  choice: 'left',
  val: 1,
  opponent: 1,
  chunks: [],
  nextOpponent: 1,
  nextChunks: [],
  nextLife:1,

  nbChunks: 4,
  dispChunks: 2
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
    case actionTypes.UPDATE_CHUNK:
      return {
        ...state,
        chunks: [...state.chunks.slice(0, action.index), state.nextChunks[action.index] , ...state.chunks.slice(action.index + 1)]
      }
    case actionTypes.SET_CHUNKS:
      return {
        ...state,
        chunks: action.chunks
      }
    case actionTypes.SET:
      return {
        ...state,
        [action.key]: action.value
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
  const updateChunk = (index) => { index > state.nbChunks && alert('aaaaaaaaaa'); dispatch({ type: actionTypes.UPDATE_CHUNK, index: index }) }
  const setChunks = (chunks) => { dispatch({ type: actionTypes.SET_CHUNKS, chunks: chunks }) }
  const setNextChunks = (chunks) => { dispatch({ type: actionTypes.SET, key: 'nextChunks', value: chunks }) }
  const setNextOpponent = (opponent) => { dispatch({ type: actionTypes.SET, key: 'nextOpponent', value: opponent }) }
  const setNextLife = (opponent) => { dispatch({ type: actionTypes.SET, key: 'nextLife', value: opponent }) }

  const applyChoice = (index) => {
    if (state.chunks[index].left && state.chunks[index].right) {
      //console.log('computing ' + index)
      const chosenCh = (state.choice === 'left') ? state.chunks[index].left : state.chunks[index].right

      const newVal = Number((Math.round(chosenCh.compute(state.val) * 100) / 100).toFixed(2))

      GameContextFn.setMessage({ title: chosenCh.label, content: '', display: true })
      GameContextFn.setVal(newVal)
/*
      if (index === 3) {
        let v = Math.max(state.chunks[2].left.compute(newVal),
          state.chunks[2].right.compute(newVal))
        v = Math.max(state.chunks[1].left.compute(v),
          state.chunks[1].right.compute(v))
        v = Math.floor(v * 0.9)
        GameContextFn.setOpponent(v)
      }
      */
    } else {
      console.log('not initialized ' + index)
    }
  }

  const findNewChunks = (life) => {
    console.log('Finding from ' + life)
    let newLife = life
    // compute next chunks
    const colors = ['red','green', 'blue', 'orange', 'yellow', 'violet' ]
    let newChunks = []
    for (let index = 0; index < state.nbChunks; index++) {
      let newForm = rndFormula()
      const rndd = mulberry32(Date.now()) %2
      // find a valid formula
      while ( newForm.compute(newLife) <= 0) { newForm = rndFormula() }
      const fomr2 = rndFormula()
      newLife = Math.max( newForm.compute(newLife), fomr2.compute(newLife))
      
      // console.log('chunk ' + index + ' ' + colors[index] + ' newForm ' + newForm.label +' fomr2' + fomr2.label +' newLife ' + newLife)
      if(rndd == 0){
        newChunks[index] = {color : colors[index], left : newForm, right : fomr2}
      }else{
        newChunks[index] = {color : colors[index], left : fomr2, right : newForm}
      }
    }
    
    // compute final value oponent
    const opponent = Math.floor(newLife * 0.9)
    console.log('final ' + newLife + ' vs '+ opponent + ' / ' + (newLife - opponent) + 'left' )
    
    return {
      opponent : opponent,
      chunks : newChunks,
      newLife : newLife - opponent
    }
  }

  const nextChunks = (life) => {
    console.log('Compute next from '+ life)
    GameContextFn.setOpponent(state.nextOpponent)
    const nextVals = findNewChunks(state.nextLife)
    GameContextFn.setNextOpponent(nextVals.opponent)
    GameContextFn.setNextChunks(nextVals.chunks )
    GameContextFn.setNextLife(nextVals.newLife)
  }

  const initChunks = (life) => {
    const newVals = findNewChunks(life)
    GameContextFn.setOpponent(newVals.opponent)
    GameContextFn.setChunks(newVals.chunks )
    GameContextFn.setNextLife(newVals.newLife)

    const nextVals = findNewChunks(newVals.newLife)
    GameContextFn.setNextOpponent(nextVals.opponent)
    GameContextFn.setNextChunks(nextVals.chunks )
  }

  const fight = (timerStep) => {
    if (state.val - state.opponent > 0) {
       GameContextFn.setScore(state.score + (state.val - state.opponent) * (state.level / 2))
    }

    GameContextFn.setMessage({ title: 'Combat', content: `${state.val} VS ${state.opponent}`, display: true })
    GameContextFn.setVal(state.val - state.opponent)
    nextChunks(state.val - state.opponent)
  }

  const reset = (chunk, index) => {
    dispatch({ type: actionTypes.RESET })
    initChunks(1)
  }
  const GameContextFn = { move, moveTo, setVal, updateChunk, setChunks, applyChoice, setOpponent, fight, reset, setScore, setMessage, setNextChunks, setNextOpponent, setNextLife }

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
