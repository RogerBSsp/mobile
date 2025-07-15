import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ações de autenticação
const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  LOAD_USER: 'LOAD_USER',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
};

// Estado inicial da autenticação
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

// Reducer para gerenciar o estado de autenticação
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    }

    case AUTH_ACTIONS.REGISTER: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    }

    case AUTH_ACTIONS.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    }

    case AUTH_ACTIONS.LOAD_USER: {
      return {
        ...state,
        isAuthenticated: action.payload.user ? true : false,
        user: action.payload.user,
        loading: false,
      };
    }

    case AUTH_ACTIONS.UPDATE_PROFILE: {
      return {
        ...state,
        user: { ...state.user, ...action.payload.updates },
      };
    }

    default:
      return state;
  }
};

// Contexto de autenticação
const AuthContext = createContext();

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Carregar dados do usuário do AsyncStorage na inicialização
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          dispatch({ 
            type: AUTH_ACTIONS.LOAD_USER, 
            payload: { user } 
          });
        } else {
          dispatch({ 
            type: AUTH_ACTIONS.LOAD_USER, 
            payload: { user: null } 
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        dispatch({ 
          type: AUTH_ACTIONS.LOAD_USER, 
          payload: { user: null } 
        });
      }
    };

    loadUser();
  }, []);

  // Salvar dados do usuário no AsyncStorage sempre que mudar
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (state.user) {
          await AsyncStorage.setItem('userData', JSON.stringify(state.user));
        } else {
          await AsyncStorage.removeItem('userData');
        }
      } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
      }
    };

    if (!state.loading) {
      saveUser();
    }
  }, [state.user, state.loading]);

  const login = async (email, password) => {
    try {
      // Simulação de login - em um app real, você faria uma chamada para API
      const users = await AsyncStorage.getItem('registeredUsers');
      const userList = users ? JSON.parse(users) : [];
      
      const user = userList.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        dispatch({ 
          type: AUTH_ACTIONS.LOGIN, 
          payload: { user: userWithoutPassword } 
        });
        return { success: true };
      } else {
        return { success: false, error: 'Email ou senha incorretos' };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro interno. Tente novamente.' };
    }
  };

  const register = async (userData) => {
    try {
      // Verificar se o email já está cadastrado
      const users = await AsyncStorage.getItem('registeredUsers');
      const userList = users ? JSON.parse(users) : [];
      
      const existingUser = userList.find(u => u.email === userData.email);
      if (existingUser) {
        return { success: false, error: 'Este email já está cadastrado' };
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };

      // Salvar na lista de usuários
      userList.push(newUser);
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(userList));

      // Fazer login automático
      const { password: _, ...userWithoutPassword } = newUser;
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER, 
        payload: { user: userWithoutPassword } 
      });

      return { success: true };
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return { success: false, error: 'Erro interno. Tente novamente.' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const updateProfile = (updates) => {
    dispatch({ 
      type: AUTH_ACTIONS.UPDATE_PROFILE, 
      payload: { updates } 
    });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;

