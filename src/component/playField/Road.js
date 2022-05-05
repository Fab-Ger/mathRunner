import { useGame } from '../../context/GameContext'
import Chunk from './Chunk'
import Player from '../player/Player'
import { useWindowSize } from '../../utils/view'
import { useEffect } from 'react'

const Road = () => {
  const { state: { chunks, level } } = useGame()
  const [, height] = useWindowSize()
  // const { RoadHeight, setRoadHeight } = useState(vh(100))
  let RoadHeight = height
  useEffect(() => {
    // setRoadHeight(height)
    RoadHeight = height
  }, [height])

  const styles = {
    title: {
      fontSize: '2em',
      fontWeight: 'bold'
    },
    view: {
      position: 'relative',
      height: RoadHeight,
      border: '4px solid gold',
      overflow: 'hidden',
      transform: 'rotate3d(1, 0, 0, 30deg) translateY(-200px) translateZ(100px)',
      transformStyle: 'preserve-3d'
    },
    poss: {
      perspective: 550,
      paddingLeft: '25vw',
      paddingRight: '25vw'
    },
    cont: { }
  }

  // const chunks = [{ color: 'red' }, { color: 'green' }, { color: 'blue' }, { color: 'orange' }]

  return (
    <div style={styles.cont}>

      <div style={styles.title}>
        Level {level}
      </div>
      <div style={styles.poss}>

        <div style={styles.view}>
          {chunks.map((ch, index) => (
            <Chunk key={index} pos={index} chunk={ch} RoadHeight={RoadHeight} nbChunk={2} />
          ))}

        </div>
        <Player />
      </div>
    </div>
  )
}

export default Road
