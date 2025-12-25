import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/helper';


const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState();
    const dispatch = useDispatch();
    const ChatMessages = useSelector((store) => store.chat.messages)
    // console.log(ChatMessages);
    useEffect(() => {
        const i = setInterval(() => {
            //api polling
            // console.log("API Polling");
            dispatch(addMessage({
                name: generateRandomName(),
                message: makeRandomMessage(20)
            }))
        }, 2000);

        return () => clearInterval(i);
    }, [])

    return (
        <>
            <div className='ml-2 mr-12 h-115 p-2 border border-black shadow-sm rounded-lg bg-slate-100 overflow-scroll no-scrollbar flex flex-col-reverse'>
                <div>
                    {ChatMessages.map((c, i) => (
                        <ChatMessage key={i} name={c.name} message={c.message} />
                    ))}
                </div>
            </div>
            <form className='p-2 ml-2 mr-12 border border-black rounded-lg ' onSubmit={(e) => {
                e.preventDefault();

                dispatch(
                    addMessage({
                        name: "RJ45",
                        message: liveMessage,
                    })
                )
                setLiveMessage("")
            }}
            >
                <input className=' px-2 w-70 border border-black rounded-lg' type='text' value={liveMessage} onChange={(e) => {
                    setLiveMessage(e.target.value)
                }} />
                <button className='px-2 mx-2 bg-green-300 rounded-lg'>Send</button>
            </form>
        </>
    )
}

export default LiveChat