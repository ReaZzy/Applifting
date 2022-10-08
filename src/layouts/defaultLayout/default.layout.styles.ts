import { deviceMinWidth } from '@src/utils/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.palette.common.white};
`;

export const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.screen.tablet};
  width: 100%;
  margin: ${({ theme }) => theme.spacing.common * 2}px auto;
  padding-left: ${({ theme }) => theme.spacing.common * 2}px;
  padding-right: ${({ theme }) => theme.spacing.common * 2}px;

  @media ${deviceMinWidth.tablet} {
    padding: 0;
  }
`;
