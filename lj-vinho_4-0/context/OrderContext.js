import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ações dos pedidos
const ORDER_ACTIONS = {
  ADD_ORDER: 'ADD_ORDER',
  UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
  CLEAR_ORDERS: 'CLEAR_ORDERS',
  LOAD_ORDERS: 'LOAD_ORDERS',
};

// Estado inicial dos pedidos com dados de demonstração
const initialState = {
  orders: [
    {
      id: '1703123456789',
      items: [
        {
          id: '1',
          name: 'Vinho Tinto Reserva',
          marca: 'Vinícola Premium',
          preco: '89,90',
          quantidade: 2,
          thumbnail: {
            path: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300'
          }
        },
        {
          id: '2',
          name: 'Vinho Branco Seco',
          marca: 'Casa dos Vinhos',
          preco: '65,50',
          quantidade: 1,
          thumbnail: {
            path: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=300'
          }
        }
      ],
      total: 245.30,
      date: '2024-12-15T10:30:00.000Z',
      status: 'Entregue',
      deliveryDate: '2024-12-20T18:00:00.000Z',
    },
    {
      id: '1703987654321',
      items: [
        {
          id: '3',
          name: 'Espumante Rosé',
          marca: 'Adega Especial',
          preco: '125,00',
          quantidade: 1,
          thumbnail: {
            path: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300'
          }
        }
      ],
      total: 140.00,
      date: '2024-12-18T14:15:00.000Z',
      status: 'Enviado',
      deliveryDate: '2024-12-25T16:00:00.000Z',
    },
    {
      id: '1704111222333',
      items: [
        {
          id: '4',
          name: 'Vinho Tinto Suave',
          marca: 'Vinhos do Vale',
          preco: '45,90',
          quantidade: 3,
          thumbnail: {
            path: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300'
          }
        },
        {
          id: '5',
          name: 'Vinho Rosé Doce',
          marca: 'Cantina Familiar',
          preco: '52,80',
          quantidade: 2,
          thumbnail: {
            path: 'https://images.unsplash.com/photo-1574870111867-089ad8a5929e?w=300'
          }
        }
      ],
      total: 258.40,
      date: '2024-12-20T09:45:00.000Z',
      status: 'Em preparação',
      deliveryDate: '2024-12-28T17:30:00.000Z',
    }
  ],
  totalOrders: 3,
};

// Reducer para gerenciar o estado dos pedidos
const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.ADD_ORDER: {
      const newOrder = {
        id: Date.now().toString(),
        items: action.payload.items,
        total: action.payload.total,
        date: new Date().toISOString(),
        status: 'Confirmado',
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias a partir de hoje
      };

      return {
        ...state,
        orders: [newOrder, ...state.orders],
        totalOrders: state.totalOrders + 1,
      };
    }

    case ORDER_ACTIONS.UPDATE_ORDER_STATUS: {
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.orderId
          ? { ...order, status: action.payload.status }
          : order
      );

      return {
        ...state,
        orders: updatedOrders,
      };
    }

    case ORDER_ACTIONS.LOAD_ORDERS: {
      // Mesclar dados de demonstração com dados salvos
      const savedOrders = action.payload.orders || [];
      const demoOrders = initialState.orders;
      
      // Filtrar pedidos salvos que não sejam de demonstração (IDs diferentes)
      const demoIds = demoOrders.map(order => order.id);
      const userOrders = savedOrders.filter(order => !demoIds.includes(order.id));
      
      // Combinar dados de demonstração com pedidos do usuário
      const allOrders = [...demoOrders, ...userOrders];
      
      return {
        ...state,
        orders: allOrders,
        totalOrders: allOrders.length,
      };
    }

    case ORDER_ACTIONS.CLEAR_ORDERS:
      return initialState;

    default:
      return state;
  }
};

// Contexto dos pedidos
const OrderContext = createContext();

// Provider do contexto
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Carregar pedidos do AsyncStorage na inicialização
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedOrders = await AsyncStorage.getItem('userOrders');
        if (savedOrders) {
          const orders = JSON.parse(savedOrders);
          dispatch({ 
            type: ORDER_ACTIONS.LOAD_ORDERS, 
            payload: { orders } 
          });
        } else {
          // Se não há dados salvos, usar apenas os dados de demonstração
          dispatch({ 
            type: ORDER_ACTIONS.LOAD_ORDERS, 
            payload: { orders: [] } 
          });
        }
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        // Em caso de erro, usar apenas os dados de demonstração
        dispatch({ 
          type: ORDER_ACTIONS.LOAD_ORDERS, 
          payload: { orders: [] } 
        });
      }
    };

    loadOrders();
  }, []);

  // Salvar pedidos no AsyncStorage sempre que a lista mudar
  useEffect(() => {
    const saveOrders = async () => {
      try {
        // Filtrar apenas pedidos do usuário (não os de demonstração)
        const demoIds = initialState.orders.map(order => order.id);
        const userOrders = state.orders.filter(order => !demoIds.includes(order.id));
        
        await AsyncStorage.setItem('userOrders', JSON.stringify(userOrders));
      } catch (error) {
        console.error('Erro ao salvar pedidos:', error);
      }
    };

    if (state.orders.length > 0) {
      saveOrders();
    }
  }, [state.orders]);

  const addOrder = (items, total) => {
    dispatch({ 
      type: ORDER_ACTIONS.ADD_ORDER, 
      payload: { items, total } 
    });
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({ 
      type: ORDER_ACTIONS.UPDATE_ORDER_STATUS, 
      payload: { orderId, status } 
    });
  };

  const clearOrders = () => {
    dispatch({ type: ORDER_ACTIONS.CLEAR_ORDERS });
  };

  const getOrderById = (orderId) => {
    return state.orders.find(order => order.id === orderId);
  };

  const getOrdersByStatus = (status) => {
    return state.orders.filter(order => order.status === status);
  };

  const value = {
    ...state,
    addOrder,
    updateOrderStatus,
    clearOrders,
    getOrderById,
    getOrdersByStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

// Hook para usar o contexto dos pedidos
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders deve ser usado dentro de um OrderProvider');
  }
  return context;
};

export default OrderContext;

