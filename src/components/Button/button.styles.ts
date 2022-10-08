import styled, { css } from 'styled-components';

export const ButtonWrapper = styled.button<{
  isLoading?: boolean;
  primary?: boolean;
  fullWidth?: boolean;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;
  min-height: 26px;
  max-width: max-content;
  width: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  border: none;
  outline: none;
  padding: 6px 12px;
  transition: all 0.3s;
  font-size: ${({ theme }) => theme.typography.md};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.darken};
  }

  &:disabled,
  &:disabled:hover {
    cursor: inherit;
    background-color: ${({ theme }) => theme.palette.grey.main};
    color: ${({ theme }) => theme.palette.common.white};
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: inherit;
      background-color: ${({ theme }) => theme.palette.grey.main};
      color: ${({ theme }) => theme.palette.common.white};
      pointer-events: none;
    `};

  ${({ primary }) =>
    primary &&
    css`
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.contrastText};
    `};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      max-width: inherit;
    `};
`;

export const HideOnLoading = styled.div<{ isLoading?: boolean }>`
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;
