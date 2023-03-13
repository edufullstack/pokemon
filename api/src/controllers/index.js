const { Pokemon, Type } = require('../db')
const axios = require('axios')

// aqui van los metodos para insertar datos o traerlos como pokemon.findAll o pokemon.create con async await
const getAllPokemons = async () => {
  let database = await Pokemon.findAll()
  if (database.length > 0) {
    let verify = Pokemon.findAll()
    return verify
  } else {
    let arrayPokemons = []

    let url = 'https://pokeapi.co/api/v2/pokemon'
    // if (database.length < 150) {
    //   url = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'
    // }

    const pokemonFirstTwenty = await axios(url)
    const pokemonNextTwenty = await axios(pokemonFirstTwenty.data.next)

    const pokemonURLS = pokemonFirstTwenty.data.results.map((p) => p.url)
    const pokemonURLSN = pokemonNextTwenty.data.results.map((p) => p.url)

    const allURLS = pokemonURLS.concat(pokemonURLSN)

    for (i = 0; i < allURLS.length; i++) {
      const poke = await axios(allURLS[i])
      arrayPokemons.push({
        id: poke.data.id,
        name: poke.data.name,
        life: poke.data.stats[0].base_stat,
        attack: poke.data.stats[1].base_stat,
        defense: poke.data.stats[2].base_stat,
        image: poke.data.sprites.other.home.front_default,
        speed: poke.data.stats[5].base_stat,
        height: poke.data.height,
        weight: poke.data.weight,
        // types: poke.data.types.map((p) => p.type.name),
      })
    }

    // return arrayPokemons
    await pokeIntoDb(arrayPokemons)

    let verify = Pokemon.findAll()
    return verify
  }
}

const pokeIntoDb = async (arrayPokemons) => {
  let savePokedex = await Pokemon.bulkCreate(arrayPokemons)
  return savePokedex
}

const findPokemon = async (id) => {
  let finded = Pokemon.findAll({
    where: { id },
    includes: {
      model: Type,
    },
  })
  if (finded) return finded
  throw new Error('No hay pokemones en DB')
}

// //////////////////- TYPE -///////////////////////
const getTypes = async () => {
  let typesApiURL = await axios.get('https://pokeapi.co/api/v2/type')
  // Del array obtenido, dentro de results(.data.results) tenemos un array de objetos con nombre y url,
  // mapeamos y por cada item, si no lo encuentra en la DB lo creara
  typesApiURL.data.results.map((item) =>
    Type.findOrCreate({
      where: {
        name: item.name,
      },
    })
  )
  // una vez creado los types enviamos todos
  let types = await Type.findAll()
  return types
}

module.exports = { getTypes, getAllPokemons, findPokemon }
