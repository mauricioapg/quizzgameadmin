import Logo from 'components/Logo'
import User from 'components/User'
import styles from './Header.module.css'
import logo from 'assets/logo.png'
import user from 'assets/icon_user.png'
import Cookies from 'universal-cookie'
import MenuLink from '../MenuLink'

const cookies = new Cookies()

const Header = () => {

    var userLogged = cookies.get('userLogged')

    return (
        <div className={styles.header}>
            <Logo image={logo} />
            <ul>
                <MenuLink path='/home'>Início</MenuLink>
                <MenuLink path='/questions'>Perguntas</MenuLink>
                <MenuLink path='/categories'>Categorias</MenuLink>
                <MenuLink path='/levels'>Níveis</MenuLink>
            </ul>
            <div className={styles.user}>
                <label>{`Olá, ${userLogged.split(' ')[0]}!`}</label>
                <User image={user} />
            </div>
        </div>
    )

}

export default Header