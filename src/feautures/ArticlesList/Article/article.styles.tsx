import { Link } from 'react-router-dom';
import { Flex } from '@src/components/styled';
import { deviceMaxWidth } from '@src/utils/theme';
import styled from 'styled-components';

export const ArticleWrapper = styled(Link)`
  width: 100%;
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  gap: ${({ theme }) => theme.spacing.common * 3}px;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.darken};
  }

  @media ${deviceMaxWidth.phone} {
    flex-direction: column;
    height: inherit;
  }
`;

export const ArticleImageWrapper = styled.div`
  width: 272px;
  height: 244px;
  flex-shrink: 0;

  @media ${deviceMaxWidth.phone} {
    width: 100%;
  }
`;

export const ArticleContentWrapper = styled(Flex)`
  max-width: 320px;
`;
