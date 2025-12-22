import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCard, { AdVideoContainer } from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        getVideos();
    }, [])

    const getVideos = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
        // console.log(json.items);
        setVideos(json.items || []);
    }
    return (

        <div className='flex flex-wrap cursor-pointer'>
            {videos[0] && <AdVideoContainer info={videos[0]} />}
            {videos.map((video) =>
                <Link to={"/watch?v=" + video.id} key={video.id}>
                    <VideoCard key={video.id} info={video} />
                </Link>
            )}
        </div>
    )
}

export default VideoContainer