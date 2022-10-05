import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '@src/router/router';
import { defaultTheme } from '@src/utils/theme';
import { ThemeProvider } from 'styled-components';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
