import Anchor from '@ui/anchor';
import { SubMenuType } from '../../../types/menu';

type Props = {
  menu: SubMenuType[];
};

const SubMenu = ({ menu }: Props) => (
  <ul className="submenu mobile-menu-children">
    {menu.map((nav: SubMenuType) => (
      <li key={nav.id}>
        <Anchor path={nav.path}>
          {nav.text}
          {nav?.icon && <i className={`feather ${nav.icon}`} />}
        </Anchor>
      </li>
    ))}
  </ul>
);

export default SubMenu;
