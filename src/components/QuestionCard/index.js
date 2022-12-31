import styles from './QuestionCard.module.css'

const QuestionCard = ({ title, alternatives }) => {
    return (
        <div className={styles.card}>
            <div className={styles.headerCard}>
                <h3>{title}</h3>
            </div>
            <div className={styles.alternatives}>
                {alternatives.map((alternative) => {
                    return <ul key={alternative}>
                        <li>{alternative}</li>
                    </ul>
                })}
            </div>
        </div>
    )
}

export default QuestionCard