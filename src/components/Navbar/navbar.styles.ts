import { NavLink } from 'react-router-dom';
import { deviceMaxWidth, deviceMinWidth } from '@src/utils/theme';
import styled from 'styled-components';

export const NavbarWrapper = styled.nav`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey.thin};
  padding: ${({ theme }) => theme.spacing.common}px 0;
  position: fixed;
  height: max-content;
  display: flex;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.navbar};
`;

export const NavbarItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.screen.tablet};
  margin: ${({ theme }) => theme.spacing.common}px auto;
  padding-left: ${({ theme }) => theme.spacing.common * 2}px;
  padding-right: ${({ theme }) => theme.spacing.common * 2}px;
  justify-content: space-between;

  @media ${deviceMinWidth.tablet} {
    padding: 0;
  }

  @media ${deviceMaxWidth.phone} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.common}px;
  }
`;

const ItemsSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.common * 5}px;

  @media ${deviceMaxWidth.phone} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.common}px;
  }
`;
export const NavbarLink = styled(NavLink)<{
  isActive?: string;
}>`
  color: ${({ theme }) => theme.palette.typography.light};
  &.primary {
    color: ${({ theme }) => theme.palette.primary.main};
  }
  &.active {
    color: ${({ theme }) => theme.palette.typography.main};
  }
  &.active.primary {
    color: ${({ theme }) => theme.palette.primary.darken};
  }
`;

export const NavbarLeftItems = styled(ItemsSection)``;

export const NavbarRightItems = styled(ItemsSection)`
  justify-content: flex-end;
`;

export const NavbarMargin = styled.div<{ margin: number | null }>`
  display: inline-block;
  margin-bottom: ${({ margin }) => `${margin || 56}px`};
`;
