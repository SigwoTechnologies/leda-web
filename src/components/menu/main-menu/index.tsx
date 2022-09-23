import PropTypes from 'prop-types';
import Anchor from '@ui/anchor';
import clsx from 'clsx';
import SubMenu from './submenu';
import MegaMenu from './megamenu';

// TODO: Type props
const MainMenu = ({ menu }: any) => (
  <ul className="mainmenu">
    {/* TODO: Type nav */}
    {menu.map((nav: any) => (
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
