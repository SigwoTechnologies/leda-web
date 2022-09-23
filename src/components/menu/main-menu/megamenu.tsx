import PropTypes from 'prop-types';
import Anchor from '@ui/anchor';

// TODO: Type props
const MegaMenu = ({ menu }: any) => (
  <div className="rn-megamenu">
    <div className="wrapper">
      <div className="row row--0">
        {/* Type nav */}
        {menu.map((nav: any) => (
          <div key={nav.id} className="col-lg-3 single-mega-item">
            {nav?.submenu && (
              <ul className="mega-menu-item">
                {/* Type subnav */}
                {nav.submenu.map((subnav: any) => (
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

MegaMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MegaMenu;
