// Done
import React from "react";
import style from "./Button.module.scss";
import PropTypes from 'prop-types';


export default function ButtonLoadMore({ onClick }) {
    return (
        <>
            <button
                className={style.button}
                type='button'
                onClick={onClick}
            >Load More</button>
        </>
    )
}

ButtonLoadMore.propTypes = {
    onClick: PropTypes.func.isRequired
}

