import styles from './TextField.module.css'

const TextField = (props) => {

    const changeValue = (events) => {
        props.changeValue(events.target.value)
    }

    return(
        <div className={styles.textField}>
            <label>{props.title}</label>
            <input type={props.type} value={props.value} onChange={changeValue}></input>
        </div>
    )
}

export default TextField