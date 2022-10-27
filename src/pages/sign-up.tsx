import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import SignUpArea from '@containers/signup';

const SignUp = () => (
  <>
    <SEO pageTitle="Sign Up" />
    <Breadcrumb pageTitle="Sign Up" currentPage="Sign Up" />
    <SignUpArea />
  </>
);

export default SignUp;
