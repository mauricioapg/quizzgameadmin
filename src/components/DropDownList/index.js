import styles from './DropDownList.module.css'

const DropDownList = (props) => {

    const changeValue = (events) => {
        props.changeValue(events.target.value)
    }

    return(
        <div className={styles.dropdownList}>
            <label>{props.category}</label>
            <select value={props.value} onChange={changeValue}>
                {props.items.map(item => <option key={item}>{item}</option>)}
            </select>
        </div>
    )
}

export default DropDownList