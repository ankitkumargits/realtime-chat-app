import React from 'react'
import Conversation from './Conversation'
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from '../../utils/emojis';
const Conversations = () => {

    const {loading, conversations } = useGetConversations();
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {
                conversations.map((conversation, i) => (
                    <Conversation
                        key={i}
                        conversation={conversation}
                        emoji={getRandomEmoji()}
                        lastIdx={i === conversation.length - 1}
                    />
                ))
            }
            {
                loading ? <span className='loading loading-spinner mx-auto'></span> : null
            }
        </div>
    )
}

export default Conversations