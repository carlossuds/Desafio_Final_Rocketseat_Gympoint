import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Top, Content, Back, Save, Specs } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number().required('A duração é obrigatória'),
  price: Yup.number().required('O preço é obrigatório'),
});

export default function PlanEdit({ location }) {
  const plan = location.state ? location.state.plan : {};

  console.log(plan);
  async function handleSubmit(data) {
    try {
      await api.put(`/plans/${plan.id}`, data);
      toast.success('Plano atualizado!');
      history.push('/planos');
    } catch (error) {
      console.log(error);
      toast.error(`Algo deu errado!\nerror:${error}`);
    }
  }

  function setValue() {
    const duration = document.getElementById('duration').value;
    const price = document.getElementById('price').value;

    document.getElementById('total').value = duration * price;
  }

  return (
    <Container>
      <Top>
        <h1>Edição de plano</h1>
        <aside>
          <Link to="/planos">
            <Back type="button">VOLTAR</Back>
          </Link>
          <Save type="submit" form="form">
            SALVAR
          </Save>
        </aside>
      </Top>

      <Content>
        <Form
          id="form"
          initialData={plan}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <strong>TÍTULO DO PLANO</strong>
          <Input name="title" type="name" />
          <Specs>
            <div>
              <strong>Duração (em meses)</strong>
              <Input
                id="duration"
                name="duration"
                onChange={setValue}
                type="text"
              />
            </div>
            <div>
              <strong>PREÇO MENSAL</strong>
              <Input id="price" name="price" onChange={setValue} type="text" />
            </div>
            <div>
              <strong>PREÇO TOTAL</strong>
              <Input id="total" name="total" type="text" disabled />
            </div>
          </Specs>
        </Form>
      </Content>
    </Container>
  );
}

PlanEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

PlanEdit.defaultProps = {
  location: {
    state: {},
  },
};
