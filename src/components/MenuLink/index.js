import { NavLink } from 'react-router-dom'
import styles from './MenuLink.module.css'

const MenuLink = ({ children, path }) => {
    return(
        <NavLink
            className={styles.nav}
            to={path}>
            {children}
        </NavLink>
    )
}

export default MenuLink