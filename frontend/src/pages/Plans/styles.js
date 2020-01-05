import styled from 'styled-components';
import { darken } from 'polished';

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
  width: 900px;

  button {
    padding: 0 15px;
    height: 36px;
    width: 142px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: 0.2s;
    &:hover {
      background: ${darken(0.03, '#ee4d64')};
    }
  }

  input {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid lightgray;
    border-radius: 5px;
    height: 36px;
    width: 237px;
    padding: 0 15px;
    color: ${darken(0.35, 'darkgray')};
    margin-right: 30px;

    &::placeholder {
      color: darkgray;
    }
  }
`;

export const ContentHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 0.535fr;

  strong {
    color: #444444;
  }
`;

export const Content = styled.div`
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  margin: auto;
  width: 900px;

  li:last-child {
    border-bottom: none;
  }
`;

export const Plan = styled.li`
  font-size: 16px;
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 0.5fr;

  span {
    margin-bottom: 20px;
    color: #666666;
  }
`;

export const Edit = styled.strong`
  font-weight: lighter;
  color: #4d85ee;
  margin-right: 50px;
`;
export const Delete = styled.strong`
  font-weight: lighter;
  color: #de3b3b;
`;
