import Link from 'next/link';
import { MouseEventHandler } from 'react';

type Props = {
  path: string;
  children: React.ReactNode;
  className?: string;
  rel?: string;
  label?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const Anchor = ({
  path,
  children,
  className,
  rel = 'noopener noreferrer',
  label,
  target = '_blank',
  onClick,
  ...rest
}: Props) => {
  if (!path) return null;
  const internal = /^\/(?!\/)/.test(path);
  if (!internal) {
    const isHash = path.startsWith('#');
    if (isHash) {
      return (
        <a aria-label={label} className={className} href={path} onClick={onClick} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <a
        aria-label={label}
        rel={rel}
        className={className}
        href={path}
        target={target}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link rel="preload" href={path} passHref>
      <a href="passRef" className={className} aria-label={label} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default Anchor;
