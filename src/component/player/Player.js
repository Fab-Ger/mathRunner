import { useRef } from 'react'
import { useGame } from '../../context/GameContext'

const Player = () => {
  const { state, GameContextFn } = useGame()
  // const h = 100
  // const w = 50

  const styles = {
    player1: {
      borderRadius: 20,
      background: 'black',
      position: 'absolute',
      bottom: 20,
      left: state.position,
      color: 'white',
      padding: 30,
      fontSize: '2em',
      fontWeight: 'bold',
      transform: 'rotate3d(1, 0, 0, 20deg) translateY(-200px) translateZ(100px)',
      boxShadow: '#00000061 0px 20px 20px 17px'
      // perspective: 20
    },
    playerControl: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
    /*
    player: {
      borderRadius: 20,
      background: 'black',
      position: 'absolute',
      bottom: 20,
      left: state.position,
      color: 'white',
      padding: 10,
      transformStyle: 'preserve-3d'
      // perspective: 20
    },
    view: {
      transform: 'rotate3d(1, 0, 0, 40deg)',
      transformStyle: 'preserve-3d'
    },
    poss: {
      perspective: 550,
      paddingLeft: '5vw',
      paddingRight: '5vw'
    },
    face: {
      width: w,
      height: h,
      position: 'absolute',
      background: 'rgba(210,0,210,.7)'
    },

    front:
    { transform: 'translateZ(' + h / 2 + 'px)' },
    back:
    { transform: 'rotateY(180deg) translateZ(' + h / 2 + 'px)' },
    right:
    { transform: 'rotateY(90deg) translateZ(' + w / 2 + 'px)' },
    left:
    { transform: 'rotateY(-90deg) translateZ(' + w / 2 + 'px)' },
    top:
    { transform: 'rotateX(90deg) translateZ(' + h / 2 + 'px)' },
    bottom:
    { transform: 'rotateX(-90deg) translateZ(' + h / 2 + 'px)' },
*/
  }

  const ref = useRef(null)

  const handleMouseMove = (e) => {
    let posX
    if (e.type === 'touchmove') {
      const touch = e.touches[0] || e.changedTouches[0]
      posX = touch.pageX
    } else if (e.type === 'mousemove' && e.buttons === 1) {
      posX = e.pageX
    }
    if (posX) {
      const x = posX - ref.current.getBoundingClientRect().left
      const choice = ((posX / ref.current.offsetWidth) < 0.5) ? 'left' : 'right'
      GameContextFn.moveTo(x, choice)
    }
  }
  // const styleFace = (ori) => { return { ...styles.face, ...ori } }
  // const pp3D = (
  //   <div style={styles.player}>
  //     <div style={styles.view}>
  //       <div style={styleFace(styles.front)}>{state.val}</div>
  //       <div style={styleFace(styles.right)}>right</div>
  //       <div style={styleFace(styles.left)}>left</div>
  //       <div style={styleFace(styles.top)}>top</div>
  //       <div style={styleFace(styles.bottom)}>bottom</div>
  //     </div>
  //   </div>
  // )

  const pp = <div className='player' style={styles.player1}>{state.val}</div>
  return (

    <div className='player-control' style={styles.playerControl} ref={ref} onTouchMove={handleMouseMove} onMouseMove={handleMouseMove}>
      {pp}
    </div>

  )
}

export default Player
