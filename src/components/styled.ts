import styled, { css } from 'styled-components';

export const Heading = styled.h3`
  font-size: ${({ theme }) => theme.typography.xl};
  font-weight: bold;
  line-height: 28px;
`;
export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.xxl};
  font-weight: bold;
  line-height: 48px;
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.typography.md};
  line-height: 24px;
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
  width: 100%;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
  gap: ${({ gap }) => gap ?? '0'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
  align-items: ${({ alignItems }) => alignItems ?? 'start'};
`;

export const Image = styled.img<{
  objectFit?: string;
  width?: string | number;
  height?: string | number;
  maxHeight?: string;
  maxWidth?: string;
}>`
  object-fit: ${({ objectFit }) => objectFit ?? 'cover'};
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '100%'};
  max-height: ${({ maxHeight }) => maxHeight ?? 'inherit'};
  max-width: ${({ maxWidth }) => maxWidth ?? 'inherit'};
`;

export const InputLabel = styled.p<{ hasError?: boolean }>`
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacing.common}px;
  font-size: ${({ theme }) => theme.typography.md};
  color: ${({ theme }) => theme.palette.typography.main};
  ${({ hasError }) =>
    hasError &&
    css`
      color: ${({ theme }) => theme.palette.error.main};
    `}
`;

export const ErrorMessageText = styled.span`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.palette.error.main};
`;

export const InvisibleElement = styled.div`
  display: inline-block;
  width: 0;
  height: 0;
  visibility: hidden;
`;
