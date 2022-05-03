import { useEffect, useRef } from 'react'
import { useGame } from '../../context/GameContext'

const Message = () => {
  const { state: { message }, GameContextFn } = useGame()
  const ref = useRef(null)

  const styles = {
    msg: {
      position: 'absolute',
      top: '10%',
      // left: (ref.current && 'calc( 50% - ' + ref.current.width + 'px)'),
      // left: ref && ref.current && 'calc( 50% - ' + ref.current.getBoundingClientRect().width / 2 + 'px)',
      left: 10,
      zIndex: 1,
      background: 'white',
      borderRadius: 20,
      padding: 10
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (message.display) {
        GameContextFn.setMessage({ ...message, display: false })
      }
    }, (message.delay) ? message.delay : 2000)
  }, [message])

  if (message.display) {
    return (
      <div className='fade-in' ref={ref} style={styles.msg}>
        <h1>{message.title}</h1>
        {message.content}
      </div>
    )
  }
}

export default Message
