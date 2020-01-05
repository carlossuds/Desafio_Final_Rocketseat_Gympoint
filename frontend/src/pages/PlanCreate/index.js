import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';

import { Container, Top, Content, Back, Save, Specs } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number().required('A duração é obrigatória'),
  price: Yup.number().required('O preço é obrigatório'),
});

export default function PlanCreate() {
  async function handleCreate(data) {
    try {
      await api.post('plans', data);
      toast.success('Plano cadastrado com sucesso!');
      history.push('/planos');
    } catch (err) {
      toast.error(`Algo deu errado: ${err}`);
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
        <h1>Cadastro de plano</h1>
        <aside>
          <Link to="/planos">
            <Back type="button">VOLTAR</Back>
          </Link>
          <Save form="form" type="submit">
            SALVAR
          </Save>
        </aside>
      </Top>

      <Content>
        <Form id="form" schema={schema} onSubmit={handleCreate}>
          <strong>TÍTULO DO PLANO</strong>
          <Input name="title" type="text" />
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
