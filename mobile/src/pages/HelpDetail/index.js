/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';

import Background from '../../components/Background';
import Header from '../../components/Header';

import { Container, Top } from './styles';

// eslint-disable-next-line no-unused-vars
export default function HelpDetail({ navigation }) {
  console.tron.log(navigation);
  return (
    <Background>
      <Header />
      <Container>
        <Top>
          <Text style={{ fontWeight: 'bold' }}>PERGUNTA</Text>
          <Text style={{ color: '#999' }}>
            {navigation.getParam('data').dateParsed}
          </Text>
        </Top>

        <Text style={{ marginBottom: 30 }}>
          {navigation.getParam('data').question}
        </Text>

        <Top>
          <Text style={{ fontWeight: 'bold' }}>RESPOSTA</Text>
        </Top>
        <Text>{navigation.getParam('data').answer}</Text>
      </Container>
    </Background>
  );
}

HelpDetail.navigationOptions = {
  tabBarLabel: 'Ajuda (Detalhes)',
};
