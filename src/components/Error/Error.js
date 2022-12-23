// DONE
import React from "react";
import PropTypes from 'prop-types';
import ErrorImg from '../../img/404.svg'


export default function Error({ error }) {
   
    return (
        <div role='alert'>
            <img style={{
                margin: '0 auto',
                marginTop: '20px',
                padding: "12px 16px",
                borderRadius: 10,
                backgroundColor: "gray",
    
            }}
                src={ErrorImg} width='400' alt={error} />
        </div>
    )
}

Error.propTypes = {
    error: PropTypes.string.isRequired
}

