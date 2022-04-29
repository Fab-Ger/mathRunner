
import { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'
import { useTimer } from '../context/TimerContext'
import { rndFormula } from './data/Formulas'
import Opponents from './Opponents'

const Chunk = ({ chunk, color, pos, RoadHeight, nbChunk, compute }) => {
  const [chosen, setChosen] = useState(false)
  const [formulaRight, setformulaRight] = useState(rndFormula())
  const [formulaLeft, setformulaLeft] = useState(rndFormula())
  const { state: timer } = useTimer()
  const { state: game, GameContextFn } = useGame()

  const h = RoadHeight / nbChunk

  const position = ((timer.time / 10) + (pos * h)) % (4 * h) - h

  const styles = {
    chunk: {
      position: 'absolute',
      top: position,
      height: h,
      width: '100%',
      background: chunk.color,
      display: 'flex',
      placeContent: 'center',
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    head: {
      display: 'flex',
      flexDirection: 'row',
      border: '2px solid ' + chunk.color,
      alignItems: 'center',
      flex: 1
    },
    part: {
      border: '2px solid ' + chunk.color,
      alignItems: 'center',
      flex: 1
    },
    content: {
      backgroundColor: '#ddd',
      border: '2px solid ' + chunk.color,
      alignItems: 'center',
      flex: 9
    },
    checkPoint: {
      background: 'grey',
      fontSize: '2em'
    }
  }

  useEffect(() => {
    if (chosen && position < h) {
      setformulaLeft(rndFormula())
      setformulaRight(rndFormula())
      setChosen(false)
      GameContextFn.setChunk({ chosen: false, left: formulaLeft, right: formulaRight }, pos)
    }

    if (position >= nbChunk * h - 50 && !chosen) {
      const newVal = (game.choice === 'left')
        ? formulaLeft.compute(game.val)
        : formulaRight.compute(game.val)
      GameContextFn.setVal(newVal)
      setChosen(true)
      GameContextFn.setChunk({ ...game.chunks[pos], chosen: true }, pos)
    }
  }, [timer.time])

  return (
    <div style={styles.chunk}>
      <div style={styles.head}>

        <div style={styles.part}>
          <div style={styles.checkPoint}>
            {!chosen && formulaLeft && formulaLeft.label}
          </div>

        </div>
        <div style={styles.part}>
          <div style={styles.checkPoint}>
            {!chosen && formulaRight && formulaRight.label}
          </div>

        </div>
      </div>
      <div style={styles.content}>
        <Opponents />
      </div>

    </div>
  )
}

export default Chunk
