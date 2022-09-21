/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Anchor from '../anchor';

type Props = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  onClick?: () => void;
  className?: string;
  path?: string;
  size?: 'large' | 'small' | 'medium';
  color?: 'primary' | 'primary-alta';
  shape?: 'square' | 'ellipse';
  fullwidth?: boolean;
};

const Button = ({
  children,
  type = 'button',
  label,
  onClick,
  className,
  path,
  size = 'large',
  color = 'primary',
  shape,
  fullwidth,
  ...rest
}: Props) => {
  if (path) {
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

  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={clsx(
        className,
        'btn',
        `btn-${size}`,
        `btn-${color}`,
        fullwidth && 'w-100 d-block',
        shape === 'ellipse' && 'rounded'
      )}
      type={type}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
