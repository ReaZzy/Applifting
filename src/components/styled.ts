import styled, { css } from 'styled-components';

export const Heading = styled.h3`
  font-size: ${({ theme }) => theme.typography.xl};
  font-weight: bold;
`;
export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.xxl};
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

export const Flex = styled.div<{
  flexDirection?: string;
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
  gap: ${({ gap }) => gap ?? '0'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
  align-items: ${({ alignItems }) => alignItems ?? 'start'};
`;
