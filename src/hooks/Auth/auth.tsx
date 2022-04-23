import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import { api, endpoints } from '../../utils';

interface SignInCredentials {
  email: string;
  password: string;
}

interface UserInfo {
  cod_grupousuarios: string;
  cod_usuario: string;
  custo_hora: number;
  email: string;
  funcao: string;
  grupoUsuarios: string;
  matricula: string;
  nome: string;
  senha: string;
  setor: string;
}
interface AuthState {
  token: string;
  user: UserInfo;
}
interface AuthContextData {
  user: UserInfo;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signed: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GOIT:token') as string;
    const user = localStorage.getItem('@GOIT:user') as string;

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const [loading, _] = useState(true);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post(endpoints.USERS.AUTH, {
      email,
      senha: password,
    });

    const { token, returnUsuarioDto } = response.data;

    localStorage.setItem('@GOIT:token', token);
    localStorage.setItem('@GOIT:user', JSON.stringify(returnUsuarioDto));

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setData({ token, user: { ...returnUsuarioDto } });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@GOIT:token');
    localStorage.removeItem('@GOIT:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        loading,
        signed: Boolean(data.user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
