import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;

  div {
    border-radius: 5px;
    background-color: white;

    img {
      margin-top: 30px;
    }

    form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      padding: 30px;

      p {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        color: ${darken(0.35, 'darkgray')};
        margin-bottom: 10px;
      }
      span {
        color: red;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
      }
      input {
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid lightgray;
        border-radius: 5px;
        height: 44px;
        padding: 0 15px;
        color: ${darken(0.35, 'darkgray')};
        margin: 0 0 10px;

        &::placeholder {
          color: darkgray;
        }
      }

      button {
        margin: 5px 0 0;
        height: 44px;
        background: #ee4d64;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: 0.2s;
        margin-bottom: 40px;
        &:hover {
          background: ${darken(0.03, '#ee4d64')};
        }
      }
    }
  }
`;
