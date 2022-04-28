import Chunk from './Chunk'
import Player from './player/Player'

const Road = () => {
  const styles = {
    view: {
      position: 'relative',
      height: 600,
      width: '99vw',
      border: '4px solid gold',
      overflow: 'hidden'
    }
  }

  const chunks = [{ color: 'red' }, { color: 'green' }, { color: 'blue' }, { color: 'orange' }]

  return (
    <div>
      <h1>
        Road
      </h1>
      <div style={styles.view}>
        {chunks.map((ch, index) => (
          <Chunk key={index} pos={index} chunk={ch} h={200} />
        ))}

        <Player />
      </div>
    </div>
  )
}

export default Road
