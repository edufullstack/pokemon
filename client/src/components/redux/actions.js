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
import axios from 'axios'

export const searchPokemon = (name) => {
  return async function (dispatch) {
    try {
      const pokemon = (await axios.get(`/pokemons?name=${name}`)).data
      dispatch({ type: SEARCH_POKEMON, payload: pokemon })
    } catch (error) {
      dispatch({ type: ERROR, payload: error.response.data.error })
    }
  }
}

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/pokemons/')
      const pokemons = response.data

      return dispatch({ type: GET_POKEMONS, payload: pokemons })
    } catch (error) {
      dispatch({ type: ERROR, payload: error.response.data.error })
    }
  }
}

export const filterPokemonsType = (payload) => {
  console.log(payload)
  return {
    type: FILTER_POKEMONS_TYPE,
    payload,
  }
}
