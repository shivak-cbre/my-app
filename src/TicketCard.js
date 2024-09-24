import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, userName }) => {

    const  getInitials = (name) => {
        const nameParts = name.trim().split(" ");
        
        // Get the first letter of the first two words, if available
        const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : '';
        const secondInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : '';
        
        // Combine the two initials
        return firstInitial + secondInitial;
      }

      const generateColorFromName = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
          hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = ((hash & 0x00FFFFFF)
          .toString(16)
          .padStart(6, '0')).toUpperCase();
        return `#${color}`;
      };

  return (
    <div className="ticket-card">
        <div className='container-grp'>
        <h3>{ticket.id}</h3>
        <div className='rounded' style={{background:generateColorFromName(userName)}}>{getInitials(userName)}</div>
        </div>

      <h4>{ticket.title}</h4>
      <span className="tag">{ticket.tag?.[0]}</span>
    </div>
  );
};

export default TicketCard;
