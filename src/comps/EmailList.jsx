import React, { useEffect } from 'react'
import { emailList } from '../stub'
import EmailTile from './EmailTile'
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters } from '../redux/emailSlice';

const EmailList = ({ selectedEmail }) => {
    const dispatch = useDispatch();
    const { filteredEmails, filters } = useSelector((state) => state.email);

    useEffect(() => {
        dispatch(applyFilters());
    }, [filters, dispatch]);


    return (
        <section className={`email-list ${!selectedEmail ? 'flex-1' : ''}`}>
            {filteredEmails.length > 0 ? filteredEmails.map((email) => (
                <EmailTile key={email.id} email={email} />
            )) :
                <span>No Emails found for this filter..</span>
            }
        </section>
    )
}

export default EmailList

