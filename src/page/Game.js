
import Road from '../component/playField/Road'
import TimerConrols from '../component/TimerConrols'
import EndGame from '../component/displays/EndGame'
import Message from '../component/displays/Message'
import GameDisplay from '../component/displays/GameDisplay'

const Game = () => {
  return (
    <div>
      <Message />
      <GameDisplay />
      <EndGame />
      <TimerConrols />
      <Road />
    </div>
  )
}

export default Game
