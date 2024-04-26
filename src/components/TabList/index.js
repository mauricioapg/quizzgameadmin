import QuestionItem from 'components/QuestionItem'
import styles from './TabList.module.css'

const TabList = ({ title, show }) => {
    return (
        <div className={styles.tile} onClick={show}>
            <ul>
                <li>
                    {title}
                </li>
            </ul>
        </div>
    )
}

export default TabList