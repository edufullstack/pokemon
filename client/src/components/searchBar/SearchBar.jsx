import './searchBar.module.css'
import { useDispatch } from 'react-redux'

const SearchBar = () => {
  const dispatch = useDispatch()
  const handleInputChange = () => {}
  return (
    <div>
      <input
        // className={}
        type='search'
        // value={}
        onChange={handleInputChange}
      />
      <button
        // className={}
        onClick={() => {
          // onSearch(character)
        }}
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
