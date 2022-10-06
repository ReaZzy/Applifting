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
        light: string;
      };
      primary: Palette;
      secondary: Palette;
    };
    spacing: {
      common: number;
    };
    screen: {
      phone: string;
      tablet: string;
      desktop: string;
    };
  }
}
