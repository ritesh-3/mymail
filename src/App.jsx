import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Filter from './comps/Filter';
import EmailList from './comps/EmailList';
import EmailBody from './comps/EmailBody';
import { fetchEmails } from './redux/emailSlice';

function App() {

  const dispatch = useDispatch();
  const { emailBody, selectedEmail, emails } = useSelector(state => state.email)
  // const [filteredEmails, setFilteredEmails] = useState(emails);

  // const [filterOptions, setFilterOptions] = useState({
  //   unread: false,
  //   read: false,
  //   favorites: false,
  // });


  // useEffect(() => {
  //   const filtered = emails.filter((email) => {
  //     if (
  //       (filterOptions.unread && !email.isRead) ||
  //       (filterOptions.read && email.isRead) ||
  //       (filterOptions.favorites && email.isFavorite)
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   setFilteredEmails(filtered)
  // }, [selectedEmail])



  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  return (
    <>
      <main className='main-container'>
        <Filter  />
        <div className={`px-2 flex g-3 flex-1 ${emailBody ? 'row' : 'column'}`} >
          <EmailList/>
          {(selectedEmail && emailBody) && <EmailBody emailBody={emailBody} selectedEmail={selectedEmail} />}
        </div>
      </main>
    </>
  )
}

export default App
