// Accordion.js
import React, { useState } from 'react';
import './Accordion.css';

const Accordion = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [accordionTitle, setAccordionTitle] = useState(title);
  const [tempTitle, setTempTitle] = useState(title);

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setTempTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setAccordionTitle(tempTitle);
    setIsEditing(false);
  };

  const handleTitleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleTitleBlur();
    }
  };

  return (
    <div className={`accordion ${isExpanded ? 'expanded' : ''}`}>
      <div 
        className="accordion-header"
        onClick={() => setIsExpanded(!isExpanded)}
        onDoubleClick={handleTitleDoubleClick}
      >
        {isEditing ? (
          <input
            type="text"
            value={tempTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyPress={handleTitleKeyPress}
            autoFocus
          />
        ) : (
          accordionTitle
        )}
      </div>
      {isExpanded && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;
