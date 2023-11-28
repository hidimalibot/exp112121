// ProductContext.js
import React, { createContext, useContext, useReducer } from 'react';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { productList: [...state.productList, action.payload] };
    case 'EDIT_PRODUCT':
      return {
        productList: state.productList.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    default:
      return state;
  }
};

const ProductProvider = ({ children }) => {
  const initialState = { productList: [] };
  const [state, dispatch] = useReducer(productReducer, initialState);

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: { ...product, id: Date.now() } });
  };

  const editProduct = (product) => {
    dispatch({ type: 'EDIT_PRODUCT', payload: product });
  };

  return (
    <ProductContext.Provider value={{ state, addProduct, editProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export { ProductProvider, useProduct };
