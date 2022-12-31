import styles from './Questions.module.css'
import { useState } from 'react'
import questions from 'json/questions.json'
import QuestionCard from 'components/QuestionCard'
import TextField from 'components/TextField'
import DropDownList from 'components/DropDownList'
import TextFieldAdd from 'components/TextFieldAdd'
import Button from 'components/Button'
import categories from 'json/categories.json'
import levels from 'json/levels.json'
import Form from 'components/Form'

const Questions = () => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [level, setLevel] = useState('')
    const [alternative, setAlternative] = useState('')
    const [alternatives, setAlternatives] = useState([])

    return (
        <div>
            <Form title='Preencha os campos para criar a pergunta'>
                <TextField
                    changeValue={value => setTitle(value)}
                    title='Título'
                    value={title} />
                <DropDownList
                    value={category}
                    changeValue={value => setCategory(value)}
                    category='Categoria'
                    items={categories.map(category => category.desc)} />
                <DropDownList
                    value={level}
                    changeValue={value => setLevel(value)}
                    category='Nível'
                    items={levels.map(level => level.desc)} />
                <label>Alternativa</label>
                <TextFieldAdd
                    addAlternative={() => { }}
                    changeValue={value => setAlternative(value)}
                    value={alternative}>
                    <img src='/images/add.png' />
                </TextFieldAdd>
                <Button title='Criar Pergunta' />
            </Form>
            <div className={styles.questionList}>
                {questions.map(
                    question => <div className={styles.cards}>
                        <QuestionCard
                            key={question}
                            title={question.title}
                            alternatives={question.alternatives}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Questions