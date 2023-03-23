import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postPokemon } from '../redux/actions'
import Validate from './validate'
import styles from './formPage.module.css'

const Form = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({})
  const name = useRef(null)
  const types = useSelector((state) => state.types)
  const [input, setInput] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '1',
    height: '1',
    weight: '1',
    types: [],
  })

  useEffect(() => {
    dispatch(getTypes())
    name.current.focus()
  }, [])

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
    setErrors(Validate({ ...input, [event.target.name]: event.target.value }))

    const newErrors = Validate({
      ...input,
      [event.target.name]: event.target.value,
    })
    const hasErrors = Object.keys(newErrors).length > 0
    setDisabled(hasErrors)
  }

  const handleSelect = (event) => {
    setDisabled(true)
    setInput({
      ...input,
      types: [
        ...input.types,
        input.types.includes(event.target.value) ? null : event.target.value,
      ],
    })
    setErrors(
      Validate({ ...input, types: [...input.types, event.target.value] })
    )
    const newErrors = Validate({
      ...input,
      types: [...input.types, event.target.value],
    })
    const hasErrors = Object.keys(newErrors).length > 0
    setDisabled(hasErrors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postPokemon(input))
    alert('Pokemon created')
    setInput({
      name: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '1',
      height: '1',
      weight: '1',
      types: [],
    })
    history.push('/home')
  }

  const handleDelete = (item) => {
    setInput({
      ...input,
      types: input.types.filter((type) => item !== type),
    })
    setErrors(
      Validate({
        ...input,
        types: input.types.filter((type) => item !== type),
      })
    )
    const newErrors = Validate({
      ...input,
      types: input.types.filter((type) => item !== type),
    })
    const hasErrors = Object.keys(newErrors).length > 0
    setDisabled(hasErrors)
  }

  return (
    <div className={styles.formBody}>
      <h1>Create your Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type='text'
            ref={name}
            value={input.name}
            name='name'
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>HP (Health Points)</label>
          <input
            type='range'
            min='1'
            max='99'
            value={input.hp}
            name='hp'
            onChange={handleChange}
          />
          {errors.hp && errors.hp ? (
            <p>{errors.hp}</p>
          ) : (
            <p> {input.hp} Healt Points </p>
          )}
        </div>
        <div>
          <label>Attack</label>
          <input
            type='range'
            min='1'
            max='99'
            value={input.attack}
            name='attack'
            onChange={handleChange}
          />
          {errors.attack && errors.attack ? (
            <p>{errors.attack}</p>
          ) : (
            <p> {input.attack} Points </p>
          )}
        </div>
        <div>
          <label>Defense</label>
          <input
            type='range'
            min='1'
            max='99'
            value={input.defense}
            name='defense'
            onChange={handleChange}
          />

          {errors.defense && errors.defense ? (
            <p>{errors.defense}</p>
          ) : (
            <p> {input.defense} Points </p>
          )}
        </div>
        <div>
          <label>Speed</label>
          <input
            type='range'
            min='1'
            value={input.speed}
            name='speed'
            onChange={handleChange}
          />
          <p> {input.speed} km/h</p>
        </div>
        <div>
          <label>Height</label>
          <input
            type='range'
            min='1'
            max='99'
            value={input.height}
            name='height'
            onChange={handleChange}
          />
          <p> {input.height} cm.</p>
        </div>
        <div>
          <label>Weight</label>
          <input
            type='range'
            min='1'
            value={input.weight}
            name='weight'
            onChange={handleChange}
          />
          <p> {input.weight} kg.</p>
        </div>
        <div>
          <select onChange={handleSelect}>
            {types.map((item) => {
              return (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              )
            })}
          </select>
          {errors.types && <p>{errors.types}</p>}
        </div>
        <button type='submit' disabled={disabled}>
          Create Pokemon
        </button>
      </form>
      {input.types.map((type) => {
        if (type === null) return null
        return (
          <div className={styles.types} key={type}>
            <button onClick={() => handleDelete(type)}>x</button>
            <p>{type}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Form
