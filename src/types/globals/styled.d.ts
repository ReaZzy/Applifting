import 'styled-components';

interface Palette {
  main: string;
  contrastText: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      common: {
        black: string;
        white: string;
      };
      grey: {
        thin: string;
        light: string;
        main: string;
      };
      primary: Palette;
      secondary: Palette;
      error: {
        light: string;
        main: string;
      };
      typography: {
        light: string;
        main: string;
      };
    };
    spacing: {
      common: number;
    };
    screen: {
      phone: string;
      tablet: string;
      desktop: string;
    };
    typography: {
      sm: string;
      md: string;
      xl: string;
      xxl: string;
    };
    shadow: {
      common: string;
      darken: string;
    };
  }
}
