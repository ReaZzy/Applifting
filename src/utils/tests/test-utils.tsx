import { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '@src/api/queryClient';
import { store } from '@src/store/store';
import { defaultTheme } from '@src/utils/theme';
import { queries, render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) =>
  render(
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{ui}</Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>,
    {
      queries: { ...queries },
      ...options,
    },
  );

export * from '@testing-library/react';
export { customRender as render };
