import { useState } from 'react';
import Image from 'next/image';
import Anchor from '@ui/anchor';
import Modal from 'react-bootstrap/Modal';
import Button from '@ui/button';
import { formattedAddress } from '@utils/getFormattedAddress';
import useAppSelector from '@store/hooks/useAppSelector';
import constants from '../../common/configuration/constants';
import { selectAuthState } from '../../features/auth/store/auth.slice';
import useMetamask from '../../features/auth/hooks/useMetamask';
import { selectAccountState } from '../../features/account/store/account.slice';

const LogComponent = () => {
  const { isAuthenticated } = useAppSelector(selectAuthState);
  const { sign } = useMetamask();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsOfServiceChecked, setIsTermsOfServiceChecked] = useState(false);

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsOfServiceChecked(e.target.checked);
  };

  const handleModalOpen = () => setIsModalOpen((prev) => !prev);

  const handleDisconnectWallet = async () => {
    if (typeof window !== undefined) {
      localStorage.removeItem(constants.tokenKey);
      window.location.reload();
    }
  };

  return (
    <div className="add-fund-button mt--20 pb--20">
      <button
        className="btn btn-primary-alta w-100"
        type="button"
        onClick={isAuthenticated ? handleDisconnectWallet : handleModalOpen}
      >
        {isAuthenticated ? 'Log out' : 'Log In'}
      </button>
      <Modal
        className="rn-popup-modal placebid-modal-wrapper"
        show={isModalOpen}
        onHide={handleModalOpen}
        centered
      >
        <button type="button" className="btn-close" aria-label="Close" onClick={handleModalOpen}>
          <i className="feather-x" />
        </button>
        <Modal.Header>
          <h3 className="modal-title fw-light">
            <b>Log In LEDA</b>
          </h3>
        </Modal.Header>
        <Modal.Body className="text-center">
          <span className="text-center">
            Welcome to Leda Marketplace! Click to sign in and accept the Leda Terms of Service. This
            request will not trigger a blockchain transaction or cost any gas fees. Your
            authentication status will reset after 24 hours.
          </span>
          <div className="my-5 text-center">
            <input
              type="checkbox"
              className="rn-check-box-input"
              id="terms"
              onChange={handlePrivacyChange}
              checked={isTermsOfServiceChecked}
            />
            <label className="rn-check-box-label" htmlFor="terms" style={{ paddingLeft: '10px' }}>
              I agree to the Terms of service
            </label>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              disabled={!isTermsOfServiceChecked}
              onClick={() => {
                sign();
                handleModalOpen();
              }}
            >
              Log In
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const UserDropdown = () => {
  const { isAuthenticated, address } = useAppSelector(selectAuthState);
  const { imageNumber } = useAppSelector(selectAccountState);

  return (
    <div className="icon-box">
      <span className="user-rd">
        <Image
          src={`/images/avatars/${isAuthenticated ? `${imageNumber}` : 'unknown-user'}.png`}
          alt="Images"
          layout="fixed"
          className="user-image"
          width={38}
          height={38}
        />
      </span>
      <div className="rn-dropdown">
        <div className="rn-inner-top">
          <h4 className="title">
            <Anchor path="/author">Unnamed</Anchor>
          </h4>
          <span>({formattedAddress(address)})</span>
        </div>
        <LogComponent />
        <ul className="list-inner">
          <li>
            <Anchor path="/author">My Profile</Anchor>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
