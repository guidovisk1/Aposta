import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';

import AuthProvider from '.';
import { useAuth } from './auth';

import '@testing-library/jest-dom';

jest.mock('axios');

interface User {
  cod_grupousuarios: string;
  cod_usuario: string;
  custo_hora: number;
  email: string;
  funcao: string;
  grupoUsuarios: string | null;
  matricula: string;
  nome: string;
  senha: string;
  setor: string;
}

describe('Testing Auth Hook', () => {
  let userMock = {};
  const mockSignInResponse = {
    readUsuarioDto: {
      cod_usuario: 'USU001',
      cod_grupousuarios: 'GU001',
      grupoUsuarios: null,
      nome: 'Godoy',
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ29kb3lAYWRtaW4uZ29pdCIsInJvbGUiOiJhZG1pbiBhcHJvdmFkb3IiLCJuYmYiOjE2NDk1MDU3NDgsImV4cCI6MTY0OTUzNDU0OCwiaWF0IjoxNjQ5NTA1NzQ4fQ.I0AGu_gi4X5j0djAPsnhaYHGrFw_NgbMS4F8K99eGyo',
  };
  const signIn = jest.fn(() => mockSignInResponse);
  const signOut = jest.fn();

  beforeAll(() => {
    const user = {
      cod_grupousuarios: 'GU001',
      cod_usuario: 'USU001',
      custo_hora: 2000,
      email: 'godoy@admin.goit',
      funcao: 'admin aprovador',
      grupoUsuarios: null,
      matricula: 'M001',
      nome: 'Godoy',
      senha: '',
      setor: 'Dev',
    } as User;
    userMock = user;
  });

  test('Should use auth', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(typeof result.current.signIn).toBe('function');
    expect(typeof result.current.signOut).toBe('function');
    expect(typeof result.current.loading).toBe('boolean');
    expect(result.current.loading).toEqual(false);
  });

  test('Should call signIn and populate user and token', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

    const { result } = renderHook(() => useAuth(), { wrapper });
    const tokenMock = 'sereeredj-rereer';

    signIn();

    result.current.user = userMock;
    localStorage.setItem('@GOIT:token', tokenMock);
    localStorage.setItem('@GOIT:user', JSON.stringify(userMock));

    expect(signIn).toHaveBeenCalled();
    expect(result.current.user).toEqual(userMock);
    expect(localStorage).toHaveProperty('@GOIT:token');
    expect(localStorage).toHaveProperty('@GOIT:user');
  });

  test('Should call signOut and remove user and token from localStorage', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

    const { result } = renderHook(() => useAuth(), { wrapper });

    signOut();
    result.current.user = {};
    localStorage.removeItem('@GOIT:token');
    localStorage.removeItem('@GOIT:user');

    expect(signOut).toHaveBeenCalled();
    expect(result.current.user).toEqual({});
    expect(localStorage).not.toHaveProperty('@GOIT:token');
    expect(localStorage).not.toHaveProperty('@GOIT:user');
  });
});
