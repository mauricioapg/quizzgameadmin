import styles from './Logo.module.css'

const Logo = ({ image }) => {
    return(
        <img className={styles.logo} src={image} />
    )
}

export default Logo