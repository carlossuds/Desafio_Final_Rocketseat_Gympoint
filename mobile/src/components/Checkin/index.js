/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Name, Time } from './styles';

export default function Checkin({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data]);

  return (
    <Container>
      <Name>Check-in #{data.id}</Name>
      <Time>{dateParsed}</Time>
    </Container>
  );
}
