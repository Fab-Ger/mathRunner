
import { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext'
import { useTimer } from '../../context/TimerContext'
import { rndFormula } from '../../data/Formulas'
import Opponents from '../playField/Opponents'

const Chunk = ({ chunk, pos, RoadHeight, nbChunk }) => {
  const [chosen, setChosen] = useState(false)
  const [fight, setFight] = useState(false)
  const { state: timer, TimerContextFn } = useTimer()
  const { state: { chunks, reset, fightingChunk }, GameContextFn } = useGame()

  const h = RoadHeight / nbChunk + 10

  const position = ((timer.time / 10) + (pos * h)) % (4 * h) - h

  useEffect(() => {
    GameContextFn.setChunk({ left: rndFormula(), right: rndFormula() }, pos)
    setChosen(false)
    setFight(false)
  }, [reset])

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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 9
    },
    checkPoint: {
      background: 'grey',
      fontSize: '2em'
    },
    op: {
      position: 'absolute',
      top: 5 * h / 9
    }
  }

  useEffect(() => {
    if (timer.time > 150) {
      const dstToBottom = RoadHeight - position

      if (chosen && position < h) {
        GameContextFn.setChunk({ left: rndFormula(), right: rndFormula() }, pos)
        setChosen(false)
        setFight(false)
      }

      if (pos === fightingChunk && dstToBottom < 6 * h / 9 && dstToBottom > 5 * h / 9 && !fight) {
        setFight(true)
        GameContextFn.fight(timer.step)
        TimerContextFn.shiftSpeed(2)
      }

      if (dstToBottom < 2 * h / 9 && dstToBottom > 0 && !chosen) {
        setChosen(true)
        GameContextFn.applyChoice(pos)
        pos % 2 && TimerContextFn.shiftSpeed(1)
      }
    }
  }, [timer.time])

  return (
    <div style={styles.chunk}>
      <div style={styles.head}>

        <div style={styles.part}>
          <div style={styles.checkPoint}>
            {chunks.length > 0 && !chosen && chunks[pos].left && chunks[pos].left.label}
          </div>

        </div>
        <div style={styles.part}>
          <div style={styles.checkPoint}>
            {chunks.length > 0 && !chosen && chunks[pos].right && chunks[pos].right.label}
          </div>

        </div>
      </div>
      <div style={styles.content}>
        {pos === fightingChunk && <div><Opponents /></div>}
      </div>

    </div>
  )
}

export default Chunk
