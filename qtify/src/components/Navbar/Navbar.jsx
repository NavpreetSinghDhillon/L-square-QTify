import React from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Button from "../Button/Button";
import styles from "./Navbar.module.css"

function Navbar() {
    return(
        <nav className={styles.navbar}>
            <a href="/">
            <Logo/>
            </a>
            <Search placeholder="Search a album of your choice"/>
            <Button>Give Feedback</Button>
        </nav>
    )
}

export default Navbar;