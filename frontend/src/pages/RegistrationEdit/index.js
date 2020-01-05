import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';

import { Container, Top, Content, Back, Save, Specs } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  title: Yup.string().required('O título é obrigatório'),
  startFormat: Yup.string().required('A data é obrigatória'),
});

export default function RegistrationEdit({ location }) {
  const reg = location.state.reg ? location.state.reg : {};
  reg.startFormat = parseISO(reg.start_date, 'dd/MM/yyyy');
  reg.endFormat = format(parseISO(reg.end_date), 'dd/MM/yyyy');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    console.log(data.startFormat);
    setLoading(!loading);
    try {
      await api.put(`/registration/${reg.id}`, {
        name: data.student.name,
        title: data.plan.title,
        start_date: parseISO(data.startFormat),
      });
      toast.success('Dados atualizados!');
      history.push('/matriculas');
    } catch (error) {
      console.log(error);
      toast.error(`Algo deu errado!\nerror:${error}`);
    }
    console.log('Submeteu');
  }

  return (
    <Container>
      <Top>
        <h1>Edição de matrícula</h1>
        <aside>
          <Link to="/matriculas">
            <Back type="button">VOLTAR</Back>
          </Link>
          <Save loading={loading} disabled={loading} type="submit" form="form">
            SALVAR
          </Save>
        </aside>
      </Top>

      <Content>
        <Form id="form" initialData={reg} onSubmit={handleSubmit}>
          {' '}
          <strong>ALUNO</strong>
          <Input name="student.name" type="name" placeholder="Buscar aluno" />
          <Specs>
            <div>
              <strong>PLANO</strong>
              <Input
                name="plan.title"
                type="text"
                placeholder="Selecione o plano"
              />
            </div>
            <div>
              <strong>DATA DE INÍCIO</strong>
              <Input
                name="startFormat"
                type="date"
                placeholder="Escolha a data"
              />
            </div>
            <div>
              <strong>DATA DE TÉRMINO</strong>
              <Input name="endFormat" type="text" disabled />
            </div>
            <div>
              <strong>VALOR FINAL</strong>
              <Input name="price" type="text" disabled />
            </div>
          </Specs>
        </Form>
      </Content>
    </Container>
  );
}

RegistrationEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

RegistrationEdit.defaultProps = {
  location: {
    state: {},
  },
};
