import styles from './Questions.module.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import QuestionCard from 'components/QuestionCard'
import TextField from 'components/TextField'
import CustomModal from 'components/CustomModal'
import DropDownList from 'components/DropDownList'
import TextFieldAdd from 'components/TextFieldAdd'
import Button from 'components/Button'
import Form from 'components/Form'
import Header from 'components/Header'
import Cookies from 'universal-cookie'

const Questions = () => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [level, setLevel] = useState('')
    const [alternative, setAlternative] = useState('')
    const [alternatives, setAlternatives] = useState([])
    const [answer, setAnswer] = useState([])

    const [questions, setQuestions] = useState([])
    const [categories, setCategories] = useState([])
    const [levels, setLevels] = useState([])

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const [success, setSuccess] = useState(false)

    const cookies = new Cookies()

    useEffect(() => {
        getCategories()
        getLevels()
        getQuestions()
    })

    const getQuestions = () => {
        fetch('http://localhost:8080/questions', {
            method: 'GET',
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                setQuestions(data)
            })
    }

    const getCategories = () => {
        fetch('http://localhost:8080/categories', {
            method: 'GET',
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
    }

    const getLevels = () => {
        fetch('http://localhost:8080/levels', {
            method: 'GET',
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                setLevels(data)
            })
    }

    const createQuestion = () => {
        return fetch("http://localhost:8080/questions", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': cookies.get('token')
             },
            body: JSON.stringify({
                title: title,
                idCategory: category,
                idLevel: level,
                alternatives: alternatives,
                answer: answer,
            })
        }).then((response) => {
            if(response.status == 201){
                setMessageModal('Pergunta criada com sucesso!')
                setIsOpenModal(true)
                setSuccess(true)
                getQuestions()
            }
            else{
                setMessageModal('Não foi possível criar pergunta!')
                setIsOpenModal(true)
                setSuccess(false)
            }
            return response.json();
        }).then(data => {
            console.log(data)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createQuestion()
    }

    const handleKeyDown = (event) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            console.log(event.key)
        }
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    return (
        <>
            <Routes>
                <Route path='*' element={<Header />}/>
            </Routes>
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
                    changeValue={value => setAlternative(value)}
                    value={alternative}>
                    <img src='/images/add.png' />
                </TextFieldAdd>
                <div>
                    {alternatives.map(alternative => <label>{alternative}</label>)}
                </div>
                <TextField
                    changeValue={value => setAnswer(value)}
                    title='Resposta'
                    value={answer} />
                <Button action={handleSubmit} title='Criar Pergunta' />
            </Form>
            <CustomModal 
            open={isOpenModal} 
            close={handleCloseModal}
            success={success}>
                <h3>{messageModal}</h3>
            </CustomModal>
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
        </>
    )
}

export default Questions