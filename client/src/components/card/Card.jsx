import styles from './card.module.css'

const Card = ({ name, image, types }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h4>{types.length > 1 ? types[0] + ' ' + types[1] : types}</h4>
    </div>
  )
}

export default Card
