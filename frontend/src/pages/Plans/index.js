/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [x, setX] = useState('');

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      const planos = [];

      // eslint-disable-next-line array-callback-return
      response.data.map(p => {
        const newP = {
          ...p,
          total: p.duration * p.price,
          durationFormatted:
            p.duration === 1 ? `${p.duration} mês` : `${p.duration} meses`,
        };
        console.log(newP.total);
        console.log(newP.durationFormatted);
        planos.push(newP);
      });

      setPlans(planos);
    }
    loadPlans();
  }, [x]);

  console.log(plans);

  async function handleDelete(id) {
    try {
      await api.delete(`plans/${id}`);
      setX(!x);
      toast.success('Plano deletado com sucesso');
    } catch (err) {
      toast.error('Ops! Ocorreu um erro.');
    }
  }

  return (
    <Container>
      <Top>
        <h1>Gerenciando planos</h1>
        <aside>
          <Link to="/criarplano">
            <button type="submit">CADASTRAR</button>
          </Link>
        </aside>
      </Top>

      <Content>
        <ContentHeader>
          <strong>TÍTULO</strong>
          <strong>DURAÇÃO</strong>
          <strong>VALOR p/ MÊS</strong>
        </ContentHeader>

        <ul>
          {plans.map(plan => (
            <Plan key={plan.id}>
              <span>{plan.title}</span>
              <span> {plan.durationFormatted}</span>
              <span>{`R$ ${plan.price}`}</span>
              <div>
                <Link
                  to={{
                    pathname: '/editarplano',
                    state: { plan },
                  }}
                >
                  <Edit>editar</Edit>
                </Link>
                <Link onClick={() => handleDelete(plan.id)}>
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
