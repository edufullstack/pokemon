import {
  SEARCH_POKEMON,
  GET_POKEMONS,
  FILTER_POKEMONS_TYPE,
  FILTER_POKEMONS_ORIGIN,
  ORDER_POKEMONS,
  GET_DETAIL,
  RESET_POKEMONS,
  GET_TYPES,
  POST_POKEMON,
  CLEAN_DETAIL,
  DELETE_POKEMON,
} from './action-types'

const initialState = {
  pokemons: [],
  allPokemons: [],
  details: [],
  types: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_POKEMON:
      return { ...state, pokemons: action.payload }

    case GET_POKEMONS:
      return { ...state, pokemons: action.payload, allPokemons: action.payload }

    case FILTER_POKEMONS_TYPE:
      const allPokemons = [...state.allPokemons]
      let filteredPokemons =
        action.payload === 'all'
          ? allPokemons
          : allPokemons.filter(
              (item) => item.types && item.types.includes(action.payload)
            )
      !filteredPokemons.length &&
        (filteredPokemons = ['no hay pokemones de ese tipo'])
      return {
        ...state,
        pokemons: filteredPokemons,
      }

    case FILTER_POKEMONS_ORIGIN:
      const allPokemon = [...state.allPokemons]
      const originFilter =
        action.payload === 'database'
          ? allPokemon.filter((item) => typeof item.id !== 'number')
          : allPokemon.filter((item) => typeof item.id === 'number')
      return {
        ...state,
        pokemons: action.payload === 'all' ? allPokemon : originFilter,
      }

    case ORDER_POKEMONS:
      let allPoke = [...state.pokemons]
      let sortedPokemons
      switch (action.payload) {
        case 'id':
          sortedPokemons = [
            ...allPoke
              .filter((item) => typeof item.id === 'number')
              .sort((a, b) => a.id - b.id),
            ...allPoke.filter((item) => typeof item.id !== 'number'),
          ]
          break
        case 'ascendingName':
          sortedPokemons = allPoke.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'descendingName':
          sortedPokemons = allPoke.sort((a, b) => b.name.localeCompare(a.name))
          break
        case 'ascendingAttack':
          sortedPokemons = allPoke.sort((a, b) => a.attack - b.attack)
          break
        case 'descendingAttack':
          sortedPokemons = allPoke.sort((a, b) => b.attack - a.attack)
          break
        default:
          sortedPokemons = allPoke
      }
      return { ...state, pokemons: sortedPokemons }

    case GET_DETAIL:
      return {
        ...state,
        details: action.payload,
      }

    case RESET_POKEMONS:
      return { ...state, pokemons: state.allPokemons }

    case GET_TYPES:
      return { ...state, types: action.payload }

    case POST_POKEMON:
      return { ...state }

    case CLEAN_DETAIL:
      return { ...state, details: [] }

    case DELETE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
        allPokemons: state.allPokemons.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
      }

    default:
      return { ...state }
  }
}

export default reducer
