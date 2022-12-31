import MenuLink from '../MenuLink'
import styles from './Menu.module.css'

const Menu = () => {
    return (
        <nav className={styles.nav}>
            <MenuLink path='/'>Início</MenuLink>
            <MenuLink path='/questions'>Perguntas</MenuLink>
            <MenuLink path='/categories'>Categorias</MenuLink>
            <MenuLink path='/levels'>Níveis</MenuLink>
        </nav>
    )
}

export default Menu