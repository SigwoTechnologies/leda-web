import Anchor from '@ui/anchor';
import clsx from 'clsx';
import React from 'react';

type Props = {
  children: string;
  path: string;
  label?: string;
  onClick?: () => void;
  className?: string;
  size?: 'large' | 'small' | 'medium';
  color?: 'primary' | 'primary-alta';
  shape?: 'square' | 'ellipse';
  fullwidth?: boolean;
};

function ButtonLink({
  children,
  label,
  onClick,
  className,
  path,
  size = 'large',
  color = 'primary',
  shape,
  fullwidth,
  ...rest
}: Props) {
  return (
    <Anchor
      label={label}
      onClick={onClick}
      className={clsx(
        className,
        'btn',
        `btn-${size}`,
        `btn-${color}`,
        fullwidth && 'w-100 d-block',
        shape === 'ellipse' && 'rounded'
      )}
      path={path}
      {...rest}
    >
      <span>{children}</span>
    </Anchor>
  );
}

export default ButtonLink;
