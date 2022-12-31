import Logo from 'components/Logo'
import Menu from '../Menu'
import styles from './Header.module.css'
import logo from 'assets/logo.png'

const Header = () => {
    return (
        <div className={styles.header}>
            <Logo image={logo} />
            <Menu />
            <label>Usuário logado</label>
        </div>
    )
}

export default Header