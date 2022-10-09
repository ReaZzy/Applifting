import styled, { css } from 'styled-components';

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.grey.light};
  color: ${({ theme }) => theme.palette.grey.main};
  padding: 6px 12px;
  border-radius: 4px;
  outline: none;
  font-size: ${({ theme }) => theme.typography.md};
  color: ${({ theme }) => theme.palette.typography.main};
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.palette.error.main};
      color: ${({ theme }) => theme.palette.error.main};
    `};
`;
