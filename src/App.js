import './App.css'
import { TimerProvider } from './context/TimerContext'
import Road from './component/Road'
import { PlayerProvider } from './context/playerContext'
import PlayerControler from './component/player/PlayerControler'
import TimerConrols from './component/TimerConrols'

function App () {
  return (
    <div className='App'>
      <TimerProvider>
        <PlayerProvider>
          <div>
            <Road />
            <PlayerControler />
            <TimerConrols />
          </div>
        </PlayerProvider>
      </TimerProvider>
    </div>
  )
}

export default App
