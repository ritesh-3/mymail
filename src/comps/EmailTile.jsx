import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { formatTimestamp } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmailBody } from '../redux/emailSlice';

const EmailTile = ({ email }) => {

    const { readEmails, favorites } = useSelector(app => app.email)

    const dispacth = useDispatch();
    const { from, subject, short_description, date, id } = email;

    const handleEmmailCLicked = () => {
        dispacth(fetchEmailBody({ emailId: id, email }))
    }

    const isRead = readEmails.includes(id);
    const isFavorite = favorites.includes(id);

    return (
        <div onClick={handleEmmailCLicked} className={`border border-radius flex g-2 p-3 mb-2 ${isRead ? 'bg-white' : 'bg-unread'}`}>
            <Avatar name={from.name} />
            <div className='flex column  text-gray'>
                <span>From: <strong> {from.name + " <" + from.email + ">"} </strong> </span>
                <span>Subject: <strong>{subject}</strong>  </span>
                <span>{short_description}  </span>
                <div className='flex g-3'>
                    <span>{formatTimestamp(date)} </span>
                    {isFavorite && <span className="text-accent">Favorite</span>}
                </div>
            </div>
        </div>
    )
}

export default EmailTile
