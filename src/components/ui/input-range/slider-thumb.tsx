import clsx from 'clsx';
import { IThumbProps } from 'react-range/lib/types';

type Props = {
  props: IThumbProps;
  isDragged: boolean;
};

const SliderThumb = ({ props, isDragged }: Props) => (
  <div className="slider-thumb-container" {...props} style={props.style}>
    <div
      className={clsx('slider-thumb', { 'is-dragged': isDragged })}
      style={{
        ...props.style,
      }}
    />
  </div>
);

export default SliderThumb;
