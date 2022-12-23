
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import style from './Modal.module.scss'

const modalRoot = document.querySelector('#modal-root');

const Modal = ({onClose, imageModal}) => {

    useEffect(() => {

    const handleKeyDown = e => {
    if (e.code === 'Escape') {
        onClose();
        }
    };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
        document.removeEventListener("keydown", handleKeyDown);
    };
    },[onClose])
    
    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }


    return createPortal(
        <div className={style.overlay} onClick={handleBackdropClick}>
            <img className={style.modal} src={imageModal.src} alt={imageModal.alt} />
        </div>,
        modalRoot,
    );
}
    
export { Modal };
    
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    imageModal: PropTypes.object.isRequired
}
    



