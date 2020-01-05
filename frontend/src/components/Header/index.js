/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo-lateral.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <Link to="/alunos">ALUNOS</Link>
          <Link to="/planos">PLANOS</Link>
          <Link to="/matriculas">MATRICULAS</Link>
          <Link to="/ajuda">PEDIDOS DE AUXÍLIO</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link onClick={handleLogout}>sair do sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
