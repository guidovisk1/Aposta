import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import { api, endpoints } from '../../utils';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}
interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const token = localStorage.getItem('@GOIT:token');
      const user = localStorage.getItem('@GOIT:user');

      if (token && user) {
        setData({ token, user: JSON.parse(user) });
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post(endpoints.USERS.AUTH, {
      email,
      senha: password,
    });

    const { token, readUsuarioDto } = response.data;

    localStorage.setItem('@GOIT:token', token);
    localStorage.setItem('@GOIT:user', JSON.stringify(readUsuarioDto));

    setData({ token, user: { ...readUsuarioDto } });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@GOIT:token');
    localStorage.removeItem('@GOIT:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
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
