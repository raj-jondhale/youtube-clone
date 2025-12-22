import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const searchQuery = searchParams.get('search_query');

    useEffect(() => {
        if (searchQuery) {
            getSearchResults();
        }
    }, [searchQuery]);

    const getSearchResults = async () => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&type=video&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
            );
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                // Get video IDs to fetch statistics
                const videoIds = data.items.map(item => item.id.videoId).join(',');

                // Fetch video statistics
                const statsResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                );
                const statsData = await statsResponse.json();

                // Merge search results with statistics
                const transformedVideos = data.items.map(item => {
                    const stats = statsData.items?.find(stat => stat.id === item.id.videoId);
                    return {
                        id: item.id.videoId,
                        snippet: {
                            channelTitle: item.snippet.channelTitle,
                            title: item.snippet.title,
                            thumbnails: item.snippet.thumbnails,
                            description: item.snippet.description,
                            publishedAt: item.snippet.publishedAt,
                            channelId: item.snippet.channelId
                        },
                        statistics: stats?.statistics || {}
                    };
                });

                setVideos(transformedVideos);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const formatViewCount = (count) => {
        if (!count) return 'No views';
        const num = parseInt(count);
        if (num >= 10000000) return `${(num / 10000000).toFixed(1)} crore views`;
        if (num >= 100000) return `${(num / 100000).toFixed(1)} lakh views`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
        return `${num} views`;
    };

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);

        if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
        if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return 'Today';
    };

    if (!searchQuery) {
        return <div className='w-full p-5 text-center text-gray-500'>Enter a search query</div>;
    }

    return (
        <div className='w-full p-5 max-w-7xl'>
            {videos.length === 0 ? (
                <div className='text-center text-gray-500 mt-10'>No results found</div>
            ) : (
                <div className='flex flex-col gap-4'>
                    {videos.map((video) => (
                        <Link
                            to={"/watch?v=" + video.id}
                            key={video.id}
                            className='flex gap-4 hover:bg-gray-50 rounded-lg transition-colors'
                        >
                            <div className='relative shrink-0'>
                                <img
                                    className='w-96 h-56 rounded-xl object-cover'
                                    src={video.snippet.thumbnails.medium.url}
                                    alt={video.snippet.title}
                                />
                            </div>
                            <div className='flex-1 min-w-0 py-1'>
                                <h3 className='font-normal text-xl line-clamp-2 mb-1 text-gray-900'>
                                    {video.snippet.title}
                                </h3>
                                <p className='text-sm text-gray-600 mb-3'>
                                    {formatViewCount(video.statistics.viewCount)} • {getTimeAgo(video.snippet.publishedAt)}
                                </p>
                                <div className='flex items-center gap-3 mb-3'>
                                    <div className='w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center'>
                                        <i className="fa-solid fa-user text-xs text-gray-600"></i>
                                    </div>
                                    <p className='text-sm text-gray-600'>
                                        {video.snippet.channelTitle}
                                    </p>
                                </div>
                                <p className='text-sm text-gray-600 line-clamp-2'>
                                    {video.snippet.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
