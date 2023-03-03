import styles from './Hero.module.css';
import StyledBtn from '../StyledBtn/StyledBtn';


export default function Home() {
  return (
    <>

      <div className={styles.page}>
        <div className={styles.mainDiv}>
          <div className={styles.textWrapper}>
            <div className={styles.text}>
              <h1 className={styles.h1}>Prep smarter!<br/>Ace your EXAMS!</h1>
              <p className={styles.p}>Rubric is an AI powered test prep platform that helps you study smarter by training 
                your recall on materials you’ve studied</p>
              <StyledBtn
                variant={'pCTA'}
                title={'start prepping now!'}
                type={'link'}
                page={'/quizzes'}
                />
            </div>
          </div>
        </div>

      </div>

    </>
  )
}