import React, { createContext, useContext, useReducer } from 'react';

// Ações do carrinho
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// Estado inicial do carrinho
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer para gerenciar o estado do carrinho
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Se o item já existe, aumenta a quantidade
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Se o item não existe, adiciona ao carrinho
        updatedItems = [
          ...state.items,
          { ...action.payload, quantidade: 1 }
        ];
      }

      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantidade,
        0
      );
      const totalPrice = updatedItems.reduce(
        (total, item) => total + parseFloat(item.preco.replace(',', '.')) * item.quantidade,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantidade,
        0
      );
      const totalPrice = updatedItems.reduce(
        (total, item) => total + parseFloat(item.preco.replace(',', '.')) * item.quantidade,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantidade: action.payload.quantidade }
          : item
      ).filter(item => item.quantidade > 0); // Remove itens com quantidade 0

      const totalItems = updatedItems.reduce(
        (total, item) => total + item.quantidade,
        0
      );
      const totalPrice = updatedItems.reduce(
        (total, item) => total + parseFloat(item.preco.replace(',', '.')) * item.quantidade,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

// Contexto do carrinho
const CartContext = createContext();

// Provider do contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
  };

  const updateQuantity = (itemId, quantidade) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id: itemId, quantidade } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getItemQuantity = (itemId) => {
    const item = state.items.find(item => item.id === itemId);
    return item ? item.quantidade : 0;
  };

  const isItemInCart = (itemId) => {
    return state.items.some(item => item.id === itemId);
  };

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isItemInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export default CartContext;

