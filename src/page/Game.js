
import Road from '../component/Road'
import PlayerControler from '../component/player/PlayerControler'
import TimerConrols from '../component/TimerConrols'
import EndGame from '../component/EndGame'

const Game = () => {
  return (
    <div>
      <EndGame />
      <Road />
      <PlayerControler />
      <TimerConrols />
    </div>
  )
}

export default Game
