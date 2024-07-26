// App.js
import React, { useState } from 'react';
import Accordion from './Accordion';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Inicjalne dane akordeonów
const initialAccordions = [
  { id: '1', title: 'Accordion 1', content: 'Zawartość 1' },
  { id: '2', title: 'Accordion 2', content: 'Zawartość 2' },
  { id: '3', title: 'Accordion 3', content: 'Zawartość 3' }
];

const App = () => {
  const [accordions, setAccordions] = useState(initialAccordions);

  // Funkcja obsługująca zakończenie przeciągania
  const onDragEnd = (result) => {
    // Sprawdzamy, czy mamy cel przeciągania
    if (!result.destination) return;

    // Tworzymy kopię tablicy akordeonów
    const reorderedAccordions = Array.from(accordions);
    // Usuwamy przenoszony akordeon z pierwotnej pozycji
    const [movedAccordion] = reorderedAccordions.splice(result.source.index, 1);
    // Wstawiamy akordeon w nową pozycję
    reorderedAccordions.splice(result.destination.index, 0, movedAccordion);

    // Aktualizujemy stan
    setAccordions(reorderedAccordions);
  };

  return (
    <div className="app-container">
      <h1>Demo Accordion</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="accordion-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {accordions.map((accordion, index) => (
                <Draggable key={accordion.id} draggableId={accordion.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="draggable-accordion"
                    >
                      <Accordion title={accordion.title} content={accordion.content} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
