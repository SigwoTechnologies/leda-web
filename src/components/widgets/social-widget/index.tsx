import { SocialItem } from '@types';

const SocialWidget = ({ id, icon, link, title }: SocialItem) => (
  /* const Icon = FontAwesomeIcons[icon]; */

  <ul className="social-copyright">
    <li>
      <a href={link} target="_blank" className="mx-2" rel="noreferrer" aria-label={title}>
        {/* <Icon /> */}
      </a>
    </li>
  </ul>
);
export default SocialWidget;
