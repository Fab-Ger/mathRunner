import { usePlayer } from '../../context/playerContext'

const Player = () => {
  const { state } = usePlayer()

  const styles = {
    player: {
      borderRadius: 20,
      background: 'black',
      position: 'absolute',
      bottom: 20,
      left: state.position + '%',
      color: 'white',
      padding: 10
    }
  }

  return (
    <div style={styles.player}>
      {state.val}
    </div>
  )
}

export default Player
