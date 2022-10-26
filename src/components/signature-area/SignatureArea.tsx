import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Anchor from '@ui/anchor';
import Button from '@ui/button';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import useAppSelector from '../../store/hooks/useAppSelector';
import useMetamask from '../../features/auth/hooks/useMetamask';

type Props = {
  callbackUrl: string;
};

const SignatureArea = ({ callbackUrl }: Props) => {
  const { isAuthenticated } = useAppSelector(selectAuthState);
  const { sign, address } = useMetamask();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && callbackUrl) router.push(`/${callbackUrl}`);
    if (isAuthenticated && !callbackUrl) router.push('/');
  }, [router, isAuthenticated, callbackUrl]);

  return (
    <div className="container">
      <div className="row justify-content-center g-5">
        <div className="col-xl-4 col-lg-6 col-10">
          <div className="form-wrapper-one">
            <h4>Signature request</h4>
            <p>
              Welcome to Leda Marketplace! Click to sign in and accept the Leda Terms of Service.
            </p>
            <p>
              This request will not trigger a blockchain transaction or cost any gas fees. Your
              authentication status will reset after 24 hours.
            </p>
            <p>Wallet address: {address}</p>
            <div className="mb-5">
              <input type="checkbox" className="rn-check-box-input" id="exampleCheck1" />
              <label className="rn-check-box-label" htmlFor="exampleCheck1">
                I agree to the <Anchor path="/terms-condition">Terms of service</Anchor>{' '}
              </label>
            </div>
            <div className="mb-12 text-center">
              <Button type="button" onClick={sign}>
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureArea;
