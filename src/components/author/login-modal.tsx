import useAppSelector from '@store/hooks/useAppSelector';
import Button from '@ui/button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import constants from '../../common/configuration/constants';
import useMetamask from '../../features/auth/hooks/useMetamask';

export const LoginModal = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
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
