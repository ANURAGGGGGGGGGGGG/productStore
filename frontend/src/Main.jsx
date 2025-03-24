import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Item from './Components/Item/Item';

const Main = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  return (
    <>
      <Nav onAddProduct={handleAddProduct} />
      <Item />
      <Outlet />
    </>
  );
};

export default Main;