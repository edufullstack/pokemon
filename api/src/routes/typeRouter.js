// 📍 GET | /types
// Obtiene un arreglo con todos los tipos de pokemones.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
const { Router } = require('express')
const { getTypes } = require('../controllers/index')

const router = Router()

router.get('/', async (req, res) => {
  try {
    let allTypes = await getTypes()
    res.status(200).send(allTypes)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

module.exports = router
