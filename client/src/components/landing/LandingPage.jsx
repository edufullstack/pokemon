import styles from './landingPage.module.css'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className={styles.landingBody}>
      <Link to='/home'>
        <button>Start your journey</button>
      </Link>
    </div>
  )
}

export default LandingPage
