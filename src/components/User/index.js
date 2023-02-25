import styles from './User.module.css'
import { NavLink } from 'react-router-dom'

const User = ({ image }) => {
    return (
        <NavLink
            to={'/'}>
            <img className={styles.user} src={image} />
        </NavLink>
    )
}

export default User