import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/user';
import authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeUser = (userData: any): User => {
  if (!userData) return userData;
  return {
    ...userData,
    _id: userData._id || userData.id,
    fullName: userData.fullName || userData.name || '',
    role: userData.role === 'user' ? 'customer' : userData.role,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);


  const fetchProfile = async () => {
    try {
      const response = await authService.getProfile();
      const result = response.data;

      let userData: User | null = null;

      if (result?.status === 'success' && result.data) {
        userData = normalizeUser(result.data);
      } else if (
        result &&
        ('id' in result || '_id' in result || 'email' in result)
      ) {
        userData = normalizeUser(result);
      }

      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        logout();
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (token) {
      if (savedUser && savedUser !== 'undefined') {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error('Failed to parse saved user:', e);
          logout();
        }
        setLoading(false);
        fetchProfile();
      } else {
        fetchProfile();
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);


  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await authService.login({ email, password });

      const result = response.data;

      if (result?.status !== 'success' || !result.data?.user || !result.data?.token) {
        throw new Error('Đăng nhập thất bại');
      }

      const { token: newToken, user: userData } = result.data;
      const normalized = normalizeUser(userData);

      localStorage.setItem('token', newToken);
      localStorage.setItem('accessToken', newToken);
      localStorage.setItem('user', JSON.stringify(normalized));

      setToken(newToken);
      setUser(normalized);

      return normalized;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Đăng nhập thất bại'
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };


  const refreshProfile = async () => {
    if (token) {
      await fetchProfile();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
