import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
  background-color: white;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
  padding: 4px;
`;

function Trellocard(props) {
  const ID = props.id;
  return (
    <Draggable draggableId={String(ID)} index={props.index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{props.text}</p>
        </CardContainer>
      )}
    </Draggable>
  );
}

export default Trellocard;
