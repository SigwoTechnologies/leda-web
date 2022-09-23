/* eslint-disable react/prop-types */
import clsx from 'clsx';

// TODO: Type props
const SliderThumb = ({ props, isDragged }: any) => (
  <div className="slider-thumb-container" style={props.style} {...props}>
    <div
      className={clsx('slider-thumb', { 'is-dragged': isDragged })}
      style={{
        ...props.style,
      }}
    />
  </div>
);

export default SliderThumb;
