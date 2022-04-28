import './App.css'
import Game from './page/Game'
import { TimerProvider } from './context/TimerContext'
import { PlayerProvider } from './context/playerContext'

function App () {
  return (
    <div className='App'>
      <TimerProvider>
        <PlayerProvider>
          <Game />
        </PlayerProvider>
      </TimerProvider>
    </div>
  )
}

export default App
