import React from 'react'
import Avatar from './Avatar'
import { formatTimestamp } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/emailSlice';
import TextLoader from './TextLoader';

const EmailBody = () => {

    const dispacth = useDispatch();
    const { emailBody, selectedEmail, isLoading } = useSelector(state => state.email);
    const handleAddtOFavorites = () => {
        dispacth(addFavorite(selectedEmail.id))
    }


    return (
        <section className={`email-body`}>
            {
                (!emailBody) ? <TextLoader /> :
                    <>
                        <div className='flex justify-between'>
                            <div className='flex g-2 '>
                                <Avatar name={selectedEmail.from.name} />
                                <div className='flex column g-2 text-gray'>
                                    <strong className='text-xl text-gray'>{selectedEmail?.subject}</strong>
                                    {formatTimestamp(selectedEmail.date)}
                                </div>
                            </div>
                            <button onClick={handleAddtOFavorites} className='btn-primary'>Mark as favourites</button>
                        </div>
                        <div className='text-gray' dangerouslySetInnerHTML={{ __html: emailBody.body }} />
                    </>
            }
        </section>
    )
}

export default EmailBody
