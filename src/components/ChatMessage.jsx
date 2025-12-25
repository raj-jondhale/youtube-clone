import React from 'react'

const ChatMessage = ({ name, message }) => {
    return (

        <div className='flex items-center shadow-sm my-2'>
            <img className='w-8 h-8' src='https://www.iconpacks.net/icons/2/free-icon-user-3296.png' />

            <span className='font-bold px-2'> {name}</span>
            <span>{message}</span>
        </div>

    )
}

export default ChatMessage