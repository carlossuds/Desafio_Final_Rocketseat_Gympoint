import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border: 2px solid #dddddd;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Top = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.colored ? '#42cb59' : '#999999')};
`;

export const Time = styled.Text`
  color: #999;
  font-size: 14px;
  margin-top: 4px;
`;

export const Bot = styled.View`
  margin-top: 15px;
`;

export const Pergunta = styled.Text`
  display: flex;
  flex-direction: column;
  color: #666666;
  font-size: 14px;
`;
