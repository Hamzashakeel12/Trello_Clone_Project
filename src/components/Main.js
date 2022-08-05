import React from "react";
import Trellolist from "./Trellolist";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TrelloButton from "./TrelloButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions/index";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const ListContainer = styled.div`
  border-radius: 3px;
  width: 300px;
`;
const HomeText = styled.span`
  font-size: 20px;
  color: brown;
  margin-bottom: 20px;
`;
const TextContainer = styled.div`
  margin-bottom: 20px;
`;
const MainContainer = styled.div`
  width: 95vw;
  margin: auto;
`;

function Main() {
  const Lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  return (
    <DragDropContext
      onDragEnd={(result) => {
        console.log("result ", result);
        const { destination, source, draggableId, type } = result;
        if (!destination) {
          return;
        }
        dispatch(
          sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
          )
        );
      }}
    >
      <MainContainer>
        <h1>Welcome To My Trello App ~</h1>
        <TextContainer>
          <HomeText>Add your Tasks and Manage that All!!!</HomeText>
        </TextContainer>
        <Droppable droppableId="list" direction="horizontal" type="list">
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {Lists.map((list, index) => (
                <Trellolist
                  Listid={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                  index={index}
                ></Trellolist>
              ))}
              {provided.placeholder}
              <ListContainer>
                <TrelloButton list />
              </ListContainer>
            </Container>
          )}
        </Droppable>
      </MainContainer>
    </DragDropContext>
  );
}

export default Main;
