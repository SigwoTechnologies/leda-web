import ColorSwitcher from '@components/color-switcher';
import Logo from '@components/logo';
import MainMenu from '@components/menu/main-menu';
import MobileMenu from '@components/menu/mobile-menu';
import UserDropdown from '@components/user-dropdown';
import { useOffcanvas, useSticky } from '@hooks';
import BurgerButton from '@ui/burger-button';
import Button from '@ui/button';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import headerData from '../../data/general/header-01.json';
import menuData from '../../data/general/menu-01.json';
import useMetamask from '../../features/auth/hooks/useMetamask';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import useAppSelector from '../../store/hooks/useAppSelector';
import { NetworkNotice } from './NetworkNotice';

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const sticky = useSticky();
  const { offcanvas, offcanvasHandler } = useOffcanvas();
  const { isConnected } = useAppSelector(selectAuthState);
  const router = useRouter();
  const { connect } = useMetamask();

  const handleWalletConnect = () => {
    if (window.ethereum) {
      connect();
    } else {
      router.push({
        pathname: 'connect',
        query: { callbackUrl: router.pathname.replace('/', '') },
      });
    }
  };

  return (
    <>
      <header
        className={clsx(
          'rn-header haeder-default black-logo-version header--fixed header--sticky',
          sticky && 'sticky',
          className
        )}
      >
        <NetworkNotice />
        <div className="container">
          <div className="header-inner">
            <div className="header-left">
              <Logo logo={headerData.logo} />
              <div className="mainmenu-wrapper">
                <nav id="sideNav" className="mainmenu-nav d-none d-xl-block">
                  <MainMenu menu={menuData} />
                </nav>
              </div>
            </div>
            <div className="header-right">
              {!isConnected && (
                <div className="setting-option header-btn">
                  <div className="icon-box">
                    <Button
                      color="primary-alta"
                      className="connectBtn"
                      size="small"
                      onClick={handleWalletConnect}
                    >
                      Wallet connect
                    </Button>
                  </div>
                </div>
              )}

              {isConnected && (
                <div className="setting-option rn-icon-list user-account">
                  <UserDropdown />
                </div>
              )}
              {/* Uncomment when we implement user notifications */}
              {/* <div className="setting-option rn-icon-list notification-badge">
                <div className="icon-box">
                  <Anchor path={headerData.activity_link}>
                    <i className="feather-bell" />
                    <span className="badge">6</span>
                  </Anchor>
                </div>
              </div> */}
              <div className="setting-option mobile-menu-bar d-block d-xl-none">
                <div className="hamberger">
                  <BurgerButton onClick={offcanvasHandler} />
                </div>
              </div>
              <div id="my_switcher" className="setting-option my_switcher">
                <ColorSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={offcanvas}
        onClick={offcanvasHandler}
        menu={menuData}
        logo={headerData.logo}
      />
    </>
  );
};

export default Header;
