import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Option } from '../../../types/option';

type Props = {
  options: Option[];
  defaultCurrent?: number;
  placeholder: string;
  className?: string;
  onChange: (a: string) => void;
  name?: string;
};

const NiceSelect = ({
  options,
  defaultCurrent = 1,
  placeholder,
  className,
  onChange,
  name,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({
    value: '',
    text: '',
  });

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef(null);

  useClickAway(ref, onClose);

  const currentHandler = (item: Option) => {
    setCurrent({
      value: item.value,
      text: item.text,
    });
    onChange(`${item.direction}`);
    onClose();
  };

  return (
    <div
      className={clsx('nice-select', className, open && 'open')}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onKeyPress={(e) => e}
      ref={ref}
    >
      <span className="current">{current?.text || placeholder}</span>
      <ul
        className="list"
        role="menubar"
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
      >
        {options?.map((item: Option) => (
          <li
            key={item.value}
            data-value={item.value}
            className={clsx('option', item.value === current?.value && 'selected focus')}
            role="menuitem"
            onClick={() => currentHandler(item)}
            onKeyPress={(e) => e}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

NiceSelect.displayName = 'NiceSelect';

export default NiceSelect;
