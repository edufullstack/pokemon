import styles from './about.module.css'
import fotojpeg from './fotojpeg.JPG'

const About = () => {
  return (
    <div className={styles.aboutBody}>
      <div className={styles.card}>
        <img src={fotojpeg} alt='foto' className={styles.cardImg} />
        <div className={styles.cardBody}>
          <p>Hello, my name is Jose Eduardo Ramirez Hernandez </p>
          <p>
            This Single Page Application was created with HTML, CSS, JavaScript,
            React and Redux for the front-end and with SQL, PostgreSQL and
            NODEJS for the back-end. you can find my linkedin and my
            repositories clicking the buttons below.
          </p>
          <a
            href='https://www.linkedin.com/in/joseeduardoramirezhernandez/'
            target='_blank'
            rel='noreferrer'
          >
            <button className={styles.cardButton}>Linkedin</button>
          </a>
          <a
            href='https://github.com/edufullstack'
            target='_blank'
            rel='noreferrer'
          >
            <button className={styles.cardButton}>Github</button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
