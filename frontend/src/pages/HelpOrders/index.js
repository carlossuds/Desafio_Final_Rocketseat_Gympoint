/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModalProvider } from 'styled-react-modal';
import { toast } from 'react-toastify';

import {
  Container,
  Top,
  ContentHeader,
  Content,
  Help,
  Answer,
  ModalContainer,
  StyledModal,
  Question,
  Input,
} from './styles';

import api from '../../services/api';

export default function HelpOrders() {
  const [helps, setHelps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalHelp, setModalHelp] = useState({});

  const id = useSelector(state => state.user.profile.id);

  useEffect(() => {
    async function loadHelp() {
      const response = await api.get(`help-orders/${id}`);

      const unanswered = [];

      response.data.map(data => (data.answer ? null : unanswered.push(data)));

      setHelps(unanswered);
    }
    loadHelp();
  }, [id, isOpen]);

  function toggleModal(help) {
    setIsOpen(!isOpen);
    setLoading(false);
    if (help) {
      setModalHelp(help);
    }
  }

  async function submitAnswer() {
    setLoading(!loading);
    try {
      await api.put(`help-orders/${modalHelp.id}`, {
        answer: document.getElementById('answer').value,
      });
      toast.success('Resposta enviada com sucesso!');

      setIsOpen(!isOpen);
    } catch (err) {
      toast.error('Ops! Ocorreu um erro.');
    }
  }

  return (
    <Container>
      <Top>
        <h1>Pedidos de auxílio</h1>
        <aside />
      </Top>

      <Content>
        <ContentHeader>
          <strong>ALUNO</strong>
        </ContentHeader>

        <ul>
          {helps.map(help => (
            <Help key={help.id}>
              <span>{help.student.name}</span>
              <Link onClick={() => toggleModal(help)}>
                <Answer>responder</Answer>
              </Link>
            </Help>
          ))}
        </ul>
      </Content>

      <ModalProvider>
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <ModalContainer>
            <strong>PERGUNTA DO ALUNO</strong>
            <Question>{modalHelp.question}</Question>
            <strong>SUA RESPOSTA</strong>
            <form>
              <Input
                id="answer"
                name="answer"
                rows={5}
                maxLength={250}
                placeholder="Escreva a resposta aqui"
                style={{ fontFamily: ' Roboto, sans-serif', fontSize: 16 }}
              />

              {loading ? (
                <span>Aguarde...</span>
              ) : (
                <button type="button" onClick={submitAnswer}>
                  Responder aluno
                </button>
              )}
            </form>
          </ModalContainer>
        </StyledModal>
      </ModalProvider>
    </Container>
  );
}
