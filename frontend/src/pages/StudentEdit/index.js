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
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number().required('A idade é obrigatória'),
  weight: Yup.number().required('O peso é obrigatório'),
  height: Yup.number().required('A altura é obrigatória'),
});

export default function StudentEdit({ location }) {
  const student = location.state ? location.state.student : {};

  async function handleSubmit(data) {
    try {
      await api.put(`/students/${student.id}`, data);
      toast.success('Dados atualizados!');
      history.push('/alunos');
    } catch (error) {
      console.log(error);
      toast.error(`Algo deu errado!\nerror:${error}`);
    }
  }
  return (
    <Container>
      <Top>
        <h1>Edição de aluno</h1>
        <aside>
          <Link to="/alunos">
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
          initialData={student}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <strong>NOME COMPLETO</strong>
          <Input name="name" type="name" placeholder="João da Silva" />
          <strong>ENDEREÇO DE E-MAIL</strong>
          <Input name="email" type="email" placeholder="email@email.com" />
          <Specs>
            <div>
              <strong>Idade</strong>
              <Input name="age" type="text" />
            </div>
            <div>
              <strong>Peso(em kg)</strong>
              <Input name="weight" type="text" />
            </div>
            <div>
              <strong>Altura</strong>
              <Input name="height" type="text" />
            </div>
          </Specs>
        </Form>
      </Content>
    </Container>
  );
}

StudentEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

StudentEdit.defaultProps = {
  location: {
    state: {},
  },
};
