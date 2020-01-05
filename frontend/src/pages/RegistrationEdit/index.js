import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Container, Top, Content, Back, Save, Specs } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number().required('A duração é obrigatória'),
  price: Yup.number().required('O preço é obrigatório'),
});

export default function RegistrationEdit({ location }) {
  const reg = location.state.reg ? location.state.reg : {};
  reg.startFormat = format(parseISO(reg.start_date), 'dd/MM/yyyy');
  reg.endFormat = format(parseISO(reg.end_date), 'dd/MM/yyyy');

  console.log(location.state.reg);

  async function handleSubmit(data) {
    try {
      await api.put(`/registration/${reg.id}`, data);
      toast.success('Dados atualizados!');
    } catch (error) {
      console.log(error);
      toast.error(`Algo deu errado!\nerror:${error}`);
    }
  }

  return (
    <Container>
      <Top>
        <h1>Edição de matrícula</h1>
        <aside>
          <Link to="/matriculas">
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
          initialData={reg}
          schema={schema}
          onSubmit={handleSubmit}
        >
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
                type="text"
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
