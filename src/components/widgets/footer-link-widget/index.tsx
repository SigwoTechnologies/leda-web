import Anchor from '@ui/anchor';
import { Menu } from '@types';

type Props = {
  menu: Menu[];
};

const FooterLinkWidget = ({ menu }: Props) => (
  <ul className="privacy">
    {menu?.map((nav: Menu) => (
      <li key={nav.id}>
        <Anchor path={nav.path}>{nav.text}</Anchor>
      </li>
    ))}
  </ul>
);

export default FooterLinkWidget;
