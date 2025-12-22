import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
    const location = useLocation();
    const isWatchPage = location.pathname === '/watch';

    //early return
    if (!isMenuOpen) return null;

    return (
        <div className={`w-44 h-screen overflow-y-auto bg-white shadow-lg ${isWatchPage ? 'fixed top-16 left-0 z-50' : ''}`}>
            <div className='py-3'>
                <Link to="/" className='flex items-center px-6 py-2 hover:bg-gray-100 cursor-pointer'>
                    <i className="fa-solid fa-house w-6"></i>
                    <span className='ml-6 text-sm'>Home</span>
                </Link>
                <div className='flex items-center px-6 py-2 hover:bg-gray-100 cursor-pointer'>
                    <i className="fa-solid fa-video w-6"></i>
                    <span className='ml-6 text-sm'>Shorts</span>
                </div>
            </div>

            <hr className='my-2' />

            <div className='py-3'>
                <div className='flex items-center justify-between px-6 py-2'>
                    <h1 className='font-semibold text-sm'>Subscriptions</h1>
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </div>
                <div className='flex items-center px-6 py-2 hover:bg-gray-100 cursor-pointer'>
                    <i className="fa-solid fa-music w-6"></i>
                    <span className='ml-6 text-sm'>Music</span>
                </div>
                <div className='flex items-center px-6 py-2 hover:bg-gray-100 cursor-pointer'>
                    <i className="fa-solid fa-trophy w-6"></i>
                    <span className='ml-6 text-sm'>Sports</span>
                </div>
                <div className='flex items-center px-6 py-2 hover:bg-gray-100 cursor-pointer'>
                    <i className="fa-solid fa-gamepad w-6"></i>
                    <span className='ml-6 text-sm'>Gaming</span>
                </div>
                <div className='flex items-center px-6 py-2 hover:bg-gray-100 cursor-pointer'>
                    <i className="fa-solid fa-film w-6"></i>
                    <span className='ml-6 text-sm'>Movies</span>
                </div>
            </div>

            <hr className='my-2' />

            <div className='py-3'>
                <div className='flex items-center justify-between px-6 py-2'>
                    <h1 className='font-semibold text-sm'>You</h1>
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </div>
                <div className='flex items-center px-6 py-2 hover:bg-gray-100 cursor-pointer'>
                    <i className="fa-solid fa-clock-rotate-left w-6"></i>
                    <span className='ml-6 text-sm'>History</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar