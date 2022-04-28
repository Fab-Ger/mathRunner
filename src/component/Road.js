import Chunk from './Chunk'
import Player from './player/Player'

const Road = () => {
  const RoadHeight = 500

  const styles = {
    view: {
      position: 'relative',
      height: RoadHeight,
      border: '4px solid gold',
      overflow: 'hidden',
      transform: 'rotate3d(1, 0, 0, 40deg)',
      transformStyle: 'preserve-3d'
    },
    poss: {
      perspective: 550,
      paddingLeft: '5vw',
      paddingRight: '5vw'
    },
    cont: {
      margin: 50
    }
  }

  const chunks = [{ color: 'red' }, { color: 'green' }, { color: 'blue' }, { color: 'orange' }]

  return (
    <div style={styles.cont}>
      <h1>
        Road
      </h1>
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
