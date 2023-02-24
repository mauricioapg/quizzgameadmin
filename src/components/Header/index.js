import Logo from 'components/Logo'
import Menu from '../Menu'
import styles from './Header.module.css'
import logo from 'assets/logo.png'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Header = () => {

    var userLogged = cookies.get('userLogged')

    return (
        <div className={styles.header}>
            <Logo image={logo} />
            <Menu />
            <label>{`Olá, ${userLogged.split(' ')[0]}!`}</label>
        </div>
    )
}

export default Header