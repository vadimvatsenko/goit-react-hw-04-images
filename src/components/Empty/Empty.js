// DONE
import React from "react";
import EpmtyImg from '../../img/Empty.webp'

export default function Empty() {
    return (
        <div role='img'>
            <img style={{
                margin: '0 auto',
                marginTop: '20px',
                padding: "12px 16px",
                borderRadius: 10,
                backgroundColor: "gray",
    
            }}
                src={EpmtyImg} width='400' alt='empty' />
        </div>
    )
}