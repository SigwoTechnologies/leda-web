import { SocialItem } from '@types';

type Props = {
  socials: SocialItem[];
};

const SocialWidget = ({ socials }: Props) => (
  <ul className="social-copyright">
    {socials?.map((social: SocialItem) => (
      <li key={social.id}>
        <a href={social.link} target="_blank" rel="noreferrer" aria-label={social.title}>
          <i className={social.icon} />
        </a>
      </li>
    ))}
  </ul>
);

export default SocialWidget;
