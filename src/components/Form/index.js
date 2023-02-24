import styles from './Form.module.css'

const Form = ({ children, title, submit }) => {

    return (
        <section className={styles.form}>
            <form onSubmit={submit}>
                <h4>{title}</h4>
                {children}
            </form>
        </section>
    )
}

export default Form