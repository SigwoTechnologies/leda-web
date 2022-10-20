import ButtonLink from '@components/ButtonLink';
import SEO from '@components/seo';
import Footer from '@layout/footer';
import Header from '@layout/header';
import Wrapper from '@layout/wrapper';

type Props = {
  className?: string;
};

export async function getStaticProps() {
  return { props: { className: 'template-color-1' } };
}

const ErrorPage = ({ className }: Props) => {
  console.log(className);
  return (
    <Wrapper>
      <SEO pageTitle="404" />
      <Header />
      <div className="rn-not-found-area rn-section-gapTop">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="rn-not-found-wrapper">
                <h2 className="large-title">404</h2>
                <h3 className="title">Page not found!</h3>
                <p>The page you are looking for not available.</p>
                <ButtonLink path="/">Go Back To Home</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

export default ErrorPage;
