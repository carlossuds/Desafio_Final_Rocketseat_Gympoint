/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { MdDone } from 'react-icons/md';

import { toast } from 'react-toastify';
import {
  Container,
  Top,
  ContentHeader,
  Content,
  Plan,
  Edit,
  Delete,
} from './styles';

import api from '../../services/api';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [x, setX] = useState([]);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('registration');

      const data = response.data.map(registration => ({
        ...registration,
        startFormat: format(
          parseISO(registration.start_date),
          "d 'de' MMMM 'de' yyyy ",
          { locale: pt },
        ),
        endFormat: format(
          parseISO(registration.end_date),
          "d 'de' MMMM 'de' yyyy ",
          { locale: pt },
        ),
      }));

      setRegistrations(data);
    }
    loadRegistrations();
  }, [x]);

  async function handleDelete(id) {
    try {
      await api.delete(`registration/${id}`);
      setX(!x);
      toast.success('Matrícula cancelada com sucesso');
    } catch (error) {
      toast.error('Ops! Ocorreu um problema');
    }
  }
  console.log(registrations);

  return (
    <Container>
      <Top>
        <h1>Gerenciando matrículas</h1>
        <aside>
          <Link to="/criarmatricula">
            <button type="button">CADASTRAR</button>
          </Link>
        </aside>
      </Top>

      <Content>
        <ContentHeader>
          <strong>ALUNO</strong>
          <strong>PLANO</strong>
          <strong>INÍCIO</strong>
          <strong>TÉRMINO</strong>
          <strong>ATIVA</strong>
        </ContentHeader>

        <ul>
          {registrations.map(reg => (
            <Plan key={reg.id}>
              <span>{reg.student.name}</span>
              <span> {reg.plan.title}</span>
              <span>{reg.startFormat}</span>
              <span>{reg.endFormat}</span>
              {reg.active ? <MdDone size={20} color="#444444" /> : <span />}
              <div>
                <Link
                  to={{
                    pathname: '/editarmatricula',
                    state: { reg },
                  }}
                >
                  <Edit>editar</Edit>
                </Link>
                <Link onClick={() => handleDelete(reg.id)}>
                  <Delete>apagar</Delete>
                </Link>
              </div>
            </Plan>
          ))}
        </ul>
      </Content>
    </Container>
  );
}
