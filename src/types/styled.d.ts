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
      primary: Palette;
      secondary: Palette;
    };
  }
}
