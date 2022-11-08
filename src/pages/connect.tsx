import Breadcrumb from '@components/breadcrumb';
import ConnectArea from '@containers/connect';
import SEO from '@components/seo';
import { useRouter } from 'next/router';

const Connect = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;

  return (
    <>
      <SEO pageTitle="Connect" />
      <Breadcrumb pageTitle="Wallet" currentPage="Make your payment easier" />
      <ConnectArea callbackUrl={callbackUrl} />
    </>
  );
};

export default Connect;
