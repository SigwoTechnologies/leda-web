import { getTrackBackground } from 'react-range';
import { ITrackProps } from 'react-range/lib/types';

type Props = {
  props: ITrackProps;
  children: React.ReactNode;
  min: number;
  max: number;
  values: number[];
};

const SliderTrack = ({ props, children, min, max, values }: Props) => {
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
