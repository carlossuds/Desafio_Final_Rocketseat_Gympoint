import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;
export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #aaa;
      max-height: 30px;
    }

    a {
      font-weight: bold;
      font-size: 18px;
      color: darkgray;
      transition: 0.3s;
      margin-right: 20px;
      &:hover {
        color: ${darken(0.5, 'darkgray')};
      }
    }

    aside {
      display: flex;
      align-items: center;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 2px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #ee4d64;
    }
  }
`;
