import styles from './Form.module.css'

const Form = ({ children, title }) => {

    return (
        <section className={styles.form}>
            <form>
                <h4>{title}</h4>
                {children}
            </form>
        </section>
    )
}

export default Form