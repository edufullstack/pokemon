const Validate = (input) => {
  let errors = {}
  if (!/^[a-zA-Z]+$/.test(input.name)) {
    errors.name = 'Name must be only letters'
  }
  if (!input.name) {
    errors.name = 'Please insert a Name'
  }

  if (Number(input.hp) < 1 || Number(input.hp) > 99) {
    errors.hp = 'Health Poins must be a number between 1-99'
  }

  if (Number(input.attack) < 1 || Number(input.attack) > 99) {
    errors.attack = 'Attack must be a number between 1-99'
  }

  if (Number(input.defense) < 1 || Number(input.defense) > 99) {
    errors.defense = 'Defense must be a number between 1-99'
  }
  if (input.types.length < 1 || input.types.length > 3) {
    errors.types = 'Pokemon must have from 1 to 3 types'
  }
  return errors
}

export default Validate
