import Button from 'components/Button'
import Form from 'components/Form'
import TextField from 'components/TextField'
import { useCategoryContext } from 'contexts/Categories'
import { useState } from 'react'
import styles from './Categories.module.css'

const Categories = () => {

    const [descripton, setDescription] = useState('')
    const { categories, addCategory } = useCategoryContext()

    const saveCategory = (events) => {
        events.preventDefault()
        addCategory({ descripton })
    }

    return (
        <div>
            <Form title='Preencha os campos para criar a categoria'>
                <TextField
                    changeValue={value => setDescription(value)}
                    title='Descrição'
                    value={descripton} />
                <Button
                    title='Criar Categoria'
                    action={saveCategory}
                />
            </Form>
            <div className={styles.categoryList}>
                {categories.map((category) => {
                    return <label>{category.descripton}</label>
                })}
            </div>
        </div>
    )
}

export default Categories