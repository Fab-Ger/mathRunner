import { useGame } from '../context/GameContext'

const Opponents = () => {
  const { state: { opponent } } = useGame()

  return (
    <div>
      Opponents {opponent}

    </div>
  )
}

export default Opponents
