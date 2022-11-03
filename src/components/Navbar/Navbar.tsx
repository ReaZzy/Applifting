import React, { useMemo, useRef } from 'react';
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

interface NavLinkProps {
  path: string;
  content: React.ReactElement | string;
  primaryLink?: boolean;
}
const NavLink: React.FC<NavLinkProps> = React.memo(
  ({ path, content, primaryLink }) => {
    return (
      <span>
        <NavbarLink className={primaryLink ? 'primary' : ''} to={path} end>
          {content}
        </NavbarLink>
      </span>
    );
  },
);

const Navbar: React.FC = React.memo(() => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const accessToken = useTypedSelector(accessTokenSelector);
  const { height } = useResize(navbarRef);

  const getUserOrLoginMenu = useMemo(() => {
    if (!accessToken) {
      return <NavLink content="Log in" path={PATH_AUTH.login} />;
    }
    return (
      <>
        <NavLink content="My Articles" path={PATH_APP.article.root} />
        <NavLink
          primaryLink
          content="Create Article"
          path={PATH_APP.article.addArticle}
        />
        <UserMenu />
      </>
    );
  }, [accessToken]);

  return (
    <>
      <NavbarWrapper ref={navbarRef}>
        <NavbarItems>
          <NavbarLeftItems>
            <NavLink
              content={<Logo width="32px" height="32px" />}
              path={PATH_APP.root}
            />
            <NavLink content="Recent Articles" path={PATH_APP.root} />
            <NavLink content="About" path={PATH_APP.about} />
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
