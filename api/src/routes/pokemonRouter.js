// GET | /pokemons
// Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.

const express = require('express')
const router = express.Router()
const {
  getAllPokemons,
  findPokemon,
  postPokemon,
  findPokemonByNameDb,
} = require('../controllers/index')

router.get('/', async (req, res) => {
  try {
    let { name } = req.query
    if (name) {
      let pokeByName = await findPokemonByNameDb(name)
      res.status(200).send(pokeByName)
    } else {
      let pokemons = await getAllPokemons()
      res.status(200).send(pokemons)
    }
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/:idPokemon', async (req, res) => {
  try {
    const { idPokemon } = req.params
    let finded = await findPokemon(idPokemon)
    res.status(200).json(finded)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

// 📍 POST | /pokemons
// Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (al menos uno).

router.post('/', async (req, res) => {
  let { name, hp, attack, defense, speed, height, weight, types } = req.body
  try {
    if (!name || !hp || !attack || !defense || !types) {
      throw new Error('Please complete the required information.')
    }
    postPokemon(name, hp, attack, defense, speed, height, weight, types)
    res.status(200).send(`Pokemon ${name} created successfully!`)
  } catch (error) {
    return { error: error.message }
  }
})
module.exports = router
