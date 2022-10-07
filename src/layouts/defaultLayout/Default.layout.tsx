import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@src/components/Navbar/Navbar';
import {
  ContentWrapper,
  Wrapper,
} from '@src/layouts/defaultLayout/default.layout.styles';

interface DefaultLayoutProps {
  children?: React.ReactElement;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <Navbar />
      <ContentWrapper>{children ?? <Outlet />}</ContentWrapper>
    </Wrapper>
  );
};

export default DefaultLayout;
