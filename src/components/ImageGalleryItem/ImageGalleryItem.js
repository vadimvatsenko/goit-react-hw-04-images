//DONE
import React from "react";
import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.scss';


export default function ImageGalleryItem({ imageList, onClick }) {
    return (
        <>
            
            {imageList.map(({ id, webformatURL, tags, largeImageURL }) => (
                <li
                    key={id}
                    className={style.ImageGalleryItem}>
                    <img
                        className={style.ImageGalleryItemImage}
                        src={webformatURL}
                        alt={tags}
                        data-src={largeImageURL}
                        onClick={onClick}
                   

                   
                    />
           
                </li>
           
            ))}
        </>
        

    );
}

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    imageList: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
        largeImageURL: PropTypes.string,
      
    }).isRequired
  ),
};





