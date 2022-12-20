import React from "react";
import style from '../Searchbar/Searchbar.module.scss';
import PropTypes from 'prop-types';

//allyProps - это передача aria-label

export default function SearchFormButton({children, ...allyProps }) {
    return (
        
        <button type="submit" className={style.searchFormButton} {...allyProps}> 
        {children}
        <span className={style.searchFormButtonLabel}>Search</span>
        </button>
    );
}


SearchFormButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
};

