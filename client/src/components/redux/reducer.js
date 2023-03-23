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
      const allPokemons = state.allPokemons
      const filteredPokemons =
        action.payload === 'all'
          ? allPokemons
          : allPokemons.filter(
              (item) => item.types && item.types.includes(action.payload)
            )
      return {
        ...state,
        pokemons: filteredPokemons,
      }

    case FILTER_POKEMONS_ORIGIN:
      const allPokemon = state.allPokemons
      const originFilter =
        action.payload === 'database'
          ? allPokemon.filter((item) => typeof item.id !== 'number')
          : allPokemon.filter((item) => typeof item.id === 'number')
      return {
        ...state,
        pokemons: action.payload === 'all' ? allPokemon : originFilter,
      }

    case ORDER_POKEMONS:
      let allPoke = state.allPokemons
      let sortedPokemons
      if (action.payload === 'id') {
        sortedPokemons = allPoke.sort((a, b) => {
          if (a.id > b.id) {
            return 1
          }
          if (b.id > a.id) {
            return -1
          }
          return 0
        })
      }
      if (action.payload === 'ascendingName') {
        sortedPokemons = allPoke.sort((a, b) => {
          if (a.name > b.name) {
            return 1
          }
          if (b.name > a.name) {
            return -1
          }
          return 0
        })
      } else if (action.payload === 'descendingName') {
        sortedPokemons = allPoke.sort((a, b) => {
          if (a.name > b.name) {
            return -1
          }
          if (b.name > a.name) {
            return 1
          }
          return 0
        })
      } else if (action.payload === 'ascendingAttack') {
        sortedPokemons = allPoke.sort((a, b) => {
          if (a.attack > b.attack) {
            return 1
          }
          if (b.attack > a.attack) {
            return -1
          }
          return 0
        })
      } else if (action.payload === 'descendingAttack') {
        sortedPokemons = allPoke.sort((a, b) => {
          if (a.attack > b.attack) {
            return -1
          }
          if (b.attack > a.attack) {
            return 1
          }
          return 0
        })
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
