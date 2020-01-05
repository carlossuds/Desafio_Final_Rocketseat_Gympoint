/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  Container,
  Top,
  ContentHeader,
  Content,
  Student,
  Edit,
  Delete,
} from './styles';
import api from '../../services/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [x, setX] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      setStudents(response.data);
    }
    loadStudents();
  }, [x]);

  async function handleDelete(id) {
    try {
      await api.delete(`students/${id}`);
      setX(!x);
      toast.success('Aluno deletado com sucesso');
    } catch (err) {
      toast.error('Ops! Ocorreu um erro.');
    }
  }

  return (
    <Container>
      <Top>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Link to="/cadastro">
            <button type="submit">CADASTRAR</button>
          </Link>
          <Input
            id="busca"
            name="busca"
            onChange={() =>
              setInputValue(document.getElementById('busca').value)
            }
            type="text"
            placeholder="Buscar aluno"
          />
        </aside>
      </Top>

      <Content>
        <ContentHeader>
          <strong>NOME</strong>
          <strong>E-MAIL</strong>
          <strong>IDADE</strong>
        </ContentHeader>

        <ul>
          {students
            .filter(
              student =>
                inputValue === '' ||
                student.name.toLowerCase().includes(inputValue.toLowerCase()),
            )
            .map(student => (
              <Student key={student.id}>
                <span>{student.name}</span>
                <span>{student.email}</span>
                <span>{student.age}</span>
                <div>
                  <Link to={{ pathname: '/editaraluno', state: { student } }}>
                    <Edit>editar</Edit>
                  </Link>
                  <Link onClick={() => handleDelete(student.id)}>
                    <Delete>apagar</Delete>
                  </Link>
                </div>
              </Student>
            ))}
        </ul>
      </Content>
    </Container>
  );
}
