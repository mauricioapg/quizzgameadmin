import { useState } from 'react'
import styles from './TextFieldAdd.module.css'

const TextFieldAdd = (props, action) => {

    const [alternatives, setAlternatives] = useState([])

    const changeValue = (events) => {
        props.changeValue(events.target.value)
    }

    const addAlternative = (events) => {
        events.preventDefault()
        setAlternatives([...alternatives, events.target.value])
    }

    return(
        <div className={styles.textFieldAdd}>
            <input value={props.value} onChange={changeValue} className='input'></input>
            <button onClick={action}>
                {props.children}
            </button>
        </div>
    )
}

export default TextFieldAdd