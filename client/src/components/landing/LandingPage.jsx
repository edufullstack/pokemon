import styles from './landingPage.module.css'
import { Link } from 'react-router-dom'
import sound from './pokemon.mp3'

const LandingPage = () => {
  const handleClick = () => {
    const audio = new Audio(sound)
    audio.play()
    setInterval(() => {
      audio.pause()
    }, 5000)
  }
  return (
    <div className={styles.landingBody}>
      <Link to='/home'>
        <button onClick={handleClick}>Start your journey</button>
      </Link>
    </div>
  )
}

export default LandingPage
