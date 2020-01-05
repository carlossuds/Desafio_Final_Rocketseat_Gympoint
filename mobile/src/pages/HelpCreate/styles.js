import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  margin: 30px;
  padding: 15px;
  border-radius: 4px;
  border: 2px solid #dddddd;
  background: #fff;

  height: 300px;
  display: flex;
  flex-direction: column;
`;

export const TInput = styled.TextInput``;

export const SubmitButton = styled(Button)`
  margin-left: 30px;
  margin-right: 30px;
`;
