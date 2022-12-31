import styles from './Button.module.css'

const Button = ({ title, action }) => {
    return(
        <div className={styles.button}>
            <button onClick={action}>{title}</button>
        </div>
    )
}

export default Button