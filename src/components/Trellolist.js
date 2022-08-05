import React from "react";
import styled from "styled-components";
import TrelloButton from "./TrelloButton";
import Trellocard from "./Trellocard";
import { Draggable, Droppable } from "react-beautiful-dnd";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`;

function Trellolist(props) {
  const card = props.cards;
  return (
    <Draggable draggableId={String(props.Listid)} index={props.index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(props.Listid)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2>{props.title}</h2>
                {card.map((Carddata, index) => (
                  <Trellocard
                    text={Carddata.text}
                    key={Carddata.id}
                    id={Carddata.id}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <TrelloButton Listid={props.Listid} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
}

export default Trellolist;
