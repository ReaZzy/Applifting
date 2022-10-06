import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@src/components/Navbar/Navbar';
import { Wrapper } from '@src/layouts/default.layout.styles';

interface DefaultLayoutProps {
  children?: React.ReactElement;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <Navbar />
      {children ?? <Outlet />}
    </Wrapper>
  );
};

export default DefaultLayout;
