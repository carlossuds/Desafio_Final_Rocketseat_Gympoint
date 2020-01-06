import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { addMonths, format } from 'date-fns';
import api from '../../services/api';
import history from '../../services/history';
import { Container, Top, Content, Back, Save, Specs } from './styles';

/*const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  title: Yup.string().required('O título é obrigatório'),
  start_date: Yup.date().required('A data é obrigatória'),
});*/

const filter = async inputValue => {
  const response = await api.get('students');
  const students = [];
  response.data.map(r => students.push({ value: r.id, label: r.name }));
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
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    plans.map(p => (p.id === selectedPlanId ? setPrice(p.total) : null));
  }, [selectedPlanId]);

  async function handleClick(student_id, plan_id, start_date) {
    console.log(student_id, plan_id, start_date);
    setLoading(!loading);
    try {
      await api.post('registration', { student_id, plan_id, start_date });
      toast.success('Matrícula criada com sucesso');
      history.push('/matriculas');
    } catch (error) {
      toast.error('Ops! Ocorreu um erro');
    }
  }

  function handleSubmit(data) {
    handleClick(selectedStudentId, selectedPlanId, data.start_date);
  }

  function handleSelectPlan(selectedOption) {
    setSelectedPlanId(selectedOption.value);
    console.log(selectedPlanId);
  }

  function handleSelectStudent(selectedOption) {
    setSelectedStudentId(selectedOption.value);
    console.log(selectedStudentId, plans);
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
          <Save type="submit" loading={loading} disabled={loading} form="form">
            SALVAR
          </Save>
        </aside>
      </Top>

      <Content>
        <Form id="form" onSubmit={handleSubmit}>
          <strong>ALUNO</strong>
          <AsyncSelect
            id="name"
            name="name"
            placeholder="Buscar usuário"
            onChange={handleSelectStudent}
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
          />
          <Specs>
            <div>
              <strong>PLANO</strong>
              <Select
                id="title"
                onChange={handleSelectPlan}
                name="title"
                placeholder="Selecione o plano"
                options={titles}
              />
            </div>
            <div>
              <strong>DATA DE INÍCIO</strong>
              <Input id="start" name="start_date" type="date" />
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
              <Input name="total" value={price} type="text" disabled />
            </div>
          </Specs>
        </Form>
      </Content>
    </Container>
  );
}
