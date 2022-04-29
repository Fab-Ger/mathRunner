import './App.css'
import Game from './page/Game'
import { TimerProvider } from './context/TimerContext'
import { GameProvider } from './context/GameContext'

function App () {
  return (
    <div className='App'>
      <TimerProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </TimerProvider>
    </div>
  )
}

export default App
