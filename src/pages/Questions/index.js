import styles from './Questions.module.css'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import QuestionCard from 'components/QuestionCard'
import TextField from 'components/TextField'
import CustomModal from 'components/CustomModal'
import DropDownList from 'components/DropDownList'
import Button from 'components/Button'
import Form from 'components/Form'
import Header from 'components/Header'
import Cookies from 'universal-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

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

    const [visibility, setVisibility] = useState('list-item')

    const cookies = new Cookies()

    const navigate = useNavigate()

    useEffect(() => {
        getCategories()
        getLevels()
        getQuestions()
    }, [])

    const getQuestions = () => {
        axios
            .get(`http://ec2-3-23-166-69.us-east-2.compute.amazonaws.com:8080/questions`, {
                headers: {
                    'Authorization': cookies.get('token')
                }
            })
            .then((response) => {
                setQuestions(response.data)
            })
    }

    const getCategories = () => {
        axios
            .get(`http://ec2-3-23-166-69.us-east-2.compute.amazonaws.com:8080/categories`, {
                headers: {
                    'Authorization': cookies.get('token')
                }
            })
            .then((response) => {
                setCategories(response.data)
            })
    }

    const getLevels = () => {
        axios
            .get(`http://ec2-3-23-166-69.us-east-2.compute.amazonaws.com:8080/levels`, {
                headers: {
                    'Authorization': cookies.get('token')
                }
            })
            .then((response) => {
                setLevels(response.data)
            })
    }

    const createQuestion = () => {
        return fetch("http://ec2-3-23-166-69.us-east-2.compute.amazonaws.com:8080/questions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.get('token')
            },
            body: JSON.stringify({
                title: title,
                category: category,
                level: level,
                alternatives: alternatives,
                answer: answer,
            })
        }).then((response) => {
            if (response.status == 201) {
                setMessageModal('Pergunta criada com sucesso!')
                setIsOpenModal(true)
                setSuccess(true)
                getQuestions()
                cleanFields()
            }
            else if (response.status == 403) {
                navigate('/');
            }
            else {
                setMessageModal('Não foi possível criar pergunta!')
                setIsOpenModal(true)
                setSuccess(false)
            }
            return response.json();
        }).then(data => {
            console.log(data)
        })
    }

    const handleSetVisibility = (e) => {
        e.preventDefault();
        visibility == 'list-item' ? setVisibility('none') : setVisibility('list-item')
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

    const addQuestion = (event) => {
        event.preventDefault()
        if (alternative != "" && alternatives.length < 4) {
            alternatives.push(alternative)
        }
        alternative = setAlternative('')
    }

    const cleanFields = () => {
        setTitle("")
        setAnswer("")
        alternatives.length = 0
    }

    return (
        <>
            <Routes>
                <Route path='*' element={<Header />} />
            </Routes>
            <div>
                <Form title='Preencha os campos para criar a pergunta'>
                    <TextField
                        changeValue={value => setTitle(value)}
                        type='text'
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
                    <div className={styles.textFieldAdd}>
                        <input
                            value={alternative}
                            onChange={alternative => setAlternative(alternative.target.value)}
                        ></input>
                        <button onClick={addQuestion}><img src='/images/add.png' /></button>
                    </div>
                    <div className={styles.alternatives}>
                        <ol>
                            {alternatives.map(alternative => <li>{alternative}</li>)}
                        </ol>
                    </div>
                    <TextField
                        changeValue={value => setAnswer(value)}
                        type='text'
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
                    {questions.map(question =>
                        <QuestionCard
                            title={question.title}
                            visibility={visibility}
                            show={handleSetVisibility}
                        />)}
                </div>
                {/* <div className={styles.questionList}>
                    {questions.map(
                        question => <div className={styles.cards}>
                            <QuestionCard
                                key={question}
                                title={question.title}
                                alternatives={question.alternatives}
                            />
                        </div>
                    )}
                </div> */}
            </div>
        </>
    )
}

export default Questions