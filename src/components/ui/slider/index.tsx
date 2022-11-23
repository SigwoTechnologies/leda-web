import SlickSlider from 'react-slick';
import clsx from 'clsx';

type ArrowButtonType = {
  onClick?: () => void;
  icon: string;
  className?: string;
};

type BreakPointsType = {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
};

type SliderTypes = {
  options: {
    infinite: boolean;
    slidesToShow: number;
    slidesToScroll: number;
    arrows: boolean;
    responsive: BreakPointsType[];
  };

  children: React.ReactNode;
  prevIcon?: string;
  nextIcon?: string;
  className: string;
};

type SliderSettingsType = {
  dots: boolean;
  arrows: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  adaptiveHeight: boolean;
  cssEase: string;
  prevArrow: React.ReactNode;
  nextArrow: React.ReactNode;
};

type SliderItemTypes = {
  children: React.ReactNode;
};

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
  };

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
