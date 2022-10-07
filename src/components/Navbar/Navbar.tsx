import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '@public/static/icons/logo.svg';
import {
  NavbarItems,
  NavbarLeftItems,
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

  const getUserOrLoginMenu = useMemo(() => {
    if (!accessToken) {
      return <Link to={PATH_AUTH.login}>Log in</Link>;
    }
    return (
      <>
        <NavLink to={PATH_APP.blog.root}>My Articles</NavLink>
        <NavLink to={PATH_APP.blog.addBlog}>Create Article</NavLink>
        <UserMenu />
      </>
    );
  }, [accessToken]);
  console.log(height);
  return (
    <>
      <NavbarWrapper ref={navbarRef}>
        <NavbarItems>
          <NavbarLeftItems>
            <NavLink to={PATH_APP.root}>
              <Logo width="32px" height="32px" />
            </NavLink>
            <NavLink to={PATH_APP.root}>Recent Articles</NavLink>
            <NavLink to={PATH_APP.about}>About</NavLink>
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
