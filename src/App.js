import React, {useEffect, useState} from 'react';
import './App.css';
import style from './style.module.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import PhotoColumns from './components/PhotoColumns';
import Loader from './components/Loader';
import ending from './sticker.webp';

function App() {
    const accessKey = process.env.ACCESS_KEY;

    let [photos, setPhotos] = useState([]);
    let [page, setPage] = useState(1);

    const getWindowDimensions = () => {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    };

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchImages = () => {
        setPage(page + 1);
        axios.get(`https://api.unsplash.com/photos/?client_id=${accessKey}`, {params: {page}}).then((res) => {
            setPhotos([...photos, ...res.data]);
        });
    };

    useEffect(() => {
        fetchImages();
    }, []);

    //console.log(photos);
    return (
        <div className={style.app}>
            {(photos.length === 0)
                ? <Loader/>
                : <InfiniteScroll
                    dataLength={photos.length} //This is important field to render the next data
                    next={fetchImages}
                    hasMore={photos.length < 500}
                    loader={Loader}
                    endMessage={
                        <img src={ending} alt='end of pictures'/>
                    }
                    scrollThreshold={0.65}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>

                    <PhotoColumns width={windowDimensions.width} photos={photos}/>
                </InfiniteScroll>}

        </div>
    );
}

export default App;