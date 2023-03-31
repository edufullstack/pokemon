const { Pokemon, Type } = require('../db')
const axios = require('axios')

// aqui van los metodos para insertar datos o traerlos como pokemon.findAll o pokemon.create con async await
const getAllPokemons = async () => {
  let i = 1
  let pokemons = []
  while (i < 40) {
    let dataApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    pokemons.push(dataApi)
    i++
  }
  pokemons = (await Promise.all(pokemons)).map((results) => {
    return {
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
    }
  })
  return pokemons
}

const getAllPokemonsDb = async () => {
  let pokemonsDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  })
  pokemonsDb = pokemonsDb.map((p) => {
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
  return pokemonsDb
}

const findPokemon = async (id) => {
  let pokeById
  if (isNaN(id)) {
    pokeById = await Pokemon.findAll({
      where: {
        id: id,
      },
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    })
  }
  if (pokeById) {
    const p = pokeById.pop()
    const buildPokemon = {
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
    return buildPokemon
  } else {
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
}

const findPokemonByNameDb = async (name) => {
  try {
    let pokeByNameDB = await Pokemon.findAll({
      where: {
        name: name.toLowerCase(),
      },
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        },
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
  } catch (error) {
    return 'That pokemon does not exist'
  }
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
    const random = Math.floor(Math.random() * 151 + 1)
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${random}.png`

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

const deletePokemon = async (id) => {
  await Pokemon.destroy({
    where: { id: id },
  })
}

module.exports = {
  getTypes,
  getAllPokemons,
  findPokemon,
  getAllPokemonsDb,
  findPokemonByNameDb,
  postPokemon,
  deletePokemon,
}
