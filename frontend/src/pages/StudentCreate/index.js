import React from 'react';
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
  age: Yup.number('Insira um número').required('A idade é obrigatória'),
  weight: Yup.number('Insira um número').required('O peso é obrigatório'),
  height: Yup.number('Insira um número').required('A altura é obrigatória'),
});

export default function StudentCreate() {
  async function handleCreate(data) {
    try {
      await api.post('students', data);
      toast.success('Aluno cadastrado com sucesso!');
      history.push('/alunos');
    } catch (err) {
      toast.error(`Algo deu errado: ${err}`);
    }
  }

  return (
    <Container>
      <Top>
        <h1>Cadastro de aluno</h1>
        <aside>
          <Link to="/alunos">
            <Back type="button">VOLTAR</Back>
          </Link>
          <Save form="form" type="submit">
            SALVAR
          </Save>
        </aside>
      </Top>

      <Content>
        <Form id="form" schema={schema} onSubmit={handleCreate}>
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
