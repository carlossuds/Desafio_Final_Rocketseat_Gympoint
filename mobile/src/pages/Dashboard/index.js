import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import api from '../../services/api';

import Background from '../../components/Background';
import Header from '../../components/Header';
import Checkin from '../../components/Checkin';

import { Container, NewCheckinButton, List } from './styles';

export default function Dashboard() {
  const [checkins, setCheckins] = useState([]);
  const [x, setX] = useState('');
  const id = useSelector(state => state.student.profile.id);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`students/${id}/checkin`);

      setCheckins(response.data);
    }
    loadCheckins();
  }, [id, x]);

  async function addCheckin() {
    console.tron.log('Entrou');
    try {
      await api.post(`students/${id}/checkin`);
    } catch (err) {
      Alert.alert('Você atingiu o limite de check-ins da semana');
    }

    setX(!x);
  }

  return (
    <Background>
      <Header />
      <Container>
        <NewCheckinButton onPress={addCheckin}>Novo check-in</NewCheckinButton>

        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Checkin data={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-ins',
};
