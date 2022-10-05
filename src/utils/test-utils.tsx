import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { defaultTheme } from '@src/utils/theme';
import { queries, render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) =>
  render(
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>
    </BrowserRouter>,
    {
      queries: { ...queries },
      ...options,
    },
  );

export * from '@testing-library/react';
export { customRender as render };
