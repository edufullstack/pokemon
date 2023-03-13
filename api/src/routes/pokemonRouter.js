// GET | /pokemons
// Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.

const express = require('express')
const router = express.Router()
const { getAllPokemons, findPokemon } = require('../controllers/index')

// aqui es / nada mas y los metodos
// tambien llevan async await
router.get('/', async (req, res) => {
  try {
    let allPokemons = await getAllPokemons()
    res.status(200).json(allPokemons)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

// 📍 GET | /pokemons/:idPokemon
// Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
// El pokemon es recibido por parámetro (ID).
// Tiene que incluir los datos del tipo de pokemon al que está asociado.
// Debe funcionar tanto para los pokemones de la API como para los de la base de datos.
router.get('/:idPokemon', async (req, res) => {
  try {
    const { idPokemon } = req.params
    let finded = await findPokemon(idPokemon)
    res.status(200).json(finded)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

// 📍 GET | /pokemons/name?="..."
// Esta ruta debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el pokemon, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
router.get('/', async (req, res) => {
  try {
    const { name } = req.query
  } catch (error) {}
})

// 📍 POST | /pokemons
// Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (al menos uno).

router.post('/', async (req, res) => {
  const { id, name, image, life, attack, defense, img, type } = req.body
})
module.exports = router
