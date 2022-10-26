import { useRouter } from 'next/router';
import Breadcrumb from '@components/breadcrumb';
import SignatureArea from '@components/signature-area/SignatureArea';

const Signature = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;

  return (
    <>
      <Breadcrumb pageTitle="Signature" currentPage="Signature asdasdsad" />
      <SignatureArea callbackUrl={callbackUrl} />
    </>
  );
};

export default Signature;
