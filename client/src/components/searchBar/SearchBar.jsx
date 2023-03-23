import styles from './searchBar.module.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { searchPokemon } from '../redux/actions'

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleInputChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(searchPokemon(name))
    setName('')
    setCurrentPage(1)
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      // 13 es el código para la tecla "Enter"
      handleSubmit(event)
    }
  }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type='text'
        placeholder='Search by name...'
        onChange={(event) => handleInputChange(event)}
        onKeyDown={(event) => handleKeyDown(event)}
        value={name}
      />
      <button
        type='submit'
        className={styles.searchButton}
        onClick={(event) => handleSubmit(event)}
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
