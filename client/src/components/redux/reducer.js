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
  SET_BAR,
  SET_BUTTONS,
} from './action-types'

const initialState = {
  pokemons: [],
  allPokemons: [],
  details: [],
  types: [],
  filteredOrigin: [],
  bar: true,
  buttons: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_POKEMON:
      return { ...state, pokemons: action.payload }

    case GET_POKEMONS:
      if (
        action.payload.length === state.allPokemons.length &&
        state.allPokemons.length > 0
      ) {
        return {
          ...state,
          allPokemons: action.payload,
        }
      }
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        filteredOrigin: action.payload,
      }

    case FILTER_POKEMONS_TYPE:
      const allPokemons = [...state.filteredOrigin]
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
          : action.payload === 'api'
          ? allPokemon.filter((item) => typeof item.id === 'number')
          : [...state.allPokemons]

      state.filteredOrigin = originFilter
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
            ...allPoke
              .filter((item) => typeof item.id !== 'number')
              .sort((a, b) => a.id.localeCompare(b.id)),
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
      return { ...state, pokemons: state.allPokemons, bar: true }

    case GET_TYPES:
      return { ...state, types: action.payload }

    case POST_POKEMON:
      return { ...state }

    case CLEAN_DETAIL:
      return { ...state, details: [] }
    case SET_BAR:
      return { ...state, bar: false }
    case SET_BUTTONS:
      return { ...state, buttons: action.payload }

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
