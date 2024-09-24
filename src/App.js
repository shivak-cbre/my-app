import React, { useState,useRef, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import Popup from './popup';
import './App.css';

// const tickets = [
//   { id: 1, title: "Ticket 1", priority: "High", status: "To Do", ticketId:'CAM-123', user:'user1' },
//   { id: 2, title: "Ticket 2", priority: "Medium", status: "In Progress",ticketId:'CAM-121',user:'user2' },
//   { id: 3, title: "Ticket 3", priority: "Low", status: "Done",ticketId:'CAM-120',user:'user3' },
//   { id: 4, title: "Ticket 4", priority: "Urgent", status: "Cancelled",ticketId:'CAM-128',user:'user4' },
//   { id: 5, title: "Ticket 5", priority: "No Priority", status: "Cancelled",ticketId:'CAM-124',user:'user4' },

//   { id: 11, title: "Ticket 11", priority: "High", status: "To Do", ticketId:'CAM-1231', user:'user1' },
//   { id: 12, title: "Ticket 12", priority: "Medium", status: "In Progress",ticketId:'CAM-1121',user:'user2' },
//   { id: 13, title: "Ticket 13", priority: "Low", status: "Done",ticketId:'CAM-1201',user:'user3' },
//   { id: 14, title: "Ticket 14", priority: "Urgent", status: "Cancelled",ticketId:'CAM-1128',user:'user4' },
//   { id: 15, title: "Ticket 15", priority: "No Priority", status: "Cancelled",ticketId:'CAM-1124',user:'user2' }


// ];

function App() {
  const [groupBy, setGroupBy] = useState("priority");
  const [orderBy, setOrderBy] = useState("priority");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([])
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
  
    if (buttonRef.current && !buttonRef.current.contains(event.target) && !event.target?.classList.contains('select')) {
      setIsPopupOpen(false);
    }
  };

  useEffect(()=>{
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
    .then(response => {
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Convert the response to JSON
      return response.json(); 
    })
    .then(data => {
      // Handle the JSON data here
      console.log(data);
      setTickets(data.tickets)
      setUsers(data.users)
    })
    .catch(error => {
      // Handle errors here
      console.error('There was an error!', error);
    });
  },[])

    // Close the popover if clicked outside
    useEffect(() => {
      if (isPopupOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isPopupOpen]);
  
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleGroupByChange = (event) => setGroupBy(event.target.value);
  const handleOrderByChange = (event) => setOrderBy(event.target.value);

  return (
    <div className="app">
       <button className="display-button" onClick={togglePopup} ref={buttonRef}>
        Display Options
      </button>
 {isPopupOpen && (
        <Popup
          buttonRef={buttonRef}
          groupBy={groupBy}
          orderBy={orderBy}
          handleGroupByChange={handleGroupByChange}
          handleOrderByChange={handleOrderByChange}
        />
      )}

     { tickets && <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} orderBy={orderBy} />}
    </div>
  );
}

export default App;
