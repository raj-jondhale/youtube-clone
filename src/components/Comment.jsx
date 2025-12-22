import React from 'react'

const Comment = ({ data }) => {
    const { name, text, replies } = data;
    return (
        <div className='flex shadow-sm bg-gray-100 p-2 rounded-lg my-2 '>
            <img className='w-12 h-12' src='https://www.iconpacks.net/icons/2/free-icon-user-3296.png' />
            <div className='px-3'>
                <p className='font-bold'>{name}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Comment