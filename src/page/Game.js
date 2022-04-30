
import Road from '../component/Road'
import TimerConrols from '../component/TimerConrols'
import EndGame from '../component/EndGame'
import Message from '../component/Message'

const Game = () => {
  return (
    <div>
      <Message />
      <EndGame />
      <Road />
      <TimerConrols />
    </div>
  )
}

export default Game
