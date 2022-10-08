import styled, { css } from 'styled-components';

export const Heading = styled.h3`
  font-size: ${({ theme }) => theme.typography.xl};
  font-weight: bold;
`;

export const Card = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.common.white};
    border-radius: 8px;
    padding: ${theme.spacing.common * 4}px;
    box-shadow: ${theme.shadow.common};
  `}
`;
