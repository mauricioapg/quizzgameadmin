import styles from './Home.module.css'
import { Route, Routes } from "react-router-dom"
import Header from 'components/Header'
import Cookies from 'universal-cookie'

const Home = () => {

    const cookies = new Cookies()

    return (
        <>
            <Routes>
                <Route path='*' element={<Header />} />
            </Routes>
            <div>Home...{cookies.get('token')}</div>
        </>
    )
}

export default Home