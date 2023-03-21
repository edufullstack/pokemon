import { Link } from 'react-router-dom'
import styles from './card.module.css'
import { useDispatch } from 'react-redux'
import { deletePokemon } from '../redux/actions'

const Card = ({ name, image, types, id }) => {
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(deletePokemon(id))
  }

  return (
    <div className={styles.card}>
      {isNaN(id) && (
        <button className={styles.deleteButton} onClick={() => handleClick(id)}>
          x
        </button>
      )}
      <Link to={`/detail/${id}`}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <h4>
          {types.length === 1 ? types[0] : ''}
          {types.length === 2 ? types[0] + ' ' + types[1] : null}
          {types.length === 3
            ? types[0] + ' ' + types[1] + ' ' + types[2]
            : null}
        </h4>
      </Link>
    </div>
  )
}

export default Card
