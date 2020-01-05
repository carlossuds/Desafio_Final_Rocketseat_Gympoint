import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #f2f2f2;
  form {
    display: flex;
    flex-direction: column;
    padding: 15px;

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
      margin: 0 10px 10px 0;

      &::placeholder {
        color: darkgray;
      }
    }
  }
`;
