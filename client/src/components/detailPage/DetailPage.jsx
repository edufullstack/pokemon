import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getDetail } from '../redux/actions'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { cleanDetail } from '../redux/actions'
import styles from './detailPage.module.css'

const DetailPage = () => {
  const dispatch = useDispatch()
  const { detail } = useParams()
  const details = useSelector((state) => state.details)

  useEffect(() => {
    dispatch(getDetail(detail))
    return () => {
      dispatch(cleanDetail())
    }
  }, [dispatch, detail])

  return (
    <div className={styles.detailBody}>
      <h2>ID: {details?.id}</h2>
      <h1>Name: {details.name}</h1>
      <img src={details.image} alt='' />
      <p>Health Points: {details.hp}</p>
      <p>Attack: {details.attack}</p>
      <p>Defense: {details.defense}</p>
      <p>Speed: {details.speed && details.speed}</p>
      <p>Height: {details.height && details.height}</p>
      <p>Weight: {details.weight && details.weight}</p>
      <p>
        Types:
        {details.types && details.types.length === 1
          ? ' ' + details.types[0]
          : ''}
        {details.types && details.types.length === 2
          ? ' ' + details.types[0] + ' ' + details.types[1]
          : null}
        {details.types && details.types.length === 3
          ? ' ' +
            details.types[0] +
            ' ' +
            details.types[1] +
            ' ' +
            details.types[2]
          : null}
      </p>
    </div>
  )
}

export default DetailPage
