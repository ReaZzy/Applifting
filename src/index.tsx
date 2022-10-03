import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
const RedDiv = styled.div`
  color: red;
`;

const App = () => {
  return <RedDiv>React setyo</RedDiv>;
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
