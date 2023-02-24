import styles from './CustomModal.module.css'
import Modal from 'react-modal'
import iconSuccess from 'assets/icon_success.png'
import iconError from 'assets/icon_error.png'

Modal.setAppElement('#root')

const CustomModal = ({ open, close, success, children }) => {

    return (
        <Modal 
        isOpen={open} 
        onRequestClose={close} 
        className={styles.modal}>
            <img src={success ? iconSuccess : iconError} />
            {children}
        </Modal>
    )
}

export default CustomModal