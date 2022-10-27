import { useRouter } from 'next/router';
import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import SignatureArea from '@components/signature-area/SignatureArea';

const Signature = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;

  return (
    <>
      <SEO pageTitle="Signature Request" />
      <Breadcrumb pageTitle="Signature" currentPage="Signature" />
      <SignatureArea callbackUrl={callbackUrl} />
    </>
  );
};

export default Signature;
