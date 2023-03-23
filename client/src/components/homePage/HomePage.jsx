import styles from './homePage.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPokemons,
  filterPokemonsType,
  filterPokemonsOrigin,
  orderPokemons,
  getTypes,
} from '../redux/actions'
import Card from '../card/Card'
import Paginado from '../paginado/Paginado'
import SearchBar from '../searchBar/SearchBar'
import Loader from '../loader/Loader'

const HomePage = () => {
  const dispatch = useDispatch()
  const pokemons = useSelector((state) => state.pokemons)
  const types = useSelector((state) => state.types)
  const [orden, setOrden] = useState('')
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
  }, [])

  const handleFilterType = (event) => {
    dispatch(filterPokemonsType(event.target.value))
  }
  const handleOriginFilter = (event) => {
    dispatch(filterPokemonsOrigin(event.target.value))
  }
  const handleOrder = (event) => {
    event.preventDefault()
    dispatch(orderPokemons(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${event.target.value} `)
  }

  return (
    <div className={styles.homeBody}>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div>
        <select className={styles.filter} onChange={handleOrder}>
          <option value='id'>By id</option>
          <option value='ascendingName'>Ascending By Name</option>
          <option value='descendingName'>Descending By Name</option>
          <option value='ascendingAttack'>Ascending By Attack</option>
          <option value='descendingAttack'>Descending By Attack</option>
        </select>
        <select className={styles.filter} onChange={handleFilterType}>
          <option value='all'>All</option>
          {types.map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            )
          })}
        </select>
        <select className={styles.filter} onChange={handleOriginFilter}>
          <option value='all'>All</option>
          <option value='database'>Database</option>
          <option value='api'>API</option>
        </select>
      </div>
      <div className={styles.paginado}>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          paginado={paginado}
        />
      </div>
      {!currentPokemons.length && <Loader />}
      <div className={styles.cardContainer}>
        {Array.isArray(currentPokemons) && currentPokemons ? (
          currentPokemons?.map((item) => {
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
