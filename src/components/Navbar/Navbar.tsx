import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@public/static/icons/logo.svg';
import {
  NavbarItems,
  NavbarLeftItems,
  NavbarMargin,
  NavbarRightItems,
  NavbarWrapper,
} from '@src/components/Navbar/navbar.styles';
import { useResize } from '@src/hooks/useResize';
import { PATH_APP, PATH_AUTH } from '@src/router/paths';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = React.memo(() => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navbarMarginBottom, setNavbarMarginBottom] = useState(
    navbarRef.current?.clientHeight,
  );

  useResize(() => {
    setNavbarMarginBottom(navbarRef.current?.clientHeight);
  });

  useLayoutEffect(() => {
    setNavbarMarginBottom(navbarRef.current?.clientHeight);
  }, []);

  return (
    <>
      <NavbarWrapper ref={navbarRef}>
        <NavbarItems>
          <NavbarLeftItems>
            <Link to={PATH_APP.blog.root}>
              <Logo width="32px" height="32px" />
            </Link>
            <Link to={PATH_APP.blog.root}>Recent Articles</Link>
            <Link to={PATH_APP.about}>About</Link>
          </NavbarLeftItems>
          <NavbarRightItems>
            <Link to={PATH_AUTH.login}>Log in</Link>
          </NavbarRightItems>
        </NavbarItems>
      </NavbarWrapper>
      <NavbarMargin margin={navbarMarginBottom} />
    </>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
