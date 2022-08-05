import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addcard, addlist } from "../actions";

export class TrelloButton extends Component {
  state = {
    formOpen: false,
    text: "",
  };

  openformhandler = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false,
    });
  };

  onchange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  showButton = () => {
    const { list } = this.props;
    const paddingtext = list ? "15px" : "";
    const text = list ? "Add New List" : "Add New Card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "black" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    const FormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      padding-left: ${paddingtext};
      height: 36px;
      margin-left: 8px;
      width: 300px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;

    return (
      <FormButton onClick={this.openformhandler}>
        <p>+{text}</p>
      </FormButton>
    );
  };

  addNewList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    if (text) {
      dispatch(addlist(text));
      this.setState({
        text: "",
      });
    }
    return;
  };

  addNewCard = () => {
    const { dispatch, Listid } = this.props;
    const { text } = this.state;
    if (text) {
      dispatch(addcard(Listid, text));
      this.setState({
        text: "",
      });
    }
    return;
  };

  renderForm = () => {
    const { list } = this.props;

    const placeholder = list
      ? "Enter a title for this list..."
      : "Enter Text for this card...";
    const newListwidth = list ? "500px" : "300px";

    const addButtontext = list ? "Add List" : "Add Card";
    const buttonbgColor = list ? "rgba(0,0,0,.15)" : "white";

    const StyledTextArea = styled.input`
      resize: none;
      width: 98%;
      overflow: hidden;
      outline: none;
      border: none;
      min-height: 40px;
      padding-top: 6px;
      border-radius: 4px;
    `;
    const CardContainer = styled.div`
      margin: 0 0 8px 0;
      max-width: ${newListwidth};
      max-height: 100%;
      border-radius: 6px;
      padding: 4px;
      padding-top: 10px;
      padding-bottom: 10px;
      word-wrap: break-word;
      background-color: ${buttonbgColor};
    `;

    const ButtonContainer = styled.div`
      margin-top: 8px;
      display: flex;
      align-items: center;
      margin-left: 8px;
      background-color: inherit;
    `;

    const StyledIcon = styled.span`
      margin-left: auto;
      margin-right: 8px;
      cursor: pointer;
      color: black;
      font-size: 28px;
      &:hover {
        color: red;
        transition-duration: 0.2s;
      }
    `;

    const AddButton = styled.button`
      margin-left: 8px;
      margin-right: 10px;
      padding: 12px;
      border-radius: 6px;
      background-color: green;
      color: white;
      cursor: pointer;
      border: none;
      &:hover {
        background-color: orange;
        transition-duration: 0.3s;
      }
    `;

    return (
      <>
        <CardContainer>
          <StyledTextArea
            type="text"
            placeholder={placeholder}
            autoFocus
            value={this.state.text}
            onChange={this.onchange}
            onBlur={this.closeForm}
          />
        </CardContainer>
        <ButtonContainer>
          <AddButton onMouseDown={list ? this.addNewList : this.addNewCard}>
            {addButtontext}
          </AddButton>
          <StyledIcon onMouseDown={this.closeForm}>X</StyledIcon>
        </ButtonContainer>
      </>
    );
  };

  // Main Render Function..........

  render() {
    return this.state.formOpen ? this.renderForm() : this.showButton();
  }
}

export default connect()(TrelloButton);
