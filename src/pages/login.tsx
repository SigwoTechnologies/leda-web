import Breadcrumb from '@components/breadcrumb';
import LoginArea from '@containers/login';
import SEO from '@components/seo';

const Login = () => (
  <>
    <SEO pageTitle="Log In" />
    <Breadcrumb pageTitle="Nuron Login" currentPage="Nuron Login" />
    <LoginArea />
  </>
);

export default Login;
