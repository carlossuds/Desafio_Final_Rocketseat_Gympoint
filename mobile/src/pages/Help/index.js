/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Background from '../../components/Background';
import Header from '../../components/Header';
import Question from '../../components/Question';

import { Container, NewHelpButton, List } from './styles';

// eslint-disable-next-line no-unused-vars
export default function Help({ navigation }) {
  const [questions, setQuestions] = useState([]);

  const id = useSelector(state => state.student.profile.id);

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get(`help-orders/${id}`);

      setQuestions(response.data);
    }
    loadQuestions();
  }, [id]);

  return (
    <Background>
      <Header />
      <Container>
        <NewHelpButton onPress={() => navigation.navigate('HelpCreate')}>
          Novo pedido de auxílio
        </NewHelpButton>

        <List
          data={questions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Question navigation={navigation} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Help.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
};
