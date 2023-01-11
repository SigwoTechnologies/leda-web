export type ArrowButtonType = {
  onClick?: () => void;
  icon: string;
  className?: string;
};

export type BreakPointsType = {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
};

export type SliderTypes = {
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

export type SliderSettingsType = {
  dots: boolean;
  speed: number;
  adaptiveHeight: boolean;
  cssEase: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevArrow: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextArrow: any;
  infinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  arrows: boolean;
  responsive: BreakPointsType[];
};

export type SliderItemTypes = {
  children: React.ReactNode;
};
