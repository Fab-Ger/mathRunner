
import { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext'
import { useTimer } from '../../context/TimerContext'
import { rndFormula } from '../../data/Formulas'
import Opponents from '../playField/Opponents'

const Chunk = ({ chunk, pos, RoadHeight }) => {
  const [chosen, setChosen] = useState(false)
  const [fight, setFight] = useState(false)
  const { state: timer, TimerContextFn } = useTimer()
  const { state: { chunks, reset , dispChunks}, GameContextFn } = useGame()

  const nbChunk = chunks.length
  const chunkHeight = RoadHeight ? RoadHeight / dispChunks + 10 : 100

  const position = chunkHeight ? (((timer.time / 10) + ((nbChunk-pos + (dispChunks+1)) * chunkHeight) ) % ((nbChunk+1) * chunkHeight) -chunkHeight) : 0

  useEffect(() => {
    // GameContextFn.setChunk({ left: rndFormula(), right: rndFormula() }, pos)
    // GameContextFn.updateChunk(pos)
    setChosen(false)
    setFight(false)
  }, [reset])

  const styles = {
    chunk: {
      position: 'absolute',
      top: position,
      height: chunkHeight,
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
      top: 5 * chunkHeight / 9
    }
  }

  useEffect(() => {
    if (timer.time > 150) {
      const dstToBottom = RoadHeight - position

      // is it the fighting chunk
      if (chosen && position < chunkHeight) {
        //GameContextFn.setChunk({ left: rndFormula(), right: rndFormula() }, pos)
        setChosen(false)
        setFight(false)
      }
      
      if (pos === nbChunk && dstToBottom < 6/9 * chunkHeight && dstToBottom > 5/9 * chunkHeight && !fight) {
        setFight(true)
        GameContextFn.fight(timer.step)
        TimerContextFn.shiftSpeed(2)
      }

      if (dstToBottom < 2 * chunkHeight / 9 && dstToBottom > 0 && !chosen) {
        setChosen(true)
        if(pos !== nbChunk ){
          GameContextFn.applyChoice(pos)
          GameContextFn.updateChunk(pos)
        }
        pos % 2 && TimerContextFn.shiftSpeed(1)
      }
    }
  }, [timer.time])

  const getChoices = () => {
    if(pos == nbChunk ){
      return (<div style={styles.head}></div>)
    }else{
      return (
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
      )
    }
  }

  return (
    <div style={styles.chunk}>
      {getChoices()}
      <div style={styles.content}>
      {pos === nbChunk && <div><Opponents /></div>}
      {pos !== nbChunk && <div>{pos}</div>}
      </div>

    </div>
  )
}

export default Chunk
