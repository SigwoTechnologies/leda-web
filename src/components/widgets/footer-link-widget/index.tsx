import Anchor from '@ui/anchor';
import { MenuType } from '../../../types/menu';

type Props = {
  menu: MenuType[];
};

const FooterLinkWidget = ({ menu }: Props) => (
  <ul className="privacy">
    {menu?.map((nav: MenuType) => (
      <li key={nav.id}>
        <Anchor path={nav.path}>{nav.text}</Anchor>
      </li>
    ))}
  </ul>
);

export default FooterLinkWidget;
