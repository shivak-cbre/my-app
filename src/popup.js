import React,{useEffect,useState} from 'react';
import './popup.css';

const Popup = ({buttonRef, groupBy, orderBy, handleGroupByChange, handleOrderByChange }) => {
 
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: buttonRect.bottom + window.scrollY,
          left: buttonRect.left + window.scrollX
        });
      }
    }, [buttonRef]);
  
    return (
    <div className="popup popover"   style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <div className="popup">
        <label>
          Group By:
          <select  className= 'select' value={groupBy} onChange={handleGroupByChange}>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </label>

        <label>
          Order By:
          <select className= 'select' value={orderBy} onChange={handleOrderByChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Popup;
