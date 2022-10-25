import { useState } from 'react';
import { Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';
import SliderTrack from './slider-track';
import SliderThumb from './slider-thumb';

const STEP = 0.1;
const MIN = 0.1;
const MAX = 4;

type Props = {
  setPriceRange?: any;
};

const InputRange = ({ setPriceRange }: Props) => {
  const [valuesSlide, setValuesSlide] = useState([0.1, 4]);

  const renderTrack = (props: IRenderTrackParams) => (
    <SliderTrack {...props} min={MIN} max={MAX} values={valuesSlide} />
  );

  const handleChange = (vals: number[]) => {
    setPriceRange({
      from: vals[0],
      to: vals[1],
    });
    setValuesSlide(vals);
  };

  return (
    <div className="input-range">
      <Range
        values={valuesSlide}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(vals) => handleChange(vals)}
        renderTrack={renderTrack}
        renderThumb={SliderThumb}
      />
      <div className="slider__range--output">
        <div className="price__output--wrap">
          <div className="price--output">
            <span>Price:</span>
            <span className="output-label">
              <span>ETH</span> {valuesSlide[0]} - <span>ETH</span> {valuesSlide[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputRange;
