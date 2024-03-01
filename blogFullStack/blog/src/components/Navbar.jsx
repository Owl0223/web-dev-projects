import React from "react";
import styles from "../styleModules/Navbar.module.css"
import instagram from "../assets/icons8-instagram.svg"
import facebook from "../assets/icons8-facebook.svg"
import pinterest from "../assets/icons8-pinterest.svg"
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul id={styles.navLinks}>
        <li>
            <Link to="/" className={styles.navlink}>HOME</Link>
        </li>
        <li>
            <Link to="/blogs" className={styles.navlink}>BLOGS</Link>
        </li>
        <li>
            <Link to="/about" className={styles.navlink}>ABOUT</Link>
        </li>
        <li>
            <Link to="/newsletter" className={styles.navlink}>NEWSLETTER</Link>
        </li>
      </ul>
      <ul id={styles.navLogos}>
        <li>
            <Link to={'/'}><img src={instagram} alt="" /></Link>
        </li>
        <li>
            <Link to={'/'}><img src={facebook} alt="" /></Link>
        </li>
        <li>
            <Link to={'/'}><img src={pinterest} alt="" /></Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
