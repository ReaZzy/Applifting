import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  palette: {
    common: {
      black: '#222831',
      white: '#ffffff',
    },
    primary: {
      main: '#726a95',
      contrastText: '#ffffff',
    },
    grey: {
      light: '#F8F9FA',
      main: '#aeaeb2',
    },
    secondary: {
      main: '#709fb0',
      contrastText: '#ffffff',
    },
  },
  spacing: {
    common: 8,
  },
  screen: {
    phone: '860px',
    tablet: '1024px',
    desktop: '1440px',
  },
} as const;

export const deviceMaxWidth = {
  phone: `only screen and (max-width: ${defaultTheme.screen.phone})`,
  tablet: `only screen and (max-width: ${defaultTheme.screen.tablet})`,
  desktop: `only screen and (max-width: ${defaultTheme.screen.desktop})`,
};

export const deviceMinWidth = {
  phone: `only screen and (min-width: ${defaultTheme.screen.phone})`,
  tablet: `only screen and (min-width: ${defaultTheme.screen.tablet})`,
  desktop: `only screen and (min-width: ${defaultTheme.screen.desktop})`,
};
