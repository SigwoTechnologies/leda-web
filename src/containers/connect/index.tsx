import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Anchor from '@ui/anchor';
import Image from 'next/image';
import Wallet from '@components/wallet';
import clsx from 'clsx';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';

type Props = {
  callbackUrl: string;
};

const ConnectArea = ({ callbackUrl }: Props) => {
  const { isConnected } = useAppSelector(selectAuthState);
  const router = useRouter();
  const { connect } = useMetamask();

  useEffect(() => {
    if (isConnected && callbackUrl) router.push(`/${callbackUrl}`);
    if (isConnected && !callbackUrl) router.push('/');
  }, [router, isConnected, callbackUrl]);

  return (
    <div className="rn-connect-area rn-section-gapTop">
      <div className="container">
        <div className="row g mb--50 mb_md--30 mb_sm--30 align-items-center">
          <div
            className="col-lg-12 text-center mb-4"
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="800"
          >
            <h3 className="connect-title">Connect your wallet</h3>
            <p className="connect-td">
              Connect with one of available wallet providers or create a new wallet.
              <br />
              We do not own your private keys and cannot access your funds without your
              confirmation.
            </p>
          </div>
          <div
            className="col-lg-12"
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="800"
          >
            <div>
              <div className="inner d-flex justify-content-center">
                <button onClick={connect} type="button" className="btn btn-large btn-primary">
                  Connect Wallet Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5">
          <div
            className="col-lg-6"
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="500"
          >
            <div className="connect-thumbnail">
              <div className="left-image">
                <Image
                  src="https://source.unsplash.com/random/662x570"
                  alt="Nft_Profile"
                  width={670}
                  height={576}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-5">
              <div
                className="col-12"
                data-sal="slide-up"
                data-sal-delay="150"
                data-sal-duration="800"
              >
                <Wallet
                  title="Metamask"
                  description="Start exploring blockchain applications in seconds. Trusted by over 30 million users worldwide"
                  path="https://metamask.io/"
                  icon="feather-user"
                  color="red"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectArea;
