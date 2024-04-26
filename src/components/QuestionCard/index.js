import QuestionItem from 'components/QuestionItem'
import styles from './QuestionCard.module.css'

const QuestionCard = ({ title, show, visibility, image, remove, questions }) => {

    return (
        <>
            <div style={{display: visibility, listStyleType: 'none'}} className={styles.tile} onClick={show}>
                <ul>
                    <li>
                        {title}
                    </li>
                    {/* <QuestionItem visibility={visibility} questions={questions} /> */}
                </ul>
                <img src={image} width='30px' height='30px' className={styles.image} onClick={remove} />
            </div>
        </>
    )
}

export default QuestionCard