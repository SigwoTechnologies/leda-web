import SlickSlider from 'react-slick';
import clsx from 'clsx';
import {
  ArrowButtonType,
  SliderItemTypes,
  SliderTypes,
  SliderSettingsType,
} from '../../../types/item-slider.types';

const ArrowButton = ({ onClick, icon, className }: ArrowButtonType) => (
  <button type="button" onClick={onClick} className={clsx('slide-arrow', className)}>
    <i className={icon} />
  </button>
);

const Slider = ({
  options,
  children,
  prevIcon = 'feather-arrow-left',
  nextIcon = 'feather-arrow-right',
  className,
}: SliderTypes) => {
  const settings = {
    dots: false,
    speed: 500,
    adaptiveHeight: true,
    cssEase: 'linear',
    prevArrow: <ArrowButton icon={prevIcon} />,
    nextArrow: <ArrowButton icon={nextIcon} />,
    ...options,
  } as SliderSettingsType;

  return (
    <SlickSlider className={clsx(className)} {...settings}>
      {children}
    </SlickSlider>
  );
};

export default Slider;

export const SliderItem = ({ children }: SliderItemTypes) => (
  <div className="slider-item">{children}</div>
);
