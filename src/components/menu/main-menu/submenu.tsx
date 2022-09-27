import Anchor from '@ui/anchor';
import { SubMenu as SubMenuType } from '@types';

type Props = {
  menu: SubMenuType[];
};

const SubMenu = ({ menu }: Props) => (
  <ul className="submenu">
    {menu.map((nav: SubMenuType) => (
      <li key={nav.id}>
        <Anchor path={nav.path} className={nav.isLive ? 'live-expo' : ''}>
          {nav.text}
          {nav?.icon && <i className={`feather ${nav.icon}`} />}
        </Anchor>
      </li>
    ))}
  </ul>
);

export default SubMenu;
