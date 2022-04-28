import { usePlayer } from '../../context/playerContext'

const PlayerControler = () => {
  const { PlayerContextFn } = usePlayer()
  const styles = {
    range: {
      width: '80%'
    }
  }

  const handleMove = (e) => { PlayerContextFn.moveTo(e.target.value) }

  return (
    <div>

      <input style={styles.range} onChange={handleMove} type='range' id='volume' name='volume' min='0' max='100' />
    </div>
  )
}

export default PlayerControler
