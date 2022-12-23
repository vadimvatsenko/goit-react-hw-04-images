import style from '../Searchbar/Searchbar.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";

const Searchbar = ({onSubmit, children}) => {
    const [imgName, setImgName] = useState('')

    const handleChangeName = e => {
        setImgName(e.currentTarget.value.toLowerCase())
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(imgName);
        //проп с APP в него передаем значение submit
        setImgName('')
        //очистка после submit
        
    };

    return (
        <header className={style.searchbar}>
            <form
                className={style.searchForm}
                onSubmit={handleSubmit}>

                {children}

                <input
                    className={style.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChangeName}
                    value={imgName}
                />
            </form>
        </header>
    );

}

export { Searchbar };
    
    Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}






