import Layout from '../Components/Layout/Layout';
import styles from './About.module.css'
import { about } from '../constants'
function aboutPage() {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>About</h1>
        <div className={styles.paragraphs}>
        {about.map((paragraph, i) => {
          return (
            <p
              key={i}
              className={styles.paragraph}
            >{paragraph}</p>)
        })}
      </div></div>
    </Layout>)
}

export default aboutPage