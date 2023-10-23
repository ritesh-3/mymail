import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Filter from './comps/Filter';
import EmailList from './comps/EmailList';
import EmailBody from './comps/EmailBody';
import { applyFilters, fetchEmails } from './redux/emailSlice';
import { emailBody } from './stub';

function App() {

  const dispatch = useDispatch();
  const { selectedEmail } = useSelector(state => state.email);


  useEffect(() => {
    dispatch(fetchEmails());
    dispatch(applyFilters());
  }, [dispatch]);

  return (
    <>
      <main className='main-container'>
        <Filter />
        <div className='flex g-3' >
          <EmailList selectedEmail={selectedEmail} />
          {(selectedEmail) && <EmailBody />}
        </div>
      </main>
    </>
  )
}

export default App
