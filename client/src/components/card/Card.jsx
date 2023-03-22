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
      <Link className={styles.decoration} to={`/detail/${id}`}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <div className={styles.horizontal}>
          {types &&
            types.map((el) => {
              const typeClass = styles[`${el}`]
              return (
                <p className={typeClass} key={el}>
                  {el}
                </p>
              )
            })}
        </div>
      </Link>
    </div>
  )
}

export default Card
