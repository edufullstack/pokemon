import styles from './homePage.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, filterPokemonsType } from '../redux/actions'
import Card from '../card/Card'
import Paginado from '../paginado/Paginado'

const HomePage = () => {
  const dispatch = useDispatch()
  const pokemons = useSelector((state) => state.pokemons)
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
  }, [dispatch])

  const handleFilterType = (event) => {
    dispatch(filterPokemonsType(event.target.value))
  }

  return (
    <div>
      <h2>Pokedex</h2>

      <select>
        <option>Ascendent</option>
        <option>Descendent</option>
      </select>
      <select onChange={handleFilterType}>
        <option value='all'>All</option>
        <option value='normal'>Normal</option>
        <option value='flying'>Flying</option>
        <option value='fighting'>Fighting</option>
        <option value='ground'>Ground</option>
        <option value='rock'>Rock</option>
        <option value='ghost'>Ghost</option>
        <option value='steel'>Steel</option>
        <option value='bug'>Bug</option>
        <option value='fire'>Fire</option>
        <option value='water'>Water</option>
        <option value='grass'>Grass</option>
        <option value='psychic'>Psychic</option>
        <option value='ice'>Ice</option>
        <option value='dragon'>Dragon</option>
        <option value='electric'>Electric</option>
        <option value='dark'>Dark</option>
        <option value='fairy'>Fairy</option>
        <option value='unknown'>Unknown</option>
        <option value='shadow'>Shadow</option>
      </select>
      <select>
        <option value='all'>All</option>
        <option value='database'>Database</option>
        <option value='api'>API</option>
      </select>
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        pokemons={pokemons.length}
        paginado={paginado}
      />
      <div className={styles.cardContainer}>
        {currentPokemons?.map((item) => {
          return (
            <Card
              key={item.id}
              image={item.image}
              name={item.name}
              types={item.types}
            />
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
