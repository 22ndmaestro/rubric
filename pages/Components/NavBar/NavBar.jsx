import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { navLinks,secureLinks } from "../../constants";
import logo from '../../../public/logo.png';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext'


const Navbar = () => {
  //get current user:
  const { currentUser } = useAuth();

  
  const [showLinks, setshowLinks] = useState(false);
  const handleClick = () => {
    setshowLinks((showLinks) => !showLinks);
  };
  const logoClick = () => {
    setshowLinks((showLinks) => {
      if (showLinks) {
        return (showLinks = !showLinks);
      }
    });
  };
  return (
    <>
      <div className={styles.navWrapper}>
        <nav className={styles.navbar}>
          <div className={styles.logoDiv}>
            <Link 
              href={!currentUser?"/":"quizzes"}>
              <Image
                className={styles.logo}
                src={logo}
                alt="Picture of the author"
                width={20}
                height={5}
                onClick={logoClick}
              />
            </Link>
            <div className={styles.navMenu} id={showLinks ? "" : styles.hidden}>
              <ul className={styles.navlinks}>
                {(currentUser? secureLinks : navLinks).map((nav, index) => (
                  <CustomLink key={index} to={nav.id} onClick={handleClick}>
                    {nav.title}
                  </CustomLink>
                ))}
              </ul>
            </div>
            <div className={styles.smallMenu}>
              <button
                className={[styles.hamburger,styles.menu]}
                id={showLinks ? styles.hidden : ""}
                onClick={handleClick}
              >
                ☰
              </button>
              <button
                className={[styles.close,styles.menu]}
                onClick={handleClick}
                id={showLinks ? "" : styles.hidden}
              >
                ✕
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

function CustomLink({ to, children, ...props }) {
  const asPath = useRouter().pathname;
  const isActive = asPath === to;

  return (
    <Link href={`${to}`} {...props} className={styles.link}>
      <li key={to} className={isActive ? styles.active : ""}>
        {children}
      </li>
    </Link>
  );
}

export default Navbar;
