import PropTypes from 'prop-types';
import Anchor from '@ui/anchor';
import clsx from 'clsx';
import SubMenu from './submenu';
import MegaMenu from './megamenu';
import { Menu } from '../../../types/menu';

type Props = {
  menu: Menu[];
};

const MainMenu = ({ menu }: Props) => (
  <ul className="mainmenu">
    {menu.map((nav: Menu) => (
      <li
        key={nav.id}
        className={clsx(
          !!nav.submenu && 'has-droupdown has-menu-child-item',
          !!nav.megamenu && 'with-megamenu'
        )}
      >
        <Anchor className="its_new" path={nav.path}>
          {nav.text}
        </Anchor>
        {nav?.submenu && <SubMenu menu={nav.submenu} />}
        {nav?.megamenu && <MegaMenu menu={nav.megamenu} />}
      </li>
    ))}
  </ul>
);

MainMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MainMenu;
