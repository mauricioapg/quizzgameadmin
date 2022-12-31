import { useState } from 'react'
import styles from './TextFieldAdd.module.css'

const TextFieldAdd = (props) => {

    const [alternatives, setAlternatives] = useState([])

    const changeValue = (events) => {
        props.changeValue(events.target.value)
    }

    const addAlternative = (events) => {
        events.preventDefault()
        setAlternatives([...alternatives, events.target.value])
        console.log('Alternativa: ' + alternatives)
    }

    return(
        <div className={styles.textFieldAdd}>
            <input value={props.value} onChange={changeValue} className='input'></input>
            <button>
                {props.children}
            </button>
        </div>
    )
}

export default TextFieldAdd