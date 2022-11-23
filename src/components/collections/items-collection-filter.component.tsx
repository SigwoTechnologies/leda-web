import SliderThumb from '@ui/input-range/slider-thumb';
import SliderTrack from '@ui/input-range/slider-track';
import NiceSelect from '@ui/nice-select';
import Sticky from '@ui/sticky';
import { Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';

const renderTrack = (props: IRenderTrackParams) => (
  <SliderTrack {...props} min={1} max={5} values={[1, 5]} />
);

const ItemCollectionFilter = () => (
  <Sticky top="150px">
    <div className="">
      <nav className="left-nav rbt-sticky-top-adjust-five">
        <div className="nav nav-tabs p-5">
          <div className="d-flex flex-column" style={{ width: '100%' }}>
            <div className="filter-select-option">
              <h6 className="filter-leble">Search</h6>
              <input
                className="nice-select text-white"
                placeholder="Search by title or description"
              />
            </div>
            <div className="filter-select-option mt-5">
              <h6 className="filter-leble">Price Range</h6>
              <div className="price_filter s-filter clear">
                <div className="input-range">
                  <Range
                    values={[1, 5]}
                    step={0.01}
                    min={1}
                    max={5}
                    renderTrack={renderTrack}
                    renderThumb={SliderThumb}
                    onChange={(vals) => console.log(vals)}
                    onFinalChange={(vals) => console.log(vals)}
                  />
                  <div className="slider__range--output mt-3">
                    <div className="price__output--wrap">
                      <div className="price--output">
                        <span>Price:</span>
                        <span className="output-label">
                          <span>ETH</span> 4 - <span>ETH</span> 8
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-select-option mt-5">
              <h6 className="filter-leble">Popularity</h6>
              <NiceSelect
                options={[
                  { value: 'most-liked', text: 'Most popular', direction: 'desc' },
                  { value: 'least-liked', text: 'Less popular', direction: 'asc' },
                ]}
                placeholder="Sort by likes"
                onChange={(e) => console.log(e)}
                name="like"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </Sticky>
);

export default ItemCollectionFilter;
