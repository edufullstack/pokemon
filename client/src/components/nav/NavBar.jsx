import './navBar.module.css'
import { Link } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'

const NavBar = ({ onSearch }) => {
  return (
    <div>
      <Link to='/'>
        <button>Logout</button>
      </Link>
      <Link to='/home'>
        <button>Home</button>
      </Link>
      <Link to='/about'>
        <button>About</button>
      </Link>
      <Link to='/form'>
        <button>Form</button>
      </Link>
      <SearchBar onSearch={onSearch} />
    </div>
  )
}

export default NavBar
