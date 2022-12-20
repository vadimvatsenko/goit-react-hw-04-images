import React from "react";
import style from "./ImageGallery.module.scss";

export default function ImageGallery({ children }) {
    return (
        <ul className={style.ImageGallery}>
            {children}
        </ul>
    );
}