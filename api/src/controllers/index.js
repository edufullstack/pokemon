const { Pokemon, Type } = require('../db')
const axios = require('axios')

// aqui van los metodos para insertar datos o traerlos como pokemon.findAll o pokemon.create con async await
const getAllPokemons = async () => {
  let arrayPokemons = []

  const pokemonFirstTwenty = await axios('https://pokeapi.co/api/v2/pokemon')
  const pokemonNextTwenty = await axios(pokemonFirstTwenty.data.next)

  const pokemonURLS = pokemonFirstTwenty.data.results.map((p) => p.url)
  const pokemonURLSN = pokemonNextTwenty.data.results.map((p) => p.url)

  const allURLS = pokemonURLS.concat(pokemonURLSN)

  for (i = 0; i < allURLS.length; i++) {
    const results = await axios(allURLS[i])
    arrayPokemons.push({
      id: results.data.id,
      name: results.data.name,
      hp: results.data.stats[0].base_stat,
      attack: results.data.stats[1].base_stat,
      defense: results.data.stats[2].base_stat,
      image: results.data.sprites.other.home.front_default,
      types: results.data.types.map((el) => el.type.name),
      speed: results.data.stats[5].base_stat,
      height: results.data.height,
      weight: results.data.weight,
    })
  }

  return arrayPokemons
}

const getAllPokemonsDb = async () => {
  const pokemonsDb = Pokemon.findAll()
  return pokemonsDb
}

const findPokemon = async (id) => {
  try {
    const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let pokeDetail = {
      name: results.data.name,
      id: results.data.id,
      height: results.data.height,
      weight: results.data.weight,
      hp: results.data.stats[0].base_stat,
      attack: results.data.stats[1].base_stat,
      defense: results.data.stats[2].base_stat,
      speed: results.data.stats[5].base_stat,
      types: results.data.types.map((p) => p.type.name),
      image: results.data.sprites.other.home.front_default,
    }

    if (pokeDetail) return pokeDetail
  } catch (error) {
    throw new Error(`Pokemon not found with id ${id}`)
  }
}

const findPokemonByNameDb = async (name) => {
  let pokeByNameDB = await Pokemon.findAll({
    where: {
      name: name.toLowerCase(),
    },
    include: {
      model: Type,
      attributes: ['name'],
    },
  })
  if (!pokeByNameDB.length) {
    return pokemonByNameAPI(name.toLowerCase())
  }

  pokeByNameDB = pokeByNameDB.map((p) => {
    return {
      id: p.id,
      name: p.name,
      hp: p.hp,
      attack: p.attack,
      defense: p.defense,
      speed: p.speed,
      height: p.height,
      weight: p.weight,
      types: p.types.map((t) => t.name),
      image: p.image,
    }
  })
  return pokeByNameDB
}
async function pokemonByNameAPI(name) {
  try {
    let results = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`
    )

    let pokeDetail = {
      name: results.data.name,
      id: results.data.id,
      height: results.data.height,
      weight: results.data.weight,
      hp: results.data.stats[0].base_stat,
      attack: results.data.stats[1].base_stat,
      defense: results.data.stats[2].base_stat,
      speed: results.data.stats[5].base_stat,
      types: results.data.types.map((p) => p.type.name),
      image: results.data.sprites.other.home.front_default,
    }
    let pokeArray = []
    pokeArray.push(pokeDetail)
    return pokeArray
  } catch (err) {
    return 'That pokemon does not exist'
  }
}

const postPokemon = async (
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  try {
    const random = Math.floor(Math.random() * 1003 + 1)
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`

    let newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    })

    //Me traigo todos los tipos que tengan un nombre desde el modelo Type
    const typeInDb = await Type.findAll({ where: { name: types } })
    //Agrego tipos
    newPokemon.addType(typeInDb)
    return newPokemon
  } catch (error) {
    return { error: error.message }
  }
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

module.exports = {
  getTypes,
  getAllPokemons,
  findPokemon,
  getAllPokemonsDb,
  findPokemonByNameDb,
  postPokemon,
}
