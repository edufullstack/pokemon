import styles from './homePage.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPokemons,
  filterPokemonsType,
  filterPokemonsOrigin,
  orderPokemons,
  getTypes,
  setBar,
  setButtons,
} from '../redux/actions'
import Card from '../card/Card'
import Paginado from '../paginado/Paginado'
import SearchBar from '../searchBar/SearchBar'
import Loader from '../loader/Loader'
import useLocalStorage from '../customHook/useLocalStorage'

const HomePage = () => {
  const dispatch = useDispatch()
  const pokemons = useSelector((state) => state.pokemons)
  const types = useSelector((state) => state.types)
  const [typeFilter, setTypeFilter] = useLocalStorage('textFilter', '')
  const [origin, setOrigin] = useLocalStorage('origin', '')
  const [order, setOrder] = useLocalStorage('order', '')
  const bar = useSelector((state) => state.bar)
  const [orden, setOrden] = useState('')
  const buttons = useSelector((state) => state.buttons)
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  )

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  useEffect(() => {
    dispatch(getPokemons())
    dispatch(getTypes())
    if (buttons[2]) {
      setOrder(buttons[2])
      setOrigin(buttons[0])
      setTypeFilter(buttons[1])
    }
  }, [buttons])

  const handleFilterType = (event) => {
    setCurrentPage(1)
    dispatch(setButtons([]))
    setTypeFilter(event.target.value)
    dispatch(filterPokemonsType(event.target.value))
  }
  const handleOriginFilter = (event) => {
    setCurrentPage(1)
    dispatch(setButtons([]))
    setTypeFilter('all')
    setOrigin(event.target.value)
    dispatch(filterPokemonsOrigin(event.target.value))
  }
  const handleOrder = (event) => {
    event.preventDefault()
    dispatch(setButtons([]))
    setOrder(event.target.value)
    dispatch(orderPokemons(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${event.target.value} `)
  }
  const handleBarra = () => {
    dispatch(setBar(false))
  }
  return (
    <div className={styles.homeBody}>
      <div>
        <SearchBar handleBarra={handleBarra} setCurrentPage={setCurrentPage} />
      </div>
      {bar ? (
        <div>
          <select
            value={buttons[0] && buttons[0] ? buttons[0] : origin}
            className={styles.filter}
            onChange={handleOriginFilter}
          >
            <option value='all'>All</option>
            <option value='database'>Database</option>
            <option value='api'>API</option>
          </select>
          <select
            value={buttons[2] && buttons[2] ? buttons[2] : order}
            className={styles.filter}
            onChange={handleOrder}
          >
            <option key='id' value='id'>
              By id
            </option>
            <option key='ascendingName' value='ascendingName'>
              A-Z
            </option>
            <option key='descendingName' value='descendingName'>
              Z-A
            </option>
            <option key='ascendingAttack' value='ascendingAttack'>
              Ascending By Attack
            </option>
            <option key='descendingAttack' value='descendingAttack'>
              Descending By Attack
            </option>
          </select>
          <select
            value={buttons[1] && buttons[1] ? buttons[1] : typeFilter}
            className={styles.filter}
            onChange={handleFilterType}
          >
            <option value='all'>All</option>
            {types.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              )
            })}
          </select>
        </div>
      ) : null}
      <div className={styles.paginado}></div>
      <div className={styles.paginado}>
        <button
          onClick={() =>
            currentPage === 1 ? null : setCurrentPage(currentPage - 1)
          }
        >
          Previus
        </button>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          paginado={paginado}
        />
        <button
          onClick={() =>
            currentPage === Math.ceil(pokemons.length / pokemonsPerPage)
              ? null
              : setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>
      </div>
      {!currentPokemons.length && <Loader />}

      <div className={styles.cardContainer}>
        {Array.isArray(currentPokemons) && currentPokemons ? (
          currentPokemons.map((item) => {
            if (typeof item === 'string') {
              return (
                <div className={styles.errorContainer}>
                  <h3 className={styles.errorTitle}>
                    Error 404: Pokemon not found with that type, please try with
                    another
                  </h3>
                </div>
              )
            }
            return (
              <Card
                key={item.id}
                image={item.image}
                name={item.name}
                types={item.types}
                id={item.id}
              />
            )
          })
        ) : (
          <div className={styles.errorContainer}>
            <h3 className={styles.errorTitle}>Error 404: Pokemon not found</h3>
            <h3 className={styles.errorText}>
              Please make sure you are writing the exact name
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
