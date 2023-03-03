import NavBar from '../NavBar/NavBar'
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      
       <main><div className={styles.page}>
        <NavBar />
        <div className={styles.pageWrapper}>
          
         {children}
        </div>
      </div></main>
      
    </>
  )
}