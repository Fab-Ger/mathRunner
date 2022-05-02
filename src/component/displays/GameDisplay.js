import { useGame } from '../../context/GameContext'

const GameDisplay = () => {
  const { state } = useGame()
  const styles = {
    main: {
      position: 'absolute',
      right: 10,
      top: 50,
      background: 'white',
      borderRadius: 20,
      padding: 20
    }
  }
  return (
    <div style={styles.main}>
      <h1>Score : {state.score}</h1>
      <h1>Multiplier : {state.level / 2}</h1>
    </div>
  )
}

export default GameDisplay
