import React from "react";

const VideoCard = ({ info }) => {
    if (!info) return null;

    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails } = snippet;

    return (
        <div className="p-2 m-2 h-80 w-68 shadow-lg hover:bg-gray-200">
            <img
                className="rounded-lg"
                alt="thumbnail"
                src={thumbnails?.medium?.url}
            />

            <ul className="mt-2">
                <li className="font-bold">{title}</li>
                <li className="text-gray-600">{channelTitle}</li>
                {statistics?.viewCount && (
                    <li className="text-gray-600">
                        {statistics.viewCount} views
                    </li>
                )}
            </ul>
        </div>
    );
};

// Higher-Order Component for Ad Video
export const AdVideoContainer = ({ info }) => {
    // enhancedcomponent
    return (
        <div className="border border-red-900 p-2">
            {/* existing component */}
            <VideoCard info={info} />
            <p className="text-red-600 font-bold text-sm pl-2">Sponsored Ad</p>
        </div>
    );
};
export default VideoCard;
