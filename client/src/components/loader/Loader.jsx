import styles from './loader.module.css'

const Loader = () => {
  return (
    <div className={styles.card}>
      <img
        src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e094cc7f-fc5d-49e2-a35c-f2a21cf1fbde/daly4mt-cda3a461-8e1c-4b71-886b-c5f9a887e2c1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UwOTRjYzdmLWZjNWQtNDllMi1hMzVjLWYyYTIxY2YxZmJkZVwvZGFseTRtdC1jZGEzYTQ2MS04ZTFjLTRiNzEtODg2Yi1jNWY5YTg4N2UyYzEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LXJIfG4zQD8ySQ7itW315nDYyBvHs7jfcBk8hwkXIN8'
        alt='loading'
      />
      <h1> Loading ...</h1>
      <hr />
    </div>
  )
}

export default Loader
