import Button from 'components/Button'
import Form from 'components/Form'
import CustomModal from 'components/CustomModal'
import TextField from 'components/TextField'
import { useCategoryContext } from 'contexts/Categories'
import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import styles from './Categories.module.css'
import Header from 'components/Header'
import Cookies from 'universal-cookie'

const Categories = () => {

    const [descripton, setDescription] = useState('')
    const { categories, addCategory } = useCategoryContext()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const [success, setSuccess] = useState(false)

    const cookies = new Cookies()

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

    return (
        <>
            <Routes>
                <Route path='*' element={<Header />} />
            </Routes>
            <div>
                <Form submit={handleSubmit} title='Preencha os campos para criar a categoria'>
                    <TextField
                        changeValue={value => setDescription(value)}
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
                {/* <div className={styles.categoryList}>
                {categories.map((category) => {
                    return <label>{category.descripton}</label>
                })}
            </div> */}
            </div>
        </>
    )
}

export default Categories