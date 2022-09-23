import PropTypes from 'prop-types';
import Anchor from '@ui/anchor';

// TODO: Type props and any types
const SubMenu = ({ menu }: any) => (
  <ul className="submenu mobile-menu-children">
    {menu.map((nav: any) => (
      <li key={nav.id}>
        <Anchor path={nav.path}>
          {nav.text}
          {nav?.icon && <i className={`feather ${nav.icon}`} />}
        </Anchor>
      </li>
    ))}
  </ul>
);

SubMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SubMenu;
