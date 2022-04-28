import { usePlayer } from '../../context/playerContext'

const Player = () => {
  const { state } = usePlayer()
  const h = 100
  const w = 50

  const styles = {
    player1: {
      borderRadius: 20,
      background: 'black',
      position: 'absolute',
      bottom: 20,
      left: state.position + '%',
      color: 'white',
      padding: 10,
      transform: 'rotate3d(1, 0, 0, 20deg)',
      boxShadow: '#00000061 0px 20px 20px 17px'
      // perspective: 20
    },
    player: {
      borderRadius: 20,
      background: 'black',
      position: 'absolute',
      bottom: 20,
      left: state.position + '%',
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
    { transform: 'rotateX(-90deg) translateZ(' + h / 2 + 'px)' }

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

  const pp = <div style={styles.player1}>{state.val}</div>
  return (pp)
}

export default Player
