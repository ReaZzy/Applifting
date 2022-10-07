import React, { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuIdle,
  DropdownMenuItem,
  DropdownMenuList,
} from '@src/components/Dropdown/dropdown.styles';
import { RequireOnlyOne } from '@src/types/common.types';

interface ActionType {
  label?: string;
  component?: React.ReactElement;
  action?: () => unknown;
}

export type DropdownActionType = RequireOnlyOne<
  ActionType,
  'label' | 'component'
>;

interface CategoryDropdownProps {
  actions: Array<DropdownActionType>;
  menuButton: React.ReactElement | string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = React.memo(
  ({ actions, menuButton }) => {
    const [isOpen, setIsOpen] = useState<boolean>();

    const getActions = useMemo(() => {
      return actions?.map((action, index) => (
        <DropdownMenuItem
          key={`dropdownItem-${action?.label}-${index}`}
          onClick={
            typeof action.action === 'function' ? action.action : () => {}
          }
        >
          {action.component || action.label}
        </DropdownMenuItem>
      ));
    }, [actions]);

    return (
      <DropdownMenu
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <DropdownMenuIdle>{menuButton}</DropdownMenuIdle>
        {isOpen && <DropdownMenuList>{getActions}</DropdownMenuList>}
      </DropdownMenu>
    );
  },
);

CategoryDropdown.displayName = 'CategoryDropdown';
export default CategoryDropdown;
