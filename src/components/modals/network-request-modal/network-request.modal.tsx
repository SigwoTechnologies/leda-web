import Button from '@ui/button';
import Modal from 'react-bootstrap/Modal';
import useAppDispatch from '../../../store/hooks/useAppDispatch';
import useAppSelector from '../../../store/hooks/useAppSelector';
import { selectUiReducer, setIsMainnetModalOpen } from '../../../store/ui/ui.slice';

const NetworkRequestModal = () => {
  const dispatch = useAppDispatch();
  const { isMainnetModalOpen } = useAppSelector(selectUiReducer);

  const handleModal = () => dispatch(setIsMainnetModalOpen(!isMainnetModalOpen));

  const handleNetworkChange = async () => {
    const { ethereum } = window;
    if (!ethereum) return;
    const ethereumMainnetChainId = '0x1';

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethereumMainnetChainId }],
      });
    } catch (ex) {
      console.log('metamask|change-network', ex);
    }
  };

  return (
    <div>
      <Modal
        className="rn-popup-modal placebid-modal-wrapper"
        show={isMainnetModalOpen}
        onHide={handleModal}
        centered
      >
        <button type="button" className="btn-close" aria-label="Close" onClick={handleModal}>
          <i className="feather-x" />
        </button>
        <Modal.Header>
          <h3>Network Request</h3>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-center fw-normal">
            You are not able to continue this transaction because you are not in mainnet
          </h6>
          <Button onClick={handleNetworkChange} className="d-flex mx-auto mt-2">
            Switch Now
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NetworkRequestModal;
