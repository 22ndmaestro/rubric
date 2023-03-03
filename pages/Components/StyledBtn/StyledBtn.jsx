import styles from './StyledBtn.module.css';
import Link from 'next/link';

export default function Home({ variant, title, action, type, page }) {
  const btnStyles = { 'pCTA': styles.pCTA, 'sCTA': styles.sCTA, 
                     'formBtn': styles.formBtn,'cancelBtn': styles.cancelBtn,'google':styles.google}
  return (
    <>{type === 'link' ?
      <Link href={page}
      >
        <button
          className={btnStyles[variant]}
          onClick={action}
        >{title}</button>
      </Link> :
      <button
        className={btnStyles[variant]}
        onClick={action}
      >{title}</button>}
    </>
  )
}