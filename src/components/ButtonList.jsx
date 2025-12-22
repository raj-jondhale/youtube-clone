import React from 'react';
import Button from './Button';

const ButtonList = () => {
    const list = [
        "All",
        "Gaming",
        "Songs",
        "Cricket",
        "Cooking",
        "Music",
        "Movies",
        "Live",
        "News",
        "Technology",
        "Education",
        "Comedy",
        "Vlogs",
        "Travel",
        "Fitness",
        "Fashion",
        "Podcasts",
        "Motivation"
    ];

    return (
        <div className="flex flex-row overflow-x-scroll no-scrollbar  w-full ">
            {list.map((item) => (
                <Button key={item} name={item} />
            ))}
        </div>
    );
};

export default ButtonList;
