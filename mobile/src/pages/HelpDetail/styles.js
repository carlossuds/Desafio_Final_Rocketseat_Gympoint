import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  border: 2px solid #dddddd;
  background: #fff;

  display: flex;
  flex-direction: column;
`;

export const Top = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
