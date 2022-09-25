import Image from 'next/image';
import Button from '@ui/button';
import { ButtonContent, Content, HomeSection } from '@types';

type Props = {
  homeSection?: HomeSection;
};
const HeroArea = ({ homeSection }: Props) => (
  <div className="slider-one rn-section-gapTop">
    <div className="container">
      <div className="row row-reverce-sm align-items-center">
        <div className="col-lg-5 col-md-6 col-sm-12 mt_sm--50">
          {homeSection?.headings[0]?.content && (
            <h2 className="title" data-sal-delay="200" data-sal="slide-up" data-sal-duration="800">
              {homeSection.headings[0].content}
            </h2>
          )}
          {homeSection?.texts?.map((text: Content) => (
            <p
              className="slide-disc"
              data-sal-delay="300"
              data-sal="slide-up"
              data-sal-duration="800"
              key={text.id}
            >
              {text.content}
            </p>
          ))}
          {homeSection?.buttons && (
            <div className="button-group">
              {homeSection.buttons.map(({ content, id, ...btn }: ButtonContent, i: number) => (
                <Button
                  {...btn}
                  data-sal-delay={400 + i * 100}
                  data-sal="slide-up"
                  data-sal-duration="800"
                  key={id}
                >
                  {content}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 offset-lg-1">
          {homeSection?.images?.[0]?.src && (
            <div className="slider-thumbnail">
              <Image
                src={homeSection.images[0].src}
                alt={homeSection.images[0]?.alt || 'Slider Images'}
                width={585}
                height={593}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default HeroArea;
