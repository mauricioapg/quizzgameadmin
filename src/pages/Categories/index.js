import Button from 'components/Button'
import Form from 'components/Form'
import CustomModal from 'components/CustomModal'
import TextField from 'components/TextField'
import { useCategoryContext } from 'contexts/Categories'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Route, Routes } from "react-router-dom"
import styles from './Categories.module.css'
import Header from 'components/Header'
import Cookies from 'universal-cookie'
import TabList from 'components/TabList'
import QuestionCard from 'components/QuestionCard'
import axios from 'axios';

const Categories = () => {

    const [descripton, setDescription] = useState('')
    const { categories, addCategory } = useCategoryContext()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const [success, setSuccess] = useState(false)
    const [categoriesList, setCategories] = useState([])

    const [visibility, setVisibility] = useState('list-item')
    const [showQuestionList, setShowQuestionList] = useState(false)
    const [titleTabList, setTitleTabList] = useState('')

    const navigate = useNavigate()

    const cookies = new Cookies()

    useEffect(() => {
        getCategories()
        handleSetVisibility()
        setSizeElements()
    }, [])

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

    const removeCategory = (idCategory) => {
        fetch(`http://localhost:8080/categories/id/${idCategory}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.get('token')
            }
        }).then((response) => {
            getCategories()
        })
    }

    const createCategory = () => {
        return fetch("http://localhost:8080/categories", {
            method: "POST",
            headers: {
                'Authorization': cookies.get('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                desc: descripton
            })
        }).then((response) => {
            if (response.status == 201) {
                setMessageModal('Categoria criada com sucesso!')
                setIsOpenModal(true)
                setSuccess(true)
                setDescription('')
            }
            else if(response.status == 403){
                navigate('/');
            }
            else {
                setMessageModal('Não foi possível criar categoria!')
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
        createCategory()
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    const handleSetVisibility = (e) => {
        if(showQuestionList == true){
            setVisibility('list-item')
            setTitleTabList('Ocultar categorias')
        }
        else{
            setVisibility('none')
            setTitleTabList('Exibir categorias')
        }
    }

    const handleShowQuestionList = () => {
        setShowQuestionList(!showQuestionList)
        handleSetVisibility()
    }

    const remove = (e, idCategory) => {
        e.preventDefault();
        removeCategory(idCategory)
    }

    const setSizeElements = () => {
        document.body.style.setProperty('--largura', '30%');
        document.body.style.setProperty('--esquerda', '35%');
        document.body.style.setProperty('--largura-card', '30%');
        document.body.style.setProperty('--esquerda-card', '35%');
    }

    return (
        <>
            <Routes>
                <Route path='*' element={<Header />} />
            </Routes>
            <div>
                <Form submit={handleSubmit} title='Preencha os campos para criar a categoria'>
                    <TextField
                        changeValue={value => setDescription(value)}
                        type='text'
                        title='Descrição'
                        value={descripton} />
                    <Button
                        title='Criar Categoria'
                    />
                </Form>

                <CustomModal
                    open={isOpenModal}
                    close={handleCloseModal}
                    success={success}>
                    <h3>{messageModal}</h3>
                </CustomModal>

                <TabList title={titleTabList} show={handleShowQuestionList} />
                <br />

                <div className={styles.categories}>
                    {categoriesList.map(category =>
                        <QuestionCard
                            title={category.desc}
                            visibility={visibility}
                            image='/images/lixeira.png'
                            remove={(e) => remove(e, category.idCategory)}
                        />)}
                </div>
            </div>
        </>
    )
}

export default Categories