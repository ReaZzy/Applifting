import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles } from '@src/components/global.styles';
import AxiosInterceptor from '@src/hocs/AxiosInterceptor';
import AppRouter from '@src/router/router';
import { store } from '@src/store/store';
import { defaultTheme } from '@src/utils/theme';
import { ThemeProvider } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <AxiosInterceptor>
            <AppRouter />
          </AxiosInterceptor>
        </Provider>
        <ToastContainer />
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
