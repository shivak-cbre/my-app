import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, users, groupBy, orderBy }) => {
    const priorities = {'Urgent':4, "High": 3, "Medium": 2, "Low": 1, "No Priority":0 };
  const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((groups, ticket) => {
      const groupKey = ticket[groupBy];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(ticket);
      return groups;
    }, {});
  };

  const findKeyByValue = (obj, value) => {
    return Object.keys(obj).find(key => obj[key] == value);
  };
  const sortedGroups = Object.entries(groupTickets(tickets, groupBy)).sort(([groupA], [groupB]) => groupA.localeCompare(groupB));

  const sortedTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (orderBy === "priority") {
 
        return priorities[a.priority] - priorities[b.priority];
      }
      return a[orderBy].localeCompare(b[orderBy]);
    });
  };

  const getUserName = (id) => users.find(el=>el.id==id).name

 const getGroupTitle = (group) =>{
  if (groupBy === 'userId') return getUserName(group) ;
  if(groupBy ==='priority') return findKeyByValue(priorities,group);
  return group
  }
  return (
    <div className='container'>
    <div className="kanban-board">
      {sortedGroups.map(([group, groupTickets]) => (
        <div key={group} className="kanban-column">
          <h3>{getGroupTitle(group)}</h3>
          {sortedTickets(groupTickets).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} userName={getUserName(ticket.userId)} />
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};

export default KanbanBoard;
