import { Link } from 'react-router-dom';
import { Flex } from '@src/components/styled';
import styled from 'styled-components';

export const ArticleWrapper = styled(Link)`
  height: 244px;
  width: 100%;
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  gap: ${({ theme }) => theme.spacing.common * 3}px;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.darken};
  }
`;

export const ArticleImageWrapper = styled.div`
  width: 272px;
  flex-shrink: 0;
  height: 100%;
`;

export const ArticleContentWrapper = styled(Flex)`
  max-width: 320px;
`;
