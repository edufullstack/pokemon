import { Link } from 'react-router-dom'
import styles from './card.module.css'

const Card = ({ name, image, types, id }) => {
  return (
    <div className={styles.card}>
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
