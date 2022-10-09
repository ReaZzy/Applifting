import styled from 'styled-components';

export const SpinnerItem = styled.div<{ smaller?: boolean }>`
  width: ${({ smaller }) => (smaller ? '12px' : '64px')};
  height: ${({ smaller }) => (smaller ? '12px' : '64px')};
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${({ theme }) => theme.palette.primary.main} transparent
    transparent transparent;

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerRing = styled.div<{ smaller?: boolean }>`
  height: ${({ smaller }) => (smaller ? '12px' : '64px')};
  width: ${({ smaller }) => (smaller ? '12px' : '64px')};
  position: absolute;
  ${SpinnerItem} {
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;
