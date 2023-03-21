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
            This Single Page Application was created with Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Alias delectus tempora sint illo
            enim! Quae suscipit vitae cumque optio facere, consectetur
            doloremque autem! Ex doloremque magnam vitae, ad ducimus quidem!
          </p>
          <button className={styles.cardButton}>Linkedin</button>

          <button className={styles.cardButton}>Github</button>
        </div>
      </div>
    </div>
  )
}

export default About
