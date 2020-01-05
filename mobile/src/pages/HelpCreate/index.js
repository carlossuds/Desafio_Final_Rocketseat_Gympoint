/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Background from '../../components/Background';
import Header from '../../components/Header';

import api from '../../services/api';

import { Container, TInput, SubmitButton } from './styles';

// eslint-disable-next-line no-unused-vars
export default function HelpCreate({ navigation }) {
  const [question, setQuestion] = useState('');

  const id = useSelector(state => state.student.profile.id);

  async function handleSubmit() {
    try {
      await api.post(`students/${id}/help-orders`, { question });
      navigation.navigate('Help');
    } catch (err) {
      Alert.alert('Ocorreu um erro');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <TInput
          returnKeyType="next"
          value={question}
          onChangeText={setQuestion}
          multiline
          placeholder="Inclua seu pedido de auxílio"
        />
      </Container>
      <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
    </Background>
  );
}

HelpCreate.navigationOptions = {
  tabBarLabel: 'Ajuda (Criar)',
};
