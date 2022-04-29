
import { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'
import { useTimer } from '../context/TimerContext'
import { rndFormula } from './data/Formulas'
import Opponents from './Opponents'

const Chunk = ({ chunk, pos, RoadHeight, nbChunk }) => {
  const [chosen, setChosen] = useState(false)
  const { state: timer } = useTimer()
  const { state: { chunks }, GameContextFn } = useGame()

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
    if (chunks.length > 0 && timer.interval) {
      if (chosen && position < h) {
        GameContextFn.setChunk({ left: rndFormula(), right: rndFormula() }, pos)
        setChosen(false)
      }

      if (position >= nbChunk * h - 50 && !chosen) {
        setChosen(true)
        GameContextFn.applyChoice(pos)
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
        {pos}
        {pos === 1 && <Opponents />}

      </div>

    </div>
  )
}

export default Chunk
