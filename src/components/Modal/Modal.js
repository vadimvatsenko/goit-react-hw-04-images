
import React, { Component } from "react";
import { createPortal } from "react-dom";
import style from './Modal.module.scss'

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {


    
    componentDidMount() {
        // console.log('componentDidMount');
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount');
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');

      this.props.onClose();
    }
    };
    
    handleBackdropClick = e => {
        console.log('click backdrop');
        // если текущий клик и целевой клик равны вызвать зактытие модалки
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }


    render() {
    const {imageModal} = this.props
    return createPortal(
        
        <div className={style.overlay} onClick={this.handleBackdropClick}>
            <img className={style.modal} src={imageModal.src} alt={imageModal.alt} />
            {/* <div className={style.modal}>{this.props.children}</div> */}
           
        </div>,
        modalRoot,
    );
    }
    
}


