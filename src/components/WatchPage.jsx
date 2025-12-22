import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsConatainer from './CommentsConatainer';

const WatchPage = () => {

    let [searchParams] = useSearchParams();
    const [videoInfo, setVideoInfo] = useState(null);

    // console.log(searchParams.get("v"));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu());
        getVideoInfo();
    }, [])

    const getVideoInfo = async () => {
        const videoId = searchParams.get("v");
        const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
        const data = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${API_KEY}`);
        const json = await data.json();
        setVideoInfo(json.items[0]);
        // console.log(json.items[0]);
    }
    return (
        <div className='flex flex-col'>
            <div className='ml-24 mt-6'>
                <iframe
                    className=' rounded-lg shadow-lg'
                    width="840"
                    height="460"
                    src={"https://www.youtube.com/embed/" + searchParams.get("v")}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>

                {/* Channel Info Section */}
                {videoInfo && (
                    <div className='mt-4 w-210'>
                        {/* Video Title */}
                        <h1 className='text-xl font-semibold mb-3'>{videoInfo.snippet.title}</h1>

                        {/* Channel Info & Actions */}
                        <div className='flex items-center justify-between'>
                            {/* Left: Channel Info */}
                            <div className='flex items-center gap-3'>
                                {/* Channel Logo */}
                                <img
                                    className='w-10 h-10 rounded-full'
                                    src={videoInfo.snippet.thumbnails.default.url}
                                    alt="Channel Logo"
                                />

                                {/* Channel Name & Subscribers */}
                                <div>
                                    <h2 className='font-semibold text-sm'>{videoInfo.snippet.channelTitle}</h2>
                                    <p className='text-xs text-gray-600'>
                                        {parseInt(videoInfo.statistics.viewCount).toLocaleString()} views
                                    </p>
                                </div>

                                {/* Subscribe & Join Buttons */}
                                <button className='bg-black text-white px-4 py-2 rounded-full font-medium ml-4 hover:bg-gray-800'>
                                    Subscribe
                                </button>
                                <button className='bg-gray-100 text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200'>
                                    Join
                                </button>
                            </div>

                            {/* Right: Action Buttons */}
                            <div className='flex items-center gap-2'>
                                <button className='bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 flex items-center gap-2'>
                                    <span><i className="fa-regular fa-thumbs-up"></i></span> {parseInt(videoInfo.statistics.likeCount).toLocaleString()}
                                </button>
                                <button className='bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 flex items-center gap-2'>
                                    <span><i className="fa-regular fa-thumbs-down"></i></span>
                                </button>
                                <button className='bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200'>
                                    <i className="fa-solid fa-share"></i>Share
                                </button>
                                <button className='bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200'>
                                    ⋯
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <CommentsConatainer />
        </div>
    )
}

export default WatchPage