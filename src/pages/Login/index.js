import Button from 'components/Button'
import CustomModal from 'components/CustomModal'
import Form from 'components/Form'
import TextField from 'components/TextField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import styles from './Login.module.css'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const cookies = new Cookies()

    const credentialsLogin = {
        username: username,
        password: password
    }

    const login = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(credentialsLogin)
        })
            .then(response => {
                if (response.status == 200) {
                    response.json().then(json => {
                        var formattedToken = JSON.stringify(json).substring(10, JSON.stringify(json).length - 2)
                        cookies.set('token', `Bearer ${formattedToken}`)
                        getUser(`Bearer ${formattedToken}`, username)
                    })
                    navigate('/home');
                } else {
                    setMessageModal('Não foi possível efetuar login!')
                    setIsOpenModal(true)
                    setSuccess(false)
                }
            })
    }

    const getUser = (token, email) => {
        fetch('http://localhost:8080/users/email/' + email, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                if (response.status == 200) {
                    response.json().then(json => {
                        console.log('USUÁRIO LOGADO LOGIN: ' +  JSON.stringify(json.name))
                        cookies.set('userLogged', JSON.stringify(json.name))
                    })
                } else {
                    console.log('ERRO AO OBTER USUÁRIO')
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login()
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    return (
        <>
            <Form submit={handleSubmit}>
                <TextField
                    changeValue={value => setUsername(value)}
                    title='Nome de usuário'
                    value={username} />
                <TextField
                    changeValue={value => setPassword(value)}
                    title='Senha'
                    value={password} />
                <Button
                    title='Login'
                />
            </Form>
            <CustomModal
                open={isOpenModal}
                close={handleCloseModal}
                success={success}>
                <h3>{messageModal}</h3>
            </CustomModal>
        </>
    )
}

export default Login