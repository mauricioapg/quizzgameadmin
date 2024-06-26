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
import TabList from 'components/TabList'

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
    const [showQuestionList, setShowQuestionList] = useState(false)
    const [titleTabList, setTitleTabList] = useState('')
    const [questionSelected, setQuestionSelected] = useState('')

    const cookies = new Cookies()

    const navigate = useNavigate()

    useEffect(() => {
        getCategories()
        getLevels()
        getQuestions()
        handleSetVisibility()
        setSizeElements()
    }, [])

    const getQuestions = () => {
        axios
            .get(`http://localhost:8080/questions`, {
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
            .get(`http://localhost:8080/categories`, {
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
            .get(`http://localhost:8080/levels`, {
                headers: {
                    'Authorization': cookies.get('token')
                }
            })
            .then((response) => {
                setLevels(response.data)
            })
    }

    const removeQuestion = (idQuestion) => {
        fetch(`http://localhost:8080/questions/id/${idQuestion}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.get('token')
            }
        }).then((response) => {
            getQuestions()
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
                category: category == '' ? categories[0].idCategory : category,
                level: level == '' ? levels[0].desc : level,
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
        if(showQuestionList == true){
            setVisibility('list-item')
            setTitleTabList('Ocultar perguntas')
        }
        else{
            setVisibility('none')
            setTitleTabList('Exibir perguntas')
        }
    }

    const handleShowQuestionList = () => {
        setShowQuestionList(!showQuestionList)
        handleSetVisibility()
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

    const setSizeElements = () => {
        document.body.style.setProperty('--largura', '55%');
        document.body.style.setProperty('--esquerda', '22%');
        document.body.style.setProperty('--largura-card', '55%');
        document.body.style.setProperty('--esquerda-card', '0%');
    }

    const remove = (e, idQuestion) => {
        e.preventDefault();
        removeQuestion(idQuestion)
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

                <TabList title={titleTabList} show={handleShowQuestionList} />

                <div className={styles.questionList}>
                    {questions.map(question =>
                        <QuestionCard
                            title={question.title}
                            visibility={visibility}
                            image='/images/lixeira.png'
                            remove={(e) => remove(e, question.idQuestion)}
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