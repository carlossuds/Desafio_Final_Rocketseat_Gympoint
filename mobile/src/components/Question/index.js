/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Name, Time, Top, Bot, Pergunta } from './styles';

export default function Question({ navigation, data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('HelpDetail', { data: { ...data, dateParsed } })
      }
    >
      <Container>
        <Top>
          <Name colored={!!data.answer}>
            {data.answer ? 'Respondido' : 'Sem Resposta'}
          </Name>
          <Time>{dateParsed}</Time>
        </Top>

        <Bot>
          <Pergunta>{data.question}</Pergunta>
        </Bot>
      </Container>
    </TouchableOpacity>
  );
}
