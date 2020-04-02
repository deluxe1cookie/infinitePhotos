import React from 'react';
import style from '../style.module.css';

const PhotoColumns = (props) => {
    let numberOfColumns = 3;
    if (props.width < 1680 && props.width > 1120) {
        numberOfColumns = 2;
    } else if (props.width < 1120) {
        numberOfColumns = 1;
    }

    let photos = [];
    for (let i = 0; i < numberOfColumns; i++) {
        let n = 0;
        let photoElements = props.photos.filter(() => n++ % numberOfColumns === i).map((p) =>
            <div className={style.photo}>
                <a key={p.id} href={p.urls.raw} target='_blank' rel="noopener noreferrer">
                    <img src={p.urls.regular} alt={p.alt_description}/></a>
                <span>photo by <a href={p.user.links.html} target='_blank'
                                  rel="noopener noreferrer">{p.user.name}</a> on <a
                    href='https://unsplash.com/' target='_blank'
                    rel="noopener noreferrer">Unsplash</a></span>
            </div>
        );
        photos.push(<div className={style.photoBlock}>{photoElements}</div>);
    }

    return (
        <div className={style.photos}>
            {photos}
        </div>
    );
};

export default PhotoColumns;