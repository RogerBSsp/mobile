import React, { createContext, useContext, useReducer } from 'react';

// Ações dos favoritos
const FAVORITES_ACTIONS = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES',
};

// Estado inicial dos favoritos
const initialState = {
  favorites: [],
  totalFavorites: 0,
};

// Reducer para gerenciar o estado dos favoritos
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case FAVORITES_ACTIONS.ADD_FAVORITE: {
      const existingFavorite = state.favorites.find(
        item => item.id === action.payload.id
      );

      if (existingFavorite) {
        // Se já está nos favoritos, não adiciona novamente
        return state;
      }

      const updatedFavorites = [...state.favorites, action.payload];

      return {
        ...state,
        favorites: updatedFavorites,
        totalFavorites: updatedFavorites.length,
      };
    }

    case FAVORITES_ACTIONS.REMOVE_FAVORITE: {
      const updatedFavorites = state.favorites.filter(
        item => item.id !== action.payload
      );

      return {
        ...state,
        favorites: updatedFavorites,
        totalFavorites: updatedFavorites.length,
      };
    }

    case FAVORITES_ACTIONS.CLEAR_FAVORITES:
      return initialState;

    default:
      return state;
  }
};

// Contexto dos favoritos
const FavoritesContext = createContext();

// Provider do contexto
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addFavorite = (item) => {
    dispatch({ type: FAVORITES_ACTIONS.ADD_FAVORITE, payload: item });
  };

  const removeFavorite = (itemId) => {
    dispatch({ type: FAVORITES_ACTIONS.REMOVE_FAVORITE, payload: itemId });
  };

  const clearFavorites = () => {
    dispatch({ type: FAVORITES_ACTIONS.CLEAR_FAVORITES });
  };

  const isFavorite = (itemId) => {
    return state.favorites.some(item => item.id === itemId);
  };

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
      return false; // Removido dos favoritos
    } else {
      addFavorite(item);
      return true; // Adicionado aos favoritos
    }
  };

  const value = {
    ...state,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook para usar o contexto dos favoritos
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;

