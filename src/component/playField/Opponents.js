import { useGame } from '../../context/GameContext'

const Opponents = () => {
  const { state: { opponent } } = useGame()

  return (
    <div>
      <h1>
        Opponents {opponent}
      </h1>

    </div>
  )
}

export default Opponents
