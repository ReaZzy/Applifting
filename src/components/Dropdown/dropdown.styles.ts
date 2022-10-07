import styled from 'styled-components';

export const DropdownMenu = styled.div`
  position: relative;
  cursor: pointer;
`;

export const DropdownMenuIdle = styled.div``;

export const DropdownMenuList = styled.ul`
  position: absolute;
  width: max-content;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  border-radius: 8px;
  justify-self: flex-end;
  right: 0;
`;

export const DropdownMenuItem = styled.li`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.common * 2}px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.light};
  }
`;
