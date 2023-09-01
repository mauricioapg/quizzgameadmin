import Button from 'components/Button'
import Form from 'components/Form'
import TextField from 'components/TextField'
import CustomModal from 'components/CustomModal'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import styles from './Levels.module.css'
import Header from 'components/Header'
import Cookies from 'universal-cookie'

const Levels = () => {

    const [descripton, setDescription] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const [success, setSuccess] = useState(false)

    const cookies = new Cookies()

    const navigate = useNavigate()

    const createLevel = () => {
        return fetch("http://ec2-3-142-84-224.us-east-2.compute.amazonaws.com:8080/levels", {
            method: "POST",
            headers: {
                'Authorization': cookies.get('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                desc: descripton
            })
        }).then((response) => {
            if (response.status == 201) {
                setMessageModal('Nível criado com sucesso!')
                setIsOpenModal(true)
                setSuccess(true)
            }
            else if(response.status == 403){
                navigate('/');
            }
            else {
                setMessageModal('Não foi possível criar nível!')
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
        createLevel()
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
                <Form submit={handleSubmit} title='Preencha os campos para criar o nível'>
                    <TextField
                        changeValue={value => setDescription(value)}
                        title='Descrição'
                        value={descripton} />
                    <Button title='Criar Nível' />
                    <CustomModal
                        open={isOpenModal}
                        close={handleCloseModal}
                        success={success}>
                        <h3>{messageModal}</h3>
                    </CustomModal>
                </Form>
            </div>
        </>
    )
}

export default Levels