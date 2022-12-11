import Breadcrumb from '@components/breadcrumb';
import LoginArea from '@containers/login';
import SEO from '@components/seo';

const Login = () => (
  <>
    <SEO pageTitle="Log In" />
    <Breadcrumb pageTitle="LEDA Login" currentPage="LEDA Login" />
    <LoginArea />
  </>
);

export default Login;
