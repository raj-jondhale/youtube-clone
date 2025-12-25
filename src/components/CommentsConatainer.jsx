import React from 'react'
import Comment from './Comment'

const commentsData = [
    {
        name: "RJ45",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
        replies: [
            {
                name: "RJ45",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
                replies: [
                    {
                        name: "RJ45",
                        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
                        replies: [

                        ]
                    },
                ]
            },
            {
                name: "RJ45",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
                replies: [

                ]
            },
        ]
    },
    {
        name: "RJ45",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
        replies: [

        ]
    },
    {
        name: "RJ45",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
        replies: [

        ]
    },

]

const CommentList = ({ comments }) => {
    return comments.map((comment, index) =>
    (
        <div key={index}>
            <Comment data={comment} />
            <div className='pl-5 border border-white border-l-black ml-5'>
                <CommentList comments={comment.replies} />
            </div>
        </div>
    ))
}

const CommentsConatainer = () => {
    return (
        <div className='ml-24 mt-6 w-210'>
            <h1 className='text-xl font-bold'>Comments:</h1>
            <div>
                <CommentList comments={commentsData} />
            </div>
        </div>
    )
}

export default CommentsConatainer