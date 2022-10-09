import React, { useCallback, useMemo, useRef } from 'react';
import Logo from '@public/static/icons/logo.svg';
import {
  NavbarItems,
  NavbarLeftItems,
  NavbarLink,
  NavbarMargin,
  NavbarRightItems,
  NavbarWrapper,
} from '@src/components/Navbar/navbar.styles';
import UserMenu from '@src/feautures/UserMenu/UserMenu';
import { useResize } from '@src/hooks/useResize';
import { PATH_APP, PATH_AUTH } from '@src/router/paths';
import { accessTokenSelector } from '@src/store/slices/auth.slice';
import { useTypedSelector } from '@src/store/store.hooks';

const Navbar: React.FC = React.memo(() => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const accessToken = useTypedSelector(accessTokenSelector);
  const { height } = useResize(navbarRef);

  const getNavbarLink = useCallback(
    (
      path: string,
      content: React.ReactElement | string,
      primaryLink?: boolean,
    ) => {
      return (
        <span>
          <NavbarLink className={primaryLink ? 'primary' : ''} to={path} end>
            {content}
          </NavbarLink>
        </span>
      );
    },
    [],
  );

  const getUserOrLoginMenu = useMemo(() => {
    if (!accessToken) {
      return getNavbarLink(PATH_AUTH.login, 'Log in');
    }
    return (
      <>
        {getNavbarLink(PATH_APP.article.root, 'My Articles')}
        {getNavbarLink(PATH_APP.article.addArticle, 'Create Article', true)}
        <UserMenu />
      </>
    );
  }, [accessToken, getNavbarLink]);

  return (
    <>
      <NavbarWrapper ref={navbarRef}>
        <NavbarItems>
          <NavbarLeftItems>
            {getNavbarLink(PATH_APP.root, <Logo width="32px" height="32px" />)}
            {getNavbarLink(PATH_APP.root, 'Recent Articles')}
            {getNavbarLink(PATH_APP.about, 'About')}
          </NavbarLeftItems>
          <NavbarRightItems>{getUserOrLoginMenu}</NavbarRightItems>
        </NavbarItems>
      </NavbarWrapper>
      <NavbarMargin margin={height} />
    </>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
