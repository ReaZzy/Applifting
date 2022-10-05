import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AxiosInterceptor from '@src/hocs/AxiosInterceptor';
import Router from '@src/router/router';
import { defaultTheme } from '@src/utils/theme';
import { ThemeProvider } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AxiosInterceptor>
          <Router />
        </AxiosInterceptor>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
