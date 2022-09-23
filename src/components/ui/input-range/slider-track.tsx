/* eslint-disable react/prop-types */
import { getTrackBackground } from 'react-range';

// TODO: Type props
const SliderTrack = ({ props, children, min, max, values }: any) => {
  const colors = ['var(--color-primary-alta)', 'var(--color-primary)', 'var(--color-primary-alta)'];
  const background = getTrackBackground({
    values: [...values].sort((a, b) => a - b),
    min,
    max,
    colors,
  });

  return (
    <div className="slider-track-container" style={{ ...props.style, background }}>
      <div className="slider-track" ref={props.ref}>
        {children}
      </div>
    </div>
  );
};

export default SliderTrack;
