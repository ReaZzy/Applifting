import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  palette: {
    common: {
      black: '#222831',
      white: '#ffffff',
    },
    primary: {
      main: '#f59e0b',
      darken: '#d97706',
      contrastText: '#ffffff',
    },
    grey: {
      thin: '#F8F9FA',
      light: '#DFDFDF',
      main: '#6C757D',
    },
    secondary: {
      main: '#fde047',
      darken: '#facc15',
      contrastText: '#1f2937',
    },
    error: {
      light: '#fca5a5',
      main: '#ef4444',
    },
    typography: {
      light: '#6b7280',
      main: '#111827',
    },
  },
  spacing: {
    common: 8,
  },
  screen: {
    phone: '690px',
    tablet: '1024px',
    desktop: '1440px',
  },
  typography: {
    sm: '12px',
    md: '14px',
    xl: '16px',
    xxl: '22px',
  },
  shadow: {
    common: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    darken: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
  zIndex: {
    navbar: 10,
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
