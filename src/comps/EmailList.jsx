import React, { useEffect } from 'react'
import { emailList } from '../stub'
import EmailTile from './EmailTile'
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters } from '../redux/emailSlice';

const EmailList = () => {
    const dispatch = useDispatch();
    const { emails, filters } = useSelector((state) => state.email);

    useEffect(() => {
        dispatch(applyFilters());
    }, [filters, dispatch]);

    return (
        <section className='email-list'>
            {emails.map((email) => (
                <EmailTile key={email.id} email={email} />
            ))}
        </section>
    )
}

export default EmailList

