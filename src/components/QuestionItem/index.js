import styles from './QuestionItem.module.css'

const QuestionItem = ({ title, visibility, questions }) => {
    return (
        <ul>
            {questions.map(question => <li style={{ display: visibility }}>{question}</li>)}
        </ul>
    )
}

export default QuestionItem