import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  border: 2px solid #dddddd;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;
