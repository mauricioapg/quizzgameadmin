import QuestionItem from 'components/QuestionItem'
import styles from './QuestionCard.module.css'

const QuestionCard = ({ title, show, visibility, questions }) => {
    return (
        <div className={styles.tile} onClick={show}>
            <ul>
                <li>
                    {title}
                </li>
                {/* <QuestionItem visibility={visibility} questions={questions} /> */}
            </ul>
        </div>
    )
}

export default QuestionCard