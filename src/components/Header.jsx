import React, { useEffect, useState } from 'react'
import ytlogo from "../assets/Youtube_logo.png"
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
const Header = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Sync search query with URL parameter
    useEffect(() => {
        const query = searchParams.get('search_query');
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!searchQuery || searchQuery.trim() === "") {
            setSuggestions([]);
            return;
        }

        //make an api call after every key press 
        //but if the difference between 2 api call is <200ms
        //decline the api call
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions()
            }

        }, 200);
        return () => {
            clearTimeout(timer);
        };

    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        try {
            const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
            const json = await data.json();
            setSuggestions(json[1] || []);
            //update cache
            dispatch(cacheResults({
                [searchQuery]: json[1] || [],
            }))
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    }

    const toogleMenuHandler = () => {
        dispatch(toggleMenu());
    }

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/results?search_query=${encodeURIComponent(query)}`);
            setShowSuggestions(false);
            setSearchQuery(query);
        }
    }
    return (
        <div className='grid grid-flow-col p-2 m-2 shadow-lg'>
            <div className='flex col-span-1'>
                <i className="fa-solid fa-list text-2xl cursor-pointer" onClick={() => toogleMenuHandler()}></i>
                <a href='/'><img className='h-6 mx-2' alt='yt logo' src={ytlogo} /></a>
            </div>
            <div className='relative col-span-10 px-20'>
                <div className=''>
                    <input
                        className='w-1/2 border border-gray-700 rounded-l-full p-2 focus:outline-none focus:border-blue-500'
                        placeholder="Search"
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(searchQuery);
                            }
                        }}
                    />
                    <button
                        className='mr-10 border border-gray-400 p-2  px-4 rounded-r-full bg-gray-100 hover:bg-gray-200 cursor-pointer'
                        onClick={() => handleSearch(searchQuery)}
                        type="button"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                {showSuggestions && suggestions.length > 0 && (<div className='absolute bg-white py-2 px-5 w-108 rounded-lg shadow-lg border border-gray-100 max-h-90 overflow-y-auto no-scrollbar scroll-smooth z-50'>
                    <ul>
                        {suggestions.map((s) => (
                            <li
                                key={s}
                                className='py-2 px-2 hover:bg-gray-100 cursor-pointer'
                                onMouseDown={() => handleSearch(s)}
                            >
                                <i className="fa-solid fa-magnifying-glass "></i> {s}
                            </li>
                        ))}
                    </ul>
                </div>)
                }
            </div>
            <div className='col-span-1 '>
                <i className="fa-regular fa-user text-2xl"></i>
            </div>
        </div>
    )
}

export default Header