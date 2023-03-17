import {
  SEARCH_POKEMON,
  GET_POKEMONS,
  FILTER_POKEMONS_TYPE,
  // FILTER_POKEMONS_ORIGIN,
  // ORDER_POKEMONS,
  // ORDER_POKEMONS_ALPHA,
  // ORDER_POKEMONS_ATTACK,
  // GET_DETAIL,
  ERROR,
} from './action-types'

const initialState = {
  pokemons: [],
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_POKEMON:
      return { ...state, filtered: action.payload }
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload }
    case FILTER_POKEMONS_TYPE:
      const filteredPokemons =
        action.payload === 'all'
          ? state.pokemons
          : state.pokemons.filter((item) => item.type === action.payload)
      return {
        ...state,
        pokemons: filteredPokemons,
      }
    case ERROR:
      return { ...state, error: action.payload }
    default:
      return { ...state }
  }
}

export default reducer
