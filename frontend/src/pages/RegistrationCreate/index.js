import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import api from '../../services/api';
import { Container, Top, Content, Back, Save, Specs } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  title: Yup.string().required('O título é obrigatório'),
  start_date: Yup.date().required('A data é obrigatória'),
});

const filter = async inputValue => {
  const response = await api.get('students');
  const students = [];
  response.data.map(r => students.push({ value: r.name, label: r.name }));
  return students.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filter(inputValue));
    }, 1000);
  });

export default function RegistrationCreate() {
  const [plans, setPlans] = useState([]);
  const [endDate, setEndDate] = useState('');

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
        planos.push(newP);
      });

      setPlans(planos);
    }
    loadPlans();
  }, []);

  async function handleSubmit() {
    try {
      console.tron.log();
      toast.success('Matrícula cadastrada com sucesso!');
      // history.push('/matriculas');
    } catch (err) {
      toast.error(`Algo deu errado: ${err}`);
      console.log(err);
    }
  }
  const titles = [];
  plans.map(p => titles.push({ value: p.id, label: p.title }));

  return (
    <Container>
      <Top>
        <h1>Cadastro de matrícula</h1>
        <aside>
          <Link to="/alunos">
            <Back type="button">VOLTAR</Back>
          </Link>
          <Save type="button" onClick={handleSubmit}>
            SALVAR
          </Save>
        </aside>
      </Top>

      <Content>
        <Form id="form" schema={schema}>
          <strong>ALUNO</strong>
          <AsyncSelect
            id="name"
            name="name"
            placeholder="Buscar usuário"
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
          />
          <Specs>
            <div>
              <strong>PLANO</strong>
              <Select
                id="title"
                name="title"
                placeholder="Selecione o plano"
                options={titles}
              />
            </div>
            <div>
              <strong>DATA DE INÍCIO</strong>
              <Input
                id="start"
                value={format(new Date(), 'dd/MM/yyyy')}
                onChange={() => {}}
                name="start_date"
                type="text"
              />
            </div>
            <div>
              <strong>DATA DE TÉRMINO</strong>
              <Input
                id="end"
                value={endDate}
                name="end_date"
                type="text"
                disabled
              />
            </div>
            <div>
              <strong>VALOR FINAL</strong>
              <Input name="total" type="text" disabled />
            </div>
          </Specs>
        </Form>
      </Content>
    </Container>
  );
}
