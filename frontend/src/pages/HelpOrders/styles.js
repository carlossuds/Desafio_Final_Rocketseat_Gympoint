import styled from 'styled-components';
import { darken } from 'polished';
import Modal from 'styled-react-modal';

export const Container = styled.div`
  background: #f2f2f2;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
`;

export const Top = styled.header`
  display: flex;
  align-items: center;
  padding: 50px 0 50px 0;
  justify-content: space-between;
  margin: auto;
  width: 700px;
`;

export const ContentHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;

  strong {
    font-size: 16px;
    color: #444444;
  }
`;

export const Content = styled.div`
  border-radius: 10px;
  background-color: #fff;
  padding: 30px;
  width: 700px;
  margin: auto;

  li:last-child {
    border-bottom: none;
  }
  a {
    justify-self: flex-end;
  }
`;

export const Help = styled.li`
  font-size: 16px;
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  display: grid;
  grid-template-columns: 1fr 0.5fr;

  span {
    font-size: 16px;
    margin-bottom: 20px;
    color: #666666;
  }
`;

export const Answer = styled.strong`
  font-weight: lighter;
  color: #4d85ee;
`;

export const ModalContainer = styled.div`
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 425px;
  border-radius: 4px;
  word-break: break-all;

  strong {
    margin: 30px 30px 15px;
  }

  button {
    width: 540px;
    align-self: center;
    padding: 0 15px;
    height: 36px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: 0.2s;

    opacity:${props => (props.loading ? 0.3 : 1)}

    &:hover {
      background: ${darken(0.03, '#ee4d64')};
    }

  }
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Question = styled.span`
  font-size: 16px;
  margin: 0 30px 0;
  color: #666666;
`;

export const Input = styled.textarea`
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin: 10px 15px 10px;
  padding: 10px;
`;
