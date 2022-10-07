import React from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown, {
  DropdownActionType,
} from '@src/components/Dropdown/Dropdown';
import { PATH_APP } from '@src/router/paths';
import {
  accessTokenSelector,
  setAccessToken,
} from '@src/store/slices/auth.slice';
import { useTypedDispatch, useTypedSelector } from '@src/store/store.hooks';

const UserMenu: React.FC = React.memo(() => {
  // I don't know what else I can show to the user except of his token.
  // We need some more data from BE
  const accessToken = useTypedSelector(accessTokenSelector);
  const dispatch = useTypedDispatch();

  // don't use memo because object is too small, and it's easier to generate it than use memo
  const userMenuActions: Array<DropdownActionType> = [
    {
      component: <NavLink to={PATH_APP.blog.root}>My Articles</NavLink>,
    },
    {
      component: <NavLink to={PATH_APP.blog.addBlog}>Create Article</NavLink>,
    },
    {
      component: <div>Logout</div>,
      action: () => dispatch(setAccessToken(null)),
    },
  ];
  return (
    <Dropdown
      menuButton={`${accessToken?.split('-')[0]}`}
      actions={userMenuActions}
    />
  );
});

UserMenu.displayName = 'UserMenu';
export default UserMenu;
