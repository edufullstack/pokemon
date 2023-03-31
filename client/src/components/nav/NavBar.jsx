import styles from './navBar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPokemonsHome } from '../redux/actions'
import { setButtons } from '../redux/actions'

const NavBar = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(resetPokemonsHome())
    dispatch(setButtons(['all', 'all', 'id']))
  }

  return (
    <div className={styles.navBody}>
      <Link to='/'>
        <button onClick={() => handleClick()}>Logout</button>
      </Link>
      <Link to='/home'>
        <button onClick={() => handleClick()}>Home</button>
      </Link>
      <Link to='/create'>
        <button>Create your Pokemon</button>
      </Link>
      <Link to='/about'>
        <button>About</button>
      </Link>
    </div>
  )
}

export default NavBar
