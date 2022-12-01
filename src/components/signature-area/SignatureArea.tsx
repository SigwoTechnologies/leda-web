import { useRouter } from 'next/router';
import Anchor from '@ui/anchor';
import Button from '@ui/button';
import React, { useEffect, useState } from 'react';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import { openToastError } from '../../store/ui/ui.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import useMetamask from '../../features/auth/hooks/useMetamask';

type Props = {
  callbackUrl: string;
};

const SignatureArea = ({ callbackUrl }: Props) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(selectAuthState);
  const { sign, address } = useMetamask();
  const [isTermsOfServiceChecked, setIsTermsOfServiceChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && callbackUrl) router.push(`/${callbackUrl}`);
    if (isAuthenticated && !callbackUrl) router.push('/');
  }, [router, isAuthenticated, callbackUrl]);

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsOfServiceChecked(e.target.checked);
  };

  const handleSign = () => {
    if (!isTermsOfServiceChecked) {
      dispatch(openToastError('The terms of service must be accepted before you can sign in.'));
      return;
    }
    sign();
  };

  return (
    <div className="container">
      <div className="row justify-content-center g-5">
        <div className="col-xl-5 col-lg-8 col-12">
          <div className="form-wrapper-one">
            <h4 className="text-center">Signature request</h4>
            <p>
              Welcome to Leda Marketplace! Click to sign in and accept the Leda Terms of Service.
            </p>
            <p>
              This request will not trigger a blockchain transaction or cost any gas fees. Your
              authentication status will reset after 24 hours.
            </p>
            <p className="text-center">
              Wallet address: <b>{address}</b>
            </p>
            <div className="mb-5 text-center signature-label-input">
              <input
                type="checkbox"
                className="rn-check-box-input signature-input"
                id="privacyTerms"
                onChange={handlePrivacyChange}
                checked={isTermsOfServiceChecked}
              />
              <label
                className="rn-check-box-label"
                htmlFor="privacyTerms"
                style={{ paddingLeft: '0' }}
              >
                I agree to the <Anchor path="/terms-condition">Terms of service</Anchor>{' '}
              </label>
            </div>
            <div className="mb-12 text-center">
              <Button type="button" onClick={handleSign}>
                Sign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureArea;
