import Anchor from '@ui/anchor';
import { SubMenu } from '@types';
import { Menu } from '../../../types/menu';

type Props = {
  menu: Menu[];
};

const MegaMenu = ({ menu }: Props) => (
  <div className="rn-megamenu">
    <div className="wrapper">
      <div className="row row--0">
        {menu.map((nav: Menu) => (
          <div key={nav.id} className="col-lg-3 single-mega-item">
            {nav?.submenu && (
              <ul className="mega-menu-item">
                {nav.submenu.map((subnav: SubMenu) => (
                  <li key={subnav.id}>
                    <Anchor path={subnav.path}>
                      {subnav.text}
                      {subnav?.icon && <i className={`feather ${subnav.icon}`} />}
                    </Anchor>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MegaMenu;
