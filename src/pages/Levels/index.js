import Button from 'components/Button'
import Form from 'components/Form'
import TextField from 'components/TextField'
import { useState } from 'react'
import styles from './Levels.module.css'

const Levels = () => {

    const [descripton, setDescription] = useState('')

    return (
        <div>
            <Form title='Preencha os campos para criar o nível'>
                <TextField
                    changeValue={value => setDescription(value)}
                    title='Descrição'
                    value={descripton} />
                    <Button title='Criar Nível' />
            </Form>
        </div>
    )
}

export default Levels