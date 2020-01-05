import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const NewHelpButton = styled(Button)`
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
