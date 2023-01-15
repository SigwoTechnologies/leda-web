import clsx from 'clsx';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from '@ui/offcanvas';
import Anchor from '@ui/anchor';
import Logo from '@components/logo';
import { slideToggle, slideUp } from '@utils/methods';
import SubMenu from './submenu';
import MegaMenu from './megamenu';
import { LogoType } from '../../../types/logo';
import { MenuType } from '../../../types/menu';

type Props = {
  isOpen: boolean;
  onClick: () => void;
  menu: MenuType[];
  logo: LogoType[];
};

const MobileMenu = ({ isOpen, onClick, menu, logo }: Props) => {
  const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const eventTarget = e.target as HTMLElement;
    const { parentElement, nextElementSibling } = eventTarget;

    slideToggle(nextElementSibling);

    parentElement?.childNodes?.forEach((child: any) => {
      if (child.id === eventTarget?.parentElement?.id) return;
      if (child.classList.contains('has-children')) {
        slideUp(child.lastElementChild);
      }
    });
  };
  return (
    <Offcanvas isOpen={isOpen} onClick={onClick}>
      <OffcanvasHeader onClick={onClick}>
        <Logo logo={logo} />
      </OffcanvasHeader>
      <OffcanvasBody>
        <nav>
          <ul className="mainmenu">
            {menu?.map((nav: MenuType) => {
              const hasChildren = !!nav.submenu || !!nav.megamenu;
              return (
                <li
                  className={clsx(
                    !!nav.submenu && 'has-droupdown',
                    !!nav.megamenu && 'with-megamenu',
                    hasChildren && 'has-children'
                  )}
                  id={nav.id?.toString()}
                  key={nav.id}
                >
                  <Anchor
                    className="nav-link its_new"
                    path={hasChildren ? '#!' : nav.path}
                    onClick={
                      hasChildren ? onClickHandler : (e: React.MouseEvent<HTMLAnchorElement>) => e
                    }
                  >
                    {nav.text}
                  </Anchor>
                  {nav?.submenu && <SubMenu menu={nav.submenu} />}
                  {nav?.megamenu && <MegaMenu menu={nav.megamenu} />}
                </li>
              );
            })}
          </ul>
        </nav>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default MobileMenu;
